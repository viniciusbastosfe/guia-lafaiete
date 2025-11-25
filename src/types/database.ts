export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cities: {
        Row: {
          id: string
          name: string
          state: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          state: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          state?: string
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          name: string
          email: string
          is_admin: boolean
          city_id: string | null
          phone: string | null
          whatsapp: string | null
          avatar_url: string | null
          notes: string | null
          last_login_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          is_admin?: boolean
          city_id?: string | null
          phone?: string | null
          whatsapp?: string | null
          avatar_url?: string | null
          notes?: string | null
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          is_admin?: boolean
          city_id?: string | null
          phone?: string | null
          whatsapp?: string | null
          avatar_url?: string | null
          notes?: string | null
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          city_id: string
          category_id: string | null
          title: string
          description: string | null
          start_datetime: string
          end_datetime: string | null
          location_name: string | null
          address: string | null
          is_online: boolean
          cover_image_url: string | null
          ticket_url: string | null
          instagram_url: string | null
          is_featured: boolean
          is_active: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          city_id: string
          category_id?: string | null
          title: string
          description?: string | null
          start_datetime: string
          end_datetime?: string | null
          location_name?: string | null
          address?: string | null
          is_online?: boolean
          cover_image_url?: string | null
          ticket_url?: string | null
          instagram_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          city_id?: string
          category_id?: string | null
          title?: string
          description?: string | null
          start_datetime?: string
          end_datetime?: string | null
          location_name?: string | null
          address?: string | null
          is_online?: boolean
          cover_image_url?: string | null
          ticket_url?: string | null
          instagram_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          city_id: string
          category_id: string | null
          name: string
          description: string | null
          logo_url: string | null
          instagram_url: string | null
          website_url: string | null
          whatsapp: string | null
          address: string | null
          is_featured: boolean
          is_active: boolean
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          city_id: string
          category_id?: string | null
          name: string
          description?: string | null
          logo_url?: string | null
          instagram_url?: string | null
          website_url?: string | null
          whatsapp?: string | null
          address?: string | null
          is_featured?: boolean
          is_active?: boolean
          views_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          city_id?: string
          category_id?: string | null
          name?: string
          description?: string | null
          logo_url?: string | null
          instagram_url?: string | null
          website_url?: string | null
          whatsapp?: string | null
          address?: string | null
          is_featured?: boolean
          is_active?: boolean
          views_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          city_id: string
          category_id: string | null
          type: 'influencer' | 'musician'
          name: string
          bio: string | null
          instagram_url: string | null
          avatar_url: string | null
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          city_id: string
          category_id?: string | null
          type: 'influencer' | 'musician'
          name: string
          bio?: string | null
          instagram_url?: string | null
          avatar_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          city_id?: string
          category_id?: string | null
          type?: 'influencer' | 'musician'
          name?: string
          bio?: string | null
          instagram_url?: string | null
          avatar_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      banners: {
        Row: {
          id: string
          title: string
          image_url: string
          link_url: string | null
          position: 'home_top' | 'home_middle' | 'home_bottom'
          is_active: boolean
          sort_order: number
          start_date: string | null
          end_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          image_url: string
          link_url?: string | null
          position?: 'home_top' | 'home_middle' | 'home_bottom'
          is_active?: boolean
          sort_order?: number
          start_date?: string | null
          end_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          image_url?: string
          link_url?: string | null
          position?: 'home_top' | 'home_middle' | 'home_bottom'
          is_active?: boolean
          sort_order?: number
          start_date?: string | null
          end_date?: string | null
          created_at?: string
        }
      }
      giveaways: {
        Row: {
          id: string
          title: string
          description: string | null
          prize: string | null
          start_datetime: string
          end_datetime: string
          draw_datetime: string
          is_published: boolean
          result_published: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          prize?: string | null
          start_datetime: string
          end_datetime: string
          draw_datetime: string
          is_published?: boolean
          result_published?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          prize?: string | null
          start_datetime?: string
          end_datetime?: string
          draw_datetime?: string
          is_published?: boolean
          result_published?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string
          sender_id: string
          message: string
          is_from_admin: boolean
          is_from_ai: boolean
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          sender_id: string
          message: string
          is_from_admin?: boolean
          is_from_ai?: boolean
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          sender_id?: string
          message?: string
          is_from_admin?: boolean
          is_from_ai?: boolean
          is_read?: boolean
          created_at?: string
        }
      }
      user_notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          link_url: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: string
          link_url?: string | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          link_url?: string | null
          is_read?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
