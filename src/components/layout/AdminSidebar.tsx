import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  Building2,
  Users,
  Gift,
  Image,
  UserCog,
  MessageSquare,
  Settings,
  Home,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Calendar, label: 'Eventos', path: '/admin/eventos' },
  { icon: Building2, label: 'Empresas', path: '/admin/empresas' },
  { icon: Users, label: 'Perfis', path: '/admin/perfis' },
  { icon: Gift, label: 'Sorteios', path: '/admin/sorteios' },
  { icon: Image, label: 'Banners', path: '/admin/banners' },
  { icon: UserCog, label: 'Usuários', path: '/admin/usuarios' },
  { icon: MessageSquare, label: 'Sugestões', path: '/admin/sugestoes' },
  { icon: Settings, label: 'Configurações', path: '/admin/configuracoes' },
]

export function AdminSidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-secondary text-white flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Logo variant="white" size="md" href="/admin" />
          <span className="text-xl font-bold">Admin</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <Link
          to="/"
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
        >
          <Home className="w-4 h-4" />
          <span>Voltar ao Site</span>
        </Link>
      </div>
    </aside>
  )
}
