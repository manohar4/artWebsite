import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getAuth, signInAnonymously, Auth } from 'firebase/auth'

// Firebase configuration interface
interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

let app: FirebaseApp | null = null
let db: Firestore | null = null
let auth: Auth | null = null

export function initializeFirebase(initialAuthToken?: string): { app: FirebaseApp; db: Firestore; auth: Auth } {
  if (app && db && auth) {
    return { app, db, auth }
  }

  // Get config from environment variables
  const firebaseConfig: FirebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  }

  // Initialize Firebase
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }

  db = getFirestore(app)
  auth = getAuth(app)

  // Anonymous sign-in if token provided
  if (initialAuthToken) {
    signInAnonymously(auth).catch((error) => {
      console.error('Error signing in anonymously:', error)
    })
  }

  return { app, db, auth }
}

export function getFirestoreInstance(): Firestore {
  if (!db) {
    const { db: firestoreDb } = initializeFirebase()
    return firestoreDb
  }
  return db
}

export function getAuthInstance(): Auth {
  if (!auth) {
    const { auth: authInstance } = initializeFirebase()
    return authInstance
  }
  return auth
}


