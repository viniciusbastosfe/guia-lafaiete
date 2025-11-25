# 🎨 Guia Lafaiete Design System v2.0

**Autor:** Vinícius Bastos ([https://midias.me](https://midias.me))  
**Data:** 2024-2025  
**Versão:** 2.0

---

## 📖 Índice

1. [Tipografia](#tipografia)
2. [Cores](#cores)
3. [Glassmorphism](#glassmorphism)
4. [Sombras](#sombras)
5. [Border Radius](#border-radius)
6. [Espaçamento](#espacamento)
7. [Transições](#transicoes)
8. [Componentes](#componentes)
9. [Responsividade](#responsividade)
10. [Acessibilidade](#acessibilidade)

---

## 🔤 Tipografia

### Fonte Principal
- **Family:** Poppins
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Import:** Google Fonts

### Pesos Disponíveis
- **Light:** 300
- **Regular:** 400
- **Medium:** 500
- **Semibold:** 600
- **Bold:** 700

### Tamanhos

| Elemento | Desktop | Tablet | Mobile | Peso | Line Height |
|----------|---------|--------|--------|------|-------------|
| H1 | 48px (3rem) | 36px (2.25rem) | 30px (1.875rem) | 700 | 1.2 |
| H2 | 36px (2.25rem) | 30px (1.875rem) | 24px (1.5rem) | 600 | 1.2 |
| H3 | 28px (1.75rem) | 24px (1.5rem) | 20px (1.25rem) | 600 | 1.2 |
| H4 | 22px (1.375rem) | - | - | 600 | 1.2 |
| H5 | 18px (1.125rem) | - | - | 600 | 1.2 |
| H6 | 16px (1rem) | - | - | 600 | 1.2 |
| Body | 15px (0.9375rem) | - | - | 300 | 1.75 |
| Small | 14px (0.875rem) | - | - | 400 | 1.5 |
| Tiny | 13px (0.8125rem) | - | - | 400 | 1.5 |
| XS | 12px (0.75rem) | - | - | 400 | 1.5 |

### Uso em CSS
```css
/* Variáveis */
--font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-size-base: 0.9375rem; /* 15px */
--font-weight-light: 300;
--line-height-relaxed: 1.75;

/* Aplicação */
body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-light);
  line-height: var(--line-height-relaxed);
}
```

---

## 🎨 Cores

### Primárias
```css
--color-primary: #F31100;
--color-primary-hover: #D10E00;
--color-primary-light: #FF3D2E;
```

**Uso:** Botões principais, links, destaques

### Secundárias
```css
--color-coral-soft: #FFECE8;
--color-warm-white: #FFF5F3;
--color-bg-main: #F8F8F8;
```

**Uso:** Backgrounds suaves, cards

### Texto
```css
--color-text-strong: #111111;    /* Títulos */
--color-text-secondary: #555555; /* Parágrafos */
--color-text-light: #888888;     /* Hints */
--color-text-white: #FFFFFF;     /* Em backgrounds escuros */
```

### Admin Badges
| Tipo | Background | Texto | Uso |
|------|-----------|-------|-----|
| Success | #DCFCE7 | #16A34A | Status ativo |
| Warning | #FEF3C7 | #D97706 | Avisos |
| Error | #FEE2E2 | #DC2626 | Erros |
| Info | #DBEAFE | #2563EB | Informações |

### Gradientes
```css
--gradient-hero: linear-gradient(135deg, #FFE5E0 0%, #FFF5F3 50%, #F8F8F8 100%);
--gradient-card: linear-gradient(135deg, #FFECE8 0%, #FFF5F3 100%);
--gradient-overlay: linear-gradient(to top, rgba(17, 17, 17, 0.6) 0%, transparent 50%);
```

---

## ✨ Glassmorphism

### Glass Light
```css
.glass-light {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}
```

### Glass Dark
```css
.glass-dark {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}
```

### Header Glass
```css
.header-glass {
  background: rgba(243, 17, 0, 0.92);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}
```

---

## 🌑 Sombras

| Nome | Valor | Uso |
|------|-------|-----|
| SM | `0 2px 8px rgba(0, 0, 0, 0.06)` | Inputs, elementos pequenos |
| MD | `0 4px 16px rgba(0, 0, 0, 0.08)` | Cards padrão |
| LG | `0 8px 32px rgba(0, 0, 0, 0.12)` | Cards em destaque |
| XL | `0 12px 48px rgba(0, 0, 0, 0.15)` | Modals, elementos flutuantes |
| Button | `0 4px 14px rgba(243, 17, 0, 0.3)` | Botão primary |
| Button Hover | `0 6px 20px rgba(243, 17, 0, 0.4)` | Botão primary hover |

---

## 🔘 Border Radius

| Tamanho | Valor | Uso |
|---------|-------|-----|
| SM | 12px | Tags, badges pequenos |
| MD | 20px | Inputs, selects |
| LG | 24px | Cards padrão |
| XL | 28px | Cards grandes |
| FULL | 9999px | Botões, avatares, pills |

---

## 📏 Espaçamento

| Tamanho | Valor | Uso |
|---------|-------|-----|
| XS | 8px | Gap entre ícones e texto |
| SM | 12px | Padding interno pequeno |
| MD | 20px | Padding padrão de cards |
| LG | 32px | Espaçamento entre seções |
| XL | 48px | Padding de hero sections |
| 2XL | 64px | Espaçamento vertical grande |
| 3XL | 96px | Espaçamento entre seções principais |

---

## ⚡ Transições

| Tipo | Duração | Easing | Uso |
|------|---------|--------|-----|
| Fast | 150ms | cubic-bezier(0.4, 0, 0.2, 1) | Hover de botões |
| Base | 250ms | cubic-bezier(0.4, 0, 0.2, 1) | Transições padrão |
| Slow | 350ms | cubic-bezier(0.4, 0, 0.2, 1) | Animações de entrada |

---

## 🧩 Componentes

### Botões

#### Primary Button
```css
.btn-primary {
  background: #F31100;
  color: #FFFFFF;
  padding: 14px 28px;
  border-radius: 9999px;
  font-size: 0.9375rem;
  font-weight: 500;
  box-shadow: 0 4px 14px rgba(243, 17, 0, 0.3);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  background: #D10E00;
  box-shadow: 0 6px 20px rgba(243, 17, 0, 0.4);
  transform: scale(1.02);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

#### Tamanhos
- **SM:** padding: 10px 20px, font-size: 14px
- **MD:** padding: 14px 28px, font-size: 15px
- **LG:** padding: 18px 36px, font-size: 17px

### Cards

#### Base Card
```css
.card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.6);
}
```

### Inputs

```css
.input {
  width: 100%;
  padding: 14px 20px;
  font-size: 0.9375rem;
  font-weight: 400;
  color: #111111;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.input:focus {
  background: rgba(255, 255, 255, 0.95);
  border-color: #F31100;
  box-shadow: 0 0 0 3px rgba(243, 17, 0, 0.1);
  outline: none;
}
```

---

## 📱 Responsividade

### Breakpoints
- **Mobile:** < 480px
- **Tablet:** 481px - 768px
- **Desktop Small:** 769px - 1024px
- **Desktop:** > 1024px

### Ajustes Mobile
- H1: 30px
- H2: 24px
- H3: 20px
- Hero Title: 36px
- Section Padding: 48px 0
- Grid: 1 coluna

### Ajustes Tablet
- H1: 36px
- H2: 30px
- H3: 24px
- Grid 4 cols → 3 cols
- Grid 3 cols → 2 cols

---

## ♿ Acessibilidade

### Contraste
- **Mínimo:** 4.5:1 (WCAG AA)
- **Texto Primário:** #111111 em #FFFFFF (16.1:1) ✅
- **Texto Secundário:** #555555 em #FFFFFF (7.4:1) ✅
- **Botão Primary:** #FFFFFF em #F31100 (4.6:1) ✅

### Focus States
```css
.focus-visible:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(243, 17, 0, 0.1);
  border-color: #F31100;
}
```

### Boas Práticas
- ✅ Sempre incluir `aria-label` em ícones sem texto
- ✅ Todos os elementos interativos acessíveis via Tab
- ✅ Contraste mínimo de 4.5:1
- ✅ Textos alternativos em imagens
- ✅ Navegação por teclado

---

## 🚀 Como Usar

### 1. Importar no HTML
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### 2. Importar no CSS
```css
@import './styles/design-system.css';
```

### 3. Usar Variáveis CSS
```css
.meu-elemento {
  color: var(--color-primary);
  font-size: var(--font-size-base);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

### 4. Classes Utilitárias
```html
<div class="glass-light">Conteúdo com glassmorphism</div>
<div class="gradient-hero">Hero com gradiente</div>
<p class="text-secondary">Texto secundário</p>
```

---

## 📦 Arquivos do Design System

- `src/styles/design-system.css` - Variáveis e estilos base
- `tailwind.config.js` - Configuração do Tailwind
- `index.html` - Import da fonte Poppins
- `src/index.css` - Import do design system

---

**Desenvolvido com ❤️ por Vinícius Bastos**  
**https://midias.me**
