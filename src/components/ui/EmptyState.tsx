/**
 * Empty State Component
 * Componente reutilizável para estados vazios
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

import { LucideIcon, Search, Calendar, Building2, Users, Gift, FileX } from 'lucide-react'
import { Link } from 'react-router-dom'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  variant?: 'default' | 'compact' | 'minimal'
  className?: string
}

export function EmptyState({
  icon: Icon = FileX,
  title,
  description,
  action,
  variant = 'default',
  className = ''
}: EmptyStateProps) {
  const sizes = {
    default: {
      container: 'py-16',
      icon: 'w-16 h-16',
      title: 'text-2xl',
      description: 'text-base'
    },
    compact: {
      container: 'py-12',
      icon: 'w-12 h-12',
      title: 'text-xl',
      description: 'text-sm'
    },
    minimal: {
      container: 'py-8',
      icon: 'w-10 h-10',
      title: 'text-lg',
      description: 'text-sm'
    }
  }

  const size = sizes[variant]

  return (
    <div className={`text-center bg-white rounded-2xl shadow-sm ${size.container} ${className}`}>
      <Icon className={`${size.icon} text-gray-300 mx-auto mb-4`} />
      <h3 className={`${size.title} font-semibold text-gray-600 mb-2`}>
        {title}
      </h3>
      <p className={`${size.description} text-gray-500 mb-6 max-w-md mx-auto`}>
        {description}
      </p>
      
      {action && (
        <>
          {action.href ? (
            <Link 
              to={action.href}
              className="btn-primary inline-flex items-center"
            >
              {action.label}
            </Link>
          ) : action.onClick ? (
            <button
              onClick={action.onClick}
              className="btn-primary inline-flex items-center"
            >
              {action.label}
            </button>
          ) : null}
        </>
      )}
    </div>
  )
}

// Variantes pré-configuradas
export function EmptyEvents({ className = '' }: { className?: string }) {
  return (
    <EmptyState
      icon={Calendar}
      title="Nenhum evento encontrado"
      description="Novos eventos serão adicionados em breve! Fique atento às novidades da região."
      action={{
        label: 'Ver todos os eventos',
        href: '/eventos'
      }}
      className={className}
    />
  )
}

export function EmptyCompanies({ className = '' }: { className?: string }) {
  return (
    <EmptyState
      icon={Building2}
      title="Nenhuma empresa encontrada"
      description="Estamos sempre adicionando novos estabelecimentos. Volte em breve!"
      action={{
        label: 'Ver todas as empresas',
        href: '/empresas'
      }}
      className={className}
    />
  )
}

export function EmptyCategories({ className = '' }: { className?: string }) {
  return (
    <EmptyState
      icon={Building2}
      title="Nenhuma categoria encontrada"
      description="Categorias serão adicionadas em breve!"
      variant="compact"
      className={className}
    />
  )
}

export function EmptyProfiles({ className = '' }: { className?: string }) {
  return (
    <EmptyState
      icon={Users}
      title="Nenhum perfil encontrado"
      description="Em breve você encontrará influenciadores e músicos da região aqui!"
      variant="compact"
      className={className}
    />
  )
}

export function EmptyGiveaways({ className = '' }: { className?: string }) {
  return (
    <EmptyState
      icon={Gift}
      title="Nenhum sorteio ativo"
      description="Não há sorteios acontecendo no momento. Fique atento às novidades!"
      action={{
        label: 'Ver sorteios encerrados',
        href: '/sorteios'
      }}
      className={className}
    />
  )
}

export function EmptySearch({ query, className = '' }: { query?: string; className?: string }) {
  return (
    <EmptyState
      icon={Search}
      title="Nenhum resultado encontrado"
      description={
        query 
          ? `Não encontramos resultados para "${query}". Tente buscar com outras palavras-chave.`
          : 'Tente buscar com outras palavras-chave ou explore as categorias.'
      }
      action={{
        label: 'Voltar para Home',
        href: '/'
      }}
      className={className}
    />
  )
}
