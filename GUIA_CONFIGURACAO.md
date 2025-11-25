# 📖 Guia de Configuração - Guia Lafaiete v2.0.0

**Autor:** Vinícius Bastos ([https://midias.me](https://midias.me))  
**Data:** 24/11/2024

---

## 🎯 Passo a Passo Completo

### 1️⃣ Clonar e Instalar

```bash
# Clone o repositório
git clone <repository-url>
cd guia-lafaiete

# Instalar dependências
npm install
```

### 2️⃣ Configurar Supabase

#### 2.1 Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Preencha:
   - **Name:** Guia Lafaiete
   - **Database Password:** (escolha uma senha forte)
   - **Region:** South America (São Paulo)
5. Aguarde a criação do projeto (2-3 minutos)

#### 2.2 Executar Migrations SQL

1. No painel do Supabase, vá em **SQL Editor**
2. Execute os scripts na ordem:

**Script 1: 001_initial_schema.sql**
```sql
-- Copie e cole o conteúdo do arquivo
-- Clique em "Run"
```

**Script 2: 002_rls_policies.sql**
```sql
-- Copie e cole o conteúdo do arquivo
-- Clique em "Run"
```

**Script 3: 003_storage_buckets.sql**
```sql
-- Copie e cole o conteúdo do arquivo
-- Clique em "Run"
```

**Script 4: 004_seed_data.sql**
```sql
-- Copie e cole o conteúdo do arquivo
-- Clique em "Run"
```

#### 2.3 Criar Primeiro Usuário Admin

1. Vá em **Authentication > Users**
2. Clique em "Add User" > "Create new user"
3. Preencha:
   - **Email:** seu@email.com
   - **Password:** (escolha uma senha)
   - **Auto Confirm User:** ✅ Marque esta opção
4. Clique em "Create User"
5. **COPIE O UUID** do usuário criado (aparece na coluna ID)

6. Edite o arquivo `supabase/005_create_first_admin.sql`:
```sql
admin_user_id UUID := 'COLE_O_UUID_AQUI';
admin_email VARCHAR := 'seu@email.com';
admin_name VARCHAR := 'Seu Nome';
```

7. Execute o script no SQL Editor

#### 2.4 Obter Credenciais do Supabase

1. Vá em **Settings > API**
2. Copie:
   - **Project URL** (ex: https://xxx.supabase.co)
   - **anon public** key (chave longa começando com eyJ...)

### 3️⃣ Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env
```

Edite o arquivo `.env`:

```env
# Supabase (OBRIGATÓRIO)
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...sua_chave_aqui

# APIs de IA (OPCIONAL - pode configurar depois)
VITE_OPENAI_API_KEY=sk-...
VITE_GEMINI_API_KEY=AIza...
VITE_GROQ_API_KEY=gsk_...
VITE_EVOLUTION_API_KEY=...
```

### 4️⃣ Executar o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Acessar em: http://localhost:3000
```

### 5️⃣ Fazer Login

1. Acesse `http://localhost:3000/login`
2. Use o email e senha do usuário admin criado
3. Você será redirecionado para `/admin/dashboard`

---

## 🔑 Configurar Integrações de IA (Opcional)

### OpenAI (ChatGPT)

1. Acesse [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Faça login ou crie uma conta
3. Clique em "Create new secret key"
4. Copie a chave (começa com `sk-`)
5. Cole em `VITE_OPENAI_API_KEY` no arquivo `.env`

### Google Gemini

1. Acesse [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Get API Key" ou "Create API Key"
4. Copie a chave (começa com `AIza`)
5. Cole em `VITE_GEMINI_API_KEY` no arquivo `.env`

### Groq (Whisper)

1. Acesse [https://console.groq.com](https://console.groq.com)
2. Crie uma conta ou faça login
3. Vá em "API Keys"
4. Clique em "Create API Key"
5. Copie a chave (começa com `gsk_`)
6. Cole em `VITE_GROQ_API_KEY` no arquivo `.env`

### Evolution API (WhatsApp)

1. Configure sua instância Evolution API
2. Obtenha a URL da API e a chave
3. Configure no arquivo `.env`:
```env
VITE_EVOLUTION_API_URL=https://sua-api.com
VITE_EVOLUTION_API_KEY=sua_chave
VITE_EVOLUTION_INSTANCE_NAME=nome_da_instancia
```

---

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

- **cities** - Cidades da região
- **users** - Usuários do sistema
- **events** - Eventos
- **companies** - Empresas
- **profiles** - Perfis (influenciadores/músicos)
- **giveaways** - Sorteios
- **banners** - Banners publicitários
- **company_categories** - Categorias de empresas

### Tabelas CRM

- **chat_messages** - Mensagens do chat
- **user_notifications** - Notificações
- **whatsapp_messages** - Mensagens WhatsApp
- **crm_activity_logs** - Logs de atividades

### Tabelas de Configuração

- **api_settings** - Configurações de API
- **user_tags** - Tags de usuários

---

## 🚀 Deploy em Produção

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer deploy
vercel

# Configurar variáveis de ambiente
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
# ... adicione todas as variáveis

# Deploy em produção
vercel --prod
```

### Netlify

1. Faça build do projeto:
```bash
npm run build
```

2. Acesse [https://app.netlify.com](https://app.netlify.com)
3. Arraste a pasta `dist/` para fazer upload
4. Configure as variáveis de ambiente em **Site settings > Environment variables**

---

## 🔧 Solução de Problemas

### Erro: "Invalid API key"

- Verifique se as credenciais do Supabase estão corretas
- Certifique-se de usar a chave **anon public**, não a service_role

### Erro: "Table does not exist"

- Execute todas as migrations SQL na ordem correta
- Verifique se não houve erros ao executar os scripts

### Erro: "Access denied"

- Verifique se o usuário foi criado corretamente no Supabase Auth
- Execute o script `005_create_first_admin.sql` com o UUID correto

### Erro de TypeScript

- Os erros de tipo são temporários e desaparecem após conectar ao Supabase
- Execute `npm run build` para verificar se há erros reais

---

## 📞 Suporte

Para dúvidas ou problemas:
- **Email:** contato via [https://midias.me](https://midias.me)
- **Documentação:** Veja `PROGRESSO.md` e `README.md`

---

**Desenvolvido com ❤️ por Vinícius Bastos**
