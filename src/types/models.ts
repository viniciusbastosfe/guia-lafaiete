/**
 * Modelos de Dados - Guia Lafaiete
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

// ==================== CIDADES ====================
export interface City {
  id: string
  name: string
  created_at?: string
  updated_at?: string
}

// ==================== EVENTOS ====================
export interface Event {
  id: string
  title: string
  description: string
  location_name: string
  start_datetime: string
  end_datetime: string
  cover_image_url?: string
  banner_url?: string
  ticket_url?: string
  ticket_price?: number
  is_active: boolean
  is_featured: boolean
  city_id: string
  organizer_id?: string
  created_at?: string
  updated_at?: string
  // Relacionamentos
  cities?: City
}

// ==================== CATEGORIAS ====================
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  created_at?: string
  updated_at?: string
}

// ==================== EMPRESAS ====================
export interface Company {
  id: string
  name: string
  description: string
  logo_url?: string
  cover_image_url?: string
  phone?: string
  whatsapp?: string
  email?: string
  website?: string
  instagram?: string
  facebook?: string
  address?: string
  is_active: boolean
  is_featured: boolean
  city_id: string
  category_id: string
  created_at?: string
  updated_at?: string
  // Relacionamentos
  cities?: City
  company_categories?: Category
}

// ==================== PERFIS (Influenciadores/Músicos) ====================
export interface Profile {
  id: string
  name: string
  bio?: string
  profile_image_url?: string
  cover_image_url?: string
  category: 'influencer' | 'musician' | 'other'
  instagram?: string
  youtube?: string
  tiktok?: string
  spotify?: string
  phone?: string
  whatsapp?: string
  email?: string
  is_active: boolean
  is_featured: boolean
  city_id: string
  created_at?: string
  updated_at?: string
  // Relacionamentos
  cities?: City
}

// ==================== SORTEIOS ====================
export interface Giveaway {
  id: string
  title: string
  description: string
  prize_description: string
  cover_image_url?: string
  rules?: string
  start_date: string
  end_date: string
  draw_date: string
  max_participants?: number
  is_active: boolean
  city_id: string
  company_id?: string
  created_at?: string
  updated_at?: string
  // Relacionamentos
  cities?: City
  companies?: Company
}

// ==================== BANNERS ====================
export interface Banner {
  id: string
  title: string
  image_url: string
  link_url?: string
  position: 'home' | 'sidebar' | 'footer'
  order: number
  is_active: boolean
  start_date?: string
  end_date?: string
  clicks: number
  impressions: number
  created_at?: string
  updated_at?: string
}

// ==================== USUÁRIOS ====================
export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  phone?: string
  city_id?: string
  created_at?: string
  updated_at?: string
}

export interface UserProfile {
  id: string
  user_id: string
  is_admin: boolean
  is_organizer: boolean
  bio?: string
  created_at?: string
  updated_at?: string
  // Relacionamentos
  users?: User
}

// ==================== TIPOS DE BUSCA ====================
export interface SearchResult {
  events: Event[]
  companies: Company[]
  profiles: Profile[]
  totalResults: number
}

export interface SearchFilters {
  query?: string
  category?: string
  city_id?: string
  is_featured?: boolean
  start_date?: string
  end_date?: string
}

// ==================== TIPOS DE QUERY ====================
export interface QueryOptions {
  select?: string
  filters?: Record<string, any>
  order?: {
    column: string
    ascending: boolean
  }
  limit?: number
  offset?: number
}

// ==================== RESPONSES ====================
export interface ApiResponse<T> {
  data: T | null
  error: Error | null
  count?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// Todos os tipos já foram exportados individualmente com 'export interface'
