import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Gift, Calendar, Clock, Search, Filter, Trophy, TrendingUp } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { Link } from 'react-router-dom'

export default function Giveaways() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'active' | 'finished'>('active')

  const { data: giveaways, isLoading } = useQuery({
    queryKey: ['giveaways', searchTerm, activeTab],
    queryFn: async () => {
      const now = new Date().toISOString()
      let query = supabase
        .from('giveaways')
        .select('*')
        .order('start_datetime', { ascending: false })

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`)
      }

      if (activeTab === 'active') {
        query = query.eq('is_published', true).gte('end_datetime', now)
      } else {
        query = query.eq('is_published', true).lt('end_datetime', now)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })

  const getGiveawayStatus = (giveaway: any) => {
    const now = new Date()
    const startDate = new Date(giveaway.start_datetime)
    const endDate = new Date(giveaway.end_datetime)
    const drawDate = new Date(giveaway.draw_datetime)

    if (now < startDate) {
      return { label: 'Em breve', variant: 'outline' as const }
    } else if (now >= startDate && now <= endDate) {
      return { label: 'Ativo', variant: 'default' as const }
    } else if (now > endDate && now < drawDate) {
      return { label: 'Aguardando sorteio', variant: 'secondary' as const }
    } else if (giveaway.result_published) {
      return { label: 'Finalizado', variant: 'outline' as const }
    } else {
      return { label: 'Encerrado', variant: 'outline' as const }
    }
  }

  const renderGiveawayCard = (giveaway: any) => {
    const status = getGiveawayStatus(giveaway)
    const daysLeft = Math.ceil(
      (new Date(giveaway.end_datetime).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )

    return (
      <Link key={giveaway.id} to={`/sorteios/${giveaway.id}`}>
        <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="relative">
            <div className="w-full h-48 bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-t-lg flex items-center justify-center">
              <Gift className="h-20 w-20 text-white/80" />
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
          </div>
          <CardHeader>
            <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
              {giveaway.title}
            </CardTitle>
            {giveaway.prize && (
              <CardDescription className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                {giveaway.prize}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {giveaway.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {giveaway.description}
              </p>
            )}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Início: {formatDateTime(giveaway.start_datetime)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Término: {formatDateTime(giveaway.end_datetime)}</span>
              </div>
              {activeTab === 'active' && daysLeft > 0 && (
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <TrendingUp className="h-4 w-4" />
                  <span>{daysLeft} {daysLeft === 1 ? 'dia restante' : 'dias restantes'}</span>
                </div>
              )}
            </div>
            {activeTab === 'active' && status.label === 'Ativo' && (
              <Button className="w-full mt-4">
                <Gift className="h-4 w-4 mr-2" />
                Participar
              </Button>
            )}
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sorteios</h1>
          <p className="text-xl text-white/90">
            Participe dos sorteios e concorra a prêmios incríveis
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="active">
              <TrendingUp className="h-4 w-4 mr-2" />
              Ativos
            </TabsTrigger>
            <TabsTrigger value="finished">
              <Trophy className="h-4 w-4 mr-2" />
              Finalizados
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filtro de Busca */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Buscar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar sorteios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Grid de Sorteios */}
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
        ) : giveaways && giveaways.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giveaways.map(renderGiveawayCard)}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Gift className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {activeTab === 'active'
                  ? 'Nenhum sorteio ativo no momento'
                  : 'Nenhum sorteio finalizado'}
              </h3>
              <p className="text-gray-600">
                {activeTab === 'active'
                  ? 'Volte mais tarde para ver novos sorteios'
                  : 'Aguarde os próximos sorteios'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
