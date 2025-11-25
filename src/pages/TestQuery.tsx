import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestQuery() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testEvents = async () => {
    console.log('🧪 TESTE: Buscando eventos...')
    setLoading(true)
    
    try {
      // Adicionar timeout de 5 segundos
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('⏰ TIMEOUT: Query demorou mais de 5 segundos')), 5000)
      )
      
      const queryPromise = supabase
        .from('events')
        .select('id, title, is_active')
        .eq('is_active', true)
        .limit(5)
      
      const { data, error } = await Promise.race([
        queryPromise,
        timeoutPromise
      ]) as any
      
      console.log('📊 RESULTADO:', { 
        sucesso: !error, 
        count: data?.length, 
        error: error?.message,
        data: data 
      })
      
      setResult({ data, error: error?.message, count: data?.length })
    } catch (err: any) {
      console.error('❌ ERRO CATCH:', err.message)
      setResult({ error: err.message })
    } finally {
      setLoading(false)
    }
  }

  const testSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    console.log('🔐 Sessão:', {
      autenticado: !!session,
      role: session?.user?.role,
      userId: session?.user?.id
    })
  }

  useEffect(() => {
    testSession()
    testEvents()
  }, [])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">🧪 Teste de Query</h1>
      
      <div className="space-y-4">
        <button 
          onClick={testEvents}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Testando...' : 'Testar Eventos'}
        </button>

        <button 
          onClick={testSession}
          className="px-4 py-2 bg-green-500 text-white rounded ml-2"
        >
          Ver Sessão
        </button>

        {result && (
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Resultado:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-bold mb-2">📋 Verifique o Console (F12)</h3>
          <p>Todos os logs aparecem no console do navegador.</p>
        </div>
      </div>
    </div>
  )
}
