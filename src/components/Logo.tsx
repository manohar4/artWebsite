'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useRef } from 'react'
import { Play } from 'lucide-react'
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal'
import SignatureLogo from '@/components/SignatureLogo'
import heroImage from '@/assets/saiVindya.jpg'

const Logo = () => {
  const pathname = usePathname()
  const sectionRef = useRef<HTMLElement>(null)
  
  const navItems = [
    { href: '/#work', label: 'Work' },
    { href: '/#testimonials', label: 'Testimonials' },
    { href: '/#about', label: 'About' },
  ]

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col relative overflow-hidden"
    >
      {/* Header: logo left, menu items right */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 md:px-8 py-6 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0" aria-label="Home">
          <SignatureLogo size={40} className="text-white drop-shadow-md" animate={false} onHover={true} />
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/' && pathname === '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-white/90 font-medium text-sm md:text-base transition-all duration-300 ${
                  isActive 
                    ? 'text-white font-semibold' 
                    : 'hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 lg:px-20 py-20 lg:py-0 gap-12 lg:gap-16 relative z-10">
        {/* Left Side - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex flex-col justify-center max-w-2xl"
        >
          <div className="space-y-2 mb-8">
            <VerticalCutReveal
              splitBy="characters"
              staggerDuration={0.025}
              staggerFrom="first"
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              containerClassName="flex flex-wrap text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg"
              elementLevelClassName="inline-block"
              wordLevelClassName="mr-2"
            >
              {`HI 👋, FRIEND!`}
            </VerticalCutReveal>

            <VerticalCutReveal
              splitBy="characters"
              staggerDuration={0.025}
              staggerFrom="center"
              reverse={false}
              transition={{ type: 'spring', stiffness: 220, damping: 24, delay: 0.25 }}
              containerClassName="flex flex-wrap text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg"
              elementLevelClassName="inline-block"
              wordLevelClassName="mr-2"
            >
              {`🌤️ IT IS NICE ⇗ TO MEET 😊 YOU.`}
            </VerticalCutReveal>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/#work"
              className="kawaii-button-primary flex items-center justify-center gap-2 group"
            >
              <Play className="w-5 h-5" />
              <span>View My Work</span>
            </Link>
          </div>
      </motion.div>

        {/* Right Side - Hero Image/Illustration */}
      <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex-1 flex items-center justify-center max-w-lg w-full"
        >
          <div className="relative w-full aspect-square max-w-md">
            {/* Decorative background circle */}
            <div className="absolute inset-0 bg-[#FFE5CC] rounded-full blur-3xl opacity-50 -z-10" />
            
            {/* Image Container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={heroImage}
                alt="Sai Vindhya - Creative Artist"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Decorative overlay */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-red-400/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">❤️</span>
              </div>
          </div>
          </div>
        </motion.div>
        </div>
    </section>
  )
}

export default Logo
