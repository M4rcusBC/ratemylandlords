import Link from 'next/link'
import { Star, UserPlus, Search, PenTool, CheckCircle } from 'lucide-react'

export default function HowToReviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Star className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">How to Write a Review</h1>
          <p className="mt-2 text-lg text-gray-600">
            Share your landlord experience in 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <UserPlus className="h-8 w-8 text-indigo-600 ml-4 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Create an Account</h2>
            </div>
            <div className="ml-14">
              <p className="text-gray-700 mb-4">
                Sign up for a free account to start writing reviews. All reviews are posted anonymously 
                to protect your privacy and prevent landlord retaliation.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-blue-900 mb-2">Why sign up?</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Write and manage your reviews</li>
                  <li>• Help build a community of informed tenants</li>
                  <li>• Report inappropriate content</li>
                  <li>• Your identity remains completely anonymous</li>
                </ul>
              </div>
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Free Account
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <Search className="h-8 w-8 text-indigo-600 ml-4 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Find Your Landlord</h2>
            </div>
            <div className="ml-14">
              <p className="text-gray-700 mb-4">
                Search for your landlord using their name, property address, or company name. 
                If they're not in our database yet, you can add them.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">If you find your landlord:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Click on their profile</li>
                    <li>• Look for the "Write Review" button</li>
                    <li>• Check existing reviews for context</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">If your landlord isn't listed:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Click "Add New Landlord"</li>
                    <li>• Provide their basic information</li>
                    <li>• You can then write the first review</li>
                  </ul>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="/landlords"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Landlords
                </Link>
                <Link
                  href="/landlords/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Add New Landlord
                </Link>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <PenTool className="h-8 w-8 text-indigo-600 ml-4 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Write Your Review</h2>
            </div>
            <div className="ml-14">
              <p className="text-gray-700 mb-4">
                Share your honest experience to help fellow tenants make informed decisions. 
                Focus on facts and specific examples.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">What to include in your review:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h5 className="font-medium text-green-900 mb-2">✓ Do Include</h5>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li>• Response time to maintenance requests</li>
                        <li>• Communication style and professionalism</li>
                        <li>• Property condition and upkeep</li>
                        <li>• Rent increases and fee transparency</li>
                        <li>• Move-in/move-out experience</li>
                        <li>• Specific examples and timeframes</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h5 className="font-medium text-red-900 mb-2">✗ Don't Include</h5>
                      <ul className="text-red-800 text-sm space-y-1">
                        <li>• Personal information or full names</li>
                        <li>• Profanity or offensive language</li>
                        <li>• Unverified claims or rumors</li>
                        <li>• Irrelevant personal details</li>
                        <li>• Threats or harassment</li>
                        <li>• Discriminatory comments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Rating Guide:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="flex mr-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-700">Excellent - Exceeds expectations</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-4">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="text-sm text-gray-700">Good - Meets expectations</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-4">
                        {[1, 2, 3].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="text-sm text-gray-700">Average - Acceptable</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-4">
                        {[1, 2].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                        <Star className="h-4 w-4 text-gray-300" />
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="text-sm text-gray-700">Poor - Below expectations</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-gray-300" />
                        <Star className="h-4 w-4 text-gray-300" />
                        <Star className="h-4 w-4 text-gray-300" />
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="text-sm text-gray-700">Terrible - Would not recommend</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <CheckCircle className="h-8 w-8 text-indigo-600 ml-4 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Submit and Help Others</h2>
            </div>
            <div className="ml-14">
              <p className="text-gray-700 mb-4">
                Once you submit your review, it will be posted anonymously to help other tenants. 
                Your review contributes to a transparent rental market.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-yellow-900 mb-2">Important to Remember:</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Reviews cannot be edited after submission</li>
                  <li>• All reviews are permanent to maintain integrity</li>
                  <li>• Your identity remains completely anonymous</li>
                  <li>• Reviews are moderated for guideline compliance</li>
                </ul>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="/review-guidelines"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Read Full Guidelines
                </Link>
                <Link
                  href="/landlords"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Start Writing a Review
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-indigo-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Share Your Experience?</h3>
          <p className="text-gray-600 mb-6">
            Your review can help protect future tenants and promote better landlord practices. 
            Join our community of informed renters today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Create Account
            </Link>
            <Link
              href="/landlords"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Search className="h-5 w-5 mr-2" />
              Find Landlord
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
