'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Petal {
  id: number
  x: number
  delay: number
  duration: number
  rotation: number
  imageIndex: number
  horizontalDrift: number
}

const petalImages = [
  '/petals/Group 1.png',
  '/petals/Group 2.png',
  '/petals/Group 3.png',
  '/petals/Group 4.png',
  '/petals/Group 5.png',
]

const FallingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {

    // Create petals with random timing
    const createPetals = () => {
      const newPetals: Petal[] = []
      const petalCount = 8 // Total number of petals to fall
      
      // Create random delays for each petal - completely random timing
      const delays: number[] = []
      for (let i = 0; i < petalCount; i++) {
        // Random delay between 0 and 25 seconds - creates unpredictable timing
        // Some might fall close together, some with gaps
        delays.push(Math.random() * 25)
      }
      // Don't sort - keep them completely random for natural, unpredictable timing
      
      for (let i = 0; i < petalCount; i++) {
        // Center the starting positions around 50% (center of screen) with spread
        const centerX = 50 // Center of screen
        const spread = 40 // Spread range
        const x = centerX + (Math.random() - 0.5) * spread // Random position between 30% and 70%
        
        newPetals.push({
          id: i,
          x: x,
          delay: delays[i], // Random delay - not sequential
          duration: 15 + Math.random() * 3, // Slower, smoother fall (15-18 seconds)
          rotation: Math.random() * 360, // Random starting rotation
          imageIndex: Math.floor(Math.random() * petalImages.length), // Random petal image
          horizontalDrift: (Math.random() - 0.5) * 25, // Random horizontal drift (-12.5% to +12.5%)
        })
      }
      setPetals(newPetals)
    }

    createPetals()
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((petal) => {
        const randomScale = 0.4 + Math.random() * 0.4 // Random size between 0.4 and 0.8
        const randomRotation = Math.random() * 360
        
        return (
          <motion.div
            key={petal.id}
            className="absolute"
            style={{
              left: `${petal.x}%`,
              top: 0, // Start from top
              width: '50px',
              height: '50px',
              transform: 'translateX(-50%)', // Center the petal on its x position
            }}
            initial={{
              opacity: 0,
              rotate: randomRotation,
              scale: randomScale,
              y: 0, // Start from top (0%)
            }}
            animate={{
              // Realistic left-right swing motion (pendulum-like)
              x: [
                0,
                petal.horizontalDrift * 0.2,
                petal.horizontalDrift * 0.5,
                petal.horizontalDrift * 0.3,
                petal.horizontalDrift * 0.6,
                petal.horizontalDrift * 0.4,
                petal.horizontalDrift * 0.55,
              ],
              // Fall from top (0%) to bottom (100vh) - gravity-based
              y: '100vh', // Fall to bottom of viewport
              opacity: [0, 0.9, 0.9, 0.9, 0.9, 0.7, 0], // Fade in at top, fade out at bottom
              // Minimal realistic rotation (like a leaf gently tumbling)
              rotate: [
                randomRotation,
                randomRotation + 45,
                randomRotation + 90,
                randomRotation + 135,
                randomRotation + 180,
                randomRotation + 225,
                randomRotation + 270,
              ],
              // Very subtle scale (almost none - realistic)
              scale: [
                randomScale,
                randomScale * 1.02,
                randomScale * 1.0,
                randomScale * 1.01,
                randomScale * 0.99,
                randomScale * 0.98,
                randomScale * 0.95,
              ],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              ease: [0.25, 0.46, 0.45, 0.94], // Gravity-like easing - starts slow, accelerates
              times: [0, 0.1, 0.25, 0.45, 0.65, 0.85, 1], // Timing for all animations
            }}
            onAnimationComplete={() => {
              // Remove petal after animation completes
              setPetals((prev) => prev.filter((p) => p.id !== petal.id))
            }}
          >
            <img
              src={petalImages[petal.imageIndex]}
              alt="Falling petal"
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

export default FallingPetals

