'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Briefcase, PenTool, Sparkles, User } from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/works', label: 'Works', icon: Briefcase },
  { href: '/writings', label: 'Writings', icon: PenTool },
  { href: '/littleThings', label: 'Little Things', icon: Sparkles },
  { href: '/aboutMe', label: 'About Me', icon: User },
]

const NavigationMenu = () => {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(0)
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0, top: 0 })
  const itemsRef = useRef<(HTMLLIElement | null)[]>([])

  const updatePillPosition = (index: number) => {
    const activeItem = itemsRef.current[index]
    if (activeItem) {
      const { offsetWidth, offsetLeft } = activeItem
      setPillStyle({
        width: offsetWidth,
        left: offsetLeft,
        top: 0,
      })
    }
  }

  useEffect(() => {
    // Find active item based on pathname
    const currentIndex = navItems.findIndex(item => {
      if (item.href === '/') {
        return pathname === '/'
      }
      return pathname?.startsWith(item.href)
    })
    
    const index = currentIndex !== -1 ? currentIndex : 0
    setActiveIndex(index)
    
    // Wait for DOM to be ready
    setTimeout(() => {
      updatePillPosition(index)
    }, 100)
  }, [pathname])

  useEffect(() => {
    // Update pill position when window resizes
    const handleResize = () => {
      updatePillPosition(activeIndex)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeIndex])

  const handleItemClick = (index: number) => {
    setActiveIndex(index)
    updatePillPosition(index)
  }

  return (
    <div className="relative" id="menu">
      <div className="content relative">
        {/* Sliding Pill Indicator */}
        <motion.div
          id="pill"
          className="absolute h-8 rounded-lg glass-effect z-0 pointer-events-none"
          initial={false}
          animate={{
            width: pillStyle.width || 82,
            left: pillStyle.left || 2,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          style={{
            top: '2.5px',
          }}
        />

        {/* Navigation Items */}
        <ul id="items" className="nav-menu-items flex items-center space-x-1 relative">
          {navItems.map((item, index) => {
            const Icon = item.icon

            return (
              <li
                key={item.href}
                ref={(el) => {
                  itemsRef.current[index] = el
                }}
                className="item relative z-10"
              >
                <Link
                  href={item.href}
                  onClick={() => handleItemClick(index)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/90 hover:text-white transition-colors relative"
                >
                  <Icon className="nav_Icons w-4 h-4" />
                  <span className="text-sm leading-4" style={{ fontSize: '14px', lineHeight: '16px' }}>
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default NavigationMenu

