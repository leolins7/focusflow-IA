# Focus Flow ✅

Sistema de gerenciamento de tarefas (to-do list) com autenticação, persistência em
banco de dados e dashboard de progresso — projeto da atividade de Vibe Coding.

## Stack
- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Supabase (Postgres + Auth + RLS)
- **Deploy:** Vercel

## Funcionalidades
- Cadastro/login de usuário (e-mail + senha) via Supabase Auth
- CRUD de tarefas: título, descrição, categoria, prioridade, data e status
- Dashboard com estatísticas (total, pendentes, em andamento, concluídas) e barra de progresso
- Row Level Security: cada usuário só acessa suas próprias tarefas
- Filtro de tarefas por status

## Como rodar localmente

1. Crie um projeto em https://supabase.com (gratuito).
2. No painel do Supabase, vá em **SQL Editor** e rode o conteúdo do arquivo
   `supabase_schema.sql` (cria a tabela `tasks`, políticas de RLS e triggers).
3. Em **Project Settings > API**, copie a `Project URL` e a `anon public key`.
4. Copie `.env.example` para `.env` e cole esses valores:
   ```
   VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
   ```
5. Instale as dependências e rode o projeto:
   ```bash
   npm install
   npm run dev
   ```

## Deploy (Bolt.new + Vercel)
1. Suba este código para um repositório no GitHub.
2. Importe o repositório no **Bolt.new** (ou abra direto na Vercel).
3. Na Vercel, em **Settings > Environment Variables**, adicione as mesmas
   variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
4. Clique em **Deploy**. A Vercel detecta automaticamente o projeto Vite
   (build command: `npm run build`, output dir: `dist`).

## Estrutura de pastas
```
src/
  components/    -> StatsCards, NewTaskForm, TaskList
  lib/            -> supabase client, AuthContext, useTasks hook, types
  pages/          -> AuthPage (login/cadastro), Dashboard
supabase_schema.sql -> script SQL para criar a tabela e políticas
```
