import { NextRequest, NextResponse } from 'next/server'
import { getFirestoreInstance } from '@/lib/firebase'
import { collection, addDoc, getDocs, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { GeneratedArt } from '@/types/ai'

// GET - Fetch all generated art
export async function GET(request: NextRequest) {
  try {
    const db = getFirestoreInstance()
    const artifactsRef = collection(db, 'artifacts', '__app_id', 'public', 'data', 'generated_art')
    
    const q = query(artifactsRef, orderBy('createdAt', 'desc'), limit(100))
    const querySnapshot = await getDocs(q)
    
    const artifacts: GeneratedArt[] = []
    querySnapshot.forEach((doc) => {
      artifacts.push({
        id: doc.id,
        ...doc.data(),
      } as GeneratedArt)
    })

    return NextResponse.json({ artifacts }, { status: 200 })
  } catch (error) {
    console.error('Error fetching artifacts:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch artifacts' },
      { status: 500 }
    )
  }
}

// POST - Save generated art
export async function POST(request: NextRequest) {
  try {
    const data: Omit<GeneratedArt, 'id' | 'createdAt'> = await request.json()

    if (!data.imageUrl || !data.prompt || !data.metadata) {
      return NextResponse.json(
        { error: 'Missing required fields: imageUrl, prompt, metadata' },
        { status: 400 }
      )
    }

    const db = getFirestoreInstance()
    const artifactsRef = collection(db, 'artifacts', '__app_id', 'public', 'data', 'generated_art')
    
    const newArtifact = {
      ...data,
      createdAt: new Date(),
      likes: 0,
      views: 0,
    }

    const docRef = await addDoc(artifactsRef, newArtifact)

    return NextResponse.json(
      { id: docRef.id, ...newArtifact },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving artifact:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save artifact' },
      { status: 500 }
    )
  }
}


