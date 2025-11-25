/**
 * Skeleton Loading Components
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

interface SkeletonProps {
  className?: string
}

// Base Skeleton
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  )
}

// Event Card Skeleton
export function EventCardSkeleton() {
  return (
    <div className="card-modern h-full">
      <Skeleton className="h-56 rounded-t-2xl" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

// Company Card Skeleton (Horizontal)
export function CompanyCardSkeleton() {
  return (
    <div className="card-modern h-full">
      <div className="p-6">
        <div className="flex gap-6">
          <Skeleton className="w-28 h-28 rounded-2xl flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Category Card Skeleton
export function CategoryCardSkeleton() {
  return (
    <div className="glass p-6 rounded-2xl h-full">
      <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
      <Skeleton className="h-4 w-3/4 mx-auto" />
    </div>
  )
}

// Events Carousel Skeleton
interface EventsCarouselSkeletonProps {
  count?: number
}

export function EventsCarouselSkeleton({ count = 3 }: EventsCarouselSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Companies Carousel Skeleton
interface CompaniesCarouselSkeletonProps {
  count?: number
}

export function CompaniesCarouselSkeleton({ count = 2 }: CompaniesCarouselSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CompanyCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Categories Carousel Skeleton
interface CategoriesCarouselSkeletonProps {
  count?: number
}

export function CategoriesCarouselSkeleton({ count = 6 }: CategoriesCarouselSkeletonProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Hero Skeleton
export function HeroSkeleton() {
  return (
    <div className="glass-dark p-8 rounded-3xl shadow-lg max-w-2xl">
      <Skeleton className="h-6 w-24 rounded-full mb-4" />
      <Skeleton className="h-12 w-full mb-4" />
      <Skeleton className="h-10 w-5/6 mb-4" />
      <div className="flex gap-4 mb-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5 mb-6" />
      <Skeleton className="h-10 w-32 rounded-full" />
    </div>
  )
}

// Page Loading Skeleton
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container space-y-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <EventsCarouselSkeleton count={3} />
        <CompaniesCarouselSkeleton count={2} />
        <CategoriesCarouselSkeleton count={6} />
      </div>
    </div>
  )
}
