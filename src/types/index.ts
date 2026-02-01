export interface Artwork {
  id: string
  title: string
  category: string
  medium: string
  year: string
  description: string
  image: string
  likes: number
  views: number
  dimensions?: string
  price?: number
  available: boolean
  tags: string[]
}

export interface ArtCategory {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: string
  count: number
  slug: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface SocialLink {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export interface NavigationItem {
  name: string
  href: string
}

export interface FooterSection {
  title: string
  links: { name: string; href: string }[]
}

export interface ArtistStats {
  icon: React.ComponentType<{ className?: string }>
  number: string
  label: string
  color: string
}

export interface NewsletterSubscription {
  email: string
}
