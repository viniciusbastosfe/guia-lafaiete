-- Guia Lafaiete v2.0.0
-- Configuração de Storage Buckets
-- Autor: Vinícius Bastos (https://midias.me)

-- Criar buckets de storage
INSERT INTO storage.buckets (id, name, public) VALUES
    ('avatars', 'avatars', true),
    ('event-covers', 'event-covers', true),
    ('company-logos', 'company-logos', true),
    ('banners', 'banners', true),
    ('profile-avatars', 'profile-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de storage para avatars
CREATE POLICY "Public read access to avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND auth.role() = 'authenticated'
);
CREATE POLICY "Users can update own avatars" ON storage.objects FOR UPDATE USING (
    bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can delete own avatars" ON storage.objects FOR DELETE USING (
    bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Políticas de storage para event-covers
CREATE POLICY "Public read access to event covers" ON storage.objects FOR SELECT USING (bucket_id = 'event-covers');
CREATE POLICY "Admins can upload event covers" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'event-covers' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can update event covers" ON storage.objects FOR UPDATE USING (
    bucket_id = 'event-covers' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can delete event covers" ON storage.objects FOR DELETE USING (
    bucket_id = 'event-covers' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas de storage para company-logos
CREATE POLICY "Public read access to company logos" ON storage.objects FOR SELECT USING (bucket_id = 'company-logos');
CREATE POLICY "Admins can upload company logos" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'company-logos' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can update company logos" ON storage.objects FOR UPDATE USING (
    bucket_id = 'company-logos' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can delete company logos" ON storage.objects FOR DELETE USING (
    bucket_id = 'company-logos' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas de storage para banners
CREATE POLICY "Public read access to banners" ON storage.objects FOR SELECT USING (bucket_id = 'banners');
CREATE POLICY "Admins can upload banners" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'banners' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can update banners" ON storage.objects FOR UPDATE USING (
    bucket_id = 'banners' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can delete banners" ON storage.objects FOR DELETE USING (
    bucket_id = 'banners' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);

-- Políticas de storage para profile-avatars
CREATE POLICY "Public read access to profile avatars" ON storage.objects FOR SELECT USING (bucket_id = 'profile-avatars');
CREATE POLICY "Admins can upload profile avatars" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'profile-avatars' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can update profile avatars" ON storage.objects FOR UPDATE USING (
    bucket_id = 'profile-avatars' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can delete profile avatars" ON storage.objects FOR DELETE USING (
    bucket_id = 'profile-avatars' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
