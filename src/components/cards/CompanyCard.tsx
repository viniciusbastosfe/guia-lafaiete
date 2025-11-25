/**
 * Company Card Component - CLEAN DESIGN
 * Design minimalista para empresas
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

import { Link } from 'react-router-dom'
import { Building2, ChevronRight } from 'lucide-react'
import { Company } from '@/types/models'

interface CompanyCardProps {
  company: Company
  variant?: 'horizontal' | 'vertical' | 'compact'
  className?: string
}

export function CompanyCard({ 
  company, 
  variant = 'horizontal',
  className = '' 
}: CompanyCardProps) {
  if (variant === 'vertical') {
    return (
      <Link to={`/empresas/${company.id}`} className={`block group ${className}`}>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 h-full hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5">
          {/* Logo */}
          <div className="relative h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-6">
            {company.logo_url ? (
              <img 
                src={company.logo_url} 
                alt={company.name} 
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-10 h-10 text-gray-400" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            {company.company_categories && (
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md mb-3">
                {company.company_categories.name}
              </span>
            )}
            <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
              {company.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {company.description}
            </p>
            <div className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">
              Ver detalhes <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link to={`/empresas/${company.id}`} className={`block group ${className}`}>
        <div className="bg-white border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
          <div className="flex items-center gap-3">
            {/* Logo pequena */}
            <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
              {company.logo_url ? (
                <img 
                  src={company.logo_url} 
                  alt={company.name} 
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              ) : (
                <Building2 className="w-6 h-6 text-gray-400" />
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-gray-900 truncate group-hover:text-red-600 transition-colors">
                {company.name}
              </h4>
              {company.company_categories && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {company.company_categories.name}
                </p>
              )}
            </div>
            
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0 transition-colors" />
          </div>
        </div>
      </Link>
    )
  }

  // Horizontal (default)
  return (
    <Link to={`/empresas/${company.id}`} className={`block group ${className}`}>
      <div className="bg-white border border-gray-200 rounded-xl transition-all duration-200 h-full hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5">
        <div className="p-5">
          <div className="flex gap-5">
            {/* Logo */}
            <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-3">
              {company.logo_url ? (
                <img 
                  src={company.logo_url} 
                  alt={company.name} 
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <Building2 className="w-12 h-12 text-gray-400" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {company.company_categories && (
                <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md mb-3">
                  {company.company_categories.name}
                </span>
              )}
              <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                {company.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                {company.description}
              </p>
              <div className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                Ver detalhes <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
