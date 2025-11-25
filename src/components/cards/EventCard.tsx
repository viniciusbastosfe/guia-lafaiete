/**
 * Event Card Component - CLEAN DESIGN
 * Design minimalista com foco em conteúdo
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

import { Link } from 'react-router-dom'
import { Calendar, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Event } from '@/types/models'

const DEFAULT_EVENT_IMAGE = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'

interface EventCardProps {
  event: Event
  showBadge?: boolean
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

export function EventCard({ 
  event, 
  showBadge = true, 
  variant = 'default',
  className = '' 
}: EventCardProps) {
  const imageHeight = variant === 'compact' ? 'h-40' : variant === 'featured' ? 'h-64' : 'h-56'
  
  return (
    <Link to={`/eventos/${event.id}`} className={`block group ${className}`}>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 h-full hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5">
        {/* Image */}
        <div className={`relative ${imageHeight} overflow-hidden bg-gray-100`}>
          {showBadge && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-white/95 backdrop-blur-sm text-gray-700 rounded-md border border-gray-200">
                <Calendar className="w-3 h-3" />
                Evento
              </span>
            </div>
          )}
          <img 
            src={event.cover_image_url || DEFAULT_EVENT_IMAGE} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className={variant === 'compact' ? 'p-4' : 'p-5'}>
          <h3 className={`font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors ${
            variant === 'featured' ? 'text-xl' : variant === 'compact' ? 'text-base' : 'text-lg'
          }`}>
            {event.title}
          </h3>

          {variant !== 'compact' && event.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          )}

          <div className="space-y-2">
            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-red-600" />
              </div>
              <span className="font-medium">
                {format(new Date(event.start_datetime), "dd 'de' MMMM", { locale: ptBR })}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="line-clamp-1">{event.location_name}</span>
            </div>
          </div>

          {/* City */}
          {event.cities && variant !== 'compact' && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium">
                {event.cities.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

// Variante Hero para evento em destaque
interface EventHeroProps {
  event: Event
  className?: string
}

export function EventHero({ event, className = '' }: EventHeroProps) {
  return (
    <div className={`bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-gray-200 shadow-sm ${className}`}>
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-lg border border-red-100 mb-5">
        <Calendar className="w-3.5 h-3.5" />
        Evento em Destaque
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {event.title}
      </h1>
      
      <div className="flex flex-wrap gap-4 mb-5">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded">
            <Calendar className="w-3.5 h-3.5 text-red-600" />
          </div>
          <span className="font-medium">
            {format(new Date(event.start_datetime), "dd 'de' MMMM", { locale: ptBR })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded">
            <MapPin className="w-3.5 h-3.5 text-gray-600" />
          </div>
          <span className="font-medium">{event.location_name}</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
        {event.description}
      </p>
      
      <Link 
        to={`/eventos/${event.id}`} 
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5"
      >
        Ver detalhes do evento
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
