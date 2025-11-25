import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Users,
  Calendar,
  Building2,
  Star,
  TrendingUp,
  TrendingDown,
  Activity,
  Gift,
} from 'lucide-react'
import { formatDateTime, getInitials } from '@/lib/utils'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  // Buscar estatísticas
  const { data: stats, isLoading: statsLoading } = useQuery<any>({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [users, events, companies, profiles, giveaways] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('companies').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('giveaways').select('id', { count: 'exact', head: true }).eq('is_published', true),
      ])

      return {
        users: users.count || 0,
        events: events.count || 0,
        companies: companies.count || 0,
        profiles: profiles.count || 0,
        giveaways: giveaways.count || 0,
      }
    },
  })

  // Buscar eventos recentes
  const { data: recentEvents } = useQuery<any[]>({
    queryKey: ['recent-events'],
    queryFn: async () => {
      const { data } = await supabase
        .from('events')
        .select('id, title, start_datetime, is_featured')
        .order('created_at', { ascending: false })
        .limit(5)
      return data || []
    },
  })

  // Buscar usuários recentes
  const { data: recentUsers } = useQuery<any[]>({
    queryKey: ['recent-users'],
    queryFn: async () => {
      const { data } = await supabase
        .from('users')
        .select('id, name, email, avatar_url, created_at')
        .order('created_at', { ascending: false })
        .limit(5)
      return data || []
    },
  })

  const statCards = [
    {
      title: 'Total de Usuários',
      value: stats?.users || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Eventos Ativos',
      value: stats?.events || 0,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: '+8%',
      trendUp: true,
    },
    {
      title: 'Empresas',
      value: stats?.companies || 0,
      icon: Building2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: '+5%',
      trendUp: true,
    },
    {
      title: 'Perfis',
      value: stats?.profiles || 0,
      icon: Star,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      trend: '+15%',
      trendUp: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Visão geral do sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))
        ) : (
          statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                      <div className="flex items-center mt-2 text-sm">
                        {stat.trendUp ? (
                          <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span className={stat.trendUp ? 'text-green-600' : 'text-red-600'}>
                          {stat.trend}
                        </span>
                        <span className="text-gray-500 ml-1">vs mês anterior</span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Grid de Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Eventos Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Eventos Recentes
            </CardTitle>
            <CardDescription>Eventos criados recentemente</CardDescription>
          </CardHeader>
          <CardContent>
            {recentEvents && recentEvents.length > 0 ? (
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/admin/eventos/${event.id}`}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-gray-500">
                          {formatDateTime(event.start_datetime)}
                        </p>
                      </div>
                    </div>
                    {event.is_featured && <Badge>Destaque</Badge>}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Nenhum evento recente</p>
            )}
          </CardContent>
        </Card>

        {/* Usuários Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Usuários Recentes
            </CardTitle>
            <CardDescription>Novos cadastros na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            {recentUsers && recentUsers.length > 0 ? (
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <Link
                    key={user.id}
                    to={`/admin/usuarios/${user.id}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      {formatDateTime(user.created_at)}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Nenhum usuário recente</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Atividade Rápida */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/admin/eventos/novo"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition text-center"
            >
              <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium">Novo Evento</p>
            </Link>
            <Link
              to="/admin/empresas/nova"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition text-center"
            >
              <Building2 className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium">Nova Empresa</p>
            </Link>
            <Link
              to="/admin/perfis/novo"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition text-center"
            >
              <Star className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium">Novo Perfil</p>
            </Link>
            <Link
              to="/admin/sorteios/novo"
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition text-center"
            >
              <Gift className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium">Novo Sorteio</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
