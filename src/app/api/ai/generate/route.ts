import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { ArtAnalysis } from '@/types/ai'

export async function POST(request: NextRequest) {
  try {
    const { prompt, style } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google AI API key not configured' },
        { status: 500 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)

    // Generate image using Imagen (via Gemini 2.5 Flash Image Preview)
    const imageModel = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
    })

    const fullPrompt = style
      ? `Generate a ${style} artwork: ${prompt}. Create a high-quality, detailed artistic image.`
      : `Generate an artwork: ${prompt}. Create a high-quality, detailed artistic image.`

    // Note: For actual Imagen API, you would use:
    // const imagen = new ImagenClient({ apiKey })
    // For now, we'll use Gemini's image generation capabilities
    // In production, replace with actual Imagen API call
    
    const imageResult = await imageModel.generateContent(fullPrompt)
    const imageResponse = await imageResult.response
    
    // Generate metadata using Gemini
    const metadataModel = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp' 
    })

    const metadataPrompt = `Based on this artwork description: "${fullPrompt}", generate detailed metadata in the following JSON format:
{
  "title": "A creative and descriptive title for this artwork",
  "style_prediction": "${style || 'Contemporary Digital Art'}",
  "dominant_color_palette": ["#HexCode1", "#HexCode2", "#HexCode3", "#HexCode4", "#HexCode5"],
  "historical_context": "A one-paragraph summary of the work's potential historical or artistic influences and context",
  "emotional_score": {
    "mood_primary": "The primary emotional mood (e.g., Melancholy, Jubilant, Serene, Energetic)",
    "intensity_level": "High, Medium, or Low"
  },
  "composition_analysis": "A brief analysis of the expected composition"
}

Return ONLY valid JSON, no markdown formatting.`

    const metadataResult = await metadataModel.generateContent(metadataPrompt)
    const metadataText = await metadataResult.response.text()

    // Parse metadata JSON
    let metadata: ArtAnalysis
    try {
      const jsonText = metadataText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      metadata = JSON.parse(jsonText)
    } catch (parseError) {
      const jsonMatch = metadataText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        metadata = JSON.parse(jsonMatch[0])
      } else {
        // Fallback metadata
        metadata = {
          title: prompt.substring(0, 50),
          style_prediction: style || 'Contemporary Digital Art',
          dominant_color_palette: ['#6B46C1', '#9333EA', '#A855F7', '#C084FC', '#E9D5FF'],
          historical_context: 'A contemporary digital artwork created with AI assistance.',
          emotional_score: {
            mood_primary: 'Inspiring',
            intensity_level: 'Medium',
          },
          composition_analysis: 'Dynamic composition with balanced elements.',
        }
      }
    }

    // For now, return a placeholder image URL
    // In production, you would use the actual Imagen API to generate the image
    // and return the image URL or base64 data
    const imageUrl = imageResponse.text() || `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="600" fill="#6B46C1"/>
        <text x="400" y="300" font-family="Arial" font-size="24" fill="white" text-anchor="middle">
          Generated Art: ${prompt.substring(0, 30)}
        </text>
      </svg>`
    ).toString('base64')}`

    return NextResponse.json(
      {
        imageUrl,
        metadata,
        prompt: fullPrompt,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error generating artwork:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate artwork' },
      { status: 500 }
    )
  }
}


