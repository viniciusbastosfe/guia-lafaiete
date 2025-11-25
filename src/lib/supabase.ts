import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Debug: Log para verificar variáveis (remover em produção)
console.log('🔍 Supabase Config:', {
  url: supabaseUrl ? '✅ Configurada' : '❌ Faltando',
  key: supabaseAnonKey ? '✅ Configurada' : '❌ Faltando',
  env: import.meta.env.MODE
})

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ ERRO: Variáveis de ambiente do Supabase não configuradas!')
  console.error('📋 Variáveis esperadas:', {
    VITE_SUPABASE_URL: supabaseUrl || 'FALTANDO',
    VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? 'CONFIGURADA' : 'FALTANDO'
  })
  throw new Error('Missing Supabase environment variables. Verifique as variáveis no EasyPanel.')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})
