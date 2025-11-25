import { Link } from 'react-router-dom'
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { Logo } from '@/components/ui/Logo'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAdmin, signOut } = useAuthStore()

  const handleSignOut = async () => {
    console.log('🚪 LOGOUT INICIADO - Header')
    console.log('📦 localStorage antes:', localStorage.getItem('auth-storage'))
    try {
      await signOut()
      console.log('✅ signOut executado com sucesso')
    } catch (error) {
      console.error('❌ Erro no signOut:', error)
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo variant="primary" size="md" />

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/eventos" className="text-[#f31100] hover:border hover:border-[#f31100] hover:px-4 hover:py-2 rounded-full transition-all duration-300">
              Eventos
            </Link>
            <Link to="/empresas" className="text-[#f31100] hover:border hover:border-[#f31100] hover:px-4 hover:py-2 rounded-full transition-all duration-300">
              Empresas
            </Link>
            <Link to="/influenciadores" className="text-[#f31100] hover:border hover:border-[#f31100] hover:px-4 hover:py-2 rounded-full transition-all duration-300">
              Influenciadores
            </Link>
            <Link to="/musicos" className="text-[#f31100] hover:border hover:border-[#f31100] hover:px-4 hover:py-2 rounded-full transition-all duration-300">
              Músicos
            </Link>
            <Link to="/sorteios" className="text-[#f31100] hover:border hover:border-[#f31100] hover:px-4 hover:py-2 rounded-full transition-all duration-300">
              Sorteios
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/painel"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  <User className="w-4 h-4" />
                  <span>Meu Painel</span>
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary transition"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link to="/eventos" className="text-[#f31100] hover:bg-gray-100 px-4 py-2 rounded-full transition-all duration-300">
                Eventos
              </Link>
              <Link to="/empresas" className="text-[#f31100] hover:bg-gray-100 px-4 py-2 rounded-full transition-all duration-300">
                Empresas
              </Link>
              <Link to="/influenciadores" className="text-[#f31100] hover:bg-gray-100 px-4 py-2 rounded-full transition-all duration-300">
                Influenciadores
              </Link>
              <Link to="/musicos" className="text-[#f31100] hover:bg-gray-100 px-4 py-2 rounded-full transition-all duration-300">
                Músicos
              </Link>
              <Link to="/sorteios" className="text-[#f31100] hover:bg-gray-100 px-4 py-2 rounded-full transition-all duration-300">
                Sorteios
              </Link>
              {user ? (
                <>
                  <Link to="/painel" className="text-gray-700 hover:text-primary transition">
                    Meu Painel
                  </Link>
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="text-gray-700 hover:text-primary transition">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="text-left text-gray-700 hover:text-primary transition"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary transition">
                    Entrar
                  </Link>
                  <Link to="/cadastro" className="text-gray-700 hover:text-primary transition">
                    Cadastrar
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
