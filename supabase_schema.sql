-- Focus Flow — Schema do banco de dados (Supabase / Postgres)
-- Cole este script no SQL Editor do Supabase (Project > SQL Editor > New query)

-- 1. Tabela de tarefas
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  category text not null default 'geral', -- ex: estudo, trabalho, pessoal
  priority text not null default 'media', -- baixa | media | alta
  status text not null default 'pendente', -- pendente | em_andamento | concluida
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Habilitar Row Level Security (RLS)
alter table public.tasks enable row level security;

-- 3. Políticas: cada usuário só vê/edita suas próprias tarefas
create policy "Usuários podem ver suas próprias tarefas"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "Usuários podem inserir suas próprias tarefas"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem atualizar suas próprias tarefas"
  on public.tasks for update
  using (auth.uid() = user_id);

create policy "Usuários podem deletar suas próprias tarefas"
  on public.tasks for delete
  using (auth.uid() = user_id);

-- 4. Trigger para atualizar "updated_at" automaticamente
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger tasks_updated_at
  before update on public.tasks
  for each row
  execute function public.handle_updated_at();

-- 5. Índices para melhorar performance das consultas do dashboard
create index if not exists tasks_user_id_idx on public.tasks(user_id);
create index if not exists tasks_status_idx on public.tasks(status);
