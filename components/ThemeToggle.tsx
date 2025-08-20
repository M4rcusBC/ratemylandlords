'use client'

import { useTheme } from './ThemeProvider'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-4 w-4" />
    }
    return resolvedTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
  }

  const getLabel = () => {
    switch (theme) {
      case 'light': return 'Light'
      case 'dark': return 'Dark'
      case 'system': return 'System'
      default: return 'Theme'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Toggle theme"
      >
        <span className="transition-transform duration-200 hover:scale-110">
          {getIcon()}
        </span>
        <span className="hidden sm:inline-block">{getLabel()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-1">
            <button
              onClick={() => {
                setTheme('light')
                setIsOpen(false)
              }}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                theme === 'light'
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </button>
            <button
              onClick={() => {
                setTheme('dark')
                setIsOpen(false)
              }}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                theme === 'dark'
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </button>
            <button
              onClick={() => {
                setTheme('system')
                setIsOpen(false)
              }}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                theme === 'system'
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Monitor className="h-4 w-4" />
              <span>System</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}