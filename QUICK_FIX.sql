-- QUICK FIX - Adicionar dados básicos
-- Execute no Supabase SQL Editor

-- 1. Desabilitar RLS
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE companies DISABLE ROW LEVEL SECURITY;
ALTER TABLE company_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE cities DISABLE ROW LEVEL SECURITY;

-- 2. Adicionar categorias básicas
INSERT INTO company_categories (name, slug, created_at, updated_at) VALUES
  ('Restaurantes', 'restaurantes', NOW(), NOW()),
  ('Comércio', 'comercio', NOW(), NOW()),
  ('Serviços', 'servicos', NOW(), NOW()),
  ('Entretenimento', 'entretenimento', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- 3. Adicionar eventos básicos
INSERT INTO events (title, description, location_name, start_datetime, end_datetime, is_active, is_featured, cover_image_url, created_at, updated_at) VALUES
  ('Festa de São João 2025', 'Maior festa junina da região', 'Parque de Exposições', '2025-06-24 18:00:00', '2025-06-24 23:00:00', true, true, 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800', NOW(), NOW()),
  ('Show de Rock Nacional', 'Banda de renome nacional vem tocar', 'Praça Central', '2025-12-15 20:00:00', '2025-12-15 23:30:00', true, true, 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- 4. Adicionar empresas básicas
INSERT INTO companies (name, description, is_active, is_featured, created_at, updated_at) VALUES
  ('Restaurante Sabor Mineiro', 'O melhor da comida mineira tradicional', true, true, NOW(), NOW()),
  ('Supermercado Preço Bom', 'Atendimento completo e produtos frescos', true, true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- 5. Verificar resultado
SELECT 'Eventos' as tabela, COUNT(*) as total FROM events WHERE is_active = true
UNION ALL
SELECT 'Empresas', COUNT(*) FROM companies WHERE is_active = true
UNION ALL
SELECT 'Categorias', COUNT(*) FROM company_categories;
