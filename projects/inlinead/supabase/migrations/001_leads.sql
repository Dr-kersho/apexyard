-- INLINE AD marketing leads (run in Supabase SQL editor or via CLI)

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_type text not null check (lead_type in ('brand', 'gym')),
  payload jsonb not null default '{}'::jsonb,
  utm jsonb,
  lang text default 'en',
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'lost'))
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_type_status_idx on public.leads (lead_type, status);

alter table public.leads enable row level security;

-- No public policies: inserts go through Netlify function (service role) only.

comment on table public.leads is 'Marketing site form submissions (brand + gym)';
