import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Gift, ArrowLeft, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function GiveawayForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prize: '',
    start_datetime: '',
    end_datetime: '',
    image_url: '',
    rules: '',
    winner_announcement_date: '',
    result_published: false,
    is_published: true,
  })

  // Buscar sorteio se estiver editando
  const { data: giveaway, isLoading } = useQuery<any | null>({
    queryKey: ['giveaway', id],
    queryFn: async () => {
      if (!id) return null
      const { data, error } = await supabase
        .from('giveaways')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
    enabled: isEditing,
  })

  // Preencher formulário ao carregar sorteio
  useEffect(() => {
    if (giveaway) {
      setFormData({
        title: giveaway.title || '',
        description: giveaway.description || '',
        prize: giveaway.prize || '',
        start_datetime: giveaway.start_datetime?.slice(0, 16) || '',
        end_datetime: giveaway.end_datetime?.slice(0, 16) || '',
        image_url: giveaway.image_url || '',
        rules: giveaway.rules || '',
        winner_announcement_date: giveaway.winner_announcement_date?.slice(0, 16) || '',
        result_published: giveaway.result_published || false,
        is_published: giveaway.is_published ?? true,
      })
    }
  }, [giveaway])

  // Mutation para salvar
  const saveMutation = useMutation({
    mutationFn: async () => {
      const dataToSave = {
        ...formData,
        start_datetime: formData.start_datetime ? new Date(formData.start_datetime).toISOString() : null,
        end_datetime: formData.end_datetime ? new Date(formData.end_datetime).toISOString() : null,
        winner_announcement_date: formData.winner_announcement_date 
          ? new Date(formData.winner_announcement_date).toISOString() 
          : null,
      }

      if (isEditing) {
        const { error } = await (supabase as any)
          .from('giveaways')
          .update(dataToSave)
          .eq('id', id)
        if (error) throw error
      } else {
        const { error } = await (supabase as any)
          .from('giveaways')
          .insert([dataToSave])
        if (error) throw error
      }
    },
    onSuccess: () => {
      toast.success(isEditing ? 'Sorteio atualizado!' : 'Sorteio criado!')
      navigate('/admin/sorteios')
    },
    onError: (error) => {
      toast.error('Erro ao salvar sorteio')
      console.error(error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.prize || !formData.start_datetime || !formData.end_datetime) {
      toast.error('Preencha os campos obrigatórios')
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
        <Button variant="outline" onClick={() => navigate('/admin/sorteios')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Editar Sorteio' : 'Novo Sorteio'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing ? 'Atualize as informações do sorteio' : 'Preencha os dados do novo sorteio'}
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
                    Título *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Nome do sorteio"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prêmio *
                  </label>
                  <Input
                    value={formData.prize}
                    onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                    placeholder="Ex: iPhone 15 Pro Max"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva o sorteio..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data/Hora Início *
                    </label>
                    <Input
                      type="datetime-local"
                      value={formData.start_datetime}
                      onChange={(e) => setFormData({ ...formData, start_datetime: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data/Hora Término *
                    </label>
                    <Input
                      type="datetime-local"
                      value={formData.end_datetime}
                      onChange={(e) => setFormData({ ...formData, end_datetime: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Anúncio do Vencedor
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.winner_announcement_date}
                    onChange={(e) => setFormData({ ...formData, winner_announcement_date: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regras e Mídia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Regras do Sorteio
                  </label>
                  <textarea
                    value={formData.rules}
                    onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                    placeholder="1. Seguir o perfil&#10;2. Curtir a publicação&#10;3. Marcar 3 amigos..."
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL da Imagem
                  </label>
                  <Input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                  {formData.image_url && (
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="mt-4 w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Resultado Publicado
                  </label>
                  <input
                    type="checkbox"
                    checked={formData.result_published}
                    onChange={(e) => setFormData({ ...formData, result_published: e.target.checked })}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Sorteio Publicado
                  </label>
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Gift className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">Dica</h4>
                    <p className="text-sm text-yellow-800">
                      Defina regras claras e objetivas. Marque "Resultado Publicado" 
                      apenas após anunciar o vencedor oficialmente.
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
              {saveMutation.isPending ? 'Salvando...' : isEditing ? 'Atualizar Sorteio' : 'Criar Sorteio'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
