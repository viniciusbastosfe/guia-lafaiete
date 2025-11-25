import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Variáveis vindas do Vite (dev ou produção)
const envUrl = import.meta.env.VITE_SUPABASE_URL
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fallback absoluto para produção caso o Docker/EasyPanel não entregue as env
const supabaseUrl =
  envUrl || "https://rihcfdnvujmkhmcaanon.supabase.co"

const supabaseKey =
  envKey ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaGNmZG52dWpta2htY2Fhbm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NTk4MTksImV4cCI6MjA3OTUzNTgxOX0.jPbN-oS8mZ3kSUbGvVKJF773i86MIcdIyyd7DaAHFYI"

// Log amigável para depuração
console.log("🔍 Supabase config:", {
  VITE_SUPABASE_URL: envUrl,
  VITE_SUPABASE_ANON_KEY: envKey ? "OK (from env)" : "undefined",
  usingUrl: supabaseUrl,
  usingKey: supabaseKey ? "OK (fallback or env)" : "missing",
  env: import.meta.env.MODE,
})

// Se mesmo com o fallback não houver valores, interrompe
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis do Supabase ausentes!', {
    VITE_SUPABASE_URL: envUrl,
    VITE_SUPABASE_ANON_KEY: envKey,
    env: import.meta.env.MODE
  })
  throw new Error('Missing Supabase environment variables.')
}

// Criação do cliente Supabase tipado
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})
