# 📋 Lista de Tarefas
 
Uma aplicação de lista de tarefas (To-Do List) full-stack, construída para praticar autenticação, banco de dados relacional e políticas de segurança em nível de linha (RLS) em um cenário real de aplicação web.
 
Cada usuário tem sua própria lista de tarefas, protegida por autenticação — os dados de um usuário nunca são visíveis para outro, graças ao Row Level Security do PostgreSQL.
 
🔗 **[Link](https://desafio-to-do-list-ecru.vercel.app/)**

 
---
 
## ✨ Funcionalidades
 
- 🔐 **Autenticação sem senha** via Magic Link (login por e-mail)
- ✅ **Criar tarefas** e vê-las na lista instantaneamente, sem precisar recarregar a página
- ☑️ **Marcar tarefas como concluídas**, com atualização visual e persistência no banco
- 🔒 **Isolamento de dados por usuário** — cada pessoa só acessa suas próprias tarefas
- 📊 **Barra de progresso** mostrando quantas tarefas já foram concluídas
---
 
## 🛠️ Tecnologias utilizadas
 
| Camada | Tecnologia |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Linguagem | TypeScript |
| UI | React + Tailwind CSS |
| Backend / Banco de dados | [Supabase](https://supabase.com/) (PostgreSQL) |
| Autenticação | Supabase Auth (Magic Link) |
| Segurança de dados | Row Level Security (RLS) do PostgreSQL |
| Deploy | Vercel |
 
---
 
### Segurança com Row Level Security (RLS)
 
Em vez de filtrar tarefas por usuário manualmente no código da aplicação, a segurança é garantida diretamente no banco de dados. Políticas de RLS garantem que:
 
- Um usuário só **vê** as próprias tarefas (`select`)
- Um usuário só **cria** tarefas vinculadas ao próprio `user_id` (`insert`)
- Um usuário só **atualiza** as próprias tarefas (`update`)
 
Isso significa que, mesmo que alguém tente manipular requisições diretamente pela API, o banco de dados nunca vai devolver ou aceitar dados de outro usuário.
 
### Autenticação
 
O login é feito via **Magic Link**: o usuário informa o e-mail, recebe um link por e-mail e, ao clicar, é autenticado automaticamente — sem necessidade de senha.
 
### Atualização em tempo real da interface
 
Ao criar uma tarefa, ela aparece imediatamente na lista, sem precisar recarregar a página. Isso é feito atualizando o estado local do React assim que a resposta do banco de dados confirma a criação — evitando a sensação de "cliquei e nada aconteceu".
 
---
 
## 📁 Estrutura do projeto
 
```
app/
├── login/
│   └── page.tsx        # Tela de login (Magic Link)
├── tarefas/
│   └── page.tsx         # Tela principal com a lista de tarefas
└── globals.css           # Estilos globais (Tailwind)
lib/
└── supabaseClient.ts     # Instância do cliente Supabase
```
 
---
 
 
## 👩‍💻 Autora
 
Desenvolvido por **Júlia Soares** como parte de um desafio.
 
- Portfólio: [juliasoares.dev](https://juliasoares.dev)
- LinkedIn: https://www.linkedin.com/in/juliasvgomes/
 
