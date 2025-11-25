import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

type UserProfile = Database['public']['Tables']['users']['Row']

interface AuthState {
  user: User | null
  profile: UserProfile | null
  isLoading: boolean
  isAdmin: boolean
  setUser: (user: User | null) => void
  setProfile: (profile: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  signOut: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      isLoading: true,
      isAdmin: false,

      setUser: (user) => set({ user }),
      
      setProfile: (profile) => set({ 
        profile, 
        isAdmin: profile?.is_admin || false 
      }),
      
      setLoading: (isLoading) => set({ isLoading }),

      signOut: async () => {
        console.log('🚨 signOut CHAMADO')
        try {
          console.log('1️⃣ Limpando localStorage...')
          localStorage.removeItem('auth-storage')
          
          console.log('2️⃣ Chamando supabase.auth.signOut()...')
          const { error } = await supabase.auth.signOut()
          if (error) {
            console.error('❌ Erro ao fazer logout:', error)
            throw error
          }
          console.log('3️⃣ Supabase signOut OK')
          
          console.log('4️⃣ Limpando estado...')
          set({ user: null, profile: null, isAdmin: false })
          
          console.log('5️⃣ Limpando storage...')
          localStorage.removeItem('auth-storage')
          sessionStorage.clear()
          
          console.log('6️⃣ Redirecionando...')
          setTimeout(() => {
            window.location.href = '/'
          }, 100)
        } catch (error) {
          console.error('❌ Erro crítico no logout:', error)
          localStorage.clear()
          sessionStorage.clear()
          setTimeout(() => {
            window.location.href = '/'
          }, 100)
        }
      },

      checkAuth: async () => {
        try {
          console.log('🔍 checkAuth iniciado')
          set({ isLoading: true })
          
          const { data: { session } } = await supabase.auth.getSession()
          console.log('📝 Sessão:', { hasSession: !!session, userId: session?.user?.id })
          
          if (session?.user) {
            set({ user: session.user })
            
            console.log('📊 Buscando profile do usuário...')
            const { data: profile, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single()
            
            console.log('👤 Profile:', { found: !!profile, error: error?.message })
            
            if (profile) {
              set({ profile, isAdmin: (profile as any).is_admin })
              console.log('✅ Profile carregado:', { email: (profile as any).email, isAdmin: (profile as any).is_admin })
            } else {
              console.warn('⚠️ Profile não encontrado na tabela users')
            }
          } else {
            set({ user: null, profile: null, isAdmin: false })
            console.log('❌ Sem sessão')
          }
        } catch (error) {
          console.error('❌ Error checking auth:', error)
          set({ user: null, profile: null, isAdmin: false })
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        isAdmin: state.isAdmin,
      }),
    }
  )
)

supabase.auth.onAuthStateChange(async (event, session) => {
  const store = useAuthStore.getState()
  
  if (event === 'SIGNED_IN' && session?.user) {
    store.setUser(session.user)
    
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single()
    
    if (profile) {
      store.setProfile(profile)
    }
  } else if (event === 'SIGNED_OUT') {
    store.setUser(null)
    store.setProfile(null)
  }
})
