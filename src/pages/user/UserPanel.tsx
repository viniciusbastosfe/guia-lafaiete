import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/authStore'
import { getInitials } from '@/lib/utils'
import {
  User,
  Mail,
  Calendar,
  Heart,
  Gift,
  Bell,
  Settings,
  Edit,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UserPanel() {
  const { user } = useAuthStore()

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600">Você precisa estar logado para acessar seu painel.</p>
            <Link to="/login">
              <Button className="mt-4">Fazer Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header do Painel */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meu Painel</h1>
            <p className="text-gray-600 mt-1">Gerencie suas informações e preferências</p>
          </div>
          <Link to="/painel/editar">
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          </Link>
        </div>

        {/* Perfil do Usuário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações do Perfil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-2xl">
                  {getInitials(user.user_metadata?.name || user.email || 'U')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-xl font-semibold">{user.user_metadata?.name || 'Usuário'}</h3>
                  <div className="flex items-center gap-2 mt-1 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    Membro desde {user.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : 'N/A'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Favoritos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5 text-red-500" />
                Favoritos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600 mt-1">Itens salvos</p>
                <Button variant="outline" className="mt-4 w-full">
                  Ver Favoritos
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sorteios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Gift className="h-5 w-5 text-yellow-500" />
                Sorteios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600 mt-1">Participações</p>
                <Button variant="outline" className="mt-4 w-full">
                  Ver Sorteios
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-5 w-5 text-blue-500" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600 mt-1">Não lidas</p>
                <Button variant="outline" className="mt-4 w-full">
                  Ver Todas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/painel/editar">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              </Link>
              <Link to="/painel/configuracoes">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </Button>
              </Link>
              <Link to="/painel/favoritos">
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Meus Favoritos
                </Button>
              </Link>
              <Link to="/painel/notificacoes">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
