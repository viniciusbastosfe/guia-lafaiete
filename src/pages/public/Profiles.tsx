import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, Music, MapPin, Search, Filter, Instagram } from 'lucide-react'
import { getInitials } from '@/lib/utils'
import { Link } from 'react-router-dom'

export default function Profiles() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCity, setFilterCity] = useState('all')
  const [activeTab, setActiveTab] = useState<'all' | 'influencer' | 'musician'>('all')

  const { data: profiles, isLoading } = useQuery<any[]>({
    queryKey: ['profiles', searchTerm, filterCity, activeTab],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*, cities(name)')
        .eq('is_active', true)
        .order('name')

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`)
      }

      if (filterCity !== 'all') {
        query = query.eq('city_id', filterCity)
      }

      if (activeTab !== 'all') {
        query = query.eq('type', activeTab)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })

  const { data: cities } = useQuery<any[]>({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data, error } = await supabase.from('cities').select('*').order('name')
      if (error) throw error
      return data
    },
  })

  const renderProfileCard = (profile: any) => (
    <Link key={profile.id} to={`/perfis/${profile.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader className="text-center">
          <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
            <AvatarImage src={profile.avatar_url} alt={profile.name} />
            <AvatarFallback className="text-xl bg-gradient-to-br from-pink-400 to-purple-500 text-white">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-center gap-2">
            <CardTitle className="group-hover:text-primary transition-colors">
              {profile.name}
            </CardTitle>
            {profile.is_featured && (
              <Badge variant="default" className="shrink-0">Destaque</Badge>
            )}
          </div>
          <CardDescription className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            {profile.cities?.name || 'Local não informado'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-center">
            <Badge variant="outline" className="gap-1">
              {profile.type === 'influencer' ? (
                <>
                  <Star className="h-3 w-3" />
                  Influenciador
                </>
              ) : (
                <>
                  <Music className="h-3 w-3" />
                  Músico
                </>
              )}
            </Badge>
          </div>
          {profile.bio && (
            <p className="text-sm text-gray-600 line-clamp-3 text-center">
              {profile.bio}
            </p>
          )}
          {profile.instagram_url && (
            <Button size="sm" variant="outline" className="w-full">
              <Instagram className="h-4 w-4 mr-2" />
              Ver Instagram
            </Button>
          )}
        </CardContent>
      </Card>
    </Link>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Perfis</h1>
          <p className="text-xl text-white/90">
            Conheça influenciadores e músicos da região
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="influencer">
              <Star className="h-4 w-4 mr-2" />
              Influenciadores
            </TabsTrigger>
            <TabsTrigger value="musician">
              <Music className="h-4 w-4 mr-2" />
              Músicos
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar perfis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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

        {/* Grid de Perfis */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i}>
                <CardHeader className="text-center">
                  <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : profiles && profiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profiles.map(renderProfileCard)}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              {activeTab === 'influencer' ? (
                <Star className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              ) : activeTab === 'musician' ? (
                <Music className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              ) : (
                <Star className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              )}
              <h3 className="text-xl font-semibold mb-2">Nenhum perfil encontrado</h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou volte mais tarde para ver novos perfis
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
