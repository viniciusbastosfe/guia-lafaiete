import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Users, ArrowLeft, Save, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProfileForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    type: 'influencer' as 'influencer' | 'musician',
    city_id: '',
    avatar_url: '',
    instagram_url: '',
    youtube_url: '',
    spotify_url: '',
    followers_count: 0,
    is_featured: false,
    is_active: true,
  })

  // Buscar cidades
  const { data: cities } = useQuery<any[]>({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .order('name')
      if (error) throw error
      return data
    },
  })

  // Buscar perfil se estiver editando
  const { data: profile, isLoading } = useQuery<any | null>({
    queryKey: ['profile', id],
    queryFn: async () => {
      if (!id) return null
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
    enabled: isEditing,
  })

  // Preencher formulário ao carregar perfil
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        type: profile.type || 'influencer',
        city_id: profile.city_id || '',
        avatar_url: profile.avatar_url || '',
        instagram_url: profile.instagram_url || '',
        youtube_url: profile.youtube_url || '',
        spotify_url: profile.spotify_url || '',
        followers_count: profile.followers_count || 0,
        is_featured: profile.is_featured || false,
        is_active: profile.is_active ?? true,
      })
    }
  }, [profile])

  // Mutation para salvar
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (isEditing) {
        const { error } = await (supabase as any)
          .from('profiles')
          .update(formData)
          .eq('id', id)
        if (error) throw error
      } else {
        const { error } = await (supabase as any)
          .from('profiles')
          .insert([formData])
        if (error) throw error
      }
    },
    onSuccess: () => {
      toast.success(isEditing ? 'Perfil atualizado!' : 'Perfil criado!')
      navigate('/admin/perfis')
    },
    onError: (error) => {
      toast.error('Erro ao salvar perfil')
      console.error(error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name) {
      toast.error('Preencha o nome do perfil')
      return
    }

    saveMutation.mutate()
  }

  if (isEditing && isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/perfis')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Editar Perfil' : 'Novo Perfil'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing ? 'Atualize as informações do perfil' : 'Preencha os dados do novo perfil'}
          </p>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome do influenciador/músico"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biografia
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Conte um pouco sobre o perfil..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo *
                    </label>
                    <Select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'influencer' | 'musician' })}
                      required
                    >
                      <option value="influencer">Influenciador</option>
                      <option value="musician">Músico</option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cidade
                    </label>
                    <Select
                      value={formData.city_id}
                      onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}
                    >
                      <option value="">Selecione uma cidade</option>
                      {cities?.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Seguidores
                  </label>
                  <Input
                    type="number"
                    value={formData.followers_count}
                    onChange={(e) => setFormData({ ...formData, followers_count: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Redes Sociais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <Input
                    type="url"
                    value={formData.instagram_url}
                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                    placeholder="https://instagram.com/perfil"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube
                  </label>
                  <Input
                    type="url"
                    value={formData.youtube_url}
                    onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                    placeholder="https://youtube.com/@perfil"
                  />
                </div>

                {formData.type === 'musician' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Spotify
                    </label>
                    <Input
                      type="url"
                      value={formData.spotify_url}
                      onChange={(e) => setFormData({ ...formData, spotify_url: e.target.value })}
                      placeholder="https://open.spotify.com/artist/..."
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Avatar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL do Avatar
                  </label>
                  <Input
                    type="url"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    placeholder="https://exemplo.com/avatar.jpg"
                  />
                  {formData.avatar_url && (
                    <img
                      src={formData.avatar_url}
                      alt="Preview"
                      className="mt-4 w-32 h-32 object-cover rounded-full mx-auto"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Perfil em Destaque
                  </label>
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Perfil Ativo
                  </label>
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-pink-50 border-pink-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-pink-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-pink-900 mb-1">Dica</h4>
                    <p className="text-sm text-pink-800">
                      Perfis em destaque aparecem no topo da listagem.
                      Adicione links de redes sociais para maior engajamento.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full"
              disabled={saveMutation.isPending}
            >
              <Save className="h-4 w-4 mr-2" />
              {saveMutation.isPending ? 'Salvando...' : isEditing ? 'Atualizar Perfil' : 'Criar Perfil'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
