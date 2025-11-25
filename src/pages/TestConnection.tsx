import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const [status, setStatus] = useState('Verificando...')
  const [envVars, setEnvVars] = useState<any>({})

  useEffect(() => {
    const test = async () => {
      try {
        // Verificar variáveis de ambiente
        const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL
        const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY
        
        setEnvVars({
          url: supabaseUrl ? 'OK' : 'MISSING',
          key: supabaseAnonKey ? 'OK' : 'MISSING'
        })

        // Testar conexão simples
        const { error } = await supabase
          .from('events')
          .select('count')
          .limit(1)

        if (error) {
          setStatus(`Erro: ${error.message}`)
        } else {
          setStatus('Conexão OK!')
        }

        // Testar RLS
        const { data: events, error: eventsError } = await supabase
          .from('events')
          .select('id, title')
          .eq('is_active', true)
          .limit(3)

        console.log('Events:', events)
        console.log('Events Error:', eventsError)

      } catch (err: any) {
        setStatus(`Erro crítico: ${err.message}`)
      }
    }

    test()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Teste de Conexão</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Status da Conexão</h2>
          <p className="text-lg">{status}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Variáveis de Ambiente</h2>
          <div className="space-y-2">
            <p><strong>VITE_SUPABASE_URL:</strong> {envVars.url}</p>
            <p><strong>VITE_SUPABASE_ANON_KEY:</strong> {envVars.key}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Ações</h2>
          <div className="space-y-4">
            <button 
              onClick={() => window.location.href = '/debug'}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ir para Debug
            </button>
            <button 
              onClick={() => window.location.href = '/login'}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
            >
              Ir para Login
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
            >
              Ir para Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
