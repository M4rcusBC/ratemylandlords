'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@stackframe/stack'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Building, MapPin, Phone, Save } from 'lucide-react'

const landlordSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  address: z.string().min(1, 'Address is required').max(200, 'Address must be less than 200 characters'),
  city: z.string().min(1, 'City is required').max(50, 'City must be less than 50 characters'),
  state: z.string().min(2, 'State is required').max(2, 'State must be 2 characters'),
  zipCode: z.string().min(5, 'ZIP code is required').max(10, 'ZIP code must be less than 10 characters'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
})

type LandlordFormData = z.infer<typeof landlordSchema>

export default function NewLandlordPage() {
  const router = useRouter()
  const user = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LandlordFormData>({
    resolver: zodResolver(landlordSchema),
  })

  // Redirect to sign in if not authenticated
  if (!user) {
    router.push('/auth/sign-in')
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please sign in to add a landlord.</p>
        </div>
      </div>
    )
  }

  const onSubmit = async (data: LandlordFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/landlords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create landlord')
      }

      const landlord = await response.json()
      router.push(`/landlords/${landlord.id}`)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Building className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Add New Landlord</h1>
          <p className="mt-2 text-lg text-gray-600">
            Help others by adding a landlord to our database
          </p>
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Before adding a landlord:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Search to make sure they're not already in our database</li>
            <li>• Provide accurate and complete information</li>
            <li>• Only add landlords you have direct experience with</li>
            <li>• Contact information is optional but helpful for verification</li>
          </ul>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Landlord Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="e.g., John Smith or ABC Property Management"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    {...register('description')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Brief description of the landlord or property management company..."
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Address Information
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    {...register('address')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="123 Main Street"
                  />
                  {errors.address && (
                    <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...register('city')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="San Francisco"
                    />
                    {errors.city && (
                      <p className="mt-2 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      {...register('state')}
                      maxLength={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="CA"
                    />
                    {errors.state && (
                      <p className="mt-2 text-sm text-red-600">{errors.state.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      {...register('zipCode')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="94102"
                    />
                    {errors.zipCode && (
                      <p className="mt-2 text-sm text-red-600">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Contact Information (Optional)
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="landlord@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    {...register('website')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="https://example.com"
                  />
                  {errors.website && (
                    <p className="mt-2 text-sm text-red-600">{errors.website.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Error Display */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Add Landlord
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
