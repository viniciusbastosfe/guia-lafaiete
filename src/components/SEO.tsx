/**
 * SEO Component
 * Gerencia meta tags para SEO
 * Autor: Vinícius Bastos (https://midias.me)
 * Data: 24/11/2025
 */

import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

const DEFAULT_TITLE = 'Guia Lafaiete - Eventos, Empresas e Muito Mais'
const DEFAULT_DESCRIPTION = 'Descubra os melhores eventos, empresas, influenciadores e músicos de Conselheiro Lafaiete e região. Sua conexão com o que acontece na cidade!'
const DEFAULT_IMAGE = 'https://lafanet.com.br/og-image.jpg'
const DEFAULT_URL = 'https://lafanet.com.br'

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  image = DEFAULT_IMAGE,
  url = DEFAULT_URL,
  type = 'website',
  author,
  publishedTime,
  modifiedTime
}: SEOProps) {
  const fullTitle = title ? `${title} | Guia Lafaiete` : DEFAULT_TITLE

  useEffect(() => {
    // Update title
    document.title = fullTitle

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', description)
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '))
    }
    if (author) {
      updateMetaTag('author', author)
    }

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', 'Guia Lafaiete', true)

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)

    // Article specific tags
    if (type === 'article') {
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime, true)
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime, true)
      }
      if (author) {
        updateMetaTag('article:author', author, true)
      }
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

  }, [fullTitle, description, keywords, image, url, type, author, publishedTime, modifiedTime])

  return null
}

// Helpers para páginas específicas
export function EventSEO({ event }: { event: any }) {
  return (
    <SEO
      title={event.title}
      description={event.description}
      image={event.cover_image_url}
      url={`${DEFAULT_URL}/eventos/${event.id}`}
      type="article"
      publishedTime={event.created_at}
      modifiedTime={event.updated_at}
      keywords={['evento', event.title, 'Conselheiro Lafaiete']}
    />
  )
}

export function CompanySEO({ company }: { company: any }) {
  return (
    <SEO
      title={company.name}
      description={company.description}
      image={company.logo_url || company.cover_image_url}
      url={`${DEFAULT_URL}/empresas/${company.id}`}
      type="profile"
      keywords={[
        'empresa',
        company.name,
        company.company_categories?.name,
        'Conselheiro Lafaiete'
      ]}
    />
  )
}

export function ProfileSEO({ profile }: { profile: any }) {
  return (
    <SEO
      title={profile.name}
      description={profile.bio}
      image={profile.profile_image_url}
      url={`${DEFAULT_URL}/perfis/${profile.id}`}
      type="profile"
      keywords={[
        profile.category === 'influencer' ? 'influenciador' : 'músico',
        profile.name,
        'Conselheiro Lafaiete'
      ]}
    />
  )
}
