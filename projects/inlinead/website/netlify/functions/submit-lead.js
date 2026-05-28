const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { ...CORS, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function pickUtm(query) {
  if (!query || typeof query !== 'object') return null;
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const utm = {};
  for (const k of keys) {
    if (query[k]) utm[k] = String(query[k]).slice(0, 200);
  }
  return Object.keys(utm).length ? utm : null;
}

function validatePayload(leadType, payload) {
  if (!payload || typeof payload !== 'object') return 'Invalid payload';
  if (payload.website) return 'Spam rejected';
  const req = (k) => payload[k] && String(payload[k]).trim();
  if (leadType === 'brand') {
    if (!req('company') || !req('name') || !req('email') || !req('phone')) return 'Missing required brand fields';
    if (!req('category')) return 'Missing category';
    if (!payload.consent) return 'Consent required';
  } else if (leadType === 'gym') {
    if (!req('gym') || !req('contact') || !req('email') || !req('phone') || !req('area')) return 'Missing required gym fields';
    if (!req('branches')) return 'Missing branches';
    if (!req('members') || !req('tier')) return 'Missing gym profile fields';
    if (!payload.consent) return 'Consent required';
  } else {
    return 'Invalid lead_type';
  }
  const email = String(payload.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email';
  return null;
}

async function insertLead(row) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase not configured');

  const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase insert failed: ${res.status} ${text}`);
  }
}

async function notifySales(leadType, payload, lang) {
  const to = process.env.SALES_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;
  if (!to || !resendKey) return;

  const label = leadType === 'brand' ? 'Brand lead' : 'Gym application';
  const name = leadType === 'brand' ? payload.company : payload.gym;
  const subject = `[INLINE AD] ${label}: ${name}`;
  const text = [
    subject,
    `Lang: ${lang || 'en'}`,
    '',
    JSON.stringify(payload, null, 2),
  ].join('\n');

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || 'INLINE AD <onboarding@resend.dev>',
      to: [to],
      subject,
      text,
    }),
  });
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON' });
  }

  const leadType = body.lead_type;
  const payload = body.payload || {};
  const err = validatePayload(leadType, payload);
  if (err) return json(400, { error: err });

  const row = {
    lead_type: leadType,
    payload,
    utm: pickUtm(body.utm),
    lang: body.lang === 'ar' ? 'ar' : 'en',
    status: 'new',
  };

  try {
    await insertLead(row);
    await notifySales(leadType, payload, row.lang).catch(() => {});
    return json(200, { ok: true });
  } catch (e) {
    console.error(e);
    return json(500, { error: 'Submission failed. Try again or contact us on WhatsApp.' });
  }
};
