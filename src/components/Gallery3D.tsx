'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useTexture, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { GeneratedArt } from '@/types/ai'
import { getFirestoreInstance } from '@/lib/firebase'
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore'

// 3D Card Component
function ArtCard({ 
  position, 
  imageUrl, 
  title, 
  style, 
  mousePosition 
}: { 
  position: [number, number, number]
  imageUrl: string
  title: string
  style: string
  mousePosition: { x: number; y: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture(imageUrl)

  useFrame((state) => {
    if (meshRef.current) {
      // React to mouse position
      const mouseX = mousePosition.x * 0.5
      const mouseY = mousePosition.y * 0.5
      
      meshRef.current.rotation.y += (mouseX - meshRef.current.rotation.y) * 0.05
      meshRef.current.rotation.x += (-mouseY - meshRef.current.rotation.x) * 0.05
      
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[3, 4]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

// Particle Field Component
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 1000

  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001
      particlesRef.current.rotation.x += 0.0005
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#9333ea" transparent opacity={0.6} />
    </points>
  )
}

const Gallery3D = () => {
  const [artworks, setArtworks] = useState<GeneratedArt[]>([])
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      // Initialize Firebase
      const db = getFirestoreInstance()
      const artifactsRef = collection(db, 'artifacts', '__app_id', 'public', 'data', 'generated_art')
      const q = query(artifactsRef, orderBy('createdAt', 'desc'), limit(20))

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const arts: GeneratedArt[] = []
          snapshot.forEach((doc) => {
            arts.push({
              id: doc.id,
              ...doc.data(),
            } as GeneratedArt)
          })
          setArtworks(arts)
          setLoading(false)
        },
        (error) => {
          console.error('Error fetching artworks:', error)
          setLoading(false)
        }
      )

      return () => unsubscribe()
    } catch (error) {
      console.error('Firebase initialization error:', error)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        setMousePosition({ x, y })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Arrange artworks in a 3D grid
  const getArtworkPositions = () => {
    const positions: [number, number, number][] = []
    const spacing = 5
    const cols = Math.ceil(Math.sqrt(artworks.length))
    
    artworks.forEach((art, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols
      const x = (col - cols / 2) * spacing
      const y = (row - cols / 2) * spacing * 0.8
      const z = (Math.random() - 0.5) * 3
      positions.push([x, y, z])
    })
    
    return positions
  }

  return (
    <section className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 z-0" ref={containerRef}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={75} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9333ea" />
          
          <ParticleField />
          
          {!loading && artworks.length > 0 && getArtworkPositions().map((position, index) => (
            <ArtCard
              key={artworks[index].id}
              position={position}
              imageUrl={artworks[index].imageUrl}
              title={artworks[index].metadata.title}
              style={artworks[index].metadata.style_prediction}
              mousePosition={mousePosition}
            />
          ))}
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={10}
            maxDistance={30}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            The Multiverse Gallery
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore AI-generated artworks in an immersive 3D space. Move your cursor to interact.
          </p>
        </motion.div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-effect rounded-xl px-8 py-4"
          >
            <p className="text-white">Loading gallery...</p>
          </motion.div>
        )}

        {!loading && artworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-effect rounded-xl px-8 py-4"
          >
            <p className="text-white/80">No artworks yet. Generate some art to see them here!</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Gallery3D

