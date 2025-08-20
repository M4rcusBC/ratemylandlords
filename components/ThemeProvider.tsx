'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Handle theme initialization and changes
  useEffect(() => {
    setMounted(true)
    
    // Get theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  // Handle system theme detection and apply theme
  useEffect(() => {
    if (!mounted) return

    const applyTheme = (isDark: boolean) => {
      const root = document.documentElement
      if (isDark) {
        root.classList.add('dark')
        setResolvedTheme('dark')
      } else {
        root.classList.remove('dark')
        setResolvedTheme('light')
      }
    }

    const handleThemeChange = () => {
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        applyTheme(systemTheme === 'dark')
      } else {
        applyTheme(theme === 'dark')
      }
    }

    handleThemeChange()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleThemeChange)

    return () => mediaQuery.removeEventListener('change', handleThemeChange)
  }, [theme, mounted])

  // Save theme to localStorage
  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}