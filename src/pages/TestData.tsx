import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestData() {
  const [events, setEvents] = useState<any[]>([])
  const [companies, setCompanies] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError('')

        // Testar eventos
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .eq('is_active', true)
          .limit(5)

        if (eventsError) {
          setError(`Erro eventos: ${eventsError.message}`)
        } else {
          setEvents(eventsData || [])
        }

        // Testar empresas
        const { data: companiesData, error: companiesError } = await supabase
          .from('companies')
          .select('*')
          .eq('is_active', true)
          .limit(5)

        if (companiesError) {
          setError(prev => prev + `\nErro empresas: ${companiesError.message}`)
        } else {
          setCompanies(companiesData || [])
        }

        // Testar categorias
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('company_categories')
          .select('*')
          .limit(5)

        if (categoriesError) {
          setError(prev => prev + `\nErro categorias: ${categoriesError.message}`)
        } else {
          setCategories(categoriesData || [])
        }

      } catch (err: any) {
        setError(`Erro geral: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Teste de Dados</h1>
        
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4">Carregando dados...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">Erros encontrados:</p>
            <pre className="whitespace-pre-wrap">{error}</pre>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Eventos ({events.length})</h2>
            {events.map(event => (
              <div key={event.id} className="mb-3 p-3 bg-gray-50 rounded">
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.location_name}</p>
                <p className="text-xs text-gray-500">{new Date(event.start_datetime).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Empresas ({companies.length})</h2>
            {companies.map(company => (
              <div key={company.id} className="mb-3 p-3 bg-gray-50 rounded">
                <h3 className="font-medium">{company.name}</h3>
                <p className="text-sm text-gray-600">{company.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Categorias ({categories.length})</h2>
            {categories.map(category => (
              <div key={category.id} className="mb-3 p-3 bg-gray-50 rounded">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.slug}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ir para Home
          </button>
          <button 
            onClick={() => window.location.href = '/test'}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Testar Conexão
          </button>
        </div>
      </div>
    </div>
  )
}
