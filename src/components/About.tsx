'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import heroImage from '@/assets/saiVindya.jpg'

const About = () => {
  return (
    <section id="about" className="py-20 px-6 md:px-12 lg:px-20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              A Little Bit About Me
            </h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8">
              I am Sai Vindhya, a creative artist and designer. I am working as a freelance artist 
              and creative director, focusing on unique, bold, and expressive visual art. I got featured 
              various times on many big and small marketplaces, portfolio websites and blogs. I also 
              received some awards and recognitions from some of the big and small award companies. 
              Besides creating art, I like to explore new creative directions and push the boundaries 
              of visual expression.
            </p>
          </motion.div>

          {/* Right Side - Illustration/Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 flex items-center justify-center max-w-md w-full"
          >
            <div className="relative w-full aspect-square">
              {/* Decorative sparkles */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-8 h-8 text-2xl"
              >
                ✨
              </motion.div>
              <motion.div
                animate={{ 
                  rotate: [360, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-4 -left-4 w-8 h-8 text-2xl"
              >
                ✨
              </motion.div>
              
              {/* Image Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={heroImage}
                  alt="Sai Vindhya"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
