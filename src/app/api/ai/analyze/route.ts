import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { ArtAnalysis } from '@/types/ai'

export async function POST(request: NextRequest) {
  try {
    const { image, query } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required' },
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
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    // Convert base64 image to format Gemini expects
    const imageParts = [
      {
        inlineData: {
          data: image.split(',')[1] || image, // Remove data:image/... prefix if present
          mimeType: 'image/jpeg',
        },
      },
    ]

    const prompt = query
      ? `Analyze this artwork and compare it to ${query}. Provide a detailed analysis in the following JSON format:
{
  "title": "A creative and descriptive title for this artwork",
  "style_prediction": "The artistic style (e.g., Post-Impressionism, Digital Abstract, Surrealist)",
  "dominant_color_palette": ["#HexCode1", "#HexCode2", "#HexCode3", "#HexCode4", "#HexCode5"],
  "historical_context": "A one-paragraph summary of the work's potential historical or artistic influences and context",
  "emotional_score": {
    "mood_primary": "The primary emotional mood (e.g., Melancholy, Jubilant, Serene, Energetic)",
    "intensity_level": "High, Medium, or Low"
  },
  "composition_analysis": "A brief analysis of the composition (e.g., Rule of Thirds, Golden Ratio, Symmetrical, Asymmetrical)"
}

Return ONLY valid JSON, no markdown formatting.`
      : `Analyze this artwork and provide a detailed analysis in the following JSON format:
{
  "title": "A creative and descriptive title for this artwork",
  "style_prediction": "The artistic style (e.g., Post-Impressionism, Digital Abstract, Surrealist)",
  "dominant_color_palette": ["#HexCode1", "#HexCode2", "#HexCode3", "#HexCode4", "#HexCode5"],
  "historical_context": "A one-paragraph summary of the work's potential historical or artistic influences and context",
  "emotional_score": {
    "mood_primary": "The primary emotional mood (e.g., Melancholy, Jubilant, Serene, Energetic)",
    "intensity_level": "High, Medium, or Low"
  },
  "composition_analysis": "A brief analysis of the composition (e.g., Rule of Thirds, Golden Ratio, Symmetrical, Asymmetrical)"
}

Return ONLY valid JSON, no markdown formatting.`

    const result = await model.generateContent([prompt, ...imageParts])
    const response = await result.response
    const text = response.text()

    // Parse JSON from response (remove markdown code blocks if present)
    let analysis: ArtAnalysis
    try {
      const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      analysis = JSON.parse(jsonText)
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the text
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Failed to parse AI response as JSON')
      }
    }

    // Validate required fields
    if (!analysis.title || !analysis.style_prediction || !analysis.dominant_color_palette) {
      throw new Error('Invalid analysis response structure')
    }

    return NextResponse.json({ analysis }, { status: 200 })
  } catch (error) {
    console.error('Error analyzing artwork:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze artwork' },
      { status: 500 }
    )
  }
}


