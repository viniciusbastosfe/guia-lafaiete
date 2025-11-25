-- Guia Lafaiete v2.0.0 - Dados de Exemplo
-- Autor: Vinícius Bastos (https://midias.me)

-- EVENTOS (10 itens)
INSERT INTO events (title, description, start_datetime, end_datetime, location_name, city_id, cover_image_url, is_featured, is_active) 
SELECT 'Festival de Música', 'Grande festival com bandas locais', NOW() + INTERVAL '10 days', NOW() + INTERVAL '10 days' + INTERVAL '8 hours', 'Praça da Matriz', id, 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800', true, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO events (title, description, start_datetime, end_datetime, location_name, city_id, is_featured, is_active) 
SELECT 'Workshop de Fotografia', 'Aprenda técnicas profissionais', NOW() + INTERVAL '15 days', NOW() + INTERVAL '15 days' + INTERVAL '4 hours', 'Centro Cultural', id, true, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO events (title, description, start_datetime, end_datetime, location_name, city_id, is_active) 
SELECT 'Feira de Artesanato', 'Exposição de artesanato local', NOW() + INTERVAL '7 days', NOW() + INTERVAL '9 days', 'Praça Central', id, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO events (title, description, start_datetime, end_datetime, location_name, city_id, is_active) 
SELECT 'Show de Stand-Up', 'Noite de humor', NOW() + INTERVAL '20 days', NOW() + INTERVAL '20 days' + INTERVAL '3 hours', 'Teatro Municipal', id, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO events (title, description, start_datetime, end_datetime, location_name, city_id, is_online, is_active) 
SELECT 'Webinar Marketing Digital', 'Estratégias de marketing', NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days' + INTERVAL '2 hours', 'Online', id, true, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO events (title, description, start_datetime, end_datetime, location_name, city_id, is_active) 
SELECT 'Corrida Beneficente 5K', 'Corrida em prol de caridade', NOW() + INTERVAL '30 days', NOW() + INTERVAL '30 days' + INTERVAL '3 hours', 'Parque Municipal', id, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO events (title, description, start_datetime, end_datetime, location_name, city_id, is_featured, is_active) 
SELECT 'Festival Gastronômico', 'Degustação de pratos típicos', NOW() + INTERVAL '25 days', NOW() + INTERVAL '27 days', 'Praça Central', id, true, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO events (title, description, start_datetime, end_datetime, location_name, city_id, is_active) 
SELECT 'Exposição de Arte', 'Arte contemporânea', NOW() + INTERVAL '12 days', NOW() + INTERVAL '42 days', 'Museu', id, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO events (title, description, start_datetime, end_datetime, location_name, city_id, is_active) 
SELECT 'Noite de Samba', 'Roda de samba', NOW() + INTERVAL '8 days', NOW() + INTERVAL '8 days' + INTERVAL '5 hours', 'Bar do Zé', id, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO events (title, description, start_datetime, end_datetime, location_name, city_id, is_active) 
SELECT 'Palestra Empreendedorismo', 'Experiências sobre empreender', NOW() + INTERVAL '18 days', NOW() + INTERVAL '18 days' + INTERVAL '3 hours', 'Auditório', id, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

-- EMPRESAS (10 itens)
INSERT INTO companies (name, description, address, city_id, category_id, whatsapp, is_featured, is_active)
SELECT 'Restaurante Sabor Mineiro', 'Comida mineira autêntica', 'Rua das Flores, 123', c.id, cat.id, '(31) 99999-1234', true, true FROM cities c, company_categories cat WHERE c.name = 'Conselheiro Lafaiete' AND cat.name = 'Restaurantes' LIMIT 1;

INSERT INTO companies (name, description, address, city_id, category_id, whatsapp, is_featured, is_active)
SELECT 'Padaria Pão Quente', 'Pães fresquinhos', 'Av. Principal, 456', c.id, cat.id, '(31) 99999-5678', true, true FROM cities c, company_categories cat WHERE c.name = 'Conselheiro Lafaiete' AND cat.name = 'Alimentação' LIMIT 1;

INSERT INTO companies (name, description, address, city_id, category_id, whatsapp, is_active)
SELECT 'Academia Corpo em Forma', 'Academia completa', 'Rua da Saúde, 789', c.id, cat.id, '(31) 99999-9012', true FROM cities c, company_categories cat WHERE c.name = 'Conselheiro Lafaiete' AND cat.name = 'Saúde e Bem-estar' LIMIT 1;

INSERT INTO companies (name, description, address, city_id, category_id, whatsapp, is_featured, is_active)
SELECT 'Boutique Estilo & Charme', 'Moda feminina', 'Rua do Comércio, 321', c.id, cat.id, '(31) 99999-3456', true, true FROM cities c, company_categories cat WHERE c.name = 'Conselheiro Lafaiete' AND cat.name = 'Moda e Vestuário' LIMIT 1;

INSERT INTO companies (name, description, address, city_id, category_id, whatsapp, is_active)
SELECT 'Auto Mecânica Rápida', 'Serviços automotivos', 'Av. Industrial, 555', c.id, cat.id, '(31) 99999-7890', true FROM cities c, company_categories cat WHERE c.name = 'Conselheiro Lafaiete' AND cat.name = 'Automotivo' LIMIT 1;

INSERT INTO companies (name, description, address, city_id, category_id, whatsapp, is_active)
SELECT 'Salão Glamour', 'Beleza e estética', 'Rua da Beleza, 111', c.id, cat.id, '(31) 99999-2468', true FROM cities c, company_categories cat WHERE c.name = 'Conselheiro Lafaiete' AND cat.name = 'Beleza e Estética' LIMIT 1;

INSERT INTO companies (name, description, address, city_id, category_id, whatsapp, is_featured, is_active)
SELECT 'Farmácia Saúde Total', 'Medicamentos e perfumaria', 'Praça Central, 222', c.id, cat.id, '(31) 99999-1357', true, true FROM cities c, company_categories cat WHERE c.name = 'Conselheiro Lafaiete' AND cat.name = 'Saúde e Bem-estar' LIMIT 1;

INSERT INTO companies (name, description, address, city_id, category_id, whatsapp, is_active)
SELECT 'Pizzaria Forno a Lenha', 'Pizzas artesanais', 'Rua dos Sabores, 333', c.id, cat.id, '(31) 99999-9753', true FROM cities c, company_categories cat WHERE c.name = 'Conselheiro Lafaiete' AND cat.name = 'Restaurantes' LIMIT 1;

INSERT INTO companies (name, description, address, city_id, category_id, whatsapp, is_active)
SELECT 'Livraria Ler & Saber', 'Livros e papelaria', 'Av. Cultura, 444', c.id, cat.id, '(31) 99999-8642', true FROM cities c, company_categories cat WHERE c.name = 'Conselheiro Lafaiete' AND cat.name = 'Educação' LIMIT 1;

INSERT INTO companies (name, description, address, city_id, category_id, whatsapp, is_featured, is_active)
SELECT 'Pet Shop Amigo Fiel', 'Tudo para seu pet', 'Rua dos Animais, 666', c.id, cat.id, '(31) 99999-5432', true, true FROM cities c, company_categories cat WHERE c.name = 'Conselheiro Lafaiete' AND cat.name = 'Pet Shop' LIMIT 1;

-- PERFIS (10 itens - 5 influencers + 5 músicos)
INSERT INTO profiles (name, bio, type, city_id, is_featured, is_active)
SELECT 'Ana Paula Silva', 'Influenciadora de moda', 'influencer', id, true, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO profiles (name, bio, type, city_id, is_featured, is_active)
SELECT 'Carlos Mendes', 'Gastronomia e viagens', 'influencer', id, true, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO profiles (name, bio, type, city_id, is_active)
SELECT 'Juliana Costa', 'Fitness e bem-estar', 'influencer', id, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO profiles (name, bio, type, city_id, is_featured, is_active)
SELECT 'Pedro Henrique', 'Tech e games', 'influencer', id, true, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO profiles (name, bio, type, city_id, is_active)
SELECT 'Mariana Oliveira', 'Maternidade', 'influencer', id, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO profiles (name, bio, type, city_id, is_featured, is_active)
SELECT 'Banda Raízes do Sertão', 'Sertanejo raiz', 'musician', id, true, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO profiles (name, bio, type, city_id, is_featured, is_active)
SELECT 'DJ Marcos Beat', 'DJ profissional', 'musician', id, true, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO profiles (name, bio, type, city_id, is_active)
SELECT 'Grupo Samba de Raiz', 'Samba autêntico', 'musician', id, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO profiles (name, bio, type, city_id, is_featured, is_active)
SELECT 'Lívia Fernandes', 'MPB e música popular', 'musician', id, true, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

INSERT INTO profiles (name, bio, type, city_id, is_active)
SELECT 'Banda Rock da Cidade', 'Rock nacional', 'musician', id, true FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;

-- SORTEIOS (10 itens)
INSERT INTO giveaways (title, prize, start_datetime, end_datetime, draw_datetime, is_published)
VALUES 
('Sorteio iPhone 15', 'iPhone 15 Pro Max', NOW(), NOW() + INTERVAL '30 days', NOW() + INTERVAL '32 days', true),
('Vale-Compras R$ 500', 'Vale R$ 500', NOW() - INTERVAL '10 days', NOW() + INTERVAL '20 days', NOW() + INTERVAL '22 days', true),
('Kit Beleza', 'Kit Premium', NOW(), NOW() + INTERVAL '15 days', NOW() + INTERVAL '17 days', true),
('Jantar Romântico', 'Jantar para 2', NOW() - INTERVAL '5 days', NOW() + INTERVAL '10 days', NOW() + INTERVAL '12 days', true),
('Notebook Dell', 'Notebook Dell Inspiron', NOW(), NOW() + INTERVAL '45 days', NOW() + INTERVAL '47 days', true),
('Cesta de Natal', 'Cesta Premium', NOW() - INTERVAL '20 days', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day', true),
('Sessão de Fotos', 'Fotos Profissionais', NOW(), NOW() + INTERVAL '25 days', NOW() + INTERVAL '27 days', true),
('Ingresso Show', '2 Ingressos VIP', NOW() + INTERVAL '5 days', NOW() + INTERVAL '35 days', NOW() + INTERVAL '37 days', true),
('Curso Marketing', 'Curso Completo', NOW() - INTERVAL '15 days', NOW() + INTERVAL '5 days', NOW() + INTERVAL '7 days', true),
('Kit Churrasco', 'Kit Premium', NOW(), NOW() + INTERVAL '40 days', NOW() + INTERVAL '42 days', true);

-- BANNERS (10 itens)
INSERT INTO banners (title, image_url, link_url, position, is_active)
VALUES 
('Banner Festival', 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200', '/eventos', 'home_top', true),
('Promoção Restaurante', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200', '/empresas', 'home_middle', true),
('Academia Matrícula', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200', '/empresas', 'home_bottom', true),
('Sorteio iPhone', 'https://images.unsplash.com/photo-1592286927505-2fd0f3a1f3b4?w=1200', '/sorteios', 'home_top', true),
('Boutique Coleção', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200', '/empresas', 'home_middle', true),
('Festival Gastronômico', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200', '/eventos', 'home_bottom', true),
('Curso Online', 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200', '/eventos', 'home_top', true),
('Pet Shop Promoção', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200', '/empresas', 'home_middle', true),
('Show Nacional', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200', '/eventos', 'home_top', true),
('Farmácia Desconto', 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=1200', '/empresas', 'home_bottom', true);
