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
        try {
          // Limpar localStorage ANTES de chamar signOut
          localStorage.removeItem('auth-storage')
          
          // SignOut do Supabase
          const { error } = await supabase.auth.signOut()
          if (error) {
            console.error('Erro ao fazer logout:', error)
          }
          
          // Limpar estado
          set({ user: null, profile: null, isAdmin: false })
          
          // Garantir que o localStorage foi limpo
          localStorage.removeItem('auth-storage')
          sessionStorage.clear()
          
          // Recarregar página para limpar qualquer cache
          window.location.href = '/'
        } catch (error) {
          console.error('Erro crítico no logout:', error)
          // Mesmo com erro, limpar tudo
          localStorage.clear()
          sessionStorage.clear()
          window.location.href = '/'
        }
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true })
          
          const { data: { session } } = await supabase.auth.getSession()
          
          if (session?.user) {
            set({ user: session.user })
            
            const { data: profile } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single()
            
            if (profile) {
              set({ profile, isAdmin: (profile as any).is_admin })
            }
          } else {
            set({ user: null, profile: null, isAdmin: false })
          }
        } catch (error) {
          console.error('Error checking auth:', error)
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
