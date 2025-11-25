# 🚀 Guia de Instalação - Guia Lafaiete v2.0.0

**Autor:** Vinícius Bastos ([https://midias.me](https://midias.me))  
**Data:** 24/11/2024

## ⚠️ Pré-requisitos

- ✅ Node.js 18+ instalado
- ✅ Conta no Supabase
- ✅ Git (opcional)

## 📦 Passo 1: Instalar Node.js

Se você ainda não tem o Node.js instalado:

1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS** (recomendada)
3. Execute o instalador
4. Reinicie o terminal/PowerShell
5. Verifique a instalação:
```powershell
node --version
npm --version
```

## 🗄️ Passo 2: Configurar Banco de Dados Supabase

### 2.1. Acessar o Projeto
1. Acesse: https://rihcfdnvujmkhmcaanon.supabase.co
2. Faça login com suas credenciais

### 2.2. Executar Scripts SQL (NA ORDEM!)

**⚠️ IMPORTANTE: Execute na ordem exata abaixo!**

#### Script 1: Estrutura do Banco
1. Vá em **SQL Editor** (ícone `</>` no menu lateral)
2. Clique em **New Query**
3. Abra o arquivo: `supabase/001_initial_schema.sql`
4. Copie todo o conteúdo
5. Cole no SQL Editor
6. Clique em **RUN** (ou pressione Ctrl+Enter)
7. ✅ Aguarde mensagem de sucesso

#### Script 2: Políticas de Segurança
1. **New Query** novamente
2. Abra: `supabase/002_rls_policies.sql`
3. Copie e cole
4. **RUN**
5. ✅ Aguarde sucesso

#### Script 3: Storage
1. **New Query**
2. Abra: `supabase/003_storage_buckets.sql`
3. Copie e cole
4. **RUN**
5. ✅ Aguarde sucesso

#### Script 4: Dados Iniciais
1. **New Query**
2. Abra: `supabase/004_seed_data.sql`
3. Copie e cole
4. **RUN**
5. ✅ Aguarde sucesso

### 2.3. Criar Primeiro Usuário Admin

#### Criar Usuário no Supabase Auth
1. Vá em **Authentication** > **Users** (ícone de usuário no menu)
2. Clique em **Add User**
3. Preencha:
   - **Email**: seu@email.com (use seu email real)
   - **Password**: Crie uma senha forte
   - ✅ **Marque**: "Auto Confirm User"
4. Clique em **Create User**
5. **IMPORTANTE**: Copie o **UUID** do usuário (coluna `id`)
   - Exemplo: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

#### Transformar em Admin
1. Volte ao **SQL Editor**
2. **New Query**
3. Abra: `supabase/005_create_first_admin.sql`
4. **EDITE** as linhas 17-19:
```sql
admin_user_id UUID := 'COLE_O_UUID_COPIADO_AQUI';
admin_email VARCHAR := 'seu@email.com'; -- Mesmo email usado acima
admin_name VARCHAR := 'Seu Nome Completo';
```
5. **RUN**
6. ✅ Deve aparecer: "Usuário admin criado com sucesso"

### 2.4. Verificar Instalação
Execute no SQL Editor:
```sql
-- Verificar se admin foi criado
SELECT id, name, email, is_admin FROM users WHERE is_admin = true;

-- Verificar tabelas criadas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Verificar dados iniciais
SELECT COUNT(*) as total_cidades FROM cities;
SELECT COUNT(*) as total_categorias_eventos FROM event_categories;
```

## 💻 Passo 3: Instalar Dependências do Frontend

```powershell
# Navegar até a pasta do projeto
cd C:\Users\Cliente\CascadeProjects\guia-lafaiete

# Instalar dependências
npm install

# Aguardar instalação (pode demorar alguns minutos)
```

## ⚙️ Passo 4: Configurar Variáveis de Ambiente

O arquivo `.env` já está configurado com as credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://rihcfdnvujmkhmcaanon.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Opcional**: Configure as APIs de IA (pode fazer depois via painel admin):
```env
VITE_OPENAI_API_KEY=sua_chave_openai
VITE_GEMINI_API_KEY=sua_chave_gemini
VITE_EVOLUTION_API_URL=url_evolution_api
```

## 🚀 Passo 5: Executar o Projeto

```powershell
# Iniciar servidor de desenvolvimento
npm run dev
```

O projeto abrirá automaticamente em: http://localhost:3000

## ✅ Passo 6: Testar a Instalação

### 6.1. Testar Login
1. Acesse: http://localhost:3000/login
2. Use o email e senha do admin criado
3. Clique em **Entrar**
4. ✅ Deve redirecionar para a home

### 6.2. Testar Painel Admin
1. Clique em **Admin** no menu
2. ✅ Deve abrir: http://localhost:3000/admin/dashboard
3. Verifique se vê o painel administrativo

### 6.3. Testar Páginas Públicas
- ✅ Home: http://localhost:3000
- ✅ Eventos: http://localhost:3000/eventos
- ✅ Empresas: http://localhost:3000/empresas
- ✅ Influenciadores: http://localhost:3000/influenciadores
- ✅ Músicos: http://localhost:3000/musicos
- ✅ Sorteios: http://localhost:3000/sorteios

## 🐛 Solução de Problemas

### Erro: "relation users does not exist"
**Causa**: Tentou criar admin antes de executar os scripts SQL  
**Solução**: Execute os scripts na ordem correta (Passo 2.2)

### Erro: "npm não é reconhecido"
**Causa**: Node.js não instalado ou não está no PATH  
**Solução**: Instale o Node.js e reinicie o terminal

### Erro ao fazer login
**Causa**: Usuário não foi criado corretamente  
**Solução**: Verifique no Supabase se o usuário existe e está confirmado

### Página admin retorna para home
**Causa**: Usuário não é admin  
**Solução**: Execute o script `005_create_first_admin.sql` corretamente

### Erro de CORS no Supabase
**Causa**: URL do site não está nas configurações  
**Solução**: 
1. Vá em **Settings** > **API**
2. Em **Site URL**, adicione: `http://localhost:3000`

## 📚 Próximos Passos

Após a instalação bem-sucedida:

1. ✅ Configure as chaves de API no painel admin
2. ✅ Adicione categorias personalizadas
3. ✅ Cadastre os primeiros eventos
4. ✅ Cadastre empresas locais
5. ✅ Configure banners publicitários
6. ✅ Teste o sistema de sorteios
7. ✅ Configure o chat interno
8. ✅ Integre o WhatsApp (Evolution API)

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs do navegador (F12 > Console)
2. Verifique os logs do terminal
3. Consulte a documentação do Supabase
4. Entre em contato: https://midias.me

---

**Desenvolvido por Vinícius Bastos** | [https://midias.me](https://midias.me)
