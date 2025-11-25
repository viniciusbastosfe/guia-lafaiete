import { Instagram, Facebook, Mail } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo variant="black" size="lg" className="mb-4" />
            <p className="text-gray-300 text-sm">
              Conectando eventos, empresas, influenciadores e pessoas em Conselheiro Lafaiete e região.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/eventos" className="text-gray-300 hover:text-white transition">Eventos</a></li>
              <li><a href="/empresas" className="text-gray-300 hover:text-white transition">Empresas</a></li>
              <li><a href="/influenciadores" className="text-gray-300 hover:text-white transition">Influenciadores</a></li>
              <li><a href="/musicos" className="text-gray-300 hover:text-white transition">Músicos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Conselheiro Lafaiete - MG</li>
              <li>contato@guialafaiete.com.br</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-300">
          <p>
            © {currentYear} Guia Lafaiete. Todos os direitos reservados.
          </p>
          <p className="mt-2">
            Desenvolvido por{' '}
            <a
              href="https://midias.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover transition"
            >
              Vinícius Bastos
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
