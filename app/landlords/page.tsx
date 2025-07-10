'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Star, MapPin, Building } from 'lucide-react'

interface Landlord {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  phone?: string
  email?: string
  website?: string
  description?: string
  avgRating: number
  reviewCount: number
}

export default function LandlordsPage() {
  const [landlords, setLandlords] = useState<Landlord[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  useEffect(() => {
    fetchLandlords()
  }, [search, city, state])

  const fetchLandlords = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (city) params.append('city', city)
      if (state) params.append('state', state)

      const response = await fetch(`/api/landlords?${params}`)
      const data = await response.json()
      setLandlords(data.landlords || [])
    } catch (error) {
      console.error('Error fetching landlords:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Landlords</h1>
          <p className="mt-2 text-gray-600">
            Find and review landlords in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search by name or address
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Search landlords..."
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter city"
              />
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter state"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {landlords.map((landlord) => (
              <div key={landlord.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Building className="h-8 w-8 text-indigo-600" />
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          <Link
                            href={`/landlords/${landlord.id}`}
                            className="hover:text-indigo-600"
                          >
                            {landlord.name}
                          </Link>
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {landlord.address}, {landlord.city}, {landlord.state} {landlord.zipCode}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {landlord.reviewCount > 0 ? (
                        <div>
                          {renderStars(landlord.avgRating)}
                          <p className="text-sm text-gray-500 mt-1">
                            {landlord.reviewCount} review{landlord.reviewCount !== 1 ? 's' : ''}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No reviews yet</p>
                      )}
                    </div>
                  </div>
                  
                  {landlord.description && (
                    <p className="mt-4 text-gray-600 line-clamp-2">
                      {landlord.description}
                    </p>
                  )}
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-2">
                      {landlord.phone && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Phone available
                        </span>
                      )}
                      {landlord.email && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Email available
                        </span>
                      )}
                      {landlord.website && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Website
                        </span>
                      )}
                    </div>
                    
                    <Link
                      href={`/landlords/${landlord.id}`}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && landlords.length === 0 && (
          <div className="text-center py-12">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No landlords found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or add a new landlord.
            </p>
            <div className="mt-6">
              <Link
                href="/landlords/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add New Landlord
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}