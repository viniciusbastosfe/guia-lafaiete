-- Script para verificar o estado do banco de dados
-- Execute no Supabase SQL Editor

-- 1. Verificar se as tabelas existem
SELECT 
    schemaname,
    tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- 2. Contar registros em cada tabela
SELECT 'cities' as tabela, COUNT(*) as total FROM cities
UNION ALL
SELECT 'company_categories', COUNT(*) FROM company_categories
UNION ALL
SELECT 'events', COUNT(*) FROM events
UNION ALL
SELECT 'companies', COUNT(*) FROM companies
UNION ALL
SELECT 'profiles', COUNT(*) FROM profiles
UNION ALL
SELECT 'giveaways', COUNT(*) FROM giveaways
UNION ALL
SELECT 'banners', COUNT(*) FROM banners
UNION ALL
SELECT 'users', COUNT(*) FROM users;

-- 3. Verificar se a cidade existe
SELECT * FROM cities WHERE name = 'Conselheiro Lafaiete';

-- 4. Verificar categorias de empresas
SELECT * FROM company_categories;

-- 5. Ver eventos (se houver)
SELECT id, title, is_active FROM events LIMIT 5;

-- 6. Ver empresas (se houver)
SELECT id, name, is_active FROM companies LIMIT 5;

-- 7. Ver perfis (se houver)
SELECT id, name, type, is_active FROM profiles LIMIT 5;
