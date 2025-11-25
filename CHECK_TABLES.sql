-- Verificar estrutura das tabelas
-- Execute no Supabase SQL Editor

-- Verificar estrutura da tabela events
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'events' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Verificar estrutura da tabela companies
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'companies' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Verificar estrutura da tabela company_categories
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'company_categories' 
AND table_schema = 'public'
ORDER BY ordinal_position;
