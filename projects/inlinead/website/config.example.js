// Copy to config.js (gitignored) and fill after creating Supabase project.
// Enables form submit on GitHub Pages without Netlify Functions.
window.INLINEAD = Object.assign(window.INLINEAD || {}, {
  supabaseUrl: 'https://YOUR_PROJECT.supabase.co',
  supabaseAnonKey: 'YOUR_ANON_PUBLIC_KEY',
});
