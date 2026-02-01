'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Sparkles, Palette, Heart, Eye, Loader2 } from 'lucide-react'
import { ArtAnalysis } from '@/types/ai'
import { useTheme } from '@/contexts/ThemeContext'

const InsightEngine = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<ArtAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { updateTheme } = useTheme()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        setAnalysis(null)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: selectedImage,
          query: query || undefined,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze image')
      }

      const data = await response.json()
      setAnalysis(data.analysis)
      
      // Update theme based on dominant colors
      if (data.analysis.dominant_color_palette) {
        updateTheme(data.analysis.dominant_color_palette)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze artwork')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen py-20 px-4 relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 text-purple-400" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            The Insight Engine
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Upload any artwork and receive deep AI-powered analysis of colors, composition, style, and emotional resonance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-2xl p-8"
          >
            <div className="space-y-6">
              {/* Image Preview */}
              {selectedImage ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-white/20">
                  <img
                    src={selectedImage}
                    alt="Upload preview"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null)
                      setAnalysis(null)
                      if (fileInputRef.current) fileInputRef.current.value = ''
                    }}
                    className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/30 rounded-xl p-12 text-center cursor-pointer hover:border-purple-400/50 transition-colors"
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-white/60" />
                  <p className="text-white/80 mb-2">Click to upload artwork</p>
                  <p className="text-sm text-white/60">JPG, PNG up to 10MB</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Optional Query */}
              <div>
                <label className="block text-white/90 mb-2 text-sm font-medium">
                  Optional: Compare to style or period
                </label>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., Renaissance painting, Abstract Expressionism"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!selectedImage || loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze Artwork
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
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-2xl p-8"
          >
            <AnimatePresence mode="wait">
              {analysis ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6"
                >
                  {/* Title */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{analysis.title}</h3>
                    <p className="text-purple-300 text-sm">{analysis.style_prediction}</p>
                  </div>

                  {/* Color Palette */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Palette className="w-5 h-5 text-purple-400" />
                      <h4 className="text-white font-semibold">Color Palette</h4>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {analysis.dominant_color_palette.map((color, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="w-12 h-12 rounded-lg border-2 border-white/20 shadow-lg"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Emotional Score */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-5 h-5 text-pink-400" />
                      <h4 className="text-white font-semibold">Emotional Resonance</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Mood:</span>
                        <span className="text-purple-300 font-medium">{analysis.emotional_score.mood_primary}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Intensity:</span>
                        <span className="text-purple-300 font-medium">{analysis.emotional_score.intensity_level}</span>
                      </div>
                    </div>
                  </div>

                  {/* Composition */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="w-5 h-5 text-blue-400" />
                      <h4 className="text-white font-semibold">Composition</h4>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{analysis.composition_analysis}</p>
                  </div>

                  {/* Historical Context */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Historical Context</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{analysis.historical_context}</p>
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
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Upload an artwork to see analysis results</p>
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

export default InsightEngine

