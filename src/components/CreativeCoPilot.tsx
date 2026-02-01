'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Sparkles, Loader2, Download, Save } from 'lucide-react'
import { ArtAnalysis } from '@/types/ai'

const ART_STYLES = [
  'Surrealist oil painting',
  'Cyberpunk anime sketch',
  'Abstract Expressionism',
  'Renaissance portrait',
  'Digital abstract',
  'Watercolor landscape',
  'Minimalist geometric',
  'Impressionist scene',
  'Futuristic sci-fi',
  'Vintage poster art',
]

interface GeneratedResult {
  imageUrl: string
  metadata: ArtAnalysis
  prompt: string
}

const CreativeCoPilot = () => {
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<GeneratedResult | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: selectedStyle || undefined,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate artwork')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate artwork')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!result) return

    try {
      const response = await fetch('/api/artifacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: result.imageUrl,
          prompt: result.prompt,
          style: selectedStyle,
          metadata: result.metadata,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save artwork')
      }

      const saved = await response.json()
      alert('Artwork saved to gallery!')
      // Reset form
      setPrompt('')
      setSelectedStyle('')
      setResult(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save artwork')
    }
  }

  return (
    <section className="min-h-screen py-20 px-4 relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-[url('/images/mandala-background.jpg')] opacity-5 bg-cover bg-center" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-6"
          >
            <Wand2 className="w-16 h-16 text-pink-400" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Creative Co-Pilot
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Generate stunning artwork with AI. Describe your vision and watch it come to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-2xl p-8 space-y-6"
          >
            {/* Prompt Input */}
            <div>
              <label className="block text-white/90 mb-2 text-sm font-medium">
                Describe your artwork
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A serene mountain landscape at sunset with vibrant colors and dramatic clouds..."
                rows={6}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
              />
            </div>

            {/* Style Selection */}
            <div>
              <label className="block text-white/90 mb-3 text-sm font-medium">
                Artistic Style (Optional)
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {ART_STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(selectedStyle === style ? '' : style)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      selectedStyle === style
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Artwork
                </>
              )}
            </button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
              >
                {error}
              </motion.div>
            )}
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-2xl p-8"
          >
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6"
                >
                  {/* Generated Image */}
                  <div className="relative rounded-xl overflow-hidden border-2 border-white/20">
                    <img
                      src={result.imageUrl}
                      alt={result.metadata.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-1">{result.metadata.title}</h3>
                      <p className="text-white/80 text-sm">{result.metadata.style_prediction}</p>
                    </div>
                  </div>

                  {/* Metadata Preview */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Emotional Resonance</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-white/80">Mood: <span className="text-pink-300">{result.metadata.emotional_score.mood_primary}</span></span>
                        <span className="text-white/80">Intensity: <span className="text-pink-300">{result.metadata.emotional_score.intensity_level}</span></span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Color Palette</h4>
                      <div className="flex gap-2">
                        {result.metadata.dominant_color_palette.slice(0, 5).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded border border-white/20"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save to Gallery
                    </button>
                    <a
                      href={result.imageUrl}
                      download={`${result.metadata.title.replace(/\s+/g, '-')}.png`}
                      className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-full min-h-[400px] text-white/40"
                >
                  <div className="text-center">
                    <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Enter a prompt to generate artwork</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CreativeCoPilot


