// AI Analysis Types
export interface ArtAnalysis {
  title: string
  style_prediction: string
  dominant_color_palette: string[]
  historical_context: string
  emotional_score: {
    mood_primary: string
    intensity_level: 'High' | 'Medium' | 'Low'
  }
  composition_analysis: string
}

// Generated Art Types
export interface GeneratedArt {
  id?: string
  imageUrl: string
  prompt: string
  style?: string
  metadata: ArtAnalysis
  createdAt: Date | any
  userId?: string
  likes?: number
  views?: number
}

// User Interaction Types
export interface UserInteraction {
  artworkId: string
  style_prediction: string
  mood_primary: string
  viewedAt: Date | any
}


