import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Building2, MapPin, Search, Filter, Instagram, Globe, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCity, setFilterCity] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const { data: companies, isLoading } = useQuery<any[]>({
    queryKey: ['companies', searchTerm, filterCity, filterCategory],
    queryFn: async () => {
      let query = supabase
        .from('companies')
        .select('*, cities(name), company_categories(name)')
        .eq('is_active', true)
        .order('name')

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`)
      }

      if (filterCity !== 'all') {
        query = query.eq('city_id', filterCity)
      }

      if (filterCategory !== 'all') {
        query = query.eq('category_id', filterCategory)
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

  const { data: categories } = useQuery<any[]>({
    queryKey: ['company_categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('company_categories').select('*').order('name')
      if (error) throw error
      return data
    },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Empresas</h1>
          <p className="text-xl text-white/90">
            Encontre empresas locais em Conselheiro Lafaiete e região
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
                  placeholder="Buscar empresas..."
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
              <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">Todas as categorias</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Grid de Empresas */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader className="text-center">
                  <Skeleton className="h-20 w-20 rounded-lg mx-auto mb-4" />
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
        ) : companies && companies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <Link key={company.id} to={`/empresas/${company.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center">
                    {company.logo_url ? (
                      <img
                        src={company.logo_url}
                        alt={company.name}
                        className="h-20 w-20 object-contain rounded-lg mx-auto mb-4"
                      />
                    ) : (
                      <div className="h-20 w-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Building2 className="h-10 w-10 text-white" />
                      </div>
                    )}
                    <div className="flex items-center justify-center gap-2">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {company.name}
                      </CardTitle>
                      {company.is_featured && (
                        <Badge variant="default" className="shrink-0">Destaque</Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {company.cities?.name || 'Local não informado'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {company.description && (
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {company.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {company.website_url && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Globe className="h-4 w-4 mr-1" />
                          Site
                        </Button>
                      )}
                      {company.instagram_url && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Instagram className="h-4 w-4 mr-1" />
                          Instagram
                        </Button>
                      )}
                      {company.whatsapp && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Phone className="h-4 w-4 mr-1" />
                          WhatsApp
                        </Button>
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
              <Building2 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhuma empresa encontrada</h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou volte mais tarde para ver novos cadastros
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
