# The Multiverse Canvas - Setup Guide

## 🚀 Overview

The Multiverse Canvas is an AI-driven immersive art platform featuring:
- **Insight Engine**: Deep AI analysis of artwork using Google Gemini
- **Creative Co-Pilot**: Generate new artwork using AI
- **3D Gallery**: Immersive Three.js gallery with real-time Firestore updates
- **Dynamic Theming**: UI adapts to analyzed artwork colors

## 📋 Prerequisites

1. Node.js 18+ installed
2. Firebase project set up
3. Google AI API key (for Gemini/Imagen)
4. (Optional) Airtable account for artworks collection

## 🔧 Installation

1. **Install dependencies** (already done):
```bash
npm install
```

2. **Set up environment variables**:
   - Copy `.env.example` to `.env.local`
   - Fill in all required values (see Configuration section below)

3. **Start development server**:
```bash
npm run dev
```

## ⚙️ Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Firestore Database
4. Get your Firebase config from Project Settings
5. Add to `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```

6. **Firestore Security Rules** (for public collection):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /artifacts/__app_id/public/data/generated_art/{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

### Google AI API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add to `.env.local`:
   ```
   GOOGLE_AI_API_KEY=your_api_key_here
   ```

### Airtable Setup (Optional - for artworks collection)

If you want to load artworks from Airtable:
1. Follow instructions in `AIRTABLE_SETUP.md`
2. Add Airtable credentials to `.env.local`

## 🎨 Features

### Insight Engine (`/#insight`)

- Upload any artwork image
- Get AI-powered analysis including:
  - Style prediction
  - Color palette extraction
  - Emotional resonance analysis
  - Composition analysis
  - Historical context
- UI theme automatically updates based on artwork colors

### Creative Co-Pilot (`/#creative`)

- Generate new artwork with text prompts
- Select from predefined artistic styles
- Generated art is automatically analyzed
- Save to public gallery for all users

### 3D Gallery (`/#gallery`)

- Immersive Three.js 3D space
- Real-time updates from Firestore
- Interactive cursor-based camera movement
- Particle effects
- Auto-rotating gallery

### Dynamic Theming

- After analyzing artwork, the UI color palette updates
- Colors are saved to localStorage
- CSS variables are dynamically updated
- Works across all components

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── ai/
│   │   │   ├── analyze/route.ts    # Gemini analysis endpoint
│   │   │   └── generate/route.ts   # Imagen generation endpoint
│   │   └── artifacts/route.ts       # Firestore CRUD operations
│   ├── layout.tsx                   # Root layout with ThemeProvider
│   └── page.tsx                     # Main page with scrollytelling
├── components/
│   ├── InsightEngine.tsx            # AI analysis component
│   ├── CreativeCoPilot.tsx          # Art generation component
│   ├── Gallery3D.tsx                # Three.js 3D gallery
│   ├── Logo.tsx                     # Hero section (updated)
│   └── ... (existing components)
├── contexts/
│   └── ThemeContext.tsx             # Dynamic theming system
├── lib/
│   └── firebase.ts                  # Firebase initialization
└── types/
    └── ai.ts                        # AI-related TypeScript types
```

## 🔄 Real-time Updates

The 3D Gallery uses Firestore's `onSnapshot` listener for real-time updates:
- New artwork appears instantly for all users
- No page refresh needed
- Works across multiple browser tabs/devices

## 🎭 Styling

The platform uses:
- **Glassmorphism**: Frosted glass effects throughout
- **Neumorphism 2.0**: Subtle depth and shadows
- **Dark theme**: High contrast for visual richness
- **Dynamic colors**: Adapts to analyzed artwork

## 🐛 Troubleshooting

### Firebase Errors
- Check that all Firebase env variables are set
- Verify Firestore is enabled in Firebase Console
- Check Firestore security rules

### Google AI API Errors
- Verify API key is correct
- Check API quota/limits
- Ensure Gemini API is enabled in Google Cloud Console

### 3D Gallery Not Loading
- Check browser console for errors
- Verify Firestore connection
- Ensure Three.js dependencies are installed

### Theme Not Updating
- Check browser localStorage
- Verify ThemeContext is wrapping the app
- Check CSS variable updates in DevTools

## 🚀 Deployment

1. Set all environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Build the project: `npm run build`
3. Deploy: `npm run start` or use platform's deploy command

## 📝 Notes

- The Imagen API integration uses Gemini's image generation capabilities
- For production, you may want to use the actual Imagen API endpoint
- Firestore collection path: `/artifacts/__app_id/public/data/generated_art`
- All generated art is stored in the public collection for collaborative viewing

## 🎯 Next Steps

1. Configure Firebase and Google AI API
2. Test Insight Engine with sample artwork
3. Generate some art with Creative Co-Pilot
4. View in 3D Gallery
5. Customize styles and colors to match your brand


