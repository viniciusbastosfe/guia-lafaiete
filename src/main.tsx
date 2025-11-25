import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { supabase } from './lib/supabase'

// Debug ONLY in development
if (import.meta.env.MODE === "development") {
  console.log('🔍 VARS:', {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_ANON_KEY,
    mode: import.meta.env.MODE
  })

  // Debug: Verificar sessão de autenticação
  supabase.auth.getSession().then(({ data: { session } }) => {
    console.log('🔐 Auth Status:', {
      isAuthenticated: !!session,
      userId: session?.user?.id,
      role: session?.user?.role,
      email: session?.user?.email
    })
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
