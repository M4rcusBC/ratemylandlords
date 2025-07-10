'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@stackframe/stack'
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Building, 
  Flag,
  Award,
  Plus 
} from 'lucide-react'

interface Review {
  id: string
  rating: number
  title: string
  content: string
  createdAt: string
  anonymous: boolean
}

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
  claimedBy?: string
  avgRating: number
  reviewCount: number
  reviews: Review[]
}

export default function LandlordDetailPage() {
  const params = useParams()
  const user = useUser()
  const [landlord, setLandlord] = useState<Landlord | null>(null)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchLandlord(params.id as string)
    }
  }, [params.id])

  const fetchLandlord = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/landlords/${id}`)
      if (response.ok) {
        const data = await response.json()
        setLandlord(data)
      } else {
        console.error('Failed to fetch landlord')
      }
    } catch (error) {
      console.error('Error fetching landlord:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClaimProfile = async () => {
    if (!user || !landlord) return

    setClaiming(true)
    try {
      const response = await fetch(`/api/landlords/${landlord.id}/claim`, {
        method: 'POST',
      })
      
      if (response.ok) {
        // Refresh landlord data
        fetchLandlord(landlord.id)
      } else {
        console.error('Failed to claim profile')
      }
    } catch (error) {
      console.error('Error claiming profile:', error)
    } finally {
      setClaiming(false)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-medium text-gray-900">
          {rating.toFixed(1)}
        </span>
      </div>
    )
  }

  const renderReviewStars = (rating: number) => {
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
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!landlord) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Landlord not found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The landlord you're looking for doesn't exist.
          </p>
          <div className="mt-6">
            <Link
              href="/landlords"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Browse Landlords
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <Building className="h-12 w-12 text-indigo-600 mt-1" />
                <div className="ml-4">
                  <h1 className="text-3xl font-bold text-gray-900">{landlord.name}</h1>
                  <div className="flex items-center mt-2 text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    {landlord.address}, {landlord.city}, {landlord.state} {landlord.zipCode}
                  </div>
                  
                  {landlord.reviewCount > 0 && (
                    <div className="mt-3">
                      {renderStars(landlord.avgRating)}
                      <p className="text-sm text-gray-500 mt-1">
                        Based on {landlord.reviewCount} review{landlord.reviewCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                {user && !landlord.claimedBy && (
                  <button
                    onClick={handleClaimProfile}
                    disabled={claiming}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    {claiming ? 'Claiming...' : 'Claim This Profile'}
                  </button>
                )}
                
                {user && (
                  <Link
                    href={`/landlords/${landlord.id}/review`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Write Review
                  </Link>
                )}
              </div>
            </div>
            
            {landlord.description && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
                <p className="text-gray-600">{landlord.description}</p>
              </div>
            )}
            
            {/* Contact Information */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {landlord.phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">{landlord.phone}</span>
                </div>
              )}
              {landlord.email && (
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">{landlord.email}</span>
                </div>
              )}
              {landlord.website && (
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-400 mr-2" />
                  <a
                    href={landlord.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Reviews ({landlord.reviewCount})
              </h2>
              {user && (
                <Link
                  href={`/landlords/${landlord.id}/review`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Review
                </Link>
              )}
            </div>
            
            {landlord.reviews.length > 0 ? (
              <div className="space-y-6">
                {landlord.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {renderReviewStars(review.rating)}
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mt-2">
                          {review.title}
                        </h4>
                        <p className="text-gray-600 mt-2">{review.content}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {review.anonymous ? 'Posted anonymously' : 'Posted by verified user'}
                        </p>
                      </div>
                      
                      {user && (
                        <button className="text-gray-400 hover:text-gray-600">
                          <Flag className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Be the first to review this landlord.
                </p>
                {user && (
                  <div className="mt-6">
                    <Link
                      href={`/landlords/${landlord.id}/review`}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Write First Review
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}