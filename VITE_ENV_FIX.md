# ✅ Fix: Variáveis de Ambiente Vite - Guia Lafaiete v2.0.0
**Autor:** Vinícius Bastos (https://midias.me)  
**Data:** 25/11/2025 00:50

---

## 🎯 Problema Resolvido

As variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` não estavam sendo injetadas corretamente no build de produção.

---

## ✅ Ajustes Realizados

### 1. **src/lib/supabase.ts**
- ✅ Removido type casting `as string`
- ✅ Leitura direta de `import.meta.env.VITE_SUPABASE_URL`
- ✅ Leitura direta de `import.meta.env.VITE_SUPABASE_ANON_KEY`
- ✅ Logs de erro simplificados

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis do Supabase ausentes!', {
    VITE_SUPABASE_URL: supabaseUrl,
    VITE_SUPABASE_ANON_KEY: supabaseKey,
    env: import.meta.env.MODE
  })
  throw new Error('Missing Supabase environment variables.')
}
```

---

### 2. **src/main.tsx**
- ✅ Adicionado log de debug no início da aplicação

```typescript
console.log('🔍 VARS:', {
  url: import.meta.env.VITE_SUPABASE_URL,
  key: import.meta.env.VITE_SUPABASE_ANON_KEY,
  mode: import.meta.env.MODE
})
```

---

### 3. **vite.config.ts**
- ✅ Adicionado `define` para injetar variáveis no build

```typescript
define: {
  'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
  'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY),
}
```

---

### 4. **.env.template**
- ✅ Criado arquivo template para referência

```env
VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
```

---

### 5. **Rebuild Completo**
- ✅ Pasta `dist/` limpa
- ✅ `npm install` executado
- ✅ `npm run build` executado com sucesso

---

## 🚀 Como Deploy no EasyPanel

### Passo 1: Configurar Variáveis no EasyPanel

No painel do EasyPanel, adicione as variáveis de ambiente:

```
VITE_SUPABASE_URL=https://rihcfdnvujmkhmcaanon.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaGNmZG52dWpta2htY2Fhbm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NTk4MTksImV4cCI6MjA3OTUzNTgxOX0.jPbN-oS8mZ3kSUbGvVKJF773i86MIcdIyyd7DaAHFYI
```

### Passo 2: Build Command
```bash
npm install && npm run build
```

### Passo 3: Output Directory
```
dist
```

### Passo 4: Deploy

Após configurar as variáveis e salvar:
1. Faça push das alterações para GitHub
2. EasyPanel vai fazer deploy automático
3. As variáveis serão injetadas durante o build

---

## ✅ Verificação

Após o deploy, abra o Console (F12) e verifique:

### ✅ Sucesso:
```javascript
🔍 VARS: {
  url: "https://rihcfdnvujmkhmcaanon.supabase.co",
  key: "eyJhbGciOi...",
  mode: "production"
}
```

### ❌ Erro:
```javascript
🔍 VARS: {
  url: undefined,
  key: undefined,
  mode: "production"
}
❌ Variáveis do Supabase ausentes!
```

→ Se aparecer `undefined`, as variáveis NÃO foram configuradas no EasyPanel

---

## 📝 Notas Importantes

1. **Vite usa `import.meta.env`**, não `process.env`
2. **Variáveis precisam do prefixo `VITE_`** para serem expostas ao cliente
3. **Variáveis são injetadas durante o BUILD**, não em runtime
4. **Sempre fazer rebuild** após alterar variáveis de ambiente

---

## 🔄 Comandos Úteis

```bash
# Limpar e rebuildar local
npm run build

# Verificar se build está OK
npm run preview

# Commitar e fazer push
git add .
git commit -m "fix: ajustar variáveis de ambiente Vite"
git push
```

---

## 📦 Arquivos Modificados

- ✅ `src/lib/supabase.ts` - Ajustada leitura de variáveis
- ✅ `src/main.tsx` - Adicionado log de debug
- ✅ `vite.config.ts` - Adicionado `define`
- ✅ `.env.template` - Criado template
- ✅ `VITE_ENV_FIX.md` - Este documento

---

**Projeto:** Guia Lafaiete v2.0.0  
**Autor:** Vinícius Bastos  
**Site:** https://midias.me
