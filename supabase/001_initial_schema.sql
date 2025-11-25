-- Guia Lafaiete v2.0.0
-- Autor: Vinícius Bastos (https://midias.me)
-- Data: 24/11/2024 11:41 UTC-03:00
-- Script de criação do schema inicial do banco de dados

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Tabela de cidades
CREATE TABLE IF NOT EXISTS cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    state CHAR(2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de usuários (integrada com Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    is_admin BOOLEAN DEFAULT FALSE,
    city_id UUID REFERENCES cities(id),
    phone VARCHAR(20),
    whatsapp VARCHAR(20),
    avatar_url TEXT,
    notes TEXT,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de categorias de eventos
CREATE TABLE IF NOT EXISTS event_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon_url TEXT,
    color_hex VARCHAR(7) DEFAULT '#F31100'
);

-- Tabela de eventos
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id UUID NOT NULL REFERENCES cities(id),
    category_id UUID REFERENCES event_categories(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ,
    location_name VARCHAR(200),
    address VARCHAR(255),
    is_online BOOLEAN DEFAULT FALSE,
    cover_image_url TEXT,
    ticket_url TEXT,
    instagram_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para eventos
CREATE INDEX idx_events_start_datetime ON events(start_datetime);
CREATE INDEX idx_events_city ON events(city_id);
CREATE INDEX idx_events_featured ON events(is_featured);
CREATE INDEX idx_events_active ON events(is_active);

-- Tabela de categorias de empresas
CREATE TABLE IF NOT EXISTS company_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon_url TEXT,
    color_hex VARCHAR(7) DEFAULT '#F31100'
);

-- Tabela de empresas
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id UUID NOT NULL REFERENCES cities(id),
    category_id UUID REFERENCES company_categories(id),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    logo_url TEXT,
    instagram_url TEXT,
    website_url TEXT,
    whatsapp VARCHAR(20),
    address VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para empresas
CREATE INDEX idx_companies_city ON companies(city_id);
CREATE INDEX idx_companies_featured ON companies(is_featured);
CREATE INDEX idx_companies_active ON companies(is_active);

-- Tabela de categorias de perfis
CREATE TABLE IF NOT EXISTS profile_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    icon_url TEXT,
    color_hex VARCHAR(7) DEFAULT '#F31100'
);

-- Tabela de perfis (influenciadores e músicos)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id UUID NOT NULL REFERENCES cities(id),
    category_id UUID REFERENCES profile_categories(id),
    type VARCHAR(20) NOT NULL CHECK (type IN ('influencer', 'musician')),
    name VARCHAR(200) NOT NULL,
    bio TEXT,
    instagram_url TEXT,
    avatar_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para perfis
CREATE INDEX idx_profiles_type ON profiles(type);
CREATE INDEX idx_profiles_city ON profiles(city_id);
CREATE INDEX idx_profiles_featured ON profiles(is_featured);

-- Tabela de banners
CREATE TABLE IF NOT EXISTS banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    image_url TEXT NOT NULL,
    link_url TEXT,
    position VARCHAR(50) DEFAULT 'home_middle' CHECK (position IN ('home_top', 'home_middle', 'home_bottom')),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de visualizações de banners
CREATE TABLE IF NOT EXISTS banner_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    banner_id UUID NOT NULL REFERENCES banners(id) ON DELETE CASCADE,
    user_ip VARCHAR(45),
    user_agent TEXT,
    viewed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_banner_views_banner ON banner_views(banner_id);
CREATE INDEX idx_banner_views_date ON banner_views(viewed_at);

-- Tabela de cliques em banners
CREATE TABLE IF NOT EXISTS banner_clicks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    banner_id UUID NOT NULL REFERENCES banners(id) ON DELETE CASCADE,
    user_ip VARCHAR(45),
    user_agent TEXT,
    clicked_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_banner_clicks_banner ON banner_clicks(banner_id);
CREATE INDEX idx_banner_clicks_date ON banner_clicks(clicked_at);

-- Tabela de sorteios
CREATE TABLE IF NOT EXISTS giveaways (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    prize VARCHAR(255),
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ NOT NULL,
    draw_datetime TIMESTAMPTZ NOT NULL,
    is_published BOOLEAN DEFAULT TRUE,
    result_published BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de participações em sorteios
CREATE TABLE IF NOT EXISTS giveaway_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    giveaway_id UUID NOT NULL REFERENCES giveaways(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_winner BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(giveaway_id, user_id)
);

-- Tabela de sugestões
CREATE TABLE IF NOT EXISTS suggestions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    type VARCHAR(20) NOT NULL CHECK (type IN ('event', 'company', 'profile')),
    data_json JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de tags de usuários
CREATE TABLE IF NOT EXISTS user_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(7) DEFAULT '#3B82F6',
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de atribuição de tags a usuários
CREATE TABLE IF NOT EXISTS user_tag_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES user_tags(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, tag_id)
);

-- Tabela de mensagens do chat
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id),
    message TEXT NOT NULL,
    is_from_admin BOOLEAN DEFAULT FALSE,
    is_from_ai BOOLEAN DEFAULT FALSE,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_user ON chat_messages(user_id);
CREATE INDEX idx_chat_unread ON chat_messages(is_read);
CREATE INDEX idx_chat_created ON chat_messages(created_at);

-- Tabela de notificações de usuários
CREATE TABLE IF NOT EXISTS user_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    link_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON user_notifications(user_id);
CREATE INDEX idx_notifications_unread ON user_notifications(is_read);

-- Tabela de mensagens WhatsApp
CREATE TABLE IF NOT EXISTS whatsapp_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    phone_number VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'sent',
    sent_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de configurações de API
CREATE TABLE IF NOT EXISTS api_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    description TEXT,
    updated_by UUID REFERENCES users(id),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de logs de atividades do CRM
CREATE TABLE IF NOT EXISTS crm_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    admin_id UUID NOT NULL REFERENCES users(id),
    action_type VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_crm_logs_user ON crm_activity_logs(user_id);
CREATE INDEX idx_crm_logs_admin ON crm_activity_logs(admin_id);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_giveaways_updated_at BEFORE UPDATE ON giveaways
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
