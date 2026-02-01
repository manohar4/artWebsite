import { Artwork } from '@/types'

export const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Sunset Serenity',
    category: 'Paintings',
    medium: 'Oil on Canvas',
    year: '2024',
    description: 'A vibrant landscape capturing the warm hues of a peaceful sunset over rolling hills. The painting uses a rich palette of oranges, purples, and deep blues to create a sense of tranquility and natural beauty.',
    image: '/images/paintings/sunset-serenity.jpg',
    likes: 128,
    views: 456,
    dimensions: '36" x 48"',
    price: 2500,
    available: true,
    tags: ['landscape', 'sunset', 'oil painting', 'nature']
  },
  {
    id: '2',
    title: 'Urban Dreams',
    category: 'Digital Art',
    medium: 'Digital Painting',
    year: '2024',
    description: 'A futuristic cityscape blending modern architecture with dreamlike elements. This piece explores the intersection of technology and human imagination, featuring floating structures and ethereal lighting.',
    image: '/images/digital-art/urban-dreams.jpg',
    likes: 95,
    views: 312,
    dimensions: 'Digital - 3000 x 2000px',
    price: 800,
    available: true,
    tags: ['digital art', 'cityscape', 'futuristic', 'architecture']
  },
  {
    id: '3',
    title: 'Whispers of Nature',
    category: 'Photography',
    medium: 'Digital Photography',
    year: '2023',
    description: 'Close-up macro photography revealing the intricate beauty of natural textures. This series captures the delicate patterns found in leaves, bark, and other natural elements.',
    image: '/images/photography/whispers-nature.jpg',
    likes: 156,
    views: 523,
    dimensions: 'Digital - 4000 x 3000px',
    price: 450,
    available: true,
    tags: ['macro', 'nature', 'texture', 'photography']
  },
  {
    id: '4',
    title: 'Abstract Harmony',
    category: 'Mixed Media',
    medium: 'Acrylic & Collage',
    year: '2023',
    description: 'An exploration of color theory and texture through layered mixed media techniques. This piece combines acrylic paint with various textured materials to create depth and visual interest.',
    image: '/images/mixed-media/abstract-harmony.jpg',
    likes: 87,
    views: 298,
    dimensions: '24" x 36"',
    price: 1200,
    available: false,
    tags: ['abstract', 'mixed media', 'texture', 'color theory']
  },
  {
    id: '5',
    title: 'Portrait of Time',
    category: 'Sketches',
    medium: 'Charcoal on Paper',
    year: '2024',
    description: 'A detailed portrait study exploring the passage of time through expressive line work. This drawing captures the wisdom and character etched into the subject\'s face.',
    image: '/images/sketches/portrait-time.jpg',
    likes: 134,
    views: 445,
    dimensions: '18" x 24"',
    price: 600,
    available: true,
    tags: ['portrait', 'charcoal', 'drawing', 'expressive']
  },
  {
    id: '6',
    title: 'Sculptural Flow',
    category: 'Sculptures',
    medium: 'Clay & Bronze',
    year: '2023',
    description: 'A dynamic sculpture capturing movement and fluidity in three-dimensional form. The piece explores the relationship between solid material and flowing motion.',
    image: '/images/sculptures/sculptural-flow.jpg',
    likes: 112,
    views: 367,
    dimensions: '12" x 18" x 8"',
    price: 3500,
    available: true,
    tags: ['sculpture', 'clay', 'bronze', 'movement', '3D']
  },
  {
    id: '7',
    title: 'Ocean\'s Embrace',
    category: 'Paintings',
    medium: 'Watercolor',
    year: '2024',
    description: 'A delicate watercolor painting capturing the gentle movement of ocean waves. The piece uses soft, flowing brushstrokes to convey the peaceful rhythm of the sea.',
    image: '/images/paintings/oceans-embrace.jpg',
    likes: 203,
    views: 678,
    dimensions: '22" x 30"',
    price: 1800,
    available: true,
    tags: ['watercolor', 'ocean', 'waves', 'peaceful']
  },
  {
    id: '8',
    title: 'Digital Dreams',
    category: 'Digital Art',
    medium: 'Digital Illustration',
    year: '2024',
    description: 'A whimsical digital illustration featuring fantastical creatures in a dreamlike landscape. This piece combines traditional illustration techniques with modern digital tools.',
    image: '/images/digital-art/digital-dreams.jpg',
    likes: 167,
    views: 534,
    dimensions: 'Digital - 2500 x 3500px',
    price: 650,
    available: true,
    tags: ['digital illustration', 'fantasy', 'creatures', 'whimsical']
  }
]

export const getArtworksByCategory = (category: string): Artwork[] => {
  return artworks.filter(artwork => artwork.category === category)
}

export const getFeaturedArtworks = (limit: number = 6): Artwork[] => {
  return artworks
    .filter(artwork => artwork.available)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit)
}

export const searchArtworks = (query: string): Artwork[] => {
  const lowercaseQuery = query.toLowerCase()
  return artworks.filter(artwork => 
    artwork.title.toLowerCase().includes(lowercaseQuery) ||
    artwork.description.toLowerCase().includes(lowercaseQuery) ||
    artwork.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}
