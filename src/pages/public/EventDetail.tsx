import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar, MapPin, Clock, ExternalLink, ArrowLeft, Globe } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

export default function EventDetail() {
  const { id } = useParams<{ id: string }>()

  const { data: event, isLoading } = useQuery<any | null>({
    queryKey: ['event', id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*, cities(name)')
        .eq('id', id as string)
        .single()
      if (error) throw error
      return data
    },
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-96 w-full rounded-lg mb-8" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Evento não encontrado</h1>
        <Link to="/eventos">
          <Button>Voltar para Eventos</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero com Imagem */}
      {event.cover_image_url ? (
        <div 
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${event.cover_image_url})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
      ) : (
        <div className="h-96 bg-gradient-to-r from-blue-600 to-purple-600" />
      )}

      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-12">
        <Card className="shadow-xl">
          <CardContent className="p-8">
            {/* Header */}
            <div className="mb-6">
              <Link to="/eventos">
                <Button variant="outline" size="sm" className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{event.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>{event.location_name || 'Local não informado'}</span>
                    {event.cities && <span>• {event.cities.name}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  {event.is_featured && (
                    <Badge variant="default" className="h-fit">Destaque</Badge>
                  )}
                  {event.is_online && (
                    <Badge variant="secondary" className="h-fit">
                      <Globe className="h-3 w-3 mr-1" />
                      Online
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Info Principal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Início</p>
                      <p className="font-semibold">{formatDateTime(event.start_datetime)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {event.end_datetime && (
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Término</p>
                        <p className="font-semibold">{formatDateTime(event.end_datetime)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {event.ticket_url && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <a href={event.ticket_url} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Comprar Ingresso
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Descrição */}
            {event.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Sobre o Evento</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {event.description}
                </p>
              </div>
            )}

            {/* Informações Adicionais */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Informações</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {event.address && (
                  <div>
                    <span className="text-gray-600">Endereço:</span>
                    <p className="font-medium">{event.address}</p>
                  </div>
                )}
                {event.instagram_url && (
                  <div>
                    <span className="text-gray-600">Instagram:</span>
                    <a 
                      href={event.instagram_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline block"
                    >
                      Ver perfil
                    </a>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
