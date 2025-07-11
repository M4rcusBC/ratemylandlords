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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <a
              href="/auth/sign-in"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your existing account
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <button
                  onClick={() => {
                    // This will trigger Stack Auth sign-up
                    window.location.href = '/handler/sign-up'
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Account with Stack Auth
                </button>
              </div>
              
              <div className="text-center">
                <span className="text-sm text-gray-500">
                  By creating an account, you agree to our{' '}
                  <a href="/terms" className="text-indigo-600 hover:text-indigo-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">
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
