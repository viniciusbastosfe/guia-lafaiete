import { Link } from 'react-router-dom'
import { LOGOS, type LogoKey } from '@/assets/images'

interface LogoProps {
  variant?: LogoKey
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  href?: string
  alt?: string
}

export function Logo({ 
  variant = 'primary', 
  size = 'md', 
  className = '',
  href = '/',
  alt = 'Guia Lafaiete'
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16'
  }

  const LogoComponent = (
    <img 
      src={LOGOS[variant]} 
      alt={alt} 
      className={`${sizeClasses[size]} w-auto ${className}`}
    />
  )

  if (href) {
    return (
      <Link to={href} className="inline-flex">
        {LogoComponent}
      </Link>
    )
  }

  return LogoComponent
}
