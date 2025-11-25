/**
 * Infinite Scroll Hook
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

import { useEffect, useRef, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  onLoadMore: () => void
  hasMore: boolean
  isLoading: boolean
  threshold?: number // distância do fim (em pixels) para disparar
}

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 200
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      
      if (entry.isIntersecting && hasMore && !isLoading) {
        onLoadMore()
      }
    },
    [hasMore, isLoading, onLoadMore]
  )

  useEffect(() => {
    // Criar observer
    const options = {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0.1
    }

    observerRef.current = new IntersectionObserver(handleIntersection, options)

    // Observar elemento
    const currentLoadMoreRef = loadMoreRef.current
    if (currentLoadMoreRef && observerRef.current) {
      observerRef.current.observe(currentLoadMoreRef)
    }

    // Cleanup
    return () => {
      if (observerRef.current && currentLoadMoreRef) {
        observerRef.current.unobserve(currentLoadMoreRef)
      }
    }
  }, [handleIntersection, threshold])

  return { loadMoreRef }
}

// Hook alternativo usando scroll event (fallback)
export function useScrollTrigger(
  callback: () => void,
  threshold: number = 200
) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight

      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)

      if (distanceFromBottom < threshold) {
        callback()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [callback, threshold])
}
