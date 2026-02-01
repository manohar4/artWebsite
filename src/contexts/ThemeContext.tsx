'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeContextType {
  dominantColors: string[]
  updateTheme: (colors: string[]) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dominantColors, setDominantColors] = useState<string[]>([
    '#6B46C1',
    '#9333EA',
    '#A855F7',
    '#C084FC',
    '#E9D5FF',
  ])

  const updateTheme = (colors: string[]) => {
    if (colors && colors.length > 0) {
      setDominantColors(colors)
      // Update CSS variables for dynamic theming
      const root = document.documentElement
      colors.slice(0, 5).forEach((color, index) => {
        root.style.setProperty(`--theme-color-${index + 1}`, color)
      })
    }
  }

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedColors = localStorage.getItem('theme-colors')
    if (savedColors) {
      try {
        const colors = JSON.parse(savedColors)
        updateTheme(colors)
      } catch (e) {
        console.error('Failed to parse saved theme colors', e)
      }
    }
  }, [])

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme-colors', JSON.stringify(dominantColors))
  }, [dominantColors])

  return (
    <ThemeContext.Provider value={{ dominantColors, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}


