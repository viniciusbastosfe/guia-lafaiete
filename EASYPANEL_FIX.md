# 🔧 FIX: Erro Supabase no EasyPanel
**Autor:** Vinícius Bastos (https://midias.me)  
**Data:** 25/11/2025 00:13

---

## ⚠️ Problema

Erro persiste: `Missing Supabase environment variables`

Isso significa que o **EasyPanel NÃO está injetando as variáveis no build**.

---

## ✅ SOLUÇÃO 1: Verificar Configuração EasyPanel

### Passo 1: Confirme as Variáveis no Painel

No **EasyPanel**, vá em:
```
Services → guia-lafaiete → Environment (ou Environment Variables)
```

**Verifique se as variáveis estão exatamente assim:**

| Nome da Variável | Valor |
|-----------------|-------|
| `VITE_SUPABASE_URL` | `https://rihcfdnvujmkhmcaanon.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (chave completa) |

⚠️ **ATENÇÃO:**
- Nome EXATO: `VITE_SUPABASE_URL` (não pode ter espaços ou erros)
- Valor SEM aspas
- Clique em **SAVE/SALVAR** após adicionar

---

### Passo 2: Force um Novo Deploy

Depois de salvar as variáveis:

1. **Clique em "Redeploy" ou "Rebuild"**
2. **Aguarde o build terminar**
3. **Verifique os logs do build** - deve aparecer sem erros

---

## ✅ SOLUÇÃO 2: Verificar Logs no Navegador

Agora o código tem logs de debug. Após o deploy:

1. **Abra o site**
2. **Pressione F12 (Console)**
3. **Procure por:** `🔍 Supabase Config:`

### Você vai ver:

#### ✅ Se estiver correto:
```
🔍 Supabase Config:
  url: ✅ Configurada
  key: ✅ Configurada
  env: production
```

#### ❌ Se estiver errado:
```
🔍 Supabase Config:
  url: ❌ Faltando
  key: ❌ Faltando
  env: production
❌ ERRO: Variáveis de ambiente do Supabase não configuradas!
```

---

## ✅ SOLUÇÃO 3: Verificar Build Command

No EasyPanel, verifique se o **Build Command** está correto:

```bash
npm install && npm run build
```

**NÃO DEVE SER:**
- ~~`npm run dev`~~ ❌
- ~~`npm start`~~ ❌
- ~~`vite`~~ ❌

---

## ✅ SOLUÇÃO 4: Adicionar Arquivo .env.production (Alternativa)

Se o EasyPanel continuar sem injetar as variáveis, crie um arquivo `.env.production.local`:

**No terminal local:**
```bash
# NÃO FAÇA ISSO se as variáveis já estão no EasyPanel!
# Apenas se o método anterior não funcionar

# Crie o arquivo (remover comentário da linha abaixo)
# echo "VITE_SUPABASE_URL=https://rihcfdnvujmkhmcaanon.supabase.co" > .env.production.local
# echo "VITE_SUPABASE_ANON_KEY=sua-chave" >> .env.production.local
```

**Commite e faça push:**
```bash
git add .env.production.local
git commit -m "fix: adicionar variáveis de produção"
git push
```

⚠️ **NÃO É RECOMENDADO** - Use apenas como último recurso!

---

## ✅ SOLUÇÃO 5: Screenshot do Console

Me envie um **screenshot do Console (F12)** após abrir o site.

Assim consigo ver exatamente qual variável está faltando:
- `url: ❌ Faltando` → Falta VITE_SUPABASE_URL
- `key: ❌ Faltando` → Falta VITE_SUPABASE_ANON_KEY

---

## ✅ SOLUÇÃO 6: Build Local + Upload Manual

**Último recurso** se nada funcionar:

```bash
# 1. Build local (COM as variáveis)
npm run build

# 2. Commitar a pasta dist (normalmente não é recomendado)
git add dist -f
git commit -m "fix: adicionar build"
git push

# 3. No EasyPanel, configure para servir a pasta dist/ diretamente
```

---

## 🎯 Checklist Rápido

- [ ] Variáveis adicionadas no EasyPanel com nomes EXATOS
- [ ] Variáveis SALVAS (clicou em Save)
- [ ] Redeploy feito após salvar
- [ ] Build Command correto: `npm install && npm run build`
- [ ] Output Directory: `dist`
- [ ] Console do navegador (F12) verificado

---

## 📸 Onde Adicionar no EasyPanel?

Geralmente é uma dessas opções:
1. **Services → [Seu App] → Environment**
2. **Settings → Environment Variables**
3. **Configuration → Variables**
4. **Deploy Settings → Env Vars**

---

## 🆘 Precisa de Ajuda?

**Me envie:**
1. Screenshot da tela de variáveis do EasyPanel
2. Screenshot do Console (F12) do navegador
3. Logs do build do EasyPanel

Assim consigo identificar o problema específico!

---

**Projeto:** Guia Lafaiete v2.0.0  
**Autor:** Vinícius Bastos  
**Site:** https://midias.me
