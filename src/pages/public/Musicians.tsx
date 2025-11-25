import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Music, Instagram, Youtube, MapPin } from 'lucide-react'
import { getInitials } from '@/lib/utils'
import { Link } from 'react-router-dom'

export default function Musicians() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: musicians, isLoading } = useQuery<any[]>({
    queryKey: ['musicians', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*, cities(name)')
        .eq('type', 'musician')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Músicos</h1>
          <p className="text-xl text-white/90">
            Descubra os talentos musicais de Conselheiro Lafaiete e região
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Busca */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Buscar Músicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {/* Grid de Músicos */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader className="text-center">
                  <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : musicians && musicians.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {musicians.map((musician) => (
              <Link key={musician.id} to={`/perfis/${musician.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-purple-100 group-hover:ring-purple-300 transition-all">
                      <AvatarImage src={musician.avatar_url} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-500 text-white text-2xl">
                        {getInitials(musician.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CardTitle className="group-hover:text-purple-600 transition-colors">
                        {musician.name}
                      </CardTitle>
                      {musician.is_featured && (
                        <Badge variant="default" className="bg-purple-500">Destaque</Badge>
                      )}
                    </div>
                    {musician.cities && (
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {musician.cities.name}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {musician.bio && (
                      <p className="text-sm text-gray-600 text-center line-clamp-2">
                        {musician.bio}
                      </p>
                    )}
                    <div className="flex items-center justify-center gap-4 pt-2">
                      {musician.instagram_url && (
                        <a
                          href={musician.instagram_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                      )}
                      {musician.youtube_url && (
                        <a
                          href={musician.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Youtube className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Music className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum músico encontrado</h3>
              <p className="text-gray-600">
                Tente ajustar sua busca ou volte mais tarde
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
