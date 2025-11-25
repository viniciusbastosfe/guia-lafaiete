import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Select } from '@/components/ui/select'
import {
  Gift,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Trophy,
  Calendar,
  Clock,
} from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function AdminGiveaways() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const queryClient = useQueryClient()

  const { data: giveaways, isLoading } = useQuery<any[]>({
    queryKey: ['admin-giveaways', searchTerm, filterStatus],
    queryFn: async () => {
      const now = new Date().toISOString()
      let query = supabase
        .from('giveaways')
        .select('*')
        .order('created_at', { ascending: false })

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`)
      }

      if (filterStatus === 'active') {
        query = query.gte('end_datetime', now)
      } else if (filterStatus === 'finished') {
        query = query.lt('end_datetime', now)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('giveaways').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-giveaways'] })
      toast.success('Sorteio excluído com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao excluir sorteio')
    },
  })

  const togglePublishedMutation = useMutation<
    void,
    Error,
    { id: string; isPublished: boolean }
  >({
    mutationFn: async ({ id, isPublished }) => {
      const { error } = await (supabase as any)
        .from('giveaways')
        .update({ is_published: !isPublished })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-giveaways'] })
      toast.success('Status atualizado!')
    },
  })

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja excluir "${title}"?`)) {
      deleteMutation.mutate(id)
    }
  }

  const getGiveawayStatus = (giveaway: any) => {
    const now = new Date()
    const startDate = new Date(giveaway.start_datetime)
    const endDate = new Date(giveaway.end_datetime)

    if (now < startDate) {
      return { label: 'Em breve', variant: 'outline' as const }
    } else if (now >= startDate && now <= endDate) {
      return { label: 'Ativo', variant: 'default' as const }
    } else if (giveaway.result_published) {
      return { label: 'Finalizado', variant: 'outline' as const }
    } else {
      return { label: 'Encerrado', variant: 'secondary' as const }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Sorteios</h1>
          <p className="text-gray-600 mt-1">Crie e gerencie sorteios da plataforma</p>
        </div>
        <Link to="/admin/sorteios/novo">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Sorteio
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar sorteios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">Todos os status</option>
              <option value="active">Ativos</option>
              <option value="finished">Finalizados</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Sorteios ({giveaways?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : giveaways && giveaways.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-gray-700">Sorteio</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Período</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Publicado</th>
                    <th className="text-right p-4 font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {giveaways.map((giveaway) => {
                    const status = getGiveawayStatus(giveaway)
                    return (
                      <tr key={giveaway.id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-lg flex items-center justify-center">
                              <Gift className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">{giveaway.title}</p>
                              {giveaway.prize && (
                                <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
                                  <Trophy className="h-3 w-3" />
                                  {giveaway.prize}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {formatDateTime(giveaway.start_datetime)}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {formatDateTime(giveaway.end_datetime)}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() =>
                              togglePublishedMutation.mutate({
                                id: giveaway.id,
                                isPublished: giveaway.is_published,
                              })
                            }
                            disabled={togglePublishedMutation.isPending}
                          >
                            <Badge variant={giveaway.is_published ? 'default' : 'outline'}>
                              {giveaway.is_published ? 'Publicado' : 'Rascunho'}
                            </Badge>
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/sorteios/${giveaway.id}`} target="_blank">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link to={`/admin/sorteios/${giveaway.id}`}>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(giveaway.id, giveaway.title)}
                              disabled={deleteMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Gift className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum sorteio encontrado</h3>
              <p className="text-gray-600 mb-4">Comece criando seu primeiro sorteio</p>
              <Link to="/admin/sorteios/novo">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Sorteio
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
