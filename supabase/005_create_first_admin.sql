-- Guia Lafaiete v2.0.0
-- Script para criar o primeiro usuário administrador
-- Autor: Vinícius Bastos (https://midias.me)

-- IMPORTANTE: Execute este script APÓS criar o usuário via interface do Supabase Auth
-- 
-- PASSOS:
-- 1. Vá em Authentication > Users no painel do Supabase
-- 2. Clique em "Add User" ou "Invite User"
-- 3. Crie o usuário com email e senha
-- 4. Copie o UUID do usuário criado
-- 5. Execute este script substituindo os valores abaixo

-- SUBSTITUA OS VALORES ABAIXO:
DO $$
DECLARE
    admin_user_id UUID := 'c69f2c48-1fdd-44e8-aff7-a0a88740f5eb'; -- UUID do usuário criado no Auth
    admin_email VARCHAR := 'viniciusbastosfe@gmail.com'; -- Email do admin
    admin_name VARCHAR := 'Vinícius Bastos'; -- Nome do admin
    lafaiete_city_id UUID;
BEGIN
    -- Buscar ID da cidade de Conselheiro Lafaiete
    SELECT id INTO lafaiete_city_id FROM cities WHERE name = 'Conselheiro Lafaiete' LIMIT 1;
    
    -- Verificar se o usuário já existe na tabela users
    IF NOT EXISTS (SELECT 1 FROM users WHERE id = admin_user_id) THEN
        -- Inserir usuário na tabela users
        INSERT INTO users (
            id,
            name,
            email,
            is_admin,
            city_id,
            created_at,
            updated_at
        ) VALUES (
            admin_user_id,
            admin_name,
            admin_email,
            true, -- Define como admin
            lafaiete_city_id,
            NOW(),
            NOW()
        );
        
        RAISE NOTICE 'Usuário admin criado com sucesso: %', admin_email;
    ELSE
        -- Se já existe, apenas atualizar para admin
        UPDATE users 
        SET is_admin = true,
            name = admin_name,
            city_id = lafaiete_city_id,
            updated_at = NOW()
        WHERE id = admin_user_id;
        
        RAISE NOTICE 'Usuário atualizado para admin: %', admin_email;
    END IF;
END $$;

-- Verificar se foi criado corretamente
SELECT 
    id,
    name,
    email,
    is_admin,
    created_at
FROM users 
WHERE is_admin = true;
