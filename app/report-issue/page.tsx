'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { AlertTriangle, Send, MessageSquare, Shield } from 'lucide-react'

const reportSchema = z.object({
  type: z.enum(['inappropriate-review', 'fake-review', 'spam', 'harassment', 'incorrect-info', 'other']),
  url: z.string().url('Please provide a valid URL').optional().or(z.literal('')),
  description: z.string().min(10, 'Please provide at least 10 characters').max(1000, 'Description must be less than 1000 characters'),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
})

type ReportFormData = z.infer<typeof reportSchema>

export default function ReportIssuePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
  })

  const onSubmit = async (_data: ReportFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // In a real app, this would send to your API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      setSubmitSuccess(true)
      reset()
    } catch {
      setSubmitError('Failed to submit report. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Submitted</h2>
            <p className="text-gray-600 mb-6">
              Thank you for helping us maintain a safe and trustworthy platform. 
              We'll review your report and take appropriate action within 24 hours.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => setSubmitSuccess(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Submit Another Report
              </button>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Report an Issue</h1>
          <p className="mt-2 text-lg text-gray-600">
            Help us maintain a safe and trustworthy community
          </p>
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="text-sm font-medium text-blue-900 mb-2">When to report content:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Reviews that contain false or misleading information</li>
            <li>• Inappropriate language, harassment, or threats</li>
            <li>• Spam or promotional content</li>
            <li>• Personal information that shouldn't be public</li>
            <li>• Content that violates our community guidelines</li>
          </ul>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
            {/* Issue Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-3">
                What type of issue are you reporting? *
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="inappropriate-review"
                    {...register('type')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Inappropriate review content (profanity, harassment)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="fake-review"
                    {...register('type')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Fake or misleading review</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="spam"
                    {...register('type')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Spam or promotional content</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="harassment"
                    {...register('type')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Harassment or threats</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="incorrect-info"
                    {...register('type')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Incorrect landlord information</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="other"
                    {...register('type')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Other issue</span>
                </label>
              </div>
              {errors.type && (
                <p className="mt-2 text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            {/* URL */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                URL of the content (if applicable)
              </label>
              <input
                type="url"
                id="url"
                {...register('url')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="https://ratemylandlords.com/landlords/..."
              />
              <p className="mt-1 text-sm text-gray-500">
                Copy and paste the URL of the specific review or landlord profile
              </p>
              {errors.url && (
                <p className="mt-2 text-sm text-red-600">{errors.url.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                rows={6}
                {...register('description')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Please provide specific details about the issue. Include any relevant context that will help us understand the problem..."
              />
              <p className="mt-1 text-sm text-gray-500">
                Be as specific as possible. Include exact quotes if reporting inappropriate language.
              </p>
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Contact Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your email address (optional)
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="your@email.com"
              />
              <p className="mt-1 text-sm text-gray-500">
                Only provide if you want us to follow up with you about this report
              </p>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Privacy Notice */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Privacy & Confidentiality</h4>
                  <p className="text-sm text-gray-600">
                    Your report will be reviewed confidentially by our moderation team. 
                    We do not share reporter information with the subjects of reports.
                  </p>
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
                onClick={() => window.history.back()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Report
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Help */}
        <div className="mt-8 bg-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Need Other Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/help"
              className="flex items-center text-indigo-600 hover:text-indigo-500 text-sm"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Visit Help Center
            </a>
            <a
              href="/contact"
              className="flex items-center text-indigo-600 hover:text-indigo-500 text-sm"
            >
              <Send className="h-4 w-4 mr-2" />
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
