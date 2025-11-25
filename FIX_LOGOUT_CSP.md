# 🔧 FIX: Botão Sair e CSP - Guia Lafaiete v2.0.0
**Autor:** Vinícius Bastos (https://midias.me)  
**Data:** 25/11/2025 08:04

---

## ⚠️ Problemas Resolvidos

### 1. **Botão "Sair" no menu não funcionava**
Ao clicar no botão "Sair", nada acontecia.

### 2. **Erro de Content Security Policy (CSP)**
```
Content Security Policy blocks the use of 'eval' in JavaScript
Source: script-src blocked
```

---

## 🎯 Causas

### Problema 1: Botão Sair
O código estava tentando fazer **duas navegações simultâneas**:

```typescript
const handleSignOut = async () => {
  await signOut()        // ← Faz window.location.href = '/'
  navigate('/')          // ← Tenta navegar DEPOIS do reload
}
```

O `signOut()` já faz `window.location.href = '/'` (reload da página).  
O `navigate('/')` tentava navegar **depois** que a página já havia recarregado, causando conflito.

---

### Problema 2: CSP eval()
O erro acontecia porque:

1. **Sourcemaps em produção** (`sourcemap: true`) usam `eval()` internamente
2. **Faltava meta tag CSP** no HTML
3. **Sem proteção contra eval()** explícita

---

## ✅ SOLUÇÕES IMPLEMENTADAS

### 1. **Header.tsx - Remover navigate conflitante**

**Antes:**
```typescript
const { user, isAdmin, signOut } = useAuthStore()
const navigate = useNavigate()

const handleSignOut = async () => {
  await signOut()
  navigate('/')  // ❌ Conflito!
}
```

**Depois:**
```typescript
const { user, isAdmin, signOut } = useAuthStore()

const handleSignOut = async () => {
  await signOut()
  // Não precisa de navigate, signOut já redireciona
}
```

---

### 2. **AdminHeader.tsx - Mesma correção**

```typescript
const handleSignOut = async () => {
  await signOut()
  // Não precisa de navigate, signOut já redireciona
}
```

---

### 3. **vite.config.ts - Desabilitar sourcemap**

```typescript
build: {
  outDir: 'dist',
  sourcemap: false,  // ✅ Não usa eval() em produção
  minify: 'terser',  // ✅ Minificação segura
  // ...
}
```

---

### 4. **index.html - Adicionar CSP**

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https: blob:;
  connect-src 'self' https://rihcfdnvujmkhmcaanon.supabase.co wss://rihcfdnvujmkhmcaanon.supabase.co;
  frame-src 'none';
  object-src 'none';
">
```

---

## 🧪 Como Testar

### Teste 1: Botão Sair
1. Faça **login** no site
2. Clique no botão **"Sair"** (desktop ou mobile)
3. **Resultado esperado:**
   - ✅ Página recarrega
   - ✅ Volta para home (/)
   - ✅ Menu mostra "Entrar" e "Cadastrar"
   - ✅ Sem erros no Console (F12)

---

### Teste 2: CSP
1. Abra o site
2. Pressione **F12** (Console)
3. **Resultado esperado:**
   - ✅ Sem erros de CSP
   - ✅ Sem erros de "eval blocked"
   - ✅ Console limpo

---

### Teste 3: Funcionalidades Normais
Verificar que tudo continua funcionando:
- ✅ Login/Logout
- ✅ Google Fonts carrega
- ✅ Imagens carregam
- ✅ Conexão com Supabase funciona
- ✅ WebSocket Supabase funciona

---

## 📋 Entendendo CSP (Content Security Policy)

### O que é?
É uma **camada de segurança** que previne ataques XSS (Cross-Site Scripting).

### Diretivas Configuradas:

| Diretiva | O que faz | Exemplo |
|----------|-----------|---------|
| `default-src 'self'` | Só carrega recursos do próprio domínio | ✅ seu-site.com<br>❌ site-externo.com |
| `script-src 'self' 'unsafe-inline'` | Scripts do site + inline | ✅ `<script>...</script>` |
| `style-src 'self' 'unsafe-inline'` | CSS do site + inline | ✅ `<style>...</style>` |
| `font-src 'self' fonts.gstatic.com` | Fontes do site + Google Fonts | ✅ Google Fonts |
| `img-src 'self' data: https: blob:` | Imagens de qualquer HTTPS | ✅ Supabase Storage |
| `connect-src 'self' supabase.co` | Conexões API + WebSocket | ✅ Supabase API |
| `frame-src 'none'` | Não permite iframes | ❌ `<iframe>` |
| `object-src 'none'` | Não permite Flash/Java | ❌ Plugins antigos |

---

## 🔒 Segurança

### ✅ O que foi bloqueado (segurança aumentada):
- ❌ `eval()` e `new Function()`
- ❌ Iframes externos
- ❌ Plugins (Flash, Java)
- ❌ Scripts de domínios não autorizados

### ✅ O que foi permitido (necessário para funcionar):
- ✅ Scripts inline (React)
- ✅ CSS inline (TailwindCSS)
- ✅ Google Fonts
- ✅ Imagens de qualquer HTTPS (para Storage)
- ✅ Conexão com Supabase (API + WebSocket)

---

## 🛠️ Troubleshooting

### Se ainda aparecer erro de CSP:

**1. Verificar se build foi feito:**
```bash
npm run build
```

**2. Verificar se sourcemap está desabilitado:**
```bash
# Em vite.config.ts deve estar:
sourcemap: false
```

**3. Limpar cache do navegador:**
- `Ctrl + Shift + R` (hard reload)
- Ou `Ctrl + Shift + Del` → Limpar tudo

**4. Testar em modo anônimo:**
- Evita cache e extensões

---

### Se botão sair ainda não funcionar:

**1. Verificar se signOut está sendo chamado:**
```javascript
// Adicionar log temporário
const handleSignOut = async () => {
  console.log('🚪 Logout iniciado')
  await signOut()
}
```

**2. Verificar localStorage:**
```javascript
// No Console (F12) após logout:
localStorage.getItem('auth-storage')
// Deve retornar: null
```

**3. Verificar sessão do Supabase:**
```javascript
const { data } = await supabase.auth.getSession()
console.log('Sessão:', data.session) // Deve ser null
```

---

## 📚 Referências

- [Content Security Policy (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator (Google)](https://csp-evaluator.withgoogle.com/)
- [Vite Build Options](https://vitejs.dev/config/build-options.html)

---

## ✅ Checklist

- [x] Header.tsx corrigido (removido navigate)
- [x] AdminHeader.tsx corrigido (removido navigate)
- [x] vite.config.ts atualizado (sourcemap: false)
- [x] index.html com CSP configurado
- [x] Imports desnecessários removidos
- [ ] Build executado
- [ ] Deploy realizado
- [ ] Testes confirmados

---

## 🚀 Deploy

```bash
# Build
npm run build

# Commit
git add .
git commit -m "fix: corrigir botão sair e adicionar CSP"
git push
```

---

## 🎯 Resultado Esperado

### ✅ ANTES (Problemas):
```
❌ Botão "Sair" não funciona
❌ Erro: CSP blocks eval()
❌ Console com erros
```

### ✅ DEPOIS (Corrigido):
```
✅ Botão "Sair" funciona perfeitamente
✅ Sem erros de CSP
✅ Console limpo
✅ Site mais seguro (CSP ativo)
✅ Build otimizado (sem sourcemaps)
```

---

**Projeto:** Guia Lafaiete v2.0.0  
**Autor:** Vinícius Bastos  
**Site:** https://midias.me
