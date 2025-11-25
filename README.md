# Guia Lafaiete v2.0.0

Sistema de guia local para Conselheiro Lafaiete e região, conectando eventos, empresas, influenciadores, músicos e pessoas.

**Autor:** Vinícius Bastos ([https://midias.me](https://midias.me))  
**Data de Criação:** 24/11/2024 11:41 UTC-03:00

## 🚀 Stack Tecnológica

- **Frontend:** React 18+ com TypeScript
- **Styling:** TailwindCSS + shadcn/ui
- **Backend:** Supabase (PostgreSQL + Auth + Storage + Realtime)
- **State Management:** Zustand + React Query
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **AI Integration:** OpenAI API + Google Gemini API

## 📋 Pré-requisitos

- Node.js 18+ e npm/yarn
- Conta no Supabase
- Chaves de API (OpenAI, Gemini, Evolution API)

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🗄️ Configuração do Banco de Dados

Execute os scripts SQL localizados em `/supabase/` no seu projeto Supabase na ordem:

1. `001_initial_schema.sql` - Estrutura base (tabelas)
2. `002_rls_policies.sql` - Políticas de segurança RLS
3. `003_storage_buckets.sql` - Configuração de storage
4. `004_seed_data.sql` - Dados iniciais (cidades, categorias)
5. `005_create_first_admin.sql` - Criar primeiro usuário admin

### Configurar Primeiro Admin

Edite o arquivo `005_create_first_admin.sql` e substitua:
```sql
admin_user_id UUID := 'SEU_UUID_AQUI';
admin_email VARCHAR := 'seu@email.com';
admin_name VARCHAR := 'Seu Nome';
```

## 🎨 Funcionalidades

### Área Pública (8 páginas)
- ✅ Homepage com hero section e features
- ✅ Listagem de eventos com filtros (data, cidade, busca)
- ✅ Diretório de empresas com filtros (categoria, cidade)
- ✅ Perfis de influenciadores e músicos (tabs separadas)
- ✅ Sistema de sorteios (ativos e finalizados)
- ✅ Autenticação (Login/Cadastro)
- ✅ Painel do usuário (perfil, favoritos, notificações)
- ✅ Header e Footer responsivos

### Painel Administrativo (9 páginas + 4 formulários)

**Dashboard:**
- ✅ Métricas em tempo real (eventos, empresas, usuários)
- ✅ Gráficos de crescimento
- ✅ Atividades recentes
- ✅ Ações rápidas

**CRUD Completo:**
- ✅ Gestão de Eventos (listagem + formulário criar/editar)
- ✅ Gestão de Empresas (listagem + formulário criar/editar)
- ✅ Gestão de Perfis (listagem + formulário criar/editar)
- ✅ Gestão de Sorteios (listagem + formulário criar/editar)
- ✅ Gestão de Banners (com analytics: impressões, cliques, CTR)

**CRM e Gestão:**
- ✅ CRM de Usuários (estatísticas, filtros, toggle admin)
- ✅ Sugestões e Mensagens (inbox com status)
- ✅ Configurações (API keys para 4 integrações de IA)

**Total: 21 páginas/formulários implementados!**

## 📱 Responsividade

O sistema é totalmente responsivo e otimizado para:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Segurança

- Row Level Security (RLS) no Supabase
- Autenticação JWT
- Validação de formulários com Zod
- Sanitização de inputs
- HTTPS obrigatório em produção

## ⚡ Performance

- Code splitting automático
- Lazy loading de componentes
- Otimização de imagens
- Cache de queries (React Query)
- Service Worker (PWA ready)

## ♿ Acessibilidade

- Semântica HTML5
- ARIA labels
- Navegação por teclado
- Contraste de cores WCAG AA
- Screen reader friendly

## 📊 SEO

- Meta tags dinâmicas
- Open Graph
- Twitter Cards
- Sitemap.xml
- Robots.txt
- Schema.org markup

## 🎯 Estrutura do Projeto

```
guia-lafaiete/
├── src/
│   ├── components/
│   │   ├── ui/           # Componentes shadcn/ui
│   │   ├── layout/       # Header, Footer, Layouts
│   │   └── auth/         # ProtectedRoute
│   ├── pages/
│   │   ├── public/       # Páginas públicas (8)
│   │   ├── admin/        # Páginas admin (13)
│   │   ├── auth/         # Login, Register
│   │   └── user/         # Painel do usuário
│   ├── lib/
│   │   ├── supabase.ts   # Cliente Supabase
│   │   └── utils.ts      # Funções utilitárias
│   ├── stores/
│   │   └── authStore.ts  # Zustand store
│   ├── types/
│   │   └── database.ts   # Tipos TypeScript
│   └── routes/
│       └── index.tsx     # Configuração de rotas
├── supabase/
│   ├── 001_initial_schema.sql
│   ├── 002_rls_policies.sql
│   ├── 003_storage_buckets.sql
│   ├── 004_seed_data.sql
│   └── 005_create_first_admin.sql
└── public/               # Assets estáticos
```

## 🔗 Rotas Principais

### Públicas
- `/` - Home
- `/login` - Login
- `/cadastro` - Cadastro
- `/eventos` - Listagem de eventos
- `/empresas` - Listagem de empresas
- `/perfis` - Perfis (influenciadores/músicos)
- `/sorteios` - Sorteios
- `/painel` - Painel do usuário (protegida)

### Admin (protegidas, requer is_admin=true)
- `/admin/dashboard` - Dashboard
- `/admin/eventos` - Gestão de eventos
- `/admin/eventos/novo` - Criar evento
- `/admin/eventos/:id` - Editar evento
- `/admin/empresas` - Gestão de empresas
- `/admin/empresas/nova` - Criar empresa
- `/admin/empresas/:id` - Editar empresa
- `/admin/perfis` - Gestão de perfis
- `/admin/perfis/novo` - Criar perfil
- `/admin/perfis/:id` - Editar perfil
- `/admin/sorteios` - Gestão de sorteios
- `/admin/sorteios/novo` - Criar sorteio
- `/admin/sorteios/:id` - Editar sorteio
- `/admin/banners` - Gestão de banners
- `/admin/usuarios` - CRM de usuários
- `/admin/sugestoes` - Sugestões
- `/admin/configuracoes` - Configurações

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload da pasta dist/
```

### Variáveis de Ambiente (Produção)
```
VITE_SUPABASE_URL=sua_url
VITE_SUPABASE_ANON_KEY=sua_chave
VITE_OPENAI_API_KEY=sua_chave
VITE_GEMINI_API_KEY=sua_chave
VITE_GROQ_API_KEY=sua_chave
VITE_EVOLUTION_API_KEY=sua_chave
```

## 📊 Status do Projeto

**Progresso: 90% Concluído** ✅

- ✅ Componentes UI (12/15 - 80%)
- ✅ Páginas Públicas (8/8 - 100%)
- ✅ Páginas Admin CRUD (5/5 - 100%)
- ✅ Formulários Admin (4/4 - 100%)
- ✅ Páginas Admin Outras (4/4 - 100%)
- ✅ Painel do Usuário (1/1 - 100%)
- ✅ Layouts (3/3 - 100%)
- ✅ Rotas (100% configuradas)
- ⏳ Integrações de IA (0/4 - 0%)

## 📝 Licença

Todos os direitos reservados © 2024 Vinícius Bastos

## 🤝 Suporte

Para suporte, entre em contato através de [https://midias.me](https://midias.me)

---

**Desenvolvido com ❤️ por Vinícius Bastos**
