'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SignatureLogo from './SignatureLogo'

interface LoadingScreenProps {
  isLoading: boolean
  onLoadingComplete: () => void
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, onLoadingComplete }) => {
  // Trigger loading complete after animation finishes (2.5s animation + 0.3s fade = 2.8s)
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        onLoadingComplete()
      }, 3000) // Total animation time: 2.5s (path) + 0.3s (fill) + 0.2s buffer
      return () => clearTimeout(timer)
    }
  }, [isLoading, onLoadingComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          {/* Mandala Background Image */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'url(/images/mandala-background.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <SignatureLogo 
              size={120} 
              className="text-white drop-shadow-2xl" 
              animate={true}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen

