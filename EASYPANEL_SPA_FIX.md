# 🔧 Fix: Erro 404 em Rotas SPA - Guia Lafaiete v2.0.0
**Autor:** Vinícius Bastos (https://midias.me)  
**Data:** 25/11/2025 06:58

---

## ⚠️ Problema

Erro ao acessar rotas como `/eventos`, `/empresas`, etc:

```
GET https://guia-lafaiete-github.zqgkg4.easypanel.host/eventos 404 (Not Found)
```

---

## 🎯 Causa

O servidor está tentando buscar arquivos físicos (`/eventos.html`) que não existem.

Em **SPA (Single Page Application)** com React Router, todas as rotas devem retornar o `index.html` para o JavaScript tratar o roteamento no cliente.

---

## ✅ Solução Implementada

### 1. **Criado: `public/_redirects`**

Arquivo usado por Netlify/EasyPanel para redirecionar rotas:

```
/*    /index.html   200
```

Este arquivo será copiado automaticamente para `dist/_redirects` durante o build.

---

### 2. **Criado: `public/netlify.toml`**

Configuração adicional para garantir o funcionamento:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3. **Criado: `vercel.json`**

Compatibilidade com outros serviços:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🚀 Deploy

### Passo 1: Rebuild e Push

```bash
# Limpar dist
npm run build

# Commit e push
git add .
git commit -m "fix: adicionar configuração SPA para EasyPanel"
git push
```

### Passo 2: Aguardar Deploy Automático

O EasyPanel vai:
1. Detectar o push
2. Fazer rebuild
3. Copiar `_redirects` e `netlify.toml` para o dist
4. Aplicar as regras de redirecionamento

---

## ✅ Verificação

Após o deploy:

1. **Acesse:** `https://guia-lafaiete-github.zqgkg4.easypanel.host/eventos`
2. **Deve:** Carregar a página normalmente (sem 404)
3. **React Router:** Vai detectar a rota `/eventos` e renderizar o componente correto

---

## 🔍 Como Funciona

### ❌ Antes (Problema):
```
Usuário acessa: /eventos
↓
Servidor busca: /eventos.html
↓
❌ Arquivo não existe → 404
```

### ✅ Depois (Corrigido):
```
Usuário acessa: /eventos
↓
Servidor redireciona: /index.html (200)
↓
React carrega: index.html
↓
React Router detecta: /eventos
↓
✅ Renderiza: Componente de Eventos
```

---

## 📁 Estrutura de Arquivos

```
guia-lafaiete/
├── public/
│   ├── _redirects        ← Criado ✅
│   └── netlify.toml      ← Criado ✅
├── vercel.json           ← Criado ✅
└── dist/ (após build)
    ├── index.html
    ├── assets/
    ├── _redirects        ← Copiado automaticamente
    └── netlify.toml      ← Copiado automaticamente
```

---

## 🧪 Teste Local

Para testar localmente:

```bash
# Build
npm run build

# Preview (simula produção)
npm run preview

# Acesse rotas diretamente:
http://localhost:4173/eventos
http://localhost:4173/empresas
http://localhost:4173/perfis
```

**Todas devem funcionar sem 404!**

---

## 🆘 Se Ainda Apresentar 404

### Opção 1: Verificar se arquivos foram copiados

```bash
# Verificar se _redirects está no dist
ls dist/_redirects
```

Se NÃO existir, o Vite pode não estar copiando arquivos do `public/`.

---

### Opção 2: Configuração Manual no EasyPanel

Se o EasyPanel não suportar `_redirects`, você pode precisar configurar manualmente:

1. Acesse o painel do EasyPanel
2. Procure por **"Rewrite Rules"** ou **"Redirects"**
3. Adicione a regra:

```
Source: /*
Destination: /index.html
Status: 200
```

---

### Opção 3: Usar HashRouter (Não Recomendado)

Última opção se nada funcionar:

```typescript
// src/App.tsx
import { HashRouter } from 'react-router-dom'

// Trocar BrowserRouter por HashRouter
<HashRouter>
  <AppRoutes />
</HashRouter>
```

**Desvantagem:** URLs ficam com `#` (ex: `/#/eventos`)

---

## 📚 Referências

- [Vite Static Deploy](https://vitejs.dev/guide/static-deploy.html)
- [React Router BrowserRouter](https://reactrouter.com/en/main/router-components/browser-router)
- [Netlify Redirects](https://docs.netlify.com/routing/redirects/)

---

## 🎯 Checklist

- [x] Arquivo `_redirects` criado em `public/`
- [x] Arquivo `netlify.toml` criado em `public/`
- [x] Arquivo `vercel.json` criado na raiz
- [ ] Build executado
- [ ] Push para GitHub
- [ ] Deploy no EasyPanel
- [ ] Rotas testadas (sem 404)

---

**Projeto:** Guia Lafaiete v2.0.0  
**Autor:** Vinícius Bastos  
**Site:** https://midias.me
