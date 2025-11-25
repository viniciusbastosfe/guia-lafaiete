# 🔧 Troubleshooting - Guia Lafaiete

## Problema: Conteúdos não aparecem no site

### 1️⃣ Verificar se os dados foram inseridos no banco

**Passo 1:** Acesse o Supabase Dashboard
- URL: https://supabase.com/dashboard
- Vá em **Table Editor**

**Passo 2:** Verifique cada tabela:
- ✅ `events` - Deve ter 10 registros
- ✅ `companies` - Deve ter 10 registros
- ✅ `profiles` - Deve ter 10 registros
- ✅ `giveaways` - Deve ter 10 registros
- ✅ `banners` - Deve ter 10 registros

**Se NÃO tiver dados:**
1. Vá em **SQL Editor**
2. Copie o conteúdo do arquivo `supabase/006_seed_sample_data.sql`
3. Cole e clique em **Run**

---

### 2️⃣ Verificar Políticas RLS (Row Level Security)

**Problema:** As políticas RLS podem estar bloqueando o acesso público aos dados.

**Solução:**

Execute no SQL Editor do Supabase:

```sql
-- Permitir leitura pública de eventos
CREATE POLICY "Allow public read events"
ON events FOR SELECT
TO public
USING (is_active = true);

-- Permitir leitura pública de empresas
CREATE POLICY "Allow public read companies"
ON companies FOR SELECT
TO public
USING (is_active = true);

-- Permitir leitura pública de perfis
CREATE POLICY "Allow public read profiles"
ON profiles FOR SELECT
TO public
USING (is_active = true);

-- Permitir leitura pública de sorteios
CREATE POLICY "Allow public read giveaways"
ON giveaways FOR SELECT
TO public
USING (is_published = true);

-- Permitir leitura pública de banners
CREATE POLICY "Allow public read banners"
ON banners FOR SELECT
TO public
USING (is_active = true);

-- Permitir leitura pública de cidades
CREATE POLICY "Allow public read cities"
ON cities FOR SELECT
TO public
USING (true);

-- Permitir leitura pública de categorias
CREATE POLICY "Allow public read categories"
ON company_categories FOR SELECT
TO public
USING (true);
```

---

### 3️⃣ Verificar Console do Navegador

**Passo 1:** Abra o site
- URL: http://localhost:3000

**Passo 2:** Abra o DevTools
- Pressione `F12` ou `Ctrl+Shift+I`

**Passo 3:** Vá na aba **Console**
- Procure por erros em vermelho
- Erros comuns:
  - `401 Unauthorized` → Problema com RLS
  - `404 Not Found` → Tabela não existe
  - `Network Error` → Problema de conexão

---

### 4️⃣ Testar Conexão Diretamente

**Opção 1: Usar o arquivo de teste**
1. Abra o arquivo `test-data.html` no navegador
2. Veja se mostra os dados ou erros

**Opção 2: Testar no Console do Navegador**
```javascript
// Cole isso no console do navegador (F12)
const { createClient } = supabase
const client = createClient(
  'https://rihcfdnvujmkhmcaanon.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaGNmZG52dWpta2htY2Fhbm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NTk4MTksImV4cCI6MjA3OTUzNTgxOX0.jPbN-oS8mZ3kSUbGvVKJF773i86MIcdIyyd7DaAHFYI'
)

// Testar eventos
const { data, error } = await client.from('events').select('*').limit(5)
console.log('Eventos:', data, error)
```

---

### 5️⃣ Verificar Arquivo .env

**Verifique se o arquivo `.env` existe e está correto:**

```env
VITE_SUPABASE_URL=https://rihcfdnvujmkhmcaanon.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Se alterou o .env:**
1. Pare o servidor (`Ctrl+C`)
2. Reinicie: `npm run dev`

---

### 6️⃣ Limpar Cache

**Limpar cache do navegador:**
1. Pressione `Ctrl+Shift+Delete`
2. Selecione "Cache" e "Cookies"
3. Clique em "Limpar dados"
4. Recarregue a página (`Ctrl+F5`)

**Limpar cache do Vite:**
```bash
# Parar o servidor
# Deletar cache
rm -rf node_modules/.vite

# Reiniciar
npm run dev
```

---

### 7️⃣ Verificar Migrations

**Certifique-se que executou TODOS os scripts SQL na ordem:**

1. ✅ `001_initial_schema.sql` - Criar tabelas
2. ✅ `002_rls_policies.sql` - Políticas de segurança
3. ✅ `003_storage_buckets.sql` - Storage
4. ✅ `004_seed_data.sql` - Dados iniciais (cidades, categorias)
5. ✅ `005_create_first_admin.sql` - Criar admin
6. ✅ `006_seed_sample_data.sql` - Dados de exemplo

---

### 8️⃣ Checklist Rápido

- [ ] Dados inseridos no banco (verificar no Table Editor)
- [ ] Políticas RLS configuradas (script acima)
- [ ] Arquivo .env configurado
- [ ] Servidor reiniciado após alterar .env
- [ ] Console do navegador sem erros
- [ ] Cache limpo
- [ ] Todas as migrations executadas

---

### 9️⃣ Teste Manual no Supabase

**No SQL Editor, execute:**

```sql
-- Contar registros
SELECT 'events' as tabela, COUNT(*) as total FROM events
UNION ALL
SELECT 'companies', COUNT(*) FROM companies
UNION ALL
SELECT 'profiles', COUNT(*) FROM profiles
UNION ALL
SELECT 'giveaways', COUNT(*) FROM giveaways
UNION ALL
SELECT 'banners', COUNT(*) FROM banners;

-- Ver eventos ativos
SELECT id, title, is_active FROM events WHERE is_active = true;

-- Ver empresas ativas
SELECT id, name, is_active FROM companies WHERE is_active = true;
```

**Resultado esperado:**
- events: 10
- companies: 10
- profiles: 10
- giveaways: 10
- banners: 10

---

### 🆘 Ainda não funciona?

**Envie as seguintes informações:**

1. **Screenshot do Table Editor** mostrando as tabelas
2. **Erros do Console** (F12 → Console)
3. **Resultado do teste SQL** acima
4. **URL que não está funcionando** (ex: /eventos, /empresas)

---

**Desenvolvido com ❤️ por Vinícius Bastos**
