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
  Users,
  Search,
  Mail,
  Shield,
  MapPin,
  Calendar,
  Tag,
  MessageSquare,
  Eye,
} from 'lucide-react'
import { getInitials, formatDateTime } from '@/lib/utils'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const queryClient = useQueryClient()

  const { data: users, isLoading } = useQuery<any[]>({
    queryKey: ['admin-users', searchTerm, filterRole],
    queryFn: async () => {
      let query = supabase
        .from('users')
        .select('*, cities(name)')
        .order('created_at', { ascending: false })

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
      }

      if (filterRole === 'admin') {
        query = query.eq('is_admin', true)
      } else if (filterRole === 'user') {
        query = query.eq('is_admin', false)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })

  const toggleAdminMutation = useMutation<
    void,
    Error,
    { id: string; isAdmin: boolean }
  >({
    mutationFn: async ({ id, isAdmin }) => {
      const { error } = await (supabase as any)
        .from('users')
        .update({ is_admin: !isAdmin })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      toast.success('Permissões atualizadas!')
    },
  })

  // Estatísticas
  const stats = {
    total: users?.length || 0,
    admins: users?.filter((u) => u.is_admin).length || 0,
    regular: users?.filter((u) => !u.is_admin).length || 0,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">CRM de Usuários</h1>
        <p className="text-gray-600 mt-1">Gerencie usuários e permissões da plataforma</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Usuários</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Administradores</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.admins}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Usuários Regulares</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.regular}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
              <option value="all">Todos os usuários</option>
              <option value="admin">Administradores</option>
              <option value="user">Usuários Regulares</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Usuários ({users?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : users && users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-gray-700">Usuário</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Local</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Cadastro</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Permissão</th>
                    <th className="text-right p-4 font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar_url} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                              {getInitials(user.name || user.email)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name || 'Sem nome'}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {user.cities?.name || 'N/A'}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          {formatDateTime(user.created_at)}
                        </div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() =>
                            toggleAdminMutation.mutate({
                              id: user.id,
                              isAdmin: user.is_admin,
                            })
                          }
                          disabled={toggleAdminMutation.isPending}
                        >
                          <Badge
                            variant={user.is_admin ? 'default' : 'outline'}
                            className="gap-1"
                          >
                            {user.is_admin ? (
                              <>
                                <Shield className="h-3 w-3" />
                                Admin
                              </>
                            ) : (
                              'Usuário'
                            )}
                          </Badge>
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/admin/usuarios/${user.id}`}>
                            <Button size="sm" variant="outline" title="Ver detalhes">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline" title="Enviar mensagem">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" title="Gerenciar tags">
                            <Tag className="h-4 w-4" />
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
              <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum usuário encontrado</h3>
              <p className="text-gray-600">Ajuste os filtros para ver mais resultados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
