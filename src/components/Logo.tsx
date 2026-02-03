'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { Play } from 'lucide-react'
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal'
import SignatureLogo from '@/components/SignatureLogo'

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

      {/* Main Content - centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-20 lg:py-0 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center justify-center max-w-2xl text-center"
        >
          <div className="space-y-2 mb-8">
            <VerticalCutReveal
              splitBy="characters"
              staggerDuration={0.025}
              staggerFrom="first"
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              containerClassName="flex flex-wrap justify-center text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg"
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
              containerClassName="flex flex-wrap justify-center text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg"
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
      </div>
    </section>
  )
}

export default Logo
