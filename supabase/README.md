# Scripts SQL do Supabase - Guia Lafaiete v2.0.0

**Autor:** Vinícius Bastos ([https://midias.me](https://midias.me))  
**Data:** 24/11/2024 11:41 UTC-03:00

## 📋 Ordem de Execução

Execute os scripts SQL no seu projeto Supabase **na seguinte ordem**:

### 1. `001_initial_schema.sql` ⚠️ EXECUTE PRIMEIRO
Cria toda a estrutura do banco de dados:
- Tabelas principais
- Índices
- Triggers
- Funções

### 2. `002_rls_policies.sql`
Configura as políticas de Row Level Security (RLS):
- Habilita RLS em todas as tabelas
- Define políticas de acesso
- Separa permissões de usuários e admins

### 3. `003_storage_buckets.sql`
Configura os buckets de storage:
- Cria buckets públicos
- Define políticas de upload/download
- Configura permissões de acesso

### 4. `004_seed_data.sql`
Insere dados iniciais:
- Cidades da região
- Categorias padrão
- Tags de usuários
- Configurações de API

### 5. `005_create_first_admin.sql` ⚠️ EXECUTE POR ÚLTIMO
Cria o primeiro usuário administrador:
- **IMPORTANTE**: Execute APÓS criar o usuário via interface do Supabase
- Edite o script com o UUID e dados do usuário
- Transforma o usuário em admin

## 🔐 Segurança

Todos os scripts implementam:
- ✅ Row Level Security (RLS)
- ✅ Políticas de acesso granulares
- ✅ Separação de permissões (usuário/admin)
- ✅ Proteção contra SQL injection
- ✅ Validação de dados

## 🚀 Como Executar

### Passo 1: Executar Scripts de Estrutura
1. Acesse o painel do Supabase: https://rihcfdnvujmkhmcaanon.supabase.co
2. Vá em **SQL Editor** (ícone de código no menu lateral)
3. Clique em **New Query**
4. Cole e execute os scripts **NA ORDEM**:
   - ✅ `001_initial_schema.sql` (cria tabelas)
   - ✅ `002_rls_policies.sql` (segurança)
   - ✅ `003_storage_buckets.sql` (storage)
   - ✅ `004_seed_data.sql` (dados iniciais)

### Passo 2: Criar Primeiro Admin
1. Vá em **Authentication** > **Users**
2. Clique em **Add User** ou **Invite User**
3. Preencha:
   - Email: seu@email.com
   - Password: sua_senha_segura
   - ✅ Marque "Auto Confirm User"
4. Clique em **Create User**
5. **COPIE O UUID** do usuário criado (aparece na lista)
6. Volte ao **SQL Editor**
7. Abra o script `005_create_first_admin.sql`
8. **EDITE** as linhas:
   ```sql
   admin_user_id UUID := 'COLE_O_UUID_AQUI';
   admin_email VARCHAR := 'seu@email.com';
   admin_name VARCHAR := 'Seu Nome';
   ```
9. Execute o script
10. Verifique se apareceu "Usuário admin criado com sucesso"

## 📊 Estrutura do Banco

### Tabelas Principais
- `cities` - Cidades da região
- `users` - Usuários do sistema
- `events` - Eventos
- `companies` - Empresas
- `profiles` - Influenciadores e músicos
- `banners` - Banners publicitários
- `giveaways` - Sorteios

### Tabelas de Suporte
- `event_categories` - Categorias de eventos
- `company_categories` - Categorias de empresas
- `profile_categories` - Categorias de perfis
- `user_tags` - Tags para CRM
- `suggestions` - Sugestões de usuários
- `chat_messages` - Chat interno
- `user_notifications` - Notificações

### Tabelas de Analytics
- `banner_views` - Visualizações de banners
- `banner_clicks` - Cliques em banners
- `crm_activity_logs` - Logs de atividades do CRM
- `whatsapp_messages` - Histórico WhatsApp

## 🔄 Atualizações

Para atualizar o schema:
1. Crie um novo arquivo de migração
2. Nomeie como `00X_description.sql`
3. Execute no Supabase

## 📝 Notas

- Todos os IDs são UUID v4
- Timestamps em UTC
- Soft delete não implementado (usar `is_active`)
- Triggers automáticos para `updated_at`

## ⚠️ Importante

### Ordem Correta de Execução
**NUNCA** tente criar usuário admin antes de executar os scripts de estrutura!

**Ordem correta:**
1. ✅ Execute `001_initial_schema.sql` (cria tabelas)
2. ✅ Execute `002_rls_policies.sql` (segurança)
3. ✅ Execute `003_storage_buckets.sql` (storage)
4. ✅ Execute `004_seed_data.sql` (dados)
5. ✅ Crie usuário via **Authentication > Users**
6. ✅ Execute `005_create_first_admin.sql` (torna admin)

### Verificações Pós-Instalação
- ✅ Verifique se o RLS está habilitado em todas as tabelas
- ✅ Teste login com o usuário admin criado
- ✅ Verifique se consegue acessar `/admin` no frontend
- ✅ Configure as chaves de API no painel admin
