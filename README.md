# The Multiverse Canvas - AI-Driven Immersive Art Platform

An immersive AI-driven art platform featuring deep analysis, creative generation, and 3D gallery experiences. Built on Next.js with Google Gemini AI, Firebase, and Three.js.

## 🎨 Project Structure

```
artWebsite/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── assets/            # Static assets
│   │   ├── images/        # Art images
│   │   ├── icons/         # Icons and SVGs
│   │   └── fonts/         # Custom fonts
│   ├── styles/            # CSS/SCSS files
│   ├── utils/             # Utility functions
│   └── data/              # Art collection data
├── public/                 # Public assets
├── docs/                   # Documentation
└── scripts/                # Build and utility scripts
```

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with React 18
- **AI/ML**: Google Gemini API, Imagen API
- **Database**: Firebase Firestore (real-time)
- **3D Graphics**: Three.js with React Three Fiber
- **Styling**: Tailwind CSS + Glassmorphism/Neumorphism
- **Animations**: Framer Motion
- **Deployment**: Vercel/Netlify ready

## 🎯 Core Features

### 1. Insight Engine
- Upload any artwork for AI-powered analysis
- Get style predictions, color palettes, emotional scores
- Historical context and composition analysis
- Dynamic UI theming based on artwork colors

### 2. Creative Co-Pilot
- Generate new artwork with text prompts
- Multiple artistic style options
- Real-time AI art generation
- Save to collaborative gallery

### 3. 3D Gallery
- Immersive Three.js 3D space
- Interactive cursor-based camera movement
- Real-time Firestore updates
- Particle effects and animations

### 4. Dynamic Theming
- UI adapts to analyzed artwork colors
- Persistent theme storage
- Smooth color transitions

### 5. Scrollytelling Experience
- Parallax scrolling effects
- Smooth section transitions
- Immersive storytelling flow

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── ai/              # AI endpoints (Gemini/Imagen)
│   │   └── artifacts/       # Firestore operations
│   ├── layout.tsx           # Root layout with ThemeProvider
│   └── page.tsx             # Main page with scrollytelling
├── components/
│   ├── InsightEngine.tsx    # AI analysis component
│   ├── CreativeCoPilot.tsx  # Art generation component
│   ├── Gallery3D.tsx        # Three.js 3D gallery
│   ├── Logo.tsx             # Hero section
│   └── ... (other components)
├── contexts/
│   └── ThemeContext.tsx     # Dynamic theming system
├── lib/
│   └── firebase.ts          # Firebase initialization
└── types/
    └── ai.ts                # AI-related types
```

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy environment variables template (see `MULTIVERSE_SETUP.md`)
   - Configure Firebase and Google AI API keys

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

- **Setup Guide**: See `MULTIVERSE_SETUP.md` for detailed configuration
- **Airtable Integration**: See `AIRTABLE_SETUP.md` for artworks collection setup

## 🔧 Configuration Required

Before running, you need:
1. Firebase project with Firestore enabled
2. Google AI API key (for Gemini/Imagen)
3. Environment variables configured (see `.env.example`)

## 🎨 Design Features

- **Glassmorphism**: Frosted glass effects throughout
- **Neumorphism 2.0**: Subtle depth and shadows
- **Dark Theme**: High contrast for visual richness
- **Responsive**: Works on all devices
- **Micro-interactions**: Smooth hover effects and animations

## 🌟 Key Highlights

- Real-time collaborative gallery
- AI-powered art analysis and generation
- Immersive 3D visualization
- Dynamic theming system
- Smooth parallax scrolling
- Professional glassmorphism UI
