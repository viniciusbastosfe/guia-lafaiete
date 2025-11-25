import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select } from '@/components/ui/select'
import {
  Star,
  Music,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Instagram,
} from 'lucide-react'
import { getInitials } from '@/lib/utils'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function AdminProfiles() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const queryClient = useQueryClient()

  const { data: profiles, isLoading } = useQuery<any[]>({
    queryKey: ['admin-profiles', searchTerm, filterType],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*, cities(name)')
        .order('created_at', { ascending: false })

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`)
      }

      if (filterType !== 'all') {
        query = query.eq('type', filterType)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('profiles').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profiles'] })
      toast.success('Perfil excluído com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao excluir perfil')
    },
  })

  const toggleFeaturedMutation = useMutation<
    void,
    Error,
    { id: string; isFeatured: boolean }
  >({
    mutationFn: async ({ id, isFeatured }) => {
      const { error } = await (supabase as any)
        .from('profiles')
        .update({ is_featured: !isFeatured })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profiles'] })
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
        .from('profiles')
        .update({ is_active: !isActive })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profiles'] })
      toast.success('Status atualizado!')
    },
  })

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir "${name}"?`)) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Perfis</h1>
          <p className="text-gray-600 mt-1">Crie e gerencie perfis de influenciadores e músicos</p>
        </div>
        <Link to="/admin/perfis/novo">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Perfil
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
                placeholder="Buscar perfis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">Todos os tipos</option>
              <option value="influencer">Influenciadores</option>
              <option value="musician">Músicos</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Perfis ({profiles?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : profiles && profiles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-gray-700">Perfil</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Tipo</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Local</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                    <th className="text-right p-4 font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((profile) => (
                    <tr key={profile.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={profile.avatar_url} />
                            <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white">
                              {getInitials(profile.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{profile.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {profile.is_featured && (
                                <Badge variant="default" className="text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  Destaque
                                </Badge>
                              )}
                              {profile.instagram_url && (
                                <Badge variant="outline" className="text-xs">
                                  <Instagram className="h-3 w-3 mr-1" />
                                  Instagram
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="gap-1">
                          {profile.type === 'influencer' ? (
                            <>
                              <Star className="h-3 w-3" />
                              Influenciador
                            </>
                          ) : (
                            <>
                              <Music className="h-3 w-3" />
                              Músico
                            </>
                          )}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {profile.cities?.name || 'N/A'}
                        </div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() =>
                            toggleActiveMutation.mutate({
                              id: profile.id,
                              isActive: profile.is_active,
                            })
                          }
                          disabled={toggleActiveMutation.isPending}
                        >
                          <Badge variant={profile.is_active ? 'default' : 'outline'}>
                            {profile.is_active ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/perfis/${profile.id}`} target="_blank">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <button
                            onClick={() =>
                              toggleFeaturedMutation.mutate({
                                id: profile.id,
                                isFeatured: profile.is_featured,
                              })
                            }
                            disabled={toggleFeaturedMutation.isPending}
                          >
                            <Button
                              size="sm"
                              variant={profile.is_featured ? 'default' : 'outline'}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          </button>
                          <Link to={`/admin/perfis/${profile.id}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(profile.id, profile.name)}
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
              <Star className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum perfil encontrado</h3>
              <p className="text-gray-600 mb-4">Comece criando seu primeiro perfil</p>
              <Link to="/admin/perfis/novo">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Perfil
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
