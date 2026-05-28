/* INLINE AD — page init */
(function () {
  if (location.hostname.endsWith('github.io') && location.pathname.startsWith('/inlinead-website')) {
    const base = document.createElement('base');
    base.href = '/inlinead-website/';
    document.head.prepend(base);
  }

  const i18n = window.INLINEAD_I18N;
  const forms = window.INLINEAD_FORMS;

  document.getElementById('langToggle')?.addEventListener('click', () => i18n.toggleLang());

  const nums = (window.INLINEAD && window.INLINEAD.whatsappNumbers) || [];
  document.querySelectorAll('.wa-link').forEach((a, i) => {
    const raw = a.getAttribute('data-wa') || nums[i];
    if (raw) a.href = `https://wa.me/${String(raw).replace(/\D/g, '')}`;
  });

  forms.wireForm('brandForm', 'brandThanks', 'brand');
  forms.wireForm('gymForm', 'gymThanks', 'gym');

  if (location.search.includes('intent=gym')) {
    setTimeout(() => document.getElementById('gym-form')?.scrollIntoView({ behavior: 'smooth' }), 300);
  }
  if (location.search.includes('intent=brand')) {
    setTimeout(() => document.getElementById('brand-form')?.scrollIntoView({ behavior: 'smooth' }), 300);
  }

  i18n.applyLang();
})();
