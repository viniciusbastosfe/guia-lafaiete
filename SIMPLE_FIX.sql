-- SIMPLE FIX - Adicionar dados básicos (sem timestamps)
-- Execute no Supabase SQL Editor

-- 1. Desabilitar RLS
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE company_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE cities DISABLE ROW LEVEL SECURITY;

-- 2. Adicionar cidade primeiro
INSERT INTO cities (name) VALUES ('Conselheiro Lafaiete')
ON CONFLICT DO NOTHING;

-- 3. Adicionar categorias básicas (apenas colunas essenciais)
INSERT INTO company_categories (name, slug) VALUES
  ('Restaurantes', 'restaurantes'),
  ('Comércio', 'comercio'),
  ('Serviços', 'servicos'),
  ('Entretenimento', 'entretenimento')
ON CONFLICT DO NOTHING;

-- 4. Adicionar eventos básicos (com city_id)
INSERT INTO events (title, description, location_name, start_datetime, end_datetime, is_active, is_featured, cover_image_url, city_id) VALUES
  ('Festa de São João 2025', 'Maior festa junina da região com música, comidas típicas e muita tradição', 'Parque de Exposições', '2025-06-24 18:00:00', '2025-06-24 23:00:00', true, true, 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800', (SELECT id FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1)),
  ('Show de Rock Nacional', 'Banda de renome nacional vem tocar em Conselheiro Lafaiete', 'Praça Central', '2025-12-15 20:00:00', '2025-12-15 23:30:00', true, true, 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800', (SELECT id FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1))
ON CONFLICT DO NOTHING;

-- 5. Adicionar empresas básicas (com city_id)
INSERT INTO companies (name, description, is_active, is_featured, city_id) VALUES
  ('Restaurante Sabor Mineiro', 'O melhor da comida mineira tradicional em Conselheiro Lafaiete', true, true, (SELECT id FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1)),
  ('Supermercado Preço Bom', 'Atendimento completo e produtos frescos para sua família', true, true, (SELECT id FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1))
ON CONFLICT DO NOTHING;

-- 6. Verificar resultado
SELECT 'Eventos' as tabela, COUNT(*) as total FROM events WHERE is_active = true
UNION ALL
SELECT 'Empresas', COUNT(*) FROM companies WHERE is_active = true
UNION ALL
SELECT 'Categorias', COUNT(*) FROM company_categories
UNION ALL
SELECT 'Cidades', COUNT(*) FROM cities;
