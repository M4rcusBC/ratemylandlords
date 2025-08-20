'use client'

import Link from 'next/link'
import { useUser } from '@stackframe/stack'
import { Home, Search, PlusCircle, LogOut } from 'lucide-react'
import { Suspense } from 'react'
import { ThemeToggle } from './ThemeToggle'

function NavigationContent() {
  const user = useUser()

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 theme-transition">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex">
            <Link 
              href="/" 
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 hover-scale"
            >
              <Home className="h-5 w-5 mr-2" />
              RateMyLandlords
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/landlords"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Search className="h-4 w-4 mr-1" />
              Browse
            </Link>
            
            <ThemeToggle />
            
            {user ? (
              <>
                <Link
                  href="/landlords/new"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Landlord
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Welcome, {user.displayName || user.primaryEmail}
                  </span>
                  <button
                    onClick={() => user.signOut()}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/sign-in"
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-200 hover-lift shadow-sm hover:shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function Navigation() {
  return (
    <Suspense fallback={
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex">
              <Link 
                href="/" 
                className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                <Home className="h-5 w-5 mr-2" />
                RateMyLandlords
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/landlords"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Search className="h-4 w-4 mr-1" />
                Browse
              </Link>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    }>
      <NavigationContent />
    </Suspense>
  )
}