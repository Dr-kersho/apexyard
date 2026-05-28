-- Allow marketing-site form posts via Supabase anon key (insert-only).
-- Run AFTER 001_leads.sql. Service-role inserts (Netlify function) still work.

create policy leads_anon_insert on public.leads
  for insert
  to anon
  with check (lead_type in ('brand', 'gym'));
