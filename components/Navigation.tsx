'use client'

import Link from 'next/link'
import { useUser } from '@stackframe/stack'
import { Home, Search, PlusCircle, LogOut } from 'lucide-react'
import { Suspense } from 'react'

function NavigationContent() {
  const user = useUser()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center px-2 py-2 text-sm font-medium text-gray-900">
              <Home className="h-5 w-5 mr-2" />
              RateMyLandlords
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/landlords"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <Search className="h-4 w-4 mr-1" />
              Browse
            </Link>
            
            {user ? (
              <>
                <Link
                  href="/landlords/new"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Landlord
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.displayName || user.primaryEmail}
                  </span>
                  <button
                    onClick={() => user.signOut()}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
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
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
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
      <nav className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <Link href="/" className="flex items-center px-2 py-2 text-sm font-medium text-gray-900">
                <Home className="h-5 w-5 mr-2" />
                RateMyLandlords
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/landlords"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <Search className="h-4 w-4 mr-1" />
                Browse
              </Link>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
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