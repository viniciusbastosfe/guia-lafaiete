import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar, MapPin, Clock, Search, Filter, ExternalLink } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { Link } from 'react-router-dom'

export default function Events() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDate, setFilterDate] = useState('all')
  const [filterCity, setFilterCity] = useState('all')

  const { data: events, isLoading } = useQuery<any[]>({
    queryKey: ['events', searchTerm, filterDate, filterCity],
    queryFn: async () => {
      let query = supabase
        .from('events')
        .select('*, cities(name)')
        .eq('is_active', true)
        .order('start_datetime', { ascending: true })

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`)
      }

      if (filterDate === 'today') {
        const today = new Date().toISOString().split('T')[0]
        query = query.gte('start_datetime', today)
      } else if (filterDate === 'week') {
        const nextWeek = new Date()
        nextWeek.setDate(nextWeek.getDate() + 7)
        query = query.lte('start_datetime', nextWeek.toISOString())
      }

      if (filterCity !== 'all') {
        query = query.eq('city_id', filterCity)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })

  const { data: cities } = useQuery<any[]>({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .order('name')
      if (error) throw error
      return data
    },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Eventos</h1>
          <p className="text-xl text-white/90">
            Descubra os melhores eventos em Conselheiro Lafaiete e região
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
                <option value="all">Todas as datas</option>
                <option value="today">Hoje</option>
                <option value="week">Próximos 7 dias</option>
              </Select>
              <Select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
                <option value="all">Todas as cidades</option>
                {cities?.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Grid de Eventos */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link key={event.id} to={`/eventos/${event.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  {event.cover_image_url ? (
                    <img
                      src={event.cover_image_url}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg flex items-center justify-center">
                      <Calendar className="h-16 w-16 text-white/50" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                      </CardTitle>
                      {event.is_featured && (
                        <Badge variant="default" className="shrink-0">Destaque</Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.cities?.name || 'Local não informado'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {formatDateTime(event.start_datetime)}
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    {event.ticket_url && (
                      <Button size="sm" className="w-full mt-4">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Comprar Ingresso
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum evento encontrado</h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou volte mais tarde para ver novos eventos
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
