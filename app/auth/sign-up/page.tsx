'use client'

import { useUser } from '@stackframe/stack'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignUpPage() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center animate-fade-in">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Or{' '}
            <a
              href="/auth/sign-in"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
            >
              sign in to your existing account
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-slide-in-top">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg dark:shadow-gray-900/20 sm:rounded-lg sm:px-10 transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              <div>
                <button
                  onClick={() => {
                    // This will trigger Stack Auth sign-up
                    window.location.href = '/handler/sign-up'
                  }}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200 hover-lift"
                >
                  Create Account with Stack Auth
                </button>
              </div>
              
              <div className="text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  By creating an account, you agree to our{' '}
                  <a href="/terms" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200">
                    Privacy Policy
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
