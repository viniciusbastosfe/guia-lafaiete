/**
 * Lazy Image Component
 * Otimiza carregamento de imagens com lazy loading e placeholder
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

import { useState, useEffect, useRef } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholderClassName?: string
  fallbackSrc?: string
  width?: number
  height?: number
}

export function LazyImage({
  src,
  alt,
  className = '',
  placeholderClassName = 'bg-gray-200 animate-pulse',
  fallbackSrc,
  width,
  height
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Intersection Observer para lazy loading
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px' // Começa a carregar 50px antes de aparecer
      }
    )

    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [src])

  const handleLoad = () => {
    setImageLoading(false)
  }

  const handleError = () => {
    setImageError(true)
    setImageLoading(false)
    if (fallbackSrc) {
      setImageSrc(fallbackSrc)
    }
  }

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
    >
      {/* Placeholder */}
      {imageLoading && (
        <div className={`absolute inset-0 ${placeholderClassName}`} />
      )}

      {/* Image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}

      {/* Error state */}
      {imageError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  )
}

// Versão com srcset para responsive images
interface ResponsiveImageProps extends LazyImageProps {
  srcSet?: string
  sizes?: string
}

export function ResponsiveImage({
  src,
  alt,
  srcSet,
  sizes,
  className = '',
  placeholderClassName = 'bg-gray-200 animate-pulse',
  fallbackSrc
}: ResponsiveImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '50px' }
    )

    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [src])

  const handleLoad = () => {
    setImageLoading(false)
  }

  const handleError = () => {
    setImageError(true)
    setImageLoading(false)
    if (fallbackSrc) {
      setImageSrc(fallbackSrc)
    }
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {imageLoading && (
        <div className={`absolute inset-0 ${placeholderClassName}`} />
      )}

      {imageSrc && (
        <img
          src={imageSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}

      {imageError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  )
}
