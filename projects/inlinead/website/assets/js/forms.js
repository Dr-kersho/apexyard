/* INLINE AD — form validation + API submit */
window.INLINEAD_FORMS = (function () {
  function getUtm() {
    const p = new URLSearchParams(window.location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const utm = {};
    keys.forEach((k) => {
      const v = p.get(k);
      if (v) utm[k] = v;
    });
    return Object.keys(utm).length ? utm : null;
  }

  function validateForm(form, lang) {
    const strings = window.INLINEAD_I18N.STRINGS[lang];
    let ok = true;
    form.querySelectorAll('[required]').forEach((field) => {
      const err = field.parentElement.querySelector('.field-error');
      let invalid = false;
      if (field.type === 'checkbox') invalid = !field.checked;
      else if (field.type === 'email') {
        invalid = !field.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      } else invalid = !String(field.value || '').trim();
      field.classList.toggle('invalid', invalid);
      if (err) {
        err.classList.toggle('show', invalid);
        if (invalid && field.type === 'email') err.textContent = strings.err_email;
        else if (invalid) err.textContent = strings.err_required;
      }
      if (invalid) ok = false;
    });
    return ok;
  }

  function showFormError(form, message) {
    let el = form.querySelector('.form-alert');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-alert';
      el.setAttribute('role', 'alert');
      form.prepend(el);
    }
    el.textContent = message;
    el.classList.add('show');
  }

  function clearFormError(form) {
    const el = form.querySelector('.form-alert');
    if (el) el.classList.remove('show');
  }

  async function submitViaSupabase(leadType, payload, lang) {
    const cfg = window.INLINEAD || {};
    const base = cfg.supabaseUrl?.replace(/\/$/, '');
    const key = cfg.supabaseAnonKey;
    if (!base || !key) return null;

    const res = await fetch(`${base}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        lead_type: leadType,
        payload,
        utm: getUtm(),
        lang: lang === 'ar' ? 'ar' : 'en',
        status: 'new',
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Supabase insert failed');
    }
    return { ok: true };
  }

  async function submitViaNetlify(leadType, payload, lang) {
    const url = (window.INLINEAD && window.INLINEAD.submitUrl) || '/.netlify/functions/submit-lead';
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_type: leadType,
        payload,
        utm: getUtm(),
        lang,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Submission failed');
    return data;
  }

  async function submitLead(leadType, payload, lang) {
    const viaDb = await submitViaSupabase(leadType, payload, lang);
    if (viaDb) return viaDb;
    return submitViaNetlify(leadType, payload, lang);
  }

  function wireForm(formId, thanksId, leadType) {
    const form = document.getElementById(formId);
    const thanks = document.getElementById(thanksId);
    if (!form || !thanks) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearFormError(form);
      const hp = form.querySelector('[name="website"]');
      if (hp && hp.value) return;

      const lang = window.INLINEAD_I18N.getLang();
      if (!validateForm(form, lang)) return;

      const payload = Object.fromEntries(new FormData(form));
      delete payload.website;
      payload.consent = form.querySelector('[name="consent"]')?.checked === true;

      const btn = form.querySelector('button[type="submit"]');
      const prevText = btn?.textContent;
      if (btn) {
        btn.disabled = true;
        btn.textContent = lang === 'ar' ? 'جاري الإرسال…' : 'Sending…';
      }

      try {
        await submitLead(leadType, payload, lang);
        form.style.display = 'none';
        thanks.classList.add('show');
        thanks.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (err) {
        const strings = window.INLINEAD_I18N.STRINGS[lang];
        const msg = err.message || strings.err_submit;
        showFormError(form, msg);
      } finally {
        if (btn) {
          btn.disabled = false;
          if (prevText) btn.textContent = prevText;
        }
      }
    });
  }

  return { wireForm, validateForm, submitLead };
})();
