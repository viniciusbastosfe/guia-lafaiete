# Guia de Logos - Guia Lafaiete

## 📁 Estrutura de Arquivos

As logos estão localizadas em:
- **Fonte original:** `/img/`
- **Uso na aplicação:** `/public/`
- **Imports centralizados:** `src/assets/images/index.ts`

## 🎨 Variações Disponíveis

| Arquivo | Descrição | Uso Recomendado |
|---------|----------|-----------------|
| `Guia-Lafaiete-02.svg` | Logo principal colorida | Header público, marketing |
| `Guia-Lafaiete-06.svg` | Logo branca | Fundos escuros (admin sidebar) |
| `Guia-Lafaiete-04.svg` | Logo preta | Fundos claros (footer) |
| `Guia-Lafaiete-favicon.svg` | Favicon | Aba do navegador |
| `Guia-Lafaiete-01.svg` | Variação 1 | Opcional |
| `Guia-Lafaiete-03.svg` | Variação 3 | Opcional |
| `Guia-Lafaiete-05.svg` | Variação 5 | Opcional |

## 🚀 Como Usar

### 1. Via Componente Logo (Recomendado)

```tsx
import { Logo } from '@/components/ui/Logo'

// Logo principal
<Logo variant="primary" size="md" />

// Logo branca para fundos escuros
<Logo variant="white" size="md" href="/admin" />

// Logo preta para fundos claros
<Logo variant="black" size="lg" />
```

### 2. Via Import Direto

```tsx
import { LOGOS } from '@/assets/images'

<img src={LOGOS.primary} alt="Guia Lafaiete" />
```

### 3. Tamanhos Disponíveis

- `sm`: h-8 (32px)
- `md`: h-10 (40px) - padrão
- `lg`: h-12 (48px)
- `xl`: h-16 (64px)

## 📍 Implementações Atuais

### Header Público
- **Componente:** `src/components/layout/Header.tsx`
- **Logo:** `Guia-Lafaiete-02.svg` (principal)
- **Tamanho:** md (40px)

### Admin Sidebar
- **Componente:** `src/components/layout/AdminSidebar.tsx`
- **Logo:** `Guia-Lafaiete-06.svg` (branca)
- **Tamanho:** md (40px)

### Footer
- **Componente:** `src/components/layout/Footer.tsx`
- **Logo:** `Guia-Lafaiete-04.svg` (preta)
- **Tamanho:** lg (48px)

### Favicon
- **Arquivo:** `index.html`
- **Logo:** `Guia-Lafaiete-favicon.svg`
- **Tamanho:** Automático

## 🎯 Diretrizes de Uso

### Contraste
- **Fundos claros:** Usar logo colorida ou preta
- **Fundos escuros:** Usar logo branca
- **Fundos coloridos:** Testar contraste adequado

### Tamanhos
- **Header:** 40px (md)
- **Sidebar:** 40px (md)
- **Footer:** 48px (lg)
- **Mobile:** Reduzir proporcionalmente

### Espaçamento
- Manter espaço mínimo de 8px ao redor da logo
- Não distorcer proporções (usar `w-auto`)

## 🔧 Manutenção

### Para atualizar logos:
1. Substituir arquivos em `/img/`
2. Copiar para `/public/`
3. Limpar cache do navegador
4. Testar em diferentes fundos

### Para adicionar nova variação:
1. Adicionar arquivo SVG em `/img/` e `/public/`
2. Adicionar em `src/assets/images/index.ts`
3. Usar nos componentes conforme necessário

## 📱 Responsividade

As logos são SVG e se adaptam automaticamente:
- **Mobile:** Reduzem proporcionalmente
- **Tablet:** Mantém tamanho base
- **Desktop:** Tamanho completo

## 🎨 Cores da Marca

- **Primária:** #F31100 (vermelho)
- **Secundária:** Gradientes e tons de cinza
- **Texto:** #171717 (preto) / #ffffff (branco)

---
*Atualizado em: 24/11/2025*
*Autor: Vinícius Bastos (https://midias.me)*
