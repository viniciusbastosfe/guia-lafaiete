/**
 * Infinite Query Hook
 * Hook para queries com paginação infinita
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { QueryOptions } from '@/types/models'

interface UseInfiniteQueryOptions extends QueryOptions {
  pageSize?: number
}

export function useSupabaseInfiniteQuery<T>(
  table: string,
  options: UseInfiniteQueryOptions = {}
) {
  const pageSize = options.pageSize || 10
  const [page, setPage] = useState(0)
  const [allData, setAllData] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(true)

  const { data, isLoading, error, refetch } = useQuery<T[]>({
    queryKey: [table, options, page],
    queryFn: async () => {
      const offset = page * pageSize

      let query = supabase
        .from(table)
        .select(options.select || '*', { count: 'exact' })

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

      // Aplica paginação
      query = query.range(offset, offset + pageSize - 1)

      const { data, error, count } = await query

      if (error) {
        console.error(`Erro ao buscar dados da tabela ${table}:`, error)
        throw error
      }

      // Verifica se tem mais páginas
      if (count !== null) {
        setHasMore(offset + pageSize < count)
      } else {
        setHasMore((data?.length || 0) === pageSize)
      }

      return (data as T[]) || []
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: true
  })

  // Atualiza allData quando nova página carrega
  useCallback(() => {
    if (data && data.length > 0) {
      setAllData(prev => {
        // Evita duplicatas
        const existingIds = new Set(prev.map((item: any) => item.id))
        const newItems = data.filter((item: any) => !existingIds.has(item.id))
        return [...prev, ...newItems]
      })
    }
  }, [data])()

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1)
    }
  }, [isLoading, hasMore])

  const reset = useCallback(() => {
    setPage(0)
    setAllData([])
    setHasMore(true)
  }, [])

  return {
    data: allData,
    isLoading,
    error,
    hasMore,
    loadMore,
    reset,
    refetch,
    page
  }
}
