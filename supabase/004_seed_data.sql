-- Guia Lafaiete v2.0.0
-- Dados iniciais (seed data)
-- Autor: Vinícius Bastos (https://midias.me)

-- Inserir cidades da região
INSERT INTO cities (name, state) VALUES
    ('Conselheiro Lafaiete', 'MG'),
    ('Congonhas', 'MG'),
    ('Ouro Branco', 'MG'),
    ('Entre Rios de Minas', 'MG'),
    ('Queluzito', 'MG'),
    ('Cristiano Otoni', 'MG'),
    ('Jeceaba', 'MG')
ON CONFLICT DO NOTHING;

-- Inserir categorias de eventos
INSERT INTO event_categories (name, slug, color_hex) VALUES
    ('Shows e Música', 'shows-musica', '#F31100'),
    ('Festas', 'festas', '#FF6B35'),
    ('Esportes', 'esportes', '#3B82F6'),
    ('Cultura', 'cultura', '#8B5CF6'),
    ('Gastronomia', 'gastronomia', '#F59E0B'),
    ('Negócios', 'negocios', '#10B981'),
    ('Educação', 'educacao', '#6366F1'),
    ('Religioso', 'religioso', '#EC4899'),
    ('Infantil', 'infantil', '#14B8A6'),
    ('Outros', 'outros', '#6B7280')
ON CONFLICT (slug) DO NOTHING;

-- Inserir categorias de empresas
INSERT INTO company_categories (name, slug, color_hex) VALUES
    ('Alimentação', 'alimentacao', '#F59E0B'),
    ('Saúde', 'saude', '#10B981'),
    ('Beleza', 'beleza', '#EC4899'),
    ('Moda', 'moda', '#8B5CF6'),
    ('Serviços', 'servicos', '#3B82F6'),
    ('Construção', 'construcao', '#F97316'),
    ('Tecnologia', 'tecnologia', '#6366F1'),
    ('Educação', 'educacao', '#14B8A6'),
    ('Automotivo', 'automotivo', '#EF4444'),
    ('Lazer', 'lazer', '#F31100'),
    ('Pet Shop', 'pet-shop', '#22C55E'),
    ('Imóveis', 'imoveis', '#0EA5E9'),
    ('Outros', 'outros', '#6B7280')
ON CONFLICT (slug) DO NOTHING;

-- Inserir categorias de perfis
INSERT INTO profile_categories (name, color_hex) VALUES
    ('Influenciador Digital', '#F31100'),
    ('Criador de Conteúdo', '#FF6B35'),
    ('Músico Solo', '#3B82F6'),
    ('Banda', '#8B5CF6'),
    ('DJ', '#F59E0B'),
    ('Artista', '#10B981'),
    ('Fotógrafo', '#6366F1'),
    ('Outros', '#6B7280')
ON CONFLICT DO NOTHING;

-- Inserir tags de usuários padrão
INSERT INTO user_tags (name, color, description) VALUES
    ('VIP', '#F31100', 'Usuários VIP'),
    ('Parceiro', '#3B82F6', 'Parceiros comerciais'),
    ('Influenciador', '#8B5CF6', 'Influenciadores locais'),
    ('Empresa', '#10B981', 'Representantes de empresas'),
    ('Novo', '#F59E0B', 'Usuários novos'),
    ('Ativo', '#22C55E', 'Usuários ativos'),
    ('Inativo', '#EF4444', 'Usuários inativos')
ON CONFLICT (name) DO NOTHING;

-- Inserir configurações de API padrão
INSERT INTO api_settings (setting_key, setting_value, description) VALUES
    ('openai_api_key', '', 'Chave de API do OpenAI'),
    ('gemini_api_key', '', 'Chave de API do Google Gemini'),
    ('evolution_api_url', '', 'URL da API Evolution (WhatsApp)'),
    ('evolution_api_key', '', 'Chave de API Evolution'),
    ('evolution_instance_name', '', 'Nome da instância Evolution'),
    ('site_maintenance', 'false', 'Modo de manutenção do site'),
    ('allow_user_suggestions', 'true', 'Permitir sugestões de usuários'),
    ('max_giveaway_entries_per_user', '1', 'Máximo de participações por usuário em sorteios')
ON CONFLICT (setting_key) DO NOTHING;
