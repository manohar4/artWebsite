'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Artwork } from '@/types'

const HOVER_DELAY_MS = 500

const ArtCollection = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [errorHint, setErrorHint] = useState<string | null>(null)
  const [emphasizedId, setEmphasizedId] = useState<string | null>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = useCallback((id: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => setEmphasizedId(id), HOVER_DELAY_MS)
  }, [])

  const handleLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setEmphasizedId(null)
  }, [])

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    async function fetchArtworks() {
      try {
        setLoading(true)
        setErrorHint(null)
        const response = await fetch('/api/artworks')
        const data = await response.json().catch(() => ({}))
        if (!response.ok) {
          setError(data.message || data.error || 'Failed to fetch artworks')
          setErrorHint(data.hint || null)
          setArtworks([])
          return
        }
        setArtworks(data.artworks || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching artworks:', err)
        setError(err instanceof Error ? err.message : 'Failed to load artworks')
        setErrorHint(null)
      } finally {
        setLoading(false)
      }
    }

    fetchArtworks()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  return (
    <section id="work" className="relative w-full">
      {/* Section Header - optional, with padding */}
      <div className="px-4 py-12 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg"
        >
          My Recent Work
        </motion.h2>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-white/30 border-t-white" />
          <span className="ml-3 text-white/70">Loading artworks...</span>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-20 px-4">
          <p className="text-red-400 mb-2">Error: {error}</p>
          <p className="text-white/60 text-sm">
            {errorHint || 'Please check your Airtable configuration in .env.local'}
          </p>
        </div>
      )}

      {/* 1 col mobile, 2 col iPad (md), 3 col laptop (lg); hover = blur + dim others, emphasize current */}
      {!loading && !error && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full columns-1 md:columns-2 lg:columns-3"
        >
          {artworks.length === 0 ? (
            <div className="w-full py-24 text-center text-white/60">
              No artworks found. Add artworks in your Airtable base.
            </div>
          ) : (
            artworks.map((artwork) => {
              const isEmphasized = emphasizedId === artwork.id
              const shouldBlur = emphasizedId !== null && !isEmphasized
              return (
              <motion.article
                key={artwork.id}
                variants={itemVariants}
                onMouseEnter={() => handleEnter(artwork.id)}
                onMouseLeave={handleLeave}
                className={`relative w-full m-0 p-0 block break-inside-avoid mb-0 cursor-default transition-all duration-300 ease-in-out ${shouldBlur ? 'blur-md brightness-[0.35]' : 'blur-none brightness-100'} ${isEmphasized ? 'z-10' : ''}`}
              >
                <div className="relative w-full overflow-hidden m-0 p-0 bg-black/20">
                  {artwork.image ? (
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-auto block object-contain m-0 p-0 align-bottom pointer-events-none"
                      loading="lazy"
                      onError={(e) => {
                        const el = e.currentTarget
                        el.style.display = 'none'
                        const fallback = el.nextElementSibling as HTMLElement
                        if (fallback) fallback.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 w-full min-h-[200px] bg-white/5 flex items-center justify-center pointer-events-none"
                    style={{ display: artwork.image ? 'none' : 'flex' }}
                  >
                    <span className="text-white/40 text-sm">No image</span>
                  </div>
                </div>
                <h3 className="text-[36px] font-semibold text-white uppercase truncate m-0 leading-tight mb-6">
                  {artwork.title}
                </h3>
              </motion.article>
              )
            })
          )}
        </motion.div>
      )}
    </section>
  )
}

export default ArtCollection
