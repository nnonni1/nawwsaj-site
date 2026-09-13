create table if not exists public.leads (
  id uuid primary key, name text not null, contact text not null, project_type text not null,
  description text not null, stage text not null, requested_service text not null,
  budget text, timeline text, created_at timestamptz not null default now(),
  source text not null, status text not null default 'new'
);

create table if not exists public.business_events (
  id bigint generated always as identity primary key, type text not null,
  occurred_at timestamptz not null, source text not null,
  metadata jsonb not null default '{}'::jsonb
);

alter table public.leads enable row level security;
alter table public.business_events enable row level security;
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_requested_service_idx on public.leads (requested_service);
create index if not exists business_events_type_occurred_at_idx on public.business_events (type, occurred_at desc);

create or replace function public.create_lead_with_event(p_lead jsonb, p_event jsonb)
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.leads (id, name, contact, project_type, description, stage, requested_service, budget, timeline, created_at, source, status)
  values ((p_lead->>'id')::uuid, p_lead->>'name', p_lead->>'contact', p_lead->>'project_type', p_lead->>'description', p_lead->>'stage', p_lead->>'requested_service', nullif(p_lead->>'budget', ''), nullif(p_lead->>'timeline', ''), (p_lead->>'created_at')::timestamptz, p_lead->>'source', p_lead->>'status');
  insert into public.business_events (type, occurred_at, source, metadata)
  values (p_event->>'type', (p_event->>'timestamp')::timestamptz, p_event->>'source', coalesce(p_event->'metadata', '{}'::jsonb));
end;
$$;

revoke all on function public.create_lead_with_event(jsonb, jsonb) from public, anon, authenticated;
grant execute on function public.create_lead_with_event(jsonb, jsonb) to service_role;
