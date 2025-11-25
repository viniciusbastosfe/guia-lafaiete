/**
 * Página de Resultados de Busca
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Calendar, Building2, Users, X, Filter } from 'lucide-react'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { Event, Company, Profile } from '@/types/models'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<'todos' | 'eventos' | 'empresas' | 'perfis'>('todos')
  
  const query = searchParams.get('q') || ''
  const category = searchParams.get('categoria') || 'todos'

  // Buscar eventos
  const { data: events, isLoading: loadingEvents } = useSupabaseQuery<Event>('events', {
    select: '*, cities(name)',
    filters: { is_active: true },
    order: { column: 'start_datetime', ascending: true },
    limit: 50
  })

  // Buscar empresas
  const { data: companies, isLoading: loadingCompanies } = useSupabaseQuery<Company>('companies', {
    select: '*, cities(name), company_categories(name)',
    filters: { is_active: true },
    limit: 50
  })

  // Buscar perfis
  const { data: profiles, isLoading: loadingProfiles } = useSupabaseQuery<Profile>('profiles', {
    select: '*, cities(name)',
    filters: { is_active: true },
    limit: 50
  })

  // Filtrar resultados por query
  const filteredEvents = useMemo(() => {
    if (!events) return []
    if (!query) return category === 'eventos' || category === 'todos' ? events : []
    
    return events.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description?.toLowerCase().includes(query.toLowerCase()) ||
      event.location_name?.toLowerCase().includes(query.toLowerCase())
    )
  }, [events, query, category])

  const filteredCompanies = useMemo(() => {
    if (!companies) return []
    if (!query) return category === 'empresas' || category === 'todos' ? companies : []
    
    return companies.filter(company =>
      company.name.toLowerCase().includes(query.toLowerCase()) ||
      company.description?.toLowerCase().includes(query.toLowerCase())
    )
  }, [companies, query, category])

  const filteredProfiles = useMemo(() => {
    if (!profiles) return []
    if (!query) return category === 'perfis' || category === 'todos' ? profiles : []
    
    return profiles.filter(profile =>
      profile.name.toLowerCase().includes(query.toLowerCase()) ||
      profile.bio?.toLowerCase().includes(query.toLowerCase())
    )
  }, [profiles, query, category])

  const totalResults = filteredEvents.length + filteredCompanies.length + filteredProfiles.length
  const isLoading = loadingEvents || loadingCompanies || loadingProfiles

  const clearSearch = () => {
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Resultados da Busca
            </h1>
            <Link to="/" className="text-[#f31100] hover:text-[#d10e00] flex items-center gap-2">
              <X className="w-5 h-5" />
              Voltar
            </Link>
          </div>

          {/* Query e Filtros */}
          {query && (
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">"{query}"</span>
                <button onClick={clearSearch} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {category !== 'todos' && (
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700 capitalize">{category}</span>
                </div>
              )}
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'todos'
                  ? 'bg-[#f31100] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Todos ({totalResults})
            </button>
            <button
              onClick={() => setActiveTab('eventos')}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                activeTab === 'eventos'
                  ? 'bg-[#f31100] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Eventos ({filteredEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('empresas')}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                activeTab === 'empresas'
                  ? 'bg-[#f31100] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Empresas ({filteredCompanies.length})
            </button>
            <button
              onClick={() => setActiveTab('perfis')}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                activeTab === 'perfis'
                  ? 'bg-[#f31100] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              Perfis ({filteredProfiles.length})
            </button>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#f31100] mx-auto mb-4"></div>
            <p className="text-gray-600">Buscando resultados...</p>
          </div>
        )}

        {/* Resultados */}
        {!isLoading && (
          <div className="space-y-8">
            {/* Eventos */}
            {(activeTab === 'todos' || activeTab === 'eventos') && filteredEvents.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Eventos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredEvents.map(event => (
                    <Link key={event.id} to={`/eventos/${event.id}`} className="card-modern hover-lift">
                      <div className="relative h-48 overflow-hidden rounded-t-2xl">
                        <img
                          src={event.cover_image_url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{event.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                        <p className="text-sm text-[#f31100]">
                          {format(new Date(event.start_datetime), "dd 'de' MMMM", { locale: ptBR })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Empresas */}
            {(activeTab === 'todos' || activeTab === 'empresas') && filteredCompanies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Empresas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCompanies.map(company => (
                    <Link key={company.id} to={`/empresas/${company.id}`} className="card-modern hover-lift">
                      <div className="p-6 flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                          {company.logo_url ? (
                            <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Building2 className="w-10 h-10 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{company.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{company.description}</p>
                          {company.company_categories && (
                            <span className="inline-block mt-2 text-xs bg-gray-100 px-3 py-1 rounded-full">
                              {company.company_categories.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Perfis */}
            {(activeTab === 'todos' || activeTab === 'perfis') && filteredProfiles.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfis</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {filteredProfiles.map(profile => (
                    <Link key={profile.id} to={`/perfis/${profile.id}`} className="card-modern hover-lift text-center">
                      <div className="p-6">
                        <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden mx-auto mb-4">
                          {profile.profile_image_url ? (
                            <img src={profile.profile_image_url} alt={profile.name} className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Users className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{profile.name}</h3>
                        {profile.bio && (
                          <p className="text-sm text-gray-600 line-clamp-2">{profile.bio}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sem resultados */}
            {totalResults === 0 && !isLoading && (
              <div className="text-center py-16 bg-white rounded-2xl">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">Nenhum resultado encontrado</h3>
                <p className="text-gray-500 mb-6">
                  Tente buscar com outras palavras-chave ou explore as categorias
                </p>
                <Link to="/" className="btn-primary inline-flex items-center">
                  Voltar para Home
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
