/**
 * Scroll Animation Hook
 * Anima elementos quando aparecem no viewport
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number // 0 a 1
  rootMargin?: string
  triggerOnce?: boolean // Anima apenas uma vez
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options

  const elementRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return { elementRef, isVisible }
}

// Hook para múltiplos elementos
export function useScrollAnimationBatch(
  count: number,
  options: UseScrollAnimationOptions = {}
) {
  const refs = useRef<(HTMLElement | null)[]>([])
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observers = refs.current.map((element, index) => {
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleIndices(prev => new Set([...prev, index]))
            
            if (options.triggerOnce) {
              observer.unobserve(element)
            }
          } else if (!options.triggerOnce) {
            setVisibleIndices(prev => {
              const newSet = new Set(prev)
              newSet.delete(index)
              return newSet
            })
          }
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '0px'
        }
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer, index) => {
        if (observer && refs.current[index]) {
          observer.unobserve(refs.current[index]!)
        }
      })
    }
  }, [count, options])

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el
  }

  const isVisible = (index: number) => visibleIndices.has(index)

  return { setRef, isVisible }
}
