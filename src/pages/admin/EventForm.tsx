import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Calendar, ArrowLeft, Save, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'

export default function EventForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_datetime: '',
    end_datetime: '',
    location: '',
    city_id: '',
    cover_image_url: '',
    ticket_url: '',
    is_online: false,
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

  // Buscar evento se estiver editando
  const { data: event, isLoading } = useQuery<any | null>({
    queryKey: ['event', id],
    queryFn: async () => {
      if (!id) return null
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
    enabled: isEditing,
  })

  // Preencher formulário ao carregar evento
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        start_datetime: event.start_datetime?.slice(0, 16) || '',
        end_datetime: event.end_datetime?.slice(0, 16) || '',
        location: event.location || '',
        city_id: event.city_id || '',
        cover_image_url: event.cover_image_url || '',
        ticket_url: event.ticket_url || '',
        is_online: event.is_online || false,
        is_featured: event.is_featured || false,
        is_active: event.is_active ?? true,
      })
    }
  }, [event])

  // Mutation para salvar
  const saveMutation = useMutation({
    mutationFn: async () => {
      const dataToSave = {
        ...formData,
        start_datetime: formData.start_datetime ? new Date(formData.start_datetime).toISOString() : null,
        end_datetime: formData.end_datetime ? new Date(formData.end_datetime).toISOString() : null,
      }

      if (isEditing) {
        const { error } = await (supabase as any)
          .from('events')
          .update(dataToSave)
          .eq('id', id)
        if (error) throw error
      } else {
        const { error } = await (supabase as any)
          .from('events')
          .insert([dataToSave])
        if (error) throw error
      }
    },
    onSuccess: () => {
      toast.success(isEditing ? 'Evento atualizado!' : 'Evento criado!')
      navigate('/admin/eventos')
    },
    onError: (error) => {
      toast.error('Erro ao salvar evento')
      console.error(error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validações básicas
    if (!formData.title || !formData.start_datetime) {
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
        <Button variant="outline" onClick={() => navigate('/admin/eventos')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Editar Evento' : 'Novo Evento'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing ? 'Atualize as informações do evento' : 'Preencha os dados do novo evento'}
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
                    placeholder="Nome do evento"
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
                    placeholder="Descreva o evento..."
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
                      Data/Hora Término
                    </label>
                    <Input
                      type="datetime-local"
                      value={formData.end_datetime}
                      onChange={(e) => setFormData({ ...formData, end_datetime: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Local
                  </label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Endereço ou nome do local"
                  />
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Mídia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL da Imagem de Capa
                  </label>
                  <Input
                    type="url"
                    value={formData.cover_image_url}
                    onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                  {formData.cover_image_url && (
                    <img
                      src={formData.cover_image_url}
                      alt="Preview"
                      className="mt-4 w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL dos Ingressos
                  </label>
                  <Input
                    type="url"
                    value={formData.ticket_url}
                    onChange={(e) => setFormData({ ...formData, ticket_url: e.target.value })}
                    placeholder="https://exemplo.com/ingressos"
                  />
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
                    Evento Online
                  </label>
                  <input
                    type="checkbox"
                    checked={formData.is_online}
                    onChange={(e) => setFormData({ ...formData, is_online: e.target.checked })}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Evento em Destaque
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
                    Evento Ativo
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

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Dica</h4>
                    <p className="text-sm text-blue-800">
                      Eventos em destaque aparecem no topo da listagem e na página inicial.
                      Use imagens de alta qualidade para melhor visualização.
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
              {saveMutation.isPending ? 'Salvando...' : isEditing ? 'Atualizar Evento' : 'Criar Evento'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
