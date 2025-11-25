import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Building2,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  MapPin,
  Globe,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function AdminCompanies() {
  const [searchTerm, setSearchTerm] = useState('')
  const queryClient = useQueryClient()

  const { data: companies, isLoading } = useQuery<any[]>({
    queryKey: ['admin-companies', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('companies')
        .select('*, cities(name)')
        .order('created_at', { ascending: false })

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('companies').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-companies'] })
      toast.success('Empresa excluída com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao excluir empresa')
    },
  })

  const toggleFeaturedMutation = useMutation<
    void,
    Error,
    { id: string; isFeatured: boolean }
  >({
    mutationFn: async ({ id, isFeatured }) => {
      const { error } = await (supabase as any)
        .from('companies')
        .update({ is_featured: !isFeatured })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-companies'] })
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
        .from('companies')
        .update({ is_active: !isActive })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-companies'] })
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
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Empresas</h1>
          <p className="text-gray-600 mt-1">Crie e gerencie empresas da plataforma</p>
        </div>
        <Link to="/admin/empresas/nova">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Empresa
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar empresas..."
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
            <Building2 className="h-5 w-5" />
            Empresas ({companies?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : companies && companies.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-gray-700">Empresa</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Local</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Visualizações</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                    <th className="text-right p-4 font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {company.logo_url ? (
                            <img
                              src={company.logo_url}
                              alt={company.name}
                              className="w-12 h-12 object-contain rounded-lg"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                              <Building2 className="h-6 w-6 text-white" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{company.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {company.is_featured && (
                                <Badge variant="default" className="text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  Destaque
                                </Badge>
                              )}
                              {company.website_url && (
                                <Badge variant="outline" className="text-xs">
                                  <Globe className="h-3 w-3 mr-1" />
                                  Site
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {company.cities?.name || 'N/A'}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Eye className="h-4 w-4" />
                          {company.views_count || 0}
                        </div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() =>
                            toggleActiveMutation.mutate({
                              id: company.id,
                              isActive: company.is_active,
                            })
                          }
                          disabled={toggleActiveMutation.isPending}
                        >
                          <Badge variant={company.is_active ? 'default' : 'outline'}>
                            {company.is_active ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/empresas/${company.id}`} target="_blank">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <button
                            onClick={() =>
                              toggleFeaturedMutation.mutate({
                                id: company.id,
                                isFeatured: company.is_featured,
                              })
                            }
                            disabled={toggleFeaturedMutation.isPending}
                          >
                            <Button
                              size="sm"
                              variant={company.is_featured ? 'default' : 'outline'}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          </button>
                          <Link to={`/admin/empresas/${company.id}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(company.id, company.name)}
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
              <Building2 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma empresa encontrada</h3>
              <p className="text-gray-600 mb-4">Comece criando sua primeira empresa</p>
              <Link to="/admin/empresas/nova">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Empresa
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
