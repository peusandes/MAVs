-- =====================================================================
-- MAVs LANC — initial schema
-- Run once in Supabase SQL Editor (right after enabling Anonymous Sign-Ins).
-- Idempotent: safe to re-run.
-- =====================================================================

-- ---------------------------------------------------------------------
-- profiles: user-supplied display name, keyed by anon auth UUID
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- answers: one row per (user, question), upserted
-- ---------------------------------------------------------------------
create table if not exists public.answers (
  user_id uuid not null references auth.users(id) on delete cascade,
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

create index if not exists idx_answers_user_module
  on public.answers (user_id, module);

create index if not exists idx_answers_user_at
  on public.answers (user_id, answered_at desc);

-- ---------------------------------------------------------------------
-- completed_modules
-- ---------------------------------------------------------------------
create table if not exists public.completed_modules (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_slug text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, module_slug)
);

-- ---------------------------------------------------------------------
-- simulado_runs
-- ---------------------------------------------------------------------
create table if not exists public.simulado_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  score integer not null,
  total integer not null,
  duration_ms bigint not null,
  per_module jsonb not null default '{}'::jsonb,
  ran_at timestamptz not null default now()
);

create index if not exists idx_simulado_user_at
  on public.simulado_runs (user_id, ran_at desc);

-- ---------------------------------------------------------------------
-- last_module: 1 row per user, used by the "Continue de onde parou" card
-- ---------------------------------------------------------------------
create table if not exists public.last_module (
  user_id uuid primary key references auth.users(id) on delete cascade,
  module_slug text not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Row-Level Security
-- ---------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.answers enable row level security;
alter table public.completed_modules enable row level security;
alter table public.simulado_runs enable row level security;
alter table public.last_module enable row level security;

-- profiles
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- answers
drop policy if exists "answers_all_own" on public.answers;
create policy "answers_all_own" on public.answers
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- completed_modules
drop policy if exists "completed_modules_all_own" on public.completed_modules;
create policy "completed_modules_all_own" on public.completed_modules
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- simulado_runs
drop policy if exists "simulado_runs_all_own" on public.simulado_runs;
create policy "simulado_runs_all_own" on public.simulado_runs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- last_module
drop policy if exists "last_module_all_own" on public.last_module;
create policy "last_module_all_own" on public.last_module
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- Trigger: keep profiles.updated_at fresh on update
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

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();
