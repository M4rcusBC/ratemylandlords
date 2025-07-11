import Link from 'next/link'
import { Star, CheckCircle, XCircle, AlertTriangle, Shield, ThumbsUp } from 'lucide-react'

export default function ReviewGuidelinesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Star className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Review Guidelines</h1>
          <p className="mt-2 text-lg text-gray-600">
            Help others make informed decisions with honest, helpful reviews
          </p>
        </div>

        {/* Overview */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <ThumbsUp className="h-6 w-6 text-blue-600 mt-1 mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Our Mission</h2>
              <p className="text-blue-800">
                RateMyLandlords exists to help tenants make informed rental decisions through honest, 
                fact-based reviews. Your experiences matter and can help protect future tenants.
              </p>
            </div>
          </div>
        </div>

        {/* What Makes a Good Review */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex items-center mb-6">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">What Makes a Good Review</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Be Specific and Detailed</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-800 font-medium mb-2">✓ Good Example:</p>
                <p className="text-green-700 text-sm">
                  "Landlord was responsive to maintenance requests, usually fixing issues within 48 hours. 
                  The apartment had good heating and the building was kept clean. However, rent increased 
                  by 8% each year and the landlord was strict about lease terms."
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium mb-2">✗ Poor Example:</p>
                <p className="text-red-700 text-sm">
                  "Terrible landlord! Worst experience ever. Don't rent from them!"
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Focus on Your Experience</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Describe your personal interactions with the landlord</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Share specific examples of good or poor service</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Mention property conditions and maintenance responsiveness</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Include information about rent, deposits, and fees</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Areas to Cover</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Communication</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Response time to calls/emails</li>
                    <li>• Professionalism in interactions</li>
                    <li>• Availability for questions/concerns</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Maintenance</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Speed of repairs</li>
                    <li>• Quality of work performed</li>
                    <li>• Emergency response</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Financial</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Rent increases</li>
                    <li>• Security deposit handling</li>
                    <li>• Hidden fees or charges</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Property</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Condition when you moved in/out</li>
                    <li>• Building cleanliness</li>
                    <li>• Neighborhood safety</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What Not to Include */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex items-center mb-6">
            <XCircle className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">What Not to Include</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-medium text-red-800 mb-2">Prohibited Content</h3>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Personal information (full names, addresses, phone numbers)</li>
                    <li>• Profanity, hate speech, or discriminatory language</li>
                    <li>• Unverified claims or rumors</li>
                    <li>• Content unrelated to the landlord-tenant relationship</li>
                    <li>• Threats, harassment, or intimidation</li>
                    <li>• Spam or promotional content</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Keep It Professional</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-600 mb-2">✓ Do This</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Use respectful language</li>
                    <li>• Stick to facts and your experience</li>
                    <li>• Be constructive in criticism</li>
                    <li>• Consider both positives and negatives</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-600 mb-2">✗ Avoid This</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Emotional rants or venting</li>
                    <li>• Personal attacks on character</li>
                    <li>• Unsubstantiated accusations</li>
                    <li>• Irrelevant personal details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating System */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex items-center mb-6">
            <Star className="h-8 w-8 text-yellow-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Understanding Our Rating System</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <div>
                <span className="font-medium">5 Stars:</span>
                <span className="text-gray-600 ml-2">Excellent - Goes above and beyond expectations</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
                <Star className="h-5 w-5 text-gray-300" />
              </div>
              <div>
                <span className="font-medium">4 Stars:</span>
                <span className="text-gray-600 ml-2">Good - Meets expectations with minor issues</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex">
                {[1, 2, 3].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
                <Star className="h-5 w-5 text-gray-300" />
                <Star className="h-5 w-5 text-gray-300" />
              </div>
              <div>
                <span className="font-medium">3 Stars:</span>
                <span className="text-gray-600 ml-2">Average - Acceptable but room for improvement</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex">
                {[1, 2].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
                <Star className="h-5 w-5 text-gray-300" />
                <Star className="h-5 w-5 text-gray-300" />
                <Star className="h-5 w-5 text-gray-300" />
              </div>
              <div>
                <span className="font-medium">2 Stars:</span>
                <span className="text-gray-600 ml-2">Poor - Significant problems that impact living</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <Star className="h-5 w-5 text-gray-300" />
                <Star className="h-5 w-5 text-gray-300" />
                <Star className="h-5 w-5 text-gray-300" />
                <Star className="h-5 w-5 text-gray-300" />
              </div>
              <div>
                <span className="font-medium">1 Star:</span>
                <span className="text-gray-600 ml-2">Terrible - Major issues, would not recommend</span>
              </div>
            </div>
          </div>
        </div>

        {/* Moderation Process */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Moderation & Safety</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How We Keep Reviews Trustworthy</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>All reviews are posted anonymously to protect user privacy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Community reporting system for inappropriate content</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Regular monitoring for spam and fake reviews</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Clear consequences for guideline violations</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Reporting Inappropriate Content</h3>
              <p className="text-gray-700 mb-4">
                If you see a review that violates our guidelines, please report it. We review all reports and take appropriate action.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report an Issue
              </Link>
            </div>
          </div>
        </div>

        {/* Tips for Success */}
        <div className="bg-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Writing Helpful Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Before Writing</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Take notes during your tenancy</li>
                <li>• Save important communications</li>
                <li>• Document any issues with photos/dates</li>
                <li>• Consider both positive and negative aspects</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">While Writing</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Use clear, descriptive language</li>
                <li>• Provide context for your experiences</li>
                <li>• Be specific about timeframes</li>
                <li>• Proofread before submitting</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/landlords/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Ready to Write a Review?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
