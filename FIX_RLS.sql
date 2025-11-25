-- DESABILITAR RLS COMPLETAMENTE
-- Execute este script no Supabase SQL Editor

-- 1. Desabilitar RLS em todas as tabelas
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE cities DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE company_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE giveaways DISABLE ROW LEVEL SECURITY;
ALTER TABLE banners DISABLE ROW LEVEL SECURITY;
ALTER TABLE api_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE banner_clicks DISABLE ROW LEVEL SECURITY;
ALTER TABLE banner_views DISABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activity_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE event_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE giveaway_entries DISABLE ROW LEVEL SECURITY;
ALTER TABLE profile_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_tag_assignments DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_tags DISABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_messages DISABLE ROW LEVEL SECURITY;

-- 2. Verificar se RLS foi desabilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- 3. Verificar dados
SELECT 'events' as tabela, COUNT(*) as total FROM events
UNION ALL
SELECT 'companies', COUNT(*) FROM companies
UNION ALL
SELECT 'profiles', COUNT(*) FROM profiles
UNION ALL
SELECT 'cities', COUNT(*) FROM cities
UNION ALL
SELECT 'company_categories', COUNT(*) FROM company_categories;

-- 4. Verificar usuário admin
SELECT id, email, is_admin FROM users WHERE is_admin = true;
