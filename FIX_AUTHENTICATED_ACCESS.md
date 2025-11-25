# 🔧 FIX: Dados Não Carregam Quando Logado - Guia Lafaiete v2.0.0
**Autor:** Vinícius Bastos (https://midias.me)  
**Data:** 25/11/2025 07:52

---

## ⚠️ Problema

Quando o usuário faz **login**, os dados das tabelas (eventos, empresas, perfis) **não carregam**.

Quando está **deslogado**, os dados carregam normalmente.

---

## 🎯 Causa

As **políticas RLS (Row Level Security)** do Supabase só permitem acesso para usuários **anônimos** (role `anon`).

Quando você faz login, o contexto muda para role `authenticated`, e as políticas atuais **não cobrem** usuários autenticados.

### Políticas Atuais (Problema):
```sql
-- ❌ Só permite role 'anon' (usuários deslogados)
CREATE POLICY "Public read access to active events" 
ON events FOR SELECT 
USING (is_active = true);
```

### O Que Precisamos:
```sql
-- ✅ Permitir TAMBÉM role 'authenticated' (usuários logados)
CREATE POLICY "Authenticated users can read active events" 
ON events FOR SELECT 
TO authenticated
USING (is_active = true);
```

---

## ✅ SOLUÇÃO - Aplicar Script SQL no Supabase

### Passo 1: Acesse o Supabase Dashboard

1. Vá para: https://supabase.com/dashboard
2. Selecione o projeto: **guia-lafaiete**
3. No menu lateral, clique em **SQL Editor**

---

### Passo 2: Execute o Script de Correção

1. Clique em **"New query"**
2. Cole o conteúdo do arquivo: `supabase/007_fix_authenticated_access.sql`
3. Clique em **"Run"** ou pressione `Ctrl + Enter`

**OU**

Copie e cole este script diretamente:

```sql
-- Eventos
CREATE POLICY "Authenticated users can read active events" 
ON events FOR SELECT TO authenticated
USING (is_active = true);

-- Empresas
CREATE POLICY "Authenticated users can read active companies" 
ON companies FOR SELECT TO authenticated
USING (is_active = true);

-- Perfis
CREATE POLICY "Authenticated users can read active profiles" 
ON profiles FOR SELECT TO authenticated
USING (is_active = true);

-- Sorteios
CREATE POLICY "Authenticated users can read published giveaways" 
ON giveaways FOR SELECT TO authenticated
USING (is_published = true);

-- Banners
CREATE POLICY "Authenticated users can read active banners" 
ON banners FOR SELECT TO authenticated
USING (is_active = true);

-- Cidades
CREATE POLICY "Authenticated users can read cities" 
ON cities FOR SELECT TO authenticated
USING (true);

-- Categorias
CREATE POLICY "Authenticated users can read event_categories" 
ON event_categories FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated users can read company_categories" 
ON company_categories FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated users can read profile_categories" 
ON profile_categories FOR SELECT TO authenticated
USING (true);
```

---

### Passo 3: Verificar se Funcionou

1. **Faça logout** do site
2. **Faça login** novamente
3. **Teste as páginas:**
   - `/eventos` - Deve carregar a lista
   - `/empresas` - Deve carregar a lista
   - `/perfis` - Deve carregar a lista

4. **Abra o Console (F12)** e verifique:
   - ✅ Sem erros de query
   - ✅ Dados carregando normalmente

---

## 🔍 Como Diagnosticar o Problema

### No Console do Navegador (F12):

#### ❌ Erro (Antes do Fix):
```javascript
// Supabase retorna array vazio ou erro de permissão
{
  data: [],
  error: null,
  count: 0
}

// Ou erro de RLS:
{
  error: {
    message: "new row violates row-level security policy",
    code: "42501"
  }
}
```

#### ✅ Sucesso (Depois do Fix):
```javascript
{
  data: [
    { id: '...', title: 'Evento 1', ... },
    { id: '...', title: 'Evento 2', ... }
  ],
  error: null,
  count: 10
}
```

---

## 🧪 Testar Políticas no Supabase

No **SQL Editor** do Supabase, execute:

```sql
-- Ver todas as políticas de uma tabela
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  roles, 
  cmd, 
  qual
FROM pg_policies
WHERE tablename = 'events'
ORDER BY policyname;
```

**Você deve ver:**
- ✅ `Public read access to active events` (para role public/anon)
- ✅ `Authenticated users can read active events` (para role authenticated)
- ✅ `Admins can manage all events` (para admins)

---

## 📊 Entendendo Roles no Supabase

| Role | Quando é usado | Exemplo |
|------|----------------|---------|
| `anon` | Usuário NÃO logado | Visitante do site |
| `authenticated` | Usuário logado | Após fazer login |
| `service_role` | Backend/Admin total | APIs internas |

**Por isso precisa de políticas para AMBOS `anon` E `authenticated`!**

---

## 🔧 Alternativa: Desabilitar RLS (NÃO RECOMENDADO)

**Apenas para teste/debug:**

```sql
-- ⚠️ CUIDADO: Isso remove toda a segurança!
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
```

**NÃO use em produção!** Sempre mantenha RLS habilitado e configure políticas corretas.

---

## 📝 Checklist

- [ ] Script SQL executado no Supabase
- [ ] Sem erros ao executar o script
- [ ] Logout e login no site
- [ ] Dados carregam quando logado
- [ ] Console (F12) sem erros
- [ ] Políticas verificadas no SQL Editor

---

## 🆘 Se Ainda Não Funcionar

### 1. Verificar se as políticas foram criadas:

```sql
SELECT policyname, roles 
FROM pg_policies 
WHERE tablename = 'events';
```

### 2. Verificar token de autenticação:

No Console (F12):

```javascript
// Ver sessão atual
const { data: { session } } = await supabase.auth.getSession()
console.log('Session:', session)
console.log('User role:', session?.user?.role)
```

Deve mostrar `role: 'authenticated'`

### 3. Limpar cache e localStorage:

```javascript
// No Console (F12)
localStorage.clear()
sessionStorage.clear()
location.reload()
```

### 4. Verificar logs do Supabase:

No Dashboard Supabase:
- **Logs** → **API Logs**
- Procure por erros 403 ou 42501 (RLS violation)

---

## 📚 Referências

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Policies](https://www.postgresql.org/docs/current/sql-createpolicy.html)

---

## 🎯 Resultado Esperado

Após aplicar o script:

```
✅ Deslogado: Dados carregam (role anon)
✅ Logado: Dados carregam (role authenticated)
✅ Admin: Pode gerenciar dados (role authenticated + is_admin)
```

---

**Projeto:** Guia Lafaiete v2.0.0  
**Autor:** Vinícius Bastos  
**Site:** https://midias.me
