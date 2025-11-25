-- Adicionar eventos de teste para o Hero
-- Execute no Supabase SQL Editor

-- Verificar eventos existentes
SELECT COUNT(*) as total_events FROM events WHERE is_active = true;

-- Adicionar eventos de teste se não existirem
INSERT INTO events (
  id, title, description, location_name, start_datetime, end_datetime, 
  is_active, is_featured, cover_image_url, created_at, updated_at
) VALUES
  (
    gen_random_uuid(),
    'Festa de São João 2025',
    'Maior festa junina da região com música, comidas típicas e muita tradição. Venha celebrar o São João com a gente!',
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
    'Banda de renome nacional vem tocar em Conselheiro Lafaiete. Não perca essa noite de rock!',
    'Praça Central',
    '2025-12-15 20:00:00',
    '2025-12-15 23:30:00',
    true,
    true,
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Feira de Artesanato',
    'Exposição e venda de artesanato local com mais de 50 expositores. Apoie os produtores da nossa região!',
    'Centro Cultural',
    '2025-11-30 09:00:00',
    '2025-11-30 18:00:00',
    true,
    false,
    'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800',
    NOW(),
    NOW()
  )
ON CONFLICT DO NOTHING;

-- Verificar se foram adicionados
SELECT title, location_name, start_datetime, is_active, is_featured 
FROM events 
WHERE is_active = true 
ORDER BY start_datetime ASC 
LIMIT 5;
