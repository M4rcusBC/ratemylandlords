import Link from 'next/link'
import { Search, Shield, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl transition-colors duration-300">
              Rate My Landlords
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Find honest reviews about landlords in your area. Help others make informed decisions about their next rental.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/landlords"
                className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-400 transition-all duration-200 hover-lift"
              >
                Browse Landlords
              </Link>
              <Link
                href="/auth/sign-up"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                Sign up to review <span aria-hidden="true" className="inline-block transition-transform duration-200 hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl transition-colors duration-300">
              Why Choose RateMyLandlords?
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-600 dark:text-gray-300 transition-colors duration-300">
              We make it easy to find reliable landlords and share your experiences to help others.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col items-center text-center animate-slide-in-top hover-lift p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  <Search className="h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400 transition-colors duration-300" />
                  Easy Search
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  <p className="flex-auto">
                    Quickly find landlords in your area and read authentic reviews from real tenants.
                  </p>
                </dd>
              </div>
              
              <div className="flex flex-col items-center text-center animate-slide-in-top hover-lift p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200" style={{animationDelay: '0.1s'}}>
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  <Shield className="h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400 transition-colors duration-300" />
                  Anonymous Reviews
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  <p className="flex-auto">
                    Share your honest experiences anonymously to help others make informed decisions.
                  </p>
                </dd>
              </div>
              
              <div className="flex flex-col items-center text-center animate-slide-in-top hover-lift p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200" style={{animationDelay: '0.2s'}}>
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  <Users className="h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400 transition-colors duration-300" />
                  Community Driven
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  <p className="flex-auto">
                    Join a community of tenants helping each other find quality housing.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 dark:bg-indigo-700 py-16 sm:py-24 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-scale-in">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to find your next landlord?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-200 dark:text-indigo-100 transition-colors duration-300">
              Browse our database of landlord reviews or share your own experience to help others.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/landlords"
                className="rounded-md bg-white dark:bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 dark:text-indigo-700 shadow-sm hover:bg-indigo-50 dark:hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200 hover-lift"
              >
                Get started
              </Link>
              <Link
                href="/help"
                className="text-sm font-semibold leading-6 text-white hover:text-indigo-200 dark:hover:text-indigo-100 transition-colors duration-200"
              >
                Learn more <span aria-hidden="true" className="inline-block transition-transform duration-200 hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
