import { useAuthStore } from '@/stores/authStore'

export function useAuth() {
  const { user, profile, isLoading, isAdmin, signOut, checkAuth } = useAuthStore()

  return {
    user,
    profile,
    isLoading,
    isAdmin,
    isAuthenticated: !!user,
    signOut,
    checkAuth,
  }
}
