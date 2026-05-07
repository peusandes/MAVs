-- =====================================================================
-- MAVs LANC — schema (slug-as-identity)
-- Run once in Supabase SQL Editor.
-- The user identity is the *normalized name* (slug), not auth.uid().
-- This lets a student with the same name re-open the app on any browser
-- or device and recover their progress without email/password.
--
-- Trade-off: anyone who knows a student's name can read or modify their
-- data. Acceptable for an academic Liga setting where names are public.
-- A PIN field can be added later if the Liga ever needs privacy.
--
-- This migration is destructive — it drops the previous schema first.
-- =====================================================================

drop table if exists public.last_module    cascade;
drop table if exists public.simulado_runs  cascade;
drop table if exists public.completed_modules cascade;
drop table if exists public.answers        cascade;
drop table if exists public.profiles       cascade;
drop function if exists public.touch_updated_at() cascade;

-- ---------------------------------------------------------------------
-- profiles: user identity. id = normalized name slug (e.g. "pedro-sandes")
-- ---------------------------------------------------------------------
create table public.profiles (
  id text primary key,
  display_name text not null,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- answers
-- ---------------------------------------------------------------------
create table public.answers (
  user_id text not null references public.profiles(id) on delete cascade,
  question_id text not null,
  module text not null,
  difficulty text not null check (difficulty in ('facil', 'medio', 'dificil')),
  correct boolean not null,
  chosen_id text not null,
  time_ms integer not null default 0,
  flagged boolean not null default false,
  answered_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create index idx_answers_user_module on public.answers (user_id, module);
create index idx_answers_user_at on public.answers (user_id, answered_at desc);

-- ---------------------------------------------------------------------
-- completed_modules
-- ---------------------------------------------------------------------
create table public.completed_modules (
  user_id text not null references public.profiles(id) on delete cascade,
  module_slug text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, module_slug)
);

-- ---------------------------------------------------------------------
-- simulado_runs
-- ---------------------------------------------------------------------
create table public.simulado_runs (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.profiles(id) on delete cascade,
  score integer not null,
  total integer not null,
  duration_ms bigint not null,
  per_module jsonb not null default '{}'::jsonb,
  ran_at timestamptz not null default now()
);

create index idx_simulado_user_at on public.simulado_runs (user_id, ran_at desc);

-- ---------------------------------------------------------------------
-- last_module: 1 row per user
-- ---------------------------------------------------------------------
create table public.last_module (
  user_id text primary key references public.profiles(id) on delete cascade,
  module_slug text not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Updated-at trigger on profiles
-- ---------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------
-- Row-Level Security
-- Names are the identity. Both anonymous and authenticated visitors
-- can read and write — everyone in the Liga shares the same dataspace,
-- partitioned by their chosen name. Add a PIN column + policy later
-- to lock individual names behind a code if the Liga ever needs it.
-- ---------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.answers enable row level security;
alter table public.completed_modules enable row level security;
alter table public.simulado_runs enable row level security;
alter table public.last_module enable row level security;

create policy "open_profiles" on public.profiles
  for all to anon, authenticated using (true) with check (true);

create policy "open_answers" on public.answers
  for all to anon, authenticated using (true) with check (true);

create policy "open_completed" on public.completed_modules
  for all to anon, authenticated using (true) with check (true);

create policy "open_simulado" on public.simulado_runs
  for all to anon, authenticated using (true) with check (true);

create policy "open_last" on public.last_module
  for all to anon, authenticated using (true) with check (true);
