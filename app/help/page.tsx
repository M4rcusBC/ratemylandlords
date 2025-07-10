import Link from 'next/link'
import { 
  HelpCircle, 
  Search, 
  UserPlus, 
  Star, 
  Shield, 
  Award,
  MessageSquare 
} from 'lucide-react'

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Help Center</h1>
          <p className="mt-2 text-lg text-gray-600">
            Everything you need to know about RateMyLandlords
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {/* Getting Started */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Search className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Getting Started</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">How do I find a landlord?</h3>
                <p className="text-gray-600 mt-1">
                  Use the search bar on the <Link href="/landlords" className="text-indigo-600 hover:text-indigo-500">Browse Landlords</Link> page 
                  to search by name, address, city, or state. You can view landlord profiles and reviews without creating an account.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Do I need an account to browse?</h3>
                <p className="text-gray-600 mt-1">
                  No! You can browse all landlord profiles and read reviews without signing up. 
                  You only need an account to write reviews, claim profiles, or report inappropriate content.
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Star className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Writing Reviews</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">How do I write a review?</h3>
                <p className="text-gray-600 mt-1">
                  First, <Link href="/auth/sign-up" className="text-indigo-600 hover:text-indigo-500">create an account</Link>. 
                  Then navigate to a landlord&apos;s profile and click &quot;Write Review&quot;. Fill out the rating, title, and detailed content.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Are reviews anonymous?</h3>
                <p className="text-gray-600 mt-1">
                  Yes, all reviews are posted anonymously by default. Your name and personal information will not be displayed publicly.
                  This helps protect tenants from potential retaliation.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Can I edit or delete my review?</h3>
                <p className="text-gray-600 mt-1">
                  Once submitted, reviews cannot be edited or deleted to maintain integrity. Please review your content carefully before posting.
                  If you need to report an issue with your own review, contact support.
                </p>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <UserPlus className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Account Management</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">How do I create an account?</h3>
                <p className="text-gray-600 mt-1">
                  Click <Link href="/auth/sign-up" className="text-indigo-600 hover:text-indigo-500">"Sign Up"</Link> in 
                  the top navigation. We use Stack Auth for secure authentication. You can sign up with email or social login.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Is my personal information safe?</h3>
                <p className="text-gray-600 mt-1">
                  Yes. We use industry-standard security practices. Your email and personal information are never shared publicly.
                  All reviews are anonymous, and we do not display your name or contact information.
                </p>
              </div>
            </div>
          </div>

          {/* Landlord Profiles */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Landlord Profiles</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">What does "Claim This Profile" mean?</h3>
                <p className="text-gray-600 mt-1">
                  Landlords can claim their profiles to verify ownership and respond to reviews. 
                  Claimed profiles have a verification badge and may include additional contact information.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">How do I add a new landlord?</h3>
                <p className="text-gray-600 mt-1">
                  If you can't find a landlord in our database, you can add them. Navigate to the 
                  landlords page and click "Add New Landlord". Provide accurate information including name and address.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">What if landlord information is incorrect?</h3>
                <p className="text-gray-600 mt-1">
                  If you notice incorrect information, landlords can claim their profile to update details.
                  For other issues, please contact support with the specific corrections needed.
                </p>
              </div>
            </div>
          </div>

          {/* Safety and Moderation */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Safety & Moderation</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">How do I report inappropriate content?</h3>
                <p className="text-gray-600 mt-1">
                  Click the flag icon next to any review you believe violates our guidelines. 
                  Common reasons include harassment, false information, or spam. Our team reviews all reports.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">What are the review guidelines?</h3>
                <p className="text-gray-600 mt-1">
                  Reviews should be honest, factual, and based on personal experience. Avoid profanity, 
                  personal attacks, or unverifiable claims. Focus on the rental experience and landlord conduct.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">How are disputes handled?</h3>
                <p className="text-gray-600 mt-1">
                  We take all reports seriously. Our team investigates flagged content and may remove reviews 
                  that violate guidelines. Landlords can respond to reviews through their claimed profiles.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <MessageSquare className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Contact Support</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Still need help?</h3>
                <p className="text-gray-600 mt-1">
                  If you can't find the answer to your question here, please reach out to our support team.
                  We're here to help make your experience with RateMyLandlords as smooth as possible.
                </p>
              </div>
              <div className="mt-4">
                <Link
                  href="mailto:support@ratemylandlords.com"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 bg-indigo-50 rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/landlords"
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Browse Landlords
            </Link>
            <Link
              href="/auth/sign-up"
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Create Account
            </Link>
            <Link
              href="/landlords/new"
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Add Landlord
            </Link>
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}