-- =========================================
-- FIX: Acesso de usuários autenticados
-- Autor: Vinícius Bastos (https://midias.me)
-- Data: 25/11/2025 07:52
-- =========================================

-- PROBLEMA: Políticas RLS só permitiam acesso público (anon)
-- Quando usuário faz login, precisa de políticas para role 'authenticated'

-- =========================================
-- EVENTS - Adicionar política para autenticados
-- =========================================
CREATE POLICY "Authenticated users can read active events" 
ON events FOR SELECT 
TO authenticated
USING (is_active = true);

-- =========================================
-- COMPANIES - Adicionar política para autenticados
-- =========================================
CREATE POLICY "Authenticated users can read active companies" 
ON companies FOR SELECT 
TO authenticated
USING (is_active = true);

-- =========================================
-- PROFILES - Adicionar política para autenticados
-- =========================================
CREATE POLICY "Authenticated users can read active profiles" 
ON profiles FOR SELECT 
TO authenticated
USING (is_active = true);

-- =========================================
-- GIVEAWAYS - Adicionar política para autenticados
-- =========================================
CREATE POLICY "Authenticated users can read published giveaways" 
ON giveaways FOR SELECT 
TO authenticated
USING (is_published = true);

-- =========================================
-- BANNERS - Adicionar política para autenticados
-- =========================================
CREATE POLICY "Authenticated users can read active banners" 
ON banners FOR SELECT 
TO authenticated
USING (is_active = true);

-- =========================================
-- CITIES - Já tem acesso público, garantir para autenticados
-- =========================================
CREATE POLICY "Authenticated users can read cities" 
ON cities FOR SELECT 
TO authenticated
USING (true);

-- =========================================
-- CATEGORIAS - Garantir acesso para autenticados
-- =========================================
CREATE POLICY "Authenticated users can read event_categories" 
ON event_categories FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can read company_categories" 
ON company_categories FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can read profile_categories" 
ON profile_categories FOR SELECT 
TO authenticated
USING (true);

-- =========================================
-- USER_TAGS - Permitir usuários verem suas tags
-- =========================================
CREATE POLICY "Authenticated users can read user_tags" 
ON user_tags FOR SELECT 
TO authenticated
USING (true);

-- =========================================
-- VERIFICAÇÃO
-- =========================================
-- Para verificar se as políticas foram criadas:
-- SELECT schemaname, tablename, policyname, roles, cmd, qual
-- FROM pg_policies
-- WHERE tablename IN ('events', 'companies', 'profiles', 'giveaways', 'banners')
-- ORDER BY tablename, policyname;
