'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Sparkles, Users, Palette, Heart } from 'lucide-react'
import { useState } from 'react'

const MandalaWorkshop = () => {
  // Workshop image paths - add your images to /public/images/workshops/
  const workshopImages = [
    { src: '/images/workshops/workshop-1.jpg', alt: 'People creating mandalas at cozy cafe tables', placeholder: true },
    { src: '/images/workshops/workshop-2.jpg', alt: 'Group workshop at wooden table', placeholder: true },
    { src: '/images/workshops/workshop-3.jpg', alt: 'Close-up of intricate mandala drawing', placeholder: true },
  ]

  const [imageErrors, setImageErrors] = useState<boolean[]>(workshopImages.map(() => false))

  const features = [
    {
      icon: Palette,
      title: 'Learn Mandala Art',
      description: 'Discover the meditative art of creating beautiful mandala patterns from scratch'
    },
    {
      icon: Users,
      title: 'Small Group Sessions',
      description: 'Intimate workshops with personalized attention in cozy, inspiring spaces'
    },
    {
      icon: Heart,
      title: 'Relaxing Experience',
      description: 'A peaceful, creative escape where you can unwind and express yourself'
    },
    {
      icon: Sparkles,
      title: 'Take Home Artwork',
      description: 'Create your own beautiful mandala masterpiece to cherish forever'
    }
  ]

  return (
    <section id="workshops" className="py-20 px-6 md:px-12 lg:px-20 relative bg-[#FFF5E6]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-yellow-400" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Mandala Art Workshops
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Join me for an immersive journey into the world of mandala art. Experience the joy of creating 
            intricate, meditative patterns in a warm, welcoming atmosphere.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Images Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#FFE5CC] to-[#FFD9B3]">
              {!imageErrors[0] ? (
                <Image
                  src={workshopImages[0].src}
                  alt={workshopImages[0].alt}
                  fill
                  className="object-cover"
                  onError={() => {
                    const newErrors = [...imageErrors]
                    newErrors[0] = true
                    setImageErrors(newErrors)
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">Workshop Image 1</p>
                    <p className="text-gray-400 text-xs mt-2">{workshopImages[0].alt}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Smaller Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#FFE8D6] to-[#FFE5CC]">
                {!imageErrors[1] ? (
                  <Image
                    src={workshopImages[1].src}
                    alt={workshopImages[1].alt}
                    fill
                    className="object-cover"
                    onError={() => {
                      const newErrors = [...imageErrors]
                      newErrors[1] = true
                      setImageErrors(newErrors)
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Users className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-xs">Workshop Image 2</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#FFF8F0] to-[#FFE8D6]">
                {!imageErrors[2] ? (
                  <Image
                    src={workshopImages[2].src}
                    alt={workshopImages[2].alt}
                    fill
                    className="object-cover"
                    onError={() => {
                      const newErrors = [...imageErrors]
                      newErrors[2] = true
                      setImageErrors(newErrors)
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Heart className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-xs">Workshop Image 3</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="kawaii-card p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Discover the Art of Mandala Creation
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                In my mandala workshops, I guide participants through the beautiful process of creating 
                intricate circular patterns that are both meditative and visually stunning. Whether you&apos;re 
                a complete beginner or looking to refine your skills, these sessions are designed to be 
                accessible, relaxing, and inspiring.
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Each workshop takes place in a warm, inviting space—often a cozy cafe or creative studio—where 
                participants can gather around wooden tables, surrounded by natural light and a peaceful atmosphere. 
                I provide all the materials you need, from fine-tipped pens and compasses to high-quality paper, 
                ensuring you have everything to create your masterpiece.
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                The sessions are kept small and intimate, allowing for personalized attention and a sense of 
                community. As you draw, you&apos;ll find yourself entering a state of flow, where time seems to 
                slow down and creativity takes over. By the end of each workshop, you&apos;ll leave with not just 
                a beautiful piece of art, but also a sense of accomplishment and inner peace.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="kawaii-card p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFE5CC] flex items-center justify-center">
                  <Icon className="w-8 h-8 text-gray-700" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="kawaii-card p-8 md:p-12 max-w-3xl mx-auto bg-gradient-to-br from-[#FFE5CC] to-[#FFE8D6]">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Create Your First Mandala?
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              Join an upcoming workshop and experience the joy of mandala art creation. 
              All skill levels welcome!
            </p>
            <a
              href="/#contact"
              className="kawaii-button-primary inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Book a Workshop</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MandalaWorkshop

