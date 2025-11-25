import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Calendar, ChevronRight, Building2, Users } from 'lucide-react'
import { SearchBar } from '@/components/ui/SearchBar'
import { Carousel } from '@/components/ui/Carousel'
import { supabase } from '@/lib/supabase'
import { EventCard, CompanyCard, CategoryCard } from '@/components/cards'

export default function Home() {
  const navigate = useNavigate()

  // Função de busca funcional
  const handleSearch = (query: string, category: string) => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (category !== 'todos') params.set('categoria', category)
    navigate(`/busca?${params.toString()}`)
  }

  // Buscar eventos ativos
  const { data: events } = useQuery<any[]>({
    queryKey: ['featured-events'],
    queryFn: async () => {
      const { data } = await supabase
        .from('events')
        .select('*, cities(name)')
        .eq('is_active', true)
        .order('start_datetime', { ascending: true })
        .limit(10)
      return data || []
    }
  })

  // Apenas eventos em destaque para o banner do topo
  const featuredEvents = (events || []).filter((event) => event.is_featured)

  // Buscar empresas em destaque
  const { data: companies } = useQuery<any[]>({
    queryKey: ['featured-companies'],
    queryFn: async () => {
      const { data } = await supabase
        .from('companies')
        .select('*, cities(name), company_categories(name)')
        .eq('is_active', true)
        .eq('is_featured', true)
        .limit(2)
      return data || []
    }
  })

  // Buscar categorias
  const { data: categories } = useQuery<any[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await supabase
        .from('company_categories')
        .select('*')
        .limit(8)
      return data || []
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de Busca */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container">
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Carrossel Hero de Eventos em Destaque (apenas is_featured = true) */}
      <section className="section-sm">
        <div className="container">
          {featuredEvents.length > 0 ? (
            <Carousel itemsPerView={1} showArrows={true} showDots={true}>
              {featuredEvents.map((event) => (
                <div
                  key={event.id}
                  className="relative w-full h-[320px] md:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden group"
                >
                  {/* Imagem de fundo */}
                  <img
                    src={event.cover_image_url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200'}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/10" />

                  {/* Conteúdo */}
                  <div className="relative z-10 h-full flex items-center px-4 sm:px-8 lg:px-12">
                    <div className="max-w-xl bg-white/95 backdrop-blur-md rounded-2xl shadow-md px-6 py-5 sm:px-8 sm:py-7">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium mb-4">
                        <Calendar className="w-3.5 h-3.5" />
                        Evento em destaque
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                        {event.title}
                      </h2>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-red-600" />
                          <span>{new Date(event.start_datetime).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-600" />
                          <span className="line-clamp-1">{event.location_name}</span>
                        </div>
                      </div>

                      {event.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>
                      )}

                      <Link
                        to={`/eventos/${event.id}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5"
                      >
                        Ver detalhes do evento
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="relative w-full h-[260px] md:h-[300px] rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Nenhum evento em destaque no momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* Carrossel de Eventos em Destaque */}
      <section className="section-sm">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#f31100]/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#f31100]" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Eventos em Destaque</h2>
                <p className="text-gray-600">Descubra os melhores eventos da região</p>
              </div>
            </div>
            <Link to="/eventos" className="text-[#f31100] hover:text-[#d10e00] flex items-center gap-2 font-medium">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {events && events.length > 0 ? (
            <Carousel itemsPerView={3} showArrows={true} showDots={true}>
              {events?.map((event) => (
                <EventCard key={event.id} event={event} />
              )) || []}
            </Carousel>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum evento encontrado</h3>
              <p className="text-gray-500">Novos eventos serão adicionados em breve!</p>
            </div>
          )}
        </div>
      </section>

      {/* Carrossel de Categorias */}
      <section className="section-sm bg-gray-100">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Catálogos Comerciais</h2>
            <p className="text-gray-600 text-lg">Confira as categorias de empresas locais que encontramos para você</p>
          </div>

          {categories && categories.length > 0 ? (
            <Carousel itemsPerView={6} showArrows={true} showDots={false}>
              {categories?.map((category) => (
                <CategoryCard key={category.id} category={category} variant="circle" />
              )) || []}
            </Carousel>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma categoria encontrada</h3>
              <p className="text-gray-500">Categorias serão adicionadas em breve!</p>
            </div>
          )}
        </div>
      </section>

      {/* Carrossel de Empresas em Destaque */}
      <section className="section-sm">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#f31100]/10 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#f31100]" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Empresas em Destaque</h2>
                <p className="text-gray-600">Os melhores estabelecimentos da região</p>
              </div>
            </div>
            <Link to="/empresas" className="text-[#f31100] hover:text-[#d10e00] flex items-center gap-2 font-medium">
              Ver todas <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {companies && companies.length > 0 ? (
            <Carousel itemsPerView={2} showArrows={true} showDots={true}>
              {companies?.map((company) => (
                <CompanyCard key={company.id} company={company} variant="horizontal" />
              )) || []}
            </Carousel>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma empresa encontrada</h3>
              <p className="text-gray-500">Empresas serão adicionadas em breve!</p>
            </div>
          )}
        </div>
      </section>

      {/* Influenciadores & Músicos Moderno */}
      <section className="section-sm bg-gray-100">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#f31100]/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#f31100]" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Influenciadores & Músicos</h2>
                <p className="text-gray-600">Talentos locais e regionais</p>
              </div>
            </div>
            <div className="flex gap-6">
              <Link to="/influenciadores" className="text-[#f31100] hover:text-[#d10e00] flex items-center gap-2 font-medium">
                Influenciadores <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/musicos" className="text-[#f31100] hover:text-[#d10e00] flex items-center gap-2 font-medium">
                Músicos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="glass p-16 rounded-3xl text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              Em breve, veja os influenciadores e músicos da cidade e da região aqui!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
