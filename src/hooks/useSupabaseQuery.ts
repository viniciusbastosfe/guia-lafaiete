/**
 * Custom Hook para Queries Supabase
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { QueryOptions } from '@/types/models'

/**
 * Hook reutilizável para queries do Supabase
 * @param table - Nome da tabela
 * @param options - Opções de query (select, filters, order, limit)
 * @param queryOptions - Opções do React Query (staleTime, retry, etc)
 */
export function useSupabaseQuery<T>(
  table: string,
  options: QueryOptions = {},
  queryOptions?: Omit<UseQueryOptions<T[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T[], Error>({
    queryKey: [table, options],
    queryFn: async () => {
      // Inicia a query
      let query = supabase
        .from(table)
        .select(options.select || '*')

      // Aplica filtros
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value)
          }
        })
      }

      // Aplica ordenação
      if (options.order) {
        query = query.order(options.order.column, {
          ascending: options.order.ascending
        })
      }

      // Aplica limit
      if (options.limit) {
        query = query.limit(options.limit)
      }

      // Aplica offset (paginação)
      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
      }

      // Executa a query
      const { data, error } = await query

      if (error) {
        console.error(`Erro ao buscar dados da tabela ${table}:`, error)
        throw error
      }

      return (data as T[]) || []
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2,
    ...queryOptions
  })
}

/**
 * Hook para query única (por ID)
 */
export function useSupabaseSingle<T>(
  table: string,
  id: string,
  options: Omit<QueryOptions, 'filters' | 'limit'> = {},
  queryOptions?: Omit<UseQueryOptions<T | null, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T | null, Error>({
    queryKey: [table, id, options],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table)
        .select(options.select || '*')
        .eq('id', id)
        .single()

      if (error) {
        console.error(`Erro ao buscar item ${id} da tabela ${table}:`, error)
        throw error
      }

      return data as T
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: !!id, // Só executa se tiver ID
    ...queryOptions
  })
}

/**
 * Hook para contagem de registros
 */
export function useSupabaseCount(
  table: string,
  filters?: Record<string, any>,
  queryOptions?: Omit<UseQueryOptions<number, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<number, Error>({
    queryKey: [table, 'count', filters],
    queryFn: async () => {
      let query = supabase
        .from(table)
        .select('*', { count: 'exact', head: true })

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value)
          }
        })
      }

      const { count, error } = await query

      if (error) {
        console.error(`Erro ao contar registros da tabela ${table}:`, error)
        throw error
      }

      return count || 0
    },
    staleTime: 1000 * 60 * 10, // 10 minutos
    retry: 2,
    ...queryOptions
  })
}
