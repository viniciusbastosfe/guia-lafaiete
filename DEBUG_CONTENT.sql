-- DEBUG - Verificar conteúdo do site
-- Execute no Supabase SQL Editor

-- 1. Verificar se RLS está ativo
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('events', 'companies', 'profiles', 'cities', 'company_categories')
ORDER BY tablename;

-- 2. Desabilitar RLS se estiver ativo
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE company_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE cities DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- 3. Verificar eventos existentes
SELECT id, title, is_active, is_featured, start_datetime 
FROM events 
WHERE is_active = true 
ORDER BY start_datetime ASC;

-- 4. Verificar empresas existentes
SELECT id, name, is_active, is_featured 
FROM companies 
WHERE is_active = true 
ORDER BY name ASC;

-- 5. Verificar categorias existentes
SELECT id, name, slug 
FROM company_categories 
ORDER BY name ASC;

-- 6. Verificar cidades existentes
SELECT id, name 
FROM cities 
ORDER BY name ASC;

-- 7. Se não houver eventos, adicionar eventos básicos
INSERT INTO events (
  id, title, description, location_name, start_datetime, end_datetime, 
  is_active, is_featured, cover_image_url, created_at, updated_at
) VALUES
  (
    gen_random_uuid(),
    'Festa de São João 2025',
    'Maior festa junina da região com música, comidas típicas e muita tradição.',
    'Parque de Exposições',
    '2025-06-24 18:00:00',
    '2025-06-24 23:00:00',
    true,
    true,
    'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Show de Rock Nacional',
    'Banda de renome nacional vem tocar em Conselheiro Lafaiete.',
    'Praça Central',
    '2025-12-15 20:00:00',
    '2025-12-15 23:30:00',
    true,
    true,
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
    NOW(),
    NOW()
  );

-- 8. Se não houver categorias, adicionar categorias básicas
INSERT INTO company_categories (id, name, slug, created_at, updated_at) VALUES
  (gen_random_uuid(), 'Restaurantes', 'restaurantes', NOW(), NOW()),
  (gen_random_uuid(), 'Comércio', 'comercio', NOW(), NOW()),
  (gen_random_uuid(), 'Serviços', 'servicos', NOW(), NOW()),
  (gen_random_uuid(), 'Entretenimento', 'entretenimento', NOW(), NOW()),
  (gen_random_uuid(), 'Saúde', 'saude', NOW(), NOW()),
  (gen_random_uuid(), 'Educação', 'educacao', NOW(), NOW());

-- 9. Se não houver empresas, adicionar empresas básicas
-- Primeiro, pegar IDs das categorias
DO $$
DECLARE
  cat_restaurantes UUID;
  cat_comercio UUID;
BEGIN
  SELECT id INTO cat_restaurantes FROM company_categories WHERE slug = 'restaurantes' LIMIT 1;
  SELECT id INTO cat_comercio FROM company_categories WHERE slug = 'comercio' LIMIT 1;
  
  IF cat_restaurantes IS NOT NULL THEN
    INSERT INTO companies (
      id, name, description, logo_url, is_active, is_featured, 
      company_category_id, created_at, updated_at
    ) VALUES (
      gen_random_uuid(),
      'Restaurante Sabor Mineiro',
      'O melhor da comida mineira tradicional em Conselheiro Lafaiete.',
      null,
      true,
      true,
      cat_restaurantes,
      NOW(),
      NOW()
    );
  END IF;
  
  IF cat_comercio IS NOT NULL THEN
    INSERT INTO companies (
      id, name, description, logo_url, is_active, is_featured, 
      company_category_id, created_at, updated_at
    ) VALUES (
      gen_random_uuid(),
      'Supermercado Preço Bom',
      'Atendimento completo e produtos frescos para sua família.',
      null,
      true,
      true,
      cat_comercio,
      NOW(),
      NOW()
    );
  END IF;
END $$;

-- 10. Verificar resultado final
SELECT 'Eventos' as tabela, COUNT(*) as total FROM events WHERE is_active = true
UNION ALL
SELECT 'Empresas', COUNT(*) FROM companies WHERE is_active = true
UNION ALL
SELECT 'Categorias', COUNT(*) FROM company_categories
UNION ALL
SELECT 'Cidades', COUNT(*) FROM cities;
