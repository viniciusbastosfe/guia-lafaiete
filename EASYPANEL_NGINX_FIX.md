# 🔧 FIX DEFINITIVO: Erro 404 Nginx - Guia Lafaiete v2.0.0
**Autor:** Vinícius Bastos (https://midias.me)  
**Data:** 25/11/2025 07:47

---

## ⚠️ Problema

```
404 Not Found
nginx/1.29.3
```

Erro ao acessar rotas como `/eventos`, `/empresas`, etc.

---

## 🎯 Causa

O **EasyPanel usa Nginx** como servidor web, e os arquivos `_redirects` e `netlify.toml` **NÃO funcionam com Nginx**.

Nginx precisa de configuração específica no arquivo `nginx.conf` ou diretamente no painel.

---

## ✅ SOLUÇÃO 1: Configurar no Painel do EasyPanel (RECOMENDADO)

### Passo 1: Acesse o EasyPanel

Vá até: `https://seu-ip-vps:3000` (ou porta configurada)

### Passo 2: Localize o Projeto

Clique no projeto **"guia-lafaiete"**

### Passo 3: Configurar Nginx

Procure por uma dessas opções:
- **"Nginx Config"**
- **"Server Configuration"**
- **"Advanced Settings"**
- **"Custom Nginx"**

### Passo 4: Adicione a Configuração SPA

Cole esta configuração:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}

location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**OU** a configuração completa:

```nginx
server {
    listen 80;
    root /app/dist;
    index index.html;

    # SPA - Todas as rotas retornam index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Passo 5: Salvar e Reiniciar

1. Clique em **"Save"** ou **"Apply"**
2. Clique em **"Restart"** ou aguarde reload automático

---

## ✅ SOLUÇÃO 2: Verificar Tipo de Deploy

Se não encontrar configuração de Nginx no EasyPanel:

### Opção A: Mudar para "Static Site"

1. No EasyPanel, vá em **Settings** do projeto
2. Verifique se o tipo está como:
   - ✅ **"Static Site"** ou **"Vite"**
   - ❌ NÃO "Node.js" ou "Docker"

3. Se não estiver, **recrie o projeto** como **Static Site**

---

### Opção B: Usar Docker com Nginx

Se o EasyPanel exigir Docker:

**Criar: `Dockerfile`**

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Atualizar `nginx.conf`:**

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## ✅ SOLUÇÃO 3: Usar HashRouter (Emergencial)

Se NADA funcionar, mude temporariamente para HashRouter:

**Editar `src/App.tsx`:**

```typescript
import { HashRouter } from 'react-router-dom'

// Trocar BrowserRouter por HashRouter
<HashRouter>
  <AppRoutes />
</HashRouter>
```

**Desvantagem:** URLs ficam feias com `#`:
- ❌ `https://site.com/#/eventos`
- ✅ Preferível: `https://site.com/eventos`

---

## 🔍 Como Identificar o Problema no EasyPanel

### Verificar Logs do Nginx

No terminal da VPS:

```bash
# Ver logs de erro
docker logs [container_id] 2>&1 | grep nginx

# Ou via EasyPanel
# Logs → guia-lafaiete → Ver logs
```

Procure por:
```
nginx: [error] ... "/app/dist/eventos" failed (2: No such file or directory)
```

Isso confirma que Nginx está buscando arquivo físico em vez de usar `try_files`.

---

## 📸 Screenshots Necessários

Se não conseguir configurar, me envie:

1. **Screenshot da página principal do projeto no EasyPanel**
   - Mostrando tipo de deploy, configurações

2. **Screenshot do menu lateral/superior do EasyPanel**
   - Para identificar onde está a configuração Nginx

3. **Screenshot dos logs de erro**
   - Clicando em "Logs" no painel

---

## 🎯 Checklist de Verificação

- [ ] Projeto configurado como **"Static Site"** no EasyPanel
- [ ] Output Directory: **"dist"** (não "build" ou "public")
- [ ] Build Command: **"npm install && npm run build"**
- [ ] Configuração Nginx aplicada (try_files)
- [ ] Variáveis de ambiente configuradas (VITE_SUPABASE_*)
- [ ] Serviço reiniciado após mudanças

---

## 🆘 Suporte Direto

**Se continuar com erro 404:**

1. Acesse o shell do EasyPanel ou VPS
2. Execute:

```bash
# Ver estrutura de arquivos
ls -la /app/dist/

# Deve mostrar:
# - index.html
# - assets/
# - _redirects
# - netlify.toml
```

3. Testar se index.html responde:

```bash
curl http://localhost/index.html
```

Se funcionar → Problema é na configuração Nginx
Se não funcionar → Problema é no build/deploy

---

## 📚 Configuração Nginx Completa

Arquivo `nginx.conf` criado na raiz do projeto com configuração completa.

Para testar localmente com Nginx:

```bash
# Instalar nginx (Windows)
# Baixar: http://nginx.org/en/download.html

# Copiar nginx.conf
# Apontar root para ./dist
# Iniciar nginx
```

---

## 🎉 Resultado Esperado

Após configurar corretamente:

```bash
✅ GET /               → 200 (index.html)
✅ GET /eventos        → 200 (index.html → React Router)
✅ GET /empresas       → 200 (index.html → React Router)
✅ GET /perfis         → 200 (index.html → React Router)
✅ GET /assets/main.js → 200 (cache: 1y)
```

---

## 📞 Alternativa: Usar Vercel/Netlify

Se o EasyPanel está dando muito trabalho:

### Vercel (Gratuito):
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Netlify (Gratuito):
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Vantagem:** Ambos configuram SPA automaticamente (sem precisar de nginx.conf)

---

**Projeto:** Guia Lafaiete v2.0.0  
**Autor:** Vinícius Bastos  
**Site:** https://midias.me
