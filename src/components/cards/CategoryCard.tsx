/**
 * Category Card Component - CLEAN DESIGN
 * Design minimalista para categorias
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

import { Link } from 'react-router-dom'
import { Building2, LucideIcon } from 'lucide-react'
import { Category } from '@/types/models'

interface CategoryCardProps {
  category: Category
  icon?: LucideIcon
  variant?: 'circle' | 'square' | 'list'
  className?: string
}

export function CategoryCard({ 
  category, 
  icon: Icon = Building2,
  variant = 'circle',
  className = '' 
}: CategoryCardProps) {
  if (variant === 'list') {
    return (
      <Link 
        to={`/empresas?categoria=${category.slug}`}
        className={`block group ${className}`}
      >
        <div className="bg-white border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
              <Icon className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{category.name}</h4>
              {category.description && (
                <p className="text-sm text-gray-600 line-clamp-1 mt-0.5">
                  {category.description}
                </p>
              )}
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'square') {
    return (
      <Link 
        to={`/empresas?categoria=${category.slug}`}
        className={`block group ${className}`}
      >
        <div className="bg-white border border-gray-200 rounded-xl p-5 transition-all duration-200 h-full hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5">
          <div className="w-14 h-14 bg-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
            <Icon className="w-7 h-7 text-red-600" />
          </div>
          <h3 className="font-semibold text-base text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {category.description}
            </p>
          )}
        </div>
      </Link>
    )
  }

  // Circle (default)
  return (
    <Link 
      to={`/empresas?categoria=${category.slug}`}
      className={`block group ${className}`}
    >
      <div className="bg-white border border-gray-200 rounded-xl p-5 transition-all duration-200 h-full hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-100 transition-colors">
          <Icon className="w-8 h-8 text-red-600" />
        </div>
        <span className="text-sm font-semibold text-gray-900 text-center block group-hover:text-red-600 transition-colors">
          {category.name}
        </span>
        {category.description && (
          <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  )
}
