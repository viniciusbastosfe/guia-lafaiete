import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Variáveis vindas do Vite (dev ou produção)
const envUrl = import.meta.env.VITE_SUPABASE_URL
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fallback absoluto caso o Docker/EasyPanel não entregue as env
const supabaseUrl =
  envUrl || "https://rihcfdnvujmkhmcaanon.supabase.co"

const supabaseKey =
  envKey ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaGNmZG52dWpta2htY2Fhbm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NTk4MTksImV4cCI6MjA3OTUzNTgxOX0.jPbN-oS8mZ3kSUbGvVKJF773i86MIcdIyyd7DaAHFYI"

// Debug ONLY in development
if (import.meta.env.MODE === "development") {
  console.log("🔍 Supabase config (dev):", {
    VITE_SUPABASE_URL: envUrl,
    VITE_SUPABASE_ANON_KEY: envKey ? "OK (from env)" : "undefined",
    usingUrl: supabaseUrl,
    usingKey: supabaseKey ? "OK (fallback or env)" : "missing",
    env: import.meta.env.MODE,
  })
}

// Se ainda assim faltar algo, interrompe
if (!supabaseUrl || !supabaseKey) {
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
