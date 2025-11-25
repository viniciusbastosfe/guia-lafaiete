import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Calendar,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  MapPin,
  Clock,
} from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function AdminEvents() {
  const [searchTerm, setSearchTerm] = useState('')
  const queryClient = useQueryClient()

  const { data: events, isLoading } = useQuery<any[]>({
    queryKey: ['admin-events', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('events')
        .select('*, cities(name)')
        .order('created_at', { ascending: false })

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('events').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] })
      toast.success('Evento excluído com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao excluir evento')
    },
  })

  const toggleFeaturedMutation = useMutation<
    void,
    Error,
    { id: string; isFeatured: boolean }
  >({
    mutationFn: async ({ id, isFeatured }) => {
      const { error } = await (supabase as any)
        .from('events')
        .update({ is_featured: !isFeatured })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] })
      toast.success('Status atualizado!')
    },
  })

  const toggleActiveMutation = useMutation<
    void,
    Error,
    { id: string; isActive: boolean }
  >({
    mutationFn: async ({ id, isActive }) => {
      const { error } = await (supabase as any)
        .from('events')
        .update({ is_active: !isActive })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] })
      toast.success('Status atualizado!')
    },
  })

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja excluir "${title}"?`)) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Eventos</h1>
          <p className="text-gray-600 mt-1">Crie e gerencie eventos da plataforma</p>
        </div>
        <Link to="/admin/eventos/novo">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Eventos ({events?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : events && events.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-gray-700">Evento</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Local</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Data</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                    <th className="text-right p-4 font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {event.cover_image_url ? (
                            <img
                              src={event.cover_image_url}
                              alt={event.title}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                              <Calendar className="h-6 w-6 text-white" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {event.is_featured && (
                                <Badge variant="default" className="text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  Destaque
                                </Badge>
                              )}
                              {event.is_online && (
                                <Badge variant="outline" className="text-xs">
                                  Online
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {event.cities?.name || 'N/A'}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          {formatDateTime(event.start_datetime)}
                        </div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() =>
                            toggleActiveMutation.mutate({
                              id: event.id,
                              isActive: event.is_active,
                            })
                          }
                          disabled={toggleActiveMutation.isPending}
                        >
                          <Badge variant={event.is_active ? 'default' : 'outline'}>
                            {event.is_active ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/eventos/${event.id}`} target="_blank">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <button
                            onClick={() =>
                              toggleFeaturedMutation.mutate({
                                id: event.id,
                                isFeatured: event.is_featured,
                              })
                            }
                            disabled={toggleFeaturedMutation.isPending}
                          >
                            <Button
                              size="sm"
                              variant={event.is_featured ? 'default' : 'outline'}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          </button>
                          <Link to={`/admin/eventos/${event.id}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(event.id, event.title)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum evento encontrado</h3>
              <p className="text-gray-600 mb-4">Comece criando seu primeiro evento</p>
              <Link to="/admin/eventos/novo">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Evento
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
