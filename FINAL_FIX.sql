-- FINAL FIX - Adicionar dados básicos (versão mais simples)
-- Execute no Supabase SQL Editor

-- 1. Desabilitar RLS
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE company_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE cities DISABLE ROW LEVEL SECURITY;

-- 2. Limpar dados existentes para evitar duplicatas (ordem correta por foreign keys)
DELETE FROM events WHERE title IN ('Festa de São João 2025', 'Show de Rock Nacional');
DELETE FROM companies WHERE name IN ('Restaurante Sabor Mineiro', 'Supermercado Preço Bom');
-- Deletar empresas que possam estar referencing estas categorias (tentar category_id)
DELETE FROM companies WHERE category_id IN (
  SELECT id FROM company_categories WHERE name IN ('Restaurantes', 'Comércio', 'Serviços', 'Entretenimento')
);
-- Agora pode deletar as categorias
DELETE FROM company_categories WHERE name IN ('Restaurantes', 'Comércio', 'Serviços', 'Entretenimento');

-- 3. Adicionar cidade (verificar se já existe)
INSERT INTO cities (name) 
SELECT 'Conselheiro Lafaiete' 
WHERE NOT EXISTS (SELECT 1 FROM cities WHERE name = 'Conselheiro Lafaiete');

-- 4. Adicionar categorias básicas
INSERT INTO company_categories (name, slug) VALUES
  ('Restaurantes', 'restaurantes'),
  ('Comércio', 'comercio'),
  ('Serviços', 'servicos'),
  ('Entretenimento', 'entretenimento');

-- 5. Adicionar eventos básicos
INSERT INTO events (title, description, location_name, start_datetime, end_datetime, is_active, is_featured, cover_image_url, city_id) 
SELECT 
  'Festa de São João 2025', 
  'Maior festa junina da região com música, comidas típicas e muita tradição', 
  'Parque de Exposições', 
  '2025-06-24 18:00:00', 
  '2025-06-24 23:00:00', 
  true, 
  true, 
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800', 
  id
FROM cities 
WHERE name = 'Conselheiro Lafaiete' 
LIMIT 1;

INSERT INTO events (title, description, location_name, start_datetime, end_datetime, is_active, is_featured, cover_image_url, city_id) 
SELECT 
  'Show de Rock Nacional', 
  'Banda de renome nacional vem tocar em Conselheiro Lafaiete', 
  'Praça Central', 
  '2025-12-15 20:00:00', 
  '2025-12-15 23:30:00', 
  true, 
  true, 
  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800', 
  id
FROM cities 
WHERE name = 'Conselheiro Lafaiete' 
LIMIT 1;

-- 6. Adicionar empresas básicas
INSERT INTO companies (name, description, is_active, is_featured, city_id) 
SELECT 
  'Restaurante Sabor Mineiro', 
  'O melhor da comida mineira tradicional em Conselheiro Lafaiete', 
  true, 
  true, 
  id
FROM cities 
WHERE name = 'Conselheiro Lafaiete' 
LIMIT 1;

INSERT INTO companies (name, description, is_active, is_featured, city_id) 
SELECT 
  'Supermercado Preço Bom', 
  'Atendimento completo e produtos frescos para sua família', 
  true, 
  true, 
  id
FROM cities 
WHERE name = 'Conselheiro Lafaiete' 
LIMIT 1;

-- 7. Verificar resultado
SELECT 'Eventos' as tabela, COUNT(*) as total FROM events WHERE is_active = true
UNION ALL
SELECT 'Empresas', COUNT(*) FROM companies WHERE is_active = true
UNION ALL
SELECT 'Categorias', COUNT(*) FROM company_categories
UNION ALL
SELECT 'Cidades', COUNT(*) FROM cities;
