# 🚀 Deploy EasyPanel + GitHub - Guia Lafaiete v2.0.0
**Autor:** Vinícius Bastos (https://midias.me)  
**Data:** 25/11/2025 00:09

---

## 📋 Solução do Erro "Missing Supabase environment variables"

O erro acontece porque o **EasyPanel não tem as variáveis de ambiente** configuradas.

---

## ✅ Como Resolver (Passo a Passo)

### 1️⃣ Acesse o EasyPanel na VPS

Abra o painel: `http://seu-ip-vps:3000` (ou porta configurada)

---

### 2️⃣ Configure as Variáveis de Ambiente

1. **No EasyPanel, vá até seu projeto "Guia Lafaiete"**
2. **Clique em "Environment" ou "Variables" ou "Settings"**
3. **Adicione as seguintes variáveis:**

```env
VITE_SUPABASE_URL=https://rihcfdnvujmkhmcaanon.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaGNmZG52dWpta2htY2Fhbm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NTk4MTksImV4cCI6MjA3OTUzNTgxOX0.jPbN-oS8mZ3kSUbGvVKJF773i86MIcdIyyd7DaAHFYI
```

**⚠️ IMPORTANTE:** 
- Cada variável em uma linha separada
- Nome exato: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- **NÃO** use aspas nos valores

---

### 3️⃣ Configurar Build Command

No EasyPanel, certifique-se que:

**Build Command:**
```bash
npm install && npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```bash
npm install
```

---

### 4️⃣ Refazer o Deploy

Após adicionar as variáveis:

1. **Salve as configurações**
2. **Clique em "Redeploy" ou "Deploy"**
3. **Aguarde o build finalizar**

---

### 5️⃣ Verificar Deploy

1. **Acesse o site pelo domínio configurado**
2. **Abra o Console (F12)**
3. **NÃO deve aparecer erro de Supabase**

---

## 🎯 Estrutura EasyPanel Esperada

```yaml
Nome: guia-lafaiete
Tipo: Static Site (Vite)
Framework: Vite
Build Command: npm install && npm run build
Output Directory: dist
Node Version: 18 ou superior

Environment Variables:
  ✅ VITE_SUPABASE_URL
  ✅ VITE_SUPABASE_ANON_KEY
```

---

## 🔍 Troubleshooting

### ❌ Erro persiste após adicionar variáveis

**Causa:** Variáveis não foram salvas ou deploy não foi refeito  
**Solução:**
1. Verifique se as variáveis aparecem na lista
2. Clique em "Redeploy" (forçar novo build)
3. Limpe cache do navegador (Ctrl + Shift + R)

---

### ❌ Build falha no EasyPanel

**Causa:** Falta de memória ou timeout  
**Solução:**
```json
// Adicione no package.json:
"scripts": {
  "build": "tsc && vite build --mode production"
}
```

---

### ❌ Rota 404 ao acessar /eventos, /empresas, etc

**Causa:** EasyPanel não configurado para SPA  
**Solução:** O EasyPanel geralmente configura automaticamente, mas se necessário:

Crie arquivo `vercel.json` (funciona no EasyPanel):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 📸 Onde Adicionar Variáveis no EasyPanel

Geralmente está em:
- **Services → [Seu Projeto] → Environment**
- Ou: **Settings → Environment Variables**
- Ou: **Configuration → Env Vars**

---

## 🔐 Variáveis Opcionais (Adicione depois se necessário)

```env
# OpenAI (ChatGPT)
VITE_OPENAI_API_KEY=sua-chave-aqui

# Google Gemini
VITE_GEMINI_API_KEY=sua-chave-aqui

# Groq (Whisper)
VITE_GROQ_API_KEY=sua-chave-aqui

# Evolution API (WhatsApp)
VITE_EVOLUTION_API_URL=sua-url-aqui
VITE_EVOLUTION_API_KEY=sua-chave-aqui
VITE_EVOLUTION_INSTANCE_NAME=sua-instancia-aqui
```

---

## 📞 Comandos Git Úteis

```bash
# Commitar alterações
git add .
git commit -m "feat: configurar variáveis de ambiente"
git push origin main

# EasyPanel vai detectar o push e fazer deploy automático
```

---

## ✅ Checklist Final

- [ ] Variáveis adicionadas no EasyPanel
- [ ] Deploy refeito (redeploy)
- [ ] Site acessível
- [ ] Console sem erros
- [ ] Rotas funcionando (/eventos, /empresas, etc)

---

**Projeto:** Guia Lafaiete v2.0.0  
**Autor:** Vinícius Bastos  
**Site:** https://midias.me
