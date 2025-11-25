-- Guia Lafaiete v2.0.0
-- Políticas de Row Level Security (RLS)
-- Autor: Vinícius Bastos (https://midias.me)

-- Habilitar RLS em todas as tabelas
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE banner_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE banner_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE giveaways ENABLE ROW LEVEL SECURITY;
ALTER TABLE giveaway_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tag_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activity_logs ENABLE ROW LEVEL SECURITY;

-- Políticas para cities (leitura pública)
CREATE POLICY "Public read access to cities" ON cities FOR SELECT USING (true);

-- Políticas para users
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can update all users" ON users FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para categorias (leitura pública)
CREATE POLICY "Public read access to event_categories" ON event_categories FOR SELECT USING (true);
CREATE POLICY "Public read access to company_categories" ON company_categories FOR SELECT USING (true);
CREATE POLICY "Public read access to profile_categories" ON profile_categories FOR SELECT USING (true);

-- Políticas para events
CREATE POLICY "Public read access to active events" ON events FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage all events" ON events FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para companies
CREATE POLICY "Public read access to active companies" ON companies FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage all companies" ON companies FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para profiles
CREATE POLICY "Public read access to active profiles" ON profiles FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage all profiles" ON profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para banners
CREATE POLICY "Public read access to active banners" ON banners FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage all banners" ON banners FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para banner_views e banner_clicks (inserção pública)
CREATE POLICY "Anyone can insert banner views" ON banner_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert banner clicks" ON banner_clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view banner analytics" ON banner_views FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can view banner click analytics" ON banner_clicks FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para giveaways
CREATE POLICY "Public read access to published giveaways" ON giveaways FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage all giveaways" ON giveaways FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para giveaway_entries
CREATE POLICY "Users can view own entries" ON giveaway_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own entries" ON giveaway_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all entries" ON giveaway_entries FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para suggestions
CREATE POLICY "Users can view own suggestions" ON suggestions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert suggestions" ON suggestions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all suggestions" ON suggestions FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para user_tags
CREATE POLICY "Admins can manage user tags" ON user_tags FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para user_tag_assignments
CREATE POLICY "Admins can manage tag assignments" ON user_tag_assignments FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para chat_messages
CREATE POLICY "Users can view own chat messages" ON chat_messages FOR SELECT USING (
    auth.uid() = user_id OR auth.uid() = sender_id
);
CREATE POLICY "Users can insert own chat messages" ON chat_messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id
);
CREATE POLICY "Admins can view all chat messages" ON chat_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can insert chat messages" ON chat_messages FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para user_notifications
CREATE POLICY "Users can view own notifications" ON user_notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON user_notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all notifications" ON user_notifications FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para whatsapp_messages
CREATE POLICY "Admins can manage whatsapp messages" ON whatsapp_messages FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para api_settings
CREATE POLICY "Admins can manage api settings" ON api_settings FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas para crm_activity_logs
CREATE POLICY "Admins can view activity logs" ON crm_activity_logs FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can insert activity logs" ON crm_activity_logs FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
