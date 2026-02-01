import Airtable from 'airtable'
import { Artwork } from '@/types'

let base: Airtable.Base | null = null

function getAirtableBase(): Airtable.Base {
  if (base) return base

  const rawPat = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN
  const rawKey = process.env.AIRTABLE_API_KEY
  const personalAccessToken = typeof rawPat === 'string' ? rawPat.trim() : ''
  const apiKey = typeof rawKey === 'string' ? rawKey.trim() : ''
  const baseId = process.env.AIRTABLE_BASE_ID?.trim()

  if (!baseId) {
    throw new Error('AIRTABLE_BASE_ID is not set in environment variables')
  }

  if (personalAccessToken) {
    if (process.env.NODE_ENV === 'development' && process.env.DEBUG_AIRTABLE === '1') {
      console.log('[Airtable] Using AIRTABLE_PERSONAL_ACCESS_TOKEN, length:', personalAccessToken.length)
    }
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: personalAccessToken,
    })
  } else if (apiKey) {
    if (process.env.NODE_ENV === 'development' && process.env.DEBUG_AIRTABLE === '1') {
      console.log('[Airtable] Using AIRTABLE_API_KEY, length:', apiKey.length)
    }
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: apiKey,
    })
  } else {
    throw new Error(
      'Either AIRTABLE_PERSONAL_ACCESS_TOKEN or AIRTABLE_API_KEY must be set in .env.local (no spaces, no quotes)'
    )
  }

  base = Airtable.base(baseId)
  return base
}

const FIELD_MAPPINGS = {
  title: process.env.AIRTABLE_FIELD_TITLE || 'Art Title',
  category: process.env.AIRTABLE_FIELD_CATEGORY || 'Category',
  medium: process.env.AIRTABLE_FIELD_MEDIUM || 'Medium',
  year: process.env.AIRTABLE_FIELD_YEAR || 'Year',
  description: process.env.AIRTABLE_FIELD_DESCRIPTION || 'Art Description',
  image: process.env.AIRTABLE_FIELD_IMAGE || 'Attachments',
  likes: process.env.AIRTABLE_FIELD_LIKES || 'Likes',
  views: process.env.AIRTABLE_FIELD_VIEWS || 'Views',
  dimensions: process.env.AIRTABLE_FIELD_DIMENSIONS || 'Dimensions',
  price: process.env.AIRTABLE_FIELD_PRICE || 'Price',
  available: process.env.AIRTABLE_FIELD_AVAILABLE || 'Available',
  tags: process.env.AIRTABLE_FIELD_TAGS || 'Tags',
}

function getImageUrl(attachmentField: unknown): string {
  const placeholder = 'https://placehold.co/400x300/1a1a2e/eee?text=Artwork'
  if (!attachmentField || !Array.isArray(attachmentField) || attachmentField.length === 0) {
    return placeholder
  }
  const attachment = attachmentField[0] as { url?: string; thumbnails?: { large?: { url?: string } } }
  return attachment?.url || attachment?.thumbnails?.large?.url || placeholder
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function recordToArtwork(record: Airtable.Record<any>): Artwork {
  const fields = record.fields

  let tagsArray: string[] = []
  const tagsVal = fields[FIELD_MAPPINGS.tags]
  if (tagsVal) {
    if (Array.isArray(tagsVal)) {
      tagsArray = tagsVal as string[]
    } else if (typeof tagsVal === 'string') {
      tagsArray = tagsVal.split(',').map((t) => t.trim()).filter(Boolean)
    }
  }

  const availableVal = fields[FIELD_MAPPINGS.available]
  const available =
    availableVal !== false &&
    availableVal !== 'No' &&
    availableVal !== 0

  return {
    id: record.id,
    title: (fields[FIELD_MAPPINGS.title] as string) || 'Untitled',
    category: (fields[FIELD_MAPPINGS.category] as string) || 'Uncategorized',
    medium: (fields[FIELD_MAPPINGS.medium] as string) || '',
    year: String(fields[FIELD_MAPPINGS.year] ?? ''),
    description: (fields[FIELD_MAPPINGS.description] as string) || '',
    image: getImageUrl(fields[FIELD_MAPPINGS.image]),
    likes: fields[FIELD_MAPPINGS.likes] ? Number(fields[FIELD_MAPPINGS.likes]) : 0,
    views: fields[FIELD_MAPPINGS.views] ? Number(fields[FIELD_MAPPINGS.views]) : 0,
    dimensions: (fields[FIELD_MAPPINGS.dimensions] as string) || undefined,
    price: fields[FIELD_MAPPINGS.price] != null ? Number(fields[FIELD_MAPPINGS.price]) : undefined,
    available,
    tags: tagsArray,
  }
}

function getTableName(): string {
  return process.env.AIRTABLE_TABLE_NAME || 'ArtDatabase'
}

export async function fetchArtworksFromAirtable(): Promise<Artwork[]> {
  try {
    const airtableBase = getAirtableBase()
    const tableName = getTableName()
    const records = await airtableBase(tableName).select({}).all()
    return records.map((r) => recordToArtwork(r))
  } catch (error) {
    console.error('Error fetching artworks from Airtable:', error)
    throw error
  }
}

export async function fetchArtworkById(id: string): Promise<Artwork | null> {
  try {
    const airtableBase = getAirtableBase()
    const tableName = getTableName()
    const record = await airtableBase(tableName).find(id)
    return recordToArtwork(record)
  } catch (error) {
    console.error(`Error fetching artwork ${id} from Airtable:`, error)
    return null
  }
}

export async function fetchArtworksByCategory(category: string): Promise<Artwork[]> {
  try {
    const airtableBase = getAirtableBase()
    const tableName = getTableName()
    const records = await airtableBase(tableName)
      .select({ filterByFormula: `{${FIELD_MAPPINGS.category}} = "${category}"` })
      .all()
    return records.map((r) => recordToArtwork(r))
  } catch (error) {
    console.error(`Error fetching artworks by category ${category} from Airtable:`, error)
    throw error
  }
}

export async function fetchFeaturedArtworks(limit: number = 6): Promise<Artwork[]> {
  try {
    const airtableBase = getAirtableBase()
    const tableName = getTableName()
    const records = await airtableBase(tableName)
      .select({
        filterByFormula: `{${FIELD_MAPPINGS.available}} = TRUE()`,
        sort: [{ field: FIELD_MAPPINGS.likes, direction: 'desc' }],
        maxRecords: limit,
      })
      .all()
    return records.map((r) => recordToArtwork(r))
  } catch (error) {
    console.error('Error fetching featured artworks from Airtable:', error)
    throw error
  }
}

export async function searchArtworks(query: string): Promise<Artwork[]> {
  try {
    const airtableBase = getAirtableBase()
    const tableName = getTableName()
    const searchFormula = `OR(
      SEARCH(LOWER("${query}"), LOWER({${FIELD_MAPPINGS.title}})),
      SEARCH(LOWER("${query}"), LOWER({${FIELD_MAPPINGS.description}}))
    )`
    const records = await airtableBase(tableName)
      .select({ filterByFormula: searchFormula })
      .all()
    return records.map((r) => recordToArtwork(r))
  } catch (error) {
    console.error(`Error searching artworks for "${query}" in Airtable:`, error)
    throw error
  }
}
