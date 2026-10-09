create table if not exists public.tetris_scores (
  email text primary key,
  display_name text not null,
  score integer not null check (score >= 0),
  updated_at timestamptz not null default now(),
  constraint tetris_email_normalized check (email = lower(email))
);

create index if not exists tetris_scores_rank_idx on public.tetris_scores (score desc, updated_at asc);
alter table public.tetris_scores enable row level security;
revoke all on public.tetris_scores from anon, authenticated;
grant select, insert, update on public.tetris_scores to service_role;

create or replace function public.save_tetris_score(p_email text, p_display_name text, p_score integer)
returns void language plpgsql security invoker set search_path = public as $$
begin
  insert into public.tetris_scores (email, display_name, score)
  values (lower(trim(p_email)), trim(p_display_name), p_score)
  on conflict (email) do update
    set score = excluded.score,
        display_name = excluded.display_name,
        updated_at = now()
    where excluded.score > tetris_scores.score;
end;
$$;
revoke all on function public.save_tetris_score(text, text, integer) from public, anon, authenticated;
grant execute on function public.save_tetris_score(text, text, integer) to service_role;

create table if not exists public.contact_message_attempts (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);
create index if not exists contact_message_attempts_lookup_idx on public.contact_message_attempts (ip_hash, created_at desc);
alter table public.contact_message_attempts enable row level security;
revoke all on public.contact_message_attempts from anon, authenticated;
grant select, insert on public.contact_message_attempts to service_role;
grant usage, select on sequence public.contact_message_attempts_id_seq to service_role;

create or replace function public.reserve_contact_message(p_ip_hash text)
returns boolean language plpgsql security invoker set search_path = public as $$
begin
  perform pg_advisory_xact_lock(hashtextextended(p_ip_hash, 0));
  if (select count(*) from public.contact_message_attempts
      where ip_hash = p_ip_hash and created_at > now() - interval '1 hour') >= 3 then
    return false;
  end if;
  insert into public.contact_message_attempts (ip_hash) values (p_ip_hash);
  return true;
end;
$$;
revoke all on function public.reserve_contact_message(text) from public, anon, authenticated;
grant execute on function public.reserve_contact_message(text) to service_role;

-- Optional periodic cleanup: delete from public.contact_message_attempts where created_at < now() - interval '1 day';
