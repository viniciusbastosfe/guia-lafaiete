-- DEBUG - Verificar dados e acesso
-- Execute no Supabase SQL Editor

-- 1. Verificar se RLS está desabilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('events', 'companies', 'profiles', 'cities', 'company_categories')
ORDER BY tablename;

-- 2. Contar dados em cada tabela
SELECT 'events' as tabela, COUNT(*) as total FROM events
UNION ALL
SELECT 'companies', COUNT(*) FROM companies
UNION ALL
SELECT 'profiles', COUNT(*) FROM profiles
UNION ALL
SELECT 'cities', COUNT(*) FROM cities
UNION ALL
SELECT 'company_categories', COUNT(*) FROM company_categories;

-- 3. Verificar usuário admin
SELECT id, email, is_admin FROM users WHERE is_admin = true;

-- 4. Verificar se há eventos ativos
SELECT id, title, is_active, is_featured FROM events LIMIT 5;

-- 5. Verificar se há empresas ativas
SELECT id, name, is_active, is_featured FROM companies LIMIT 5;

-- 6. Verificar variáveis de ambiente (se possível)
-- SELECT current_setting('app.settings', true);

-- 7. Testar consulta simples
SELECT 1 as test_connection;
