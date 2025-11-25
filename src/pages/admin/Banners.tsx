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
  Image as ImageIcon,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  MapPin,
  ExternalLink,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function AdminBanners() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPosition, setFilterPosition] = useState('all')
  const queryClient = useQueryClient()

  const { data: banners, isLoading } = useQuery<any[]>({
    queryKey: ['admin-banners', searchTerm, filterPosition],
    queryFn: async () => {
      let query = supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: false })

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`)
      }

      if (filterPosition !== 'all') {
        query = query.eq('position', filterPosition)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('banners').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-banners'] })
      toast.success('Banner excluído com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao excluir banner')
    },
  })

  const toggleActiveMutation = useMutation<
    void,
    Error,
    { id: string; isActive: boolean }
  >({
    mutationFn: async ({ id, isActive }) => {
      const { error } = await (supabase as any)
        .from('banners')
        .update({ is_active: !isActive })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-banners'] })
      toast.success('Status atualizado!')
    },
  })

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja excluir "${title}"?`)) {
      deleteMutation.mutate(id)
    }
  }

  const getPositionLabel = (position: string) => {
    const positions: Record<string, string> = {
      home_hero: 'Home - Hero',
      home_middle: 'Home - Meio',
      home_footer: 'Home - Rodapé',
      sidebar: 'Sidebar',
      events: 'Eventos',
      companies: 'Empresas',
    }
    return positions[position] || position
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Banners</h1>
          <p className="text-gray-600 mt-1">Crie e gerencie banners publicitários da plataforma</p>
        </div>
        <Link to="/admin/banners/novo">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Banner
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
                placeholder="Buscar banners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)}>
              <option value="all">Todas as posições</option>
              <option value="home_hero">Home - Hero</option>
              <option value="home_middle">Home - Meio</option>
              <option value="home_footer">Home - Rodapé</option>
              <option value="sidebar">Sidebar</option>
              <option value="events">Eventos</option>
              <option value="companies">Empresas</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Banners ({banners?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : banners && banners.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-gray-700">Banner</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Posição</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Analytics</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                    <th className="text-right p-4 font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map((banner) => (
                    <tr key={banner.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {banner.image_url ? (
                            <img
                              src={banner.image_url}
                              alt={banner.title}
                              className="w-24 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-24 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-white" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{banner.title}</p>
                            {banner.link_url && (
                              <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
                                <ExternalLink className="h-3 w-3" />
                                <span className="truncate max-w-[200px]">{banner.link_url}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="gap-1">
                          <MapPin className="h-3 w-3" />
                          {getPositionLabel(banner.position)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{banner.impressions || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4" />
                            <span>{banner.clicks || 0}</span>
                          </div>
                          {banner.impressions > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              CTR: {((banner.clicks / banner.impressions) * 100).toFixed(1)}%
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() =>
                            toggleActiveMutation.mutate({
                              id: banner.id,
                              isActive: banner.is_active,
                            })
                          }
                          disabled={toggleActiveMutation.isPending}
                        >
                          <Badge variant={banner.is_active ? 'default' : 'outline'}>
                            {banner.is_active ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          {banner.link_url && (
                            <a href={banner.link_url} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          <Link to={`/admin/banners/${banner.id}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(banner.id, banner.title)}
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
              <ImageIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum banner encontrado</h3>
              <p className="text-gray-600 mb-4">Comece criando seu primeiro banner</p>
              <Link to="/admin/banners/novo">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Banner
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
