import { NextResponse } from 'next/server'
import {
  fetchArtworksFromAirtable,
  fetchArtworksByCategory,
  fetchFeaturedArtworks,
  searchArtworks,
} from '@/utils/airtable'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const query = searchParams.get('query')

    let artworks

    if (query) {
      artworks = await searchArtworks(query)
    } else if (category) {
      artworks = await fetchArtworksByCategory(category)
    } else if (featured === 'true') {
      const limitNum = limit ? parseInt(limit, 10) : 6
      artworks = await fetchFeaturedArtworks(limitNum)
    } else {
      artworks = await fetchArtworksFromAirtable()
    }

    return NextResponse.json({ artworks }, { status: 200 })
  } catch (error: unknown) {
    console.error('Error in artworks API route:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    const code = error && typeof error === 'object' && 'error' in error ? (error as { error?: string }).error : undefined
    return NextResponse.json(
      {
        error: 'Failed to fetch artworks',
        message,
        ...(code === 'AUTHENTICATION_REQUIRED' && {
          hint: 'Check AIRTABLE_PERSONAL_ACCESS_TOKEN (or AIRTABLE_API_KEY) and AIRTABLE_BASE_ID in .env.local, then restart: npm run dev',
        }),
      },
      { status: 500 }
    )
  }
}


