# 🎨 Guia do Design System Clean v3.0

**Autor:** Vinícius Bastos (https://midias.me)  
**Data:** 24/11/2025  
**Versão:** 3.0 - Clean & Minimalista

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Filosofia](#filosofia)
3. [Componentes](#componentes)
4. [Classes CSS](#classes-css)
5. [Migração](#migração)
6. [Exemplos](#exemplos)

---

## 🎯 Visão Geral

O **Design System Clean v3.0** é uma evolução focada em **minimalismo**, **respiração** e **profissionalismo**. 

### Principais Mudanças

| Aspecto | v2.0 (Antigo) | v3.0 Clean |
|---------|---------------|------------|
| **Shadows** | Pesadas e sempre visíveis | Sutis, apenas no hover |
| **Borders** | Sem borders | Border 1px sutil (#e5e5e5) |
| **Radius** | 16-28px (muito arredondado) | 8-16px (moderado) |
| **Spacing** | Apertado | Generoso (2x-3x) |
| **Colors** | Poucos neutros | 10 tons de cinza |
| **Glass Effect** | Heavy blur | Sutil/removido |
| **Font Weight** | Bold (700) | Medium/Semibold (500-600) |

---

## 🧠 Filosofia

### 1. **Menos é Mais**
- Remover elementos decorativos desnecessários
- Foco no conteúdo e hierarquia

### 2. **Breathing Room**
- Mínimo 20-24px de padding nos cards
- Espaçamento entre seções: 5rem (80px)
- Line height generoso: 1.6

### 3. **Sutileza**
- Shadows só aparecem no hover
- Borders finas e sutis
- Transições rápidas (200ms)

### 4. **Hierarquia Clara**
- Títulos em gray-900 (quase preto)
- Texto secundário em gray-600
- Texto terciário em gray-500

---

## 🧩 Componentes Redesenhados

### **EventCard**

```tsx
<EventCard 
  event={event}
  variant="default" // ou 'compact' | 'featured'
  showBadge={true}
/>
```

**Características:**
- ✅ Border sutil 1px
- ✅ Shadow apenas no hover
- ✅ Badge com glass effect leve
- ✅ Hover: -translate-y-0.5 (movimento sutil)
- ✅ Ícones em containers quadrados
- ✅ Typography: title em text-lg (18px)

### **EventHero**

```tsx
<EventHero event={event} />
```

**Características:**
- ✅ Background branco com backdrop-blur sutil
- ✅ Badge em container vermelho claro
- ✅ Título: text-3xl md:text-4xl
- ✅ Botão com hover lift suave

### **CompanyCard**

```tsx
<CompanyCard 
  company={company}
  variant="horizontal" // ou 'vertical' | 'compact'
/>
```

**Variantes:**
- **horizontal**: Logo 24x24 + conteúdo ao lado
- **vertical**: Logo grande no topo
- **compact**: Mini card para listas

**Características:**
- ✅ Logo com padding em bg-gray-50
- ✅ Badge de categoria em gray-100
- ✅ "Ver detalhes" ao invés de botão

### **CategoryCard**

```tsx
<CategoryCard 
  category={category}
  variant="circle" // ou 'square' | 'list'
  icon={Building2}
/>
```

**Características:**
- ✅ Ícone em container vermelho claro (bg-red-50)
- ✅ Hover: background vira red-100
- ✅ Typography refinada

---

## 🎨 Classes CSS

### **Buttons Clean**

```css
.btn-clean .btn-primary-clean    /* Vermelho sólido */
.btn-clean .btn-secondary-clean  /* Outline */
.btn-clean .btn-ghost-clean      /* Transparente */
```

**Uso:**
```html
<button class="btn-clean btn-primary-clean">
  Enviar
</button>
```

### **Cards Clean**

```css
.card-clean              /* Card base */
.card-clean-compact      /* Versão com menos padding */
```

**Uso:**
```html
<div class="card-clean">
  <h3>Título</h3>
  <p>Conteúdo</p>
</div>
```

### **Badges Clean**

```css
.badge-clean               /* Base neutra */
.badge-primary-clean       /* Vermelho */
.badge-success-clean       /* Verde */
.badge-error-clean         /* Vermelho erro */
```

### **Inputs Clean**

```css
.input-clean   /* Input minimalista com focus state */
```

### **Layout Clean**

```css
.container-clean       /* max-width: 1200px com padding generoso */
.section-clean         /* padding: 5rem 0 (80px) */
.section-clean-sm      /* padding: 4rem 0 (64px) */
.section-clean-lg      /* padding: 6rem 0 (96px) */
```

---

## 🔄 Migração de Classes Antigas

### **Compatibilidade Mantida**

As classes antigas **ainda funcionam**, mas foram ajustadas para o estilo clean:

| Antiga | Nova (recomendada) | Status |
|--------|-------------------|---------|
| `.card-modern` | `.card-clean` | ✅ Alias criado |
| `.btn-primary` | `.btn-clean .btn-primary-clean` | ✅ Ambos funcionam |
| `.badge-primary` | `.badge-primary-clean` | ✅ Alias criado |
| `.badge-glass` | `.badge-clean` | ✅ Alias criado |
| `.hover-lift` | Nativo nos cards clean | ⚠️ Usar hover interno |

### **Como Migrar**

**Antes:**
```html
<div class="card-modern hover-lift">
  <div class="badge-primary">Tag</div>
  <h3>Título</h3>
</div>
```

**Depois:**
```html
<div class="card-clean">
  <span class="badge-primary-clean">Tag</span>
  <h3>Título</h3>
</div>
```

---

## 💡 Exemplos Práticos

### **Card de Evento Clean**

```html
<div class="card-clean">
  <!-- Imagem -->
  <div class="h-56 overflow-hidden bg-gray-100 -m-6 mb-5">
    <img src="..." class="w-full h-full object-cover" />
  </div>
  
  <!-- Conteúdo -->
  <div class="space-y-3">
    <span class="badge-primary-clean">Evento</span>
    <h3 class="text-lg font-semibold text-gray-900">
      Nome do Evento
    </h3>
    <p class="text-sm text-gray-600 leading-relaxed">
      Descrição do evento...
    </p>
    
    <!-- Meta -->
    <div class="flex items-center gap-2 text-sm text-gray-700">
      <CalendarIcon class="w-4 h-4 text-red-600" />
      <span class="font-medium">15 de Dezembro</span>
    </div>
  </div>
</div>
```

### **Botão Primary Clean**

```html
<button class="btn-clean btn-primary-clean">
  <span>Confirmar</span>
  <svg class="w-4 h-4">...</svg>
</button>
```

### **Input com Label Clean**

```html
<div class="space-y-2">
  <label class="text-sm font-medium text-gray-700">
    Nome completo
  </label>
  <input 
    type="text" 
    class="input-clean"
    placeholder="Digite seu nome"
  />
</div>
```

---

## 📊 Variáveis CSS Disponíveis

### **Cores**
```css
--color-primary: #f31100
--gray-50: #fafafa
--gray-100: #f5f5f5
--gray-200: #e5e5e5
/* ... até gray-900 */
```

### **Spacing**
```css
--spacing-1: 0.25rem  /* 4px */
--spacing-2: 0.5rem   /* 8px */
--spacing-4: 1rem     /* 16px */
--spacing-6: 1.5rem   /* 24px */
/* ... até spacing-32 */
```

### **Shadows**
```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
/* ... até shadow-xl */
```

### **Border Radius**
```css
--radius-sm: 0.375rem  /* 6px */
--radius-md: 0.5rem    /* 8px */
--radius-lg: 0.75rem   /* 12px */
--radius-xl: 1rem      /* 16px */
```

---

## 🎯 Checklist de Design Clean

Ao criar um novo componente, verifique:

- [ ] Border de 1px em gray-200
- [ ] Shadow apenas no hover
- [ ] Padding mínimo de 1.25rem (20px)
- [ ] Border radius entre 8-12px
- [ ] Typography: title em gray-900, body em gray-600
- [ ] Transition de 200ms
- [ ] Hover: translateY(-2px) no máximo
- [ ] Ícones em containers de 40-48px
- [ ] Line height de 1.6 para textos
- [ ] Font weight medium (500) ou semibold (600)

---

## 🚀 Página de Demonstração

Acesse: **`http://localhost:3003/design`**

Veja todos os componentes em ação com exemplos práticos de uso.

---

## 📞 Suporte

**Desenvolvido por:** Vinícius Bastos  
**Site:** https://midias.me  
**Projeto:** Guia Lafaiete

---

## 📝 Notas Finais

- ✅ Todos os componentes são **mobile-first**
- ✅ Classes Tailwind podem ser usadas normalmente
- ✅ Design System CSS é **complementar** ao Tailwind
- ✅ Compatibilidade com classes antigas **garantida**
- ✅ Performance otimizada (CSS puro, sem JS)

**Última atualização:** 24/11/2025
