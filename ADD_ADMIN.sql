-- Adicionar usuário como admin
-- Execute no Supabase SQL Editor

-- Verificar se o usuário existe
SELECT id, email, is_admin FROM users WHERE id = 'c69f2c48-1fdd-44e8-aff7-a0a88740f5eb';

-- Se não existir, criar o usuário
INSERT INTO users (id, name, email, is_admin)
VALUES (
  'c69f2c48-1fdd-44e8-aff7-a0a88740f5eb',
  'Vinícius Bastos',
  'viniciusbastosfe@gmail.com',
  true
)
ON CONFLICT (id) DO UPDATE SET is_admin = true;

-- Verificar se foi atualizado
SELECT id, name, email, is_admin FROM users WHERE id = 'c69f2c48-1fdd-44e8-aff7-a0a88740f5eb';
