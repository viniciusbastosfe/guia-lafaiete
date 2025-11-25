import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Debug() {
  const { data: events, isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ['debug-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
      console.log('Events query:', { data, error })
      if (error) throw error
      return data
    },
  })

  const { data: companies, isLoading: companiesLoading, error: companiesError } = useQuery({
    queryKey: ['debug-companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
      console.log('Companies query:', { data, error })
      if (error) throw error
      return data
    },
  })

  const { data: profiles, isLoading: profilesLoading, error: profilesError } = useQuery({
    queryKey: ['debug-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
      console.log('Profiles query:', { data, error })
      if (error) throw error
      return data
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Debug - Teste de Dados</h1>

      <div className="space-y-6">
        {/* Eventos */}
        <Card>
          <CardHeader>
            <CardTitle>Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            {eventsLoading && <p>Carregando...</p>}
            {eventsError && (
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="font-semibold text-red-800">Erro:</p>
                <pre className="text-sm text-red-600 mt-2 overflow-auto">
                  {JSON.stringify(eventsError, null, 2)}
                </pre>
              </div>
            )}
            {events && (
              <div>
                <p className="font-semibold mb-2">Total: {events.length}</p>
                <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto max-h-96">
                  {JSON.stringify(events, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Empresas */}
        <Card>
          <CardHeader>
            <CardTitle>Empresas</CardTitle>
          </CardHeader>
          <CardContent>
            {companiesLoading && <p>Carregando...</p>}
            {companiesError && (
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="font-semibold text-red-800">Erro:</p>
                <pre className="text-sm text-red-600 mt-2 overflow-auto">
                  {JSON.stringify(companiesError, null, 2)}
                </pre>
              </div>
            )}
            {companies && (
              <div>
                <p className="font-semibold mb-2">Total: {companies.length}</p>
                <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto max-h-96">
                  {JSON.stringify(companies, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Perfis */}
        <Card>
          <CardHeader>
            <CardTitle>Perfis</CardTitle>
          </CardHeader>
          <CardContent>
            {profilesLoading && <p>Carregando...</p>}
            {profilesError && (
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="font-semibold text-red-800">Erro:</p>
                <pre className="text-sm text-red-600 mt-2 overflow-auto">
                  {JSON.stringify(profilesError, null, 2)}
                </pre>
              </div>
            )}
            {profiles && (
              <div>
                <p className="font-semibold mb-2">Total: {profiles.length}</p>
                <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto max-h-96">
                  {JSON.stringify(profiles, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
