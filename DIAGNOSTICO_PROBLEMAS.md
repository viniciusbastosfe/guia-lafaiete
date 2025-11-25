# 🔍 Diagnóstico: Conteúdos e Logout - Guia Lafaiete v2.0.0
**Autor:** Vinícius Bastos (https://midias.me)  
**Data:** 25/11/2025 08:16

---

## ⚠️ Problemas Reportados

1. **Conteúdos não carregam quando logado**
2. **Botão "Sair" não funciona**

---

## 🔍 DIAGNÓSTICO PASSO A PASSO

### PROBLEMA 1: Conteúdos Não Carregam

#### Teste 1: Verificar Console (F12)

1. **Faça login no site**
2. **Abra Console (F12)**
3. **Procure por mensagens:**

```javascript
🔐 Auth Status: {
  isAuthenticated: true,
  userId: "...",
  role: "authenticated",  // ← DEVE mostrar "authenticated"
  email: "seu@email.com"
}
```

4. **Vá para /eventos ou /empresas**
5. **Procure por erros:**

#### ❌ SE APARECER ESTE ERRO:
```javascript
{
  error: {
    message: "new row violates row-level security policy",
    code: "42501"
  }
}

// OU

{
  data: [],
  error: null,
  count: 0  // ← Array vazio
}
```

**CAUSA:** Políticas RLS não foram aplicadas no Supabase!

#### ✅ SOLUÇÃO: Executar Script SQL no Supabase

**VOCÊ PRECISA FAZER ISSO MANUALMENTE:**

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Clique em **"New query"**
5. Cole este script:

```sql
-- POLÍTICAS RLS PARA USUÁRIOS AUTENTICADOS

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

6. **Clique em "Run"** (Ctrl + Enter)
7. **Aguarde confirmação de sucesso**

#### Verificar se Funcionou:

```sql
-- Execute no SQL Editor:
SELECT tablename, policyname, roles 
FROM pg_policies 
WHERE tablename IN ('events', 'companies', 'profiles')
ORDER BY tablename;
```

**Deve mostrar políticas para role "authenticated"**

---

### PROBLEMA 2: Botão Sair Não Funciona

#### Teste 2: Verificar se onClick está sendo chamado

**Adicione logs temporários no Console (F12):**

```javascript
// Teste 1: Ver se botão está clicável
document.querySelector('button[title="Sair"]')?.addEventListener('click', () => {
  console.log('🖱️ Botão clicado!')
})

// Teste 2: Ver localStorage atual
console.log('📦 localStorage:', localStorage.getItem('auth-storage'))

// Teste 3: Testar signOut manualmente
const { signOut } = window.useAuthStore.getState()
await signOut()
```

#### Se Botão Não Responde:

**Possíveis causas:**
1. JavaScript não carregou completamente
2. Erro de CSP bloqueando eventos
3. React não montou o componente

#### Solução Alternativa Temporária:

**Execute no Console (F12):**

```javascript
// Logout manual forçado
localStorage.clear()
sessionStorage.clear()
await supabase.auth.signOut()
window.location.href = '/'
```

---

## 🧪 TESTES COMPLETOS

### Checklist de Verificação:

#### 1. Console (F12) deve mostrar:
- [ ] ✅ `🔍 VARS:` com URL e Key configuradas
- [ ] ✅ `🔐 Auth Status:` mostrando estado correto
- [ ] ❌ SEM erros de RLS (42501)
- [ ] ❌ SEM erros de CSP

#### 2. Quando DESLOGADO:
- [ ] ✅ Eventos carregam
- [ ] ✅ Empresas carregam
- [ ] ✅ Perfis carregam

#### 3. Quando LOGADO:
- [ ] ✅ Eventos carregam
- [ ] ✅ Empresas carregam
- [ ] ✅ Perfis carregam
- [ ] ✅ Botão "Sair" funciona
- [ ] ✅ Após logout, volta para home

---

## 🔧 DEBUG AVANÇADO

### Adicionar Logs Temporários:

**Edite `src/components/layout/Header.tsx`:**

```typescript
const handleSignOut = async () => {
  console.log('🚪 LOGOUT INICIADO')
  console.log('📦 localStorage antes:', localStorage.getItem('auth-storage'))
  
  try {
    await signOut()
    console.log('✅ signOut executado')
  } catch (error) {
    console.error('❌ Erro no signOut:', error)
  }
}
```

### Adicionar Logs em Queries:

**Edite `src/hooks/useSupabaseQuery.ts` (se existir):**

```typescript
const { data, error } = await query

console.log('🔍 Query:', table, {
  data: data?.length || 0,
  error: error?.message,
  authenticated: !!session?.user
})
```

---

## 📊 TESTE DE POLICIES NO SUPABASE

Execute no **SQL Editor**:

```sql
-- Ver todas as políticas
SELECT 
  schemaname,
  tablename,
  policyname,
  roles,
  cmd as command,
  qual as condition
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

**Você DEVE ver:**
- Políticas para `anon` (público)
- Políticas para `authenticated` (logado)
- Políticas para admins

---

## 🆘 SE NADA FUNCIONAR

### Opção 1: Limpar Tudo

```javascript
// No Console (F12):
localStorage.clear()
sessionStorage.clear()
indexedDB.databases().then(dbs => {
  dbs.forEach(db => indexedDB.deleteDatabase(db.name))
})
location.reload()
```

### Opção 2: Testar em Modo Anônimo

- `Ctrl + Shift + N` (Chrome)
- Teste login e logout

### Opção 3: Desabilitar CSP Temporariamente

**Comente no `index.html`:**

```html
<!-- 
<meta http-equiv="Content-Security-Policy" content="...">
-->
```

Rebuild:
```bash
npm run build
```

---

## 📸 ME ENVIE

Se os problemas persistirem, me envie:

1. **Screenshot do Console (F12) com:**
   - Logs de `🔍 VARS`
   - Logs de `🔐 Auth Status`
   - Qualquer erro em vermelho

2. **Screenshot das Policies do Supabase:**
   - SQL Editor → Execute query de verificação

3. **Me diga:**
   - O que acontece ao clicar em "Sair"
   - Se aparecem dados quando deslogado
   - Se aparecem dados quando logado

---

## 🎯 RESUMO DA AÇÃO NECESSÁRIA

### ⚠️ AÇÃO CRÍTICA - EXECUTAR NO SUPABASE:

**Você PRECISA executar o script SQL no Supabase Dashboard!**

📍 Local: https://supabase.com/dashboard → SQL Editor
📄 Script: `supabase/007_fix_authenticated_access.sql`

**SEM ISSO, os dados NÃO vão carregar quando logado!**

---

**Projeto:** Guia Lafaiete v2.0.0  
**Autor:** Vinícius Bastos  
**Site:** https://midias.me
