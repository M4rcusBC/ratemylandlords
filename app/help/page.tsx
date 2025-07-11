import Link from 'next/link'
import { 
  HelpCircle, 
  Search, 
  UserPlus, 
  Star, 
  Shield, 
  MessageSquare,
  PlusCircle,
  Eye,
  AlertTriangle,
  Building
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/how-to-review"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-3">
              <Star className="h-8 w-8 text-yellow-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">How to Write a Review</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Step-by-step guide to sharing your landlord experience
            </p>
          </Link>

          <Link
            href="/review-guidelines"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-3">
              <Shield className="h-8 w-8 text-indigo-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Review Guidelines</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Best practices for writing helpful, trustworthy reviews
            </p>
          </Link>

          <Link
            href="/report-issue"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Report an Issue</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Flag inappropriate content or report problems
            </p>
          </Link>
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
                  You only need an account to write reviews, add landlords, or report inappropriate content.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">How do I add a new landlord?</h3>
                <p className="text-gray-600 mt-1">
                  If you can't find your landlord, you can <Link href="/landlords/new" className="text-indigo-600 hover:text-indigo-500">add them</Link> to 
                  our database. You'll need to create an account first, then provide their basic information like name and address.
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
                  Then find your landlord or <Link href="/landlords/new" className="text-indigo-600 hover:text-indigo-500">add them</Link> if they're not listed.
                  Click "Write Review" on their profile page. Check our <Link href="/how-to-review" className="text-indigo-600 hover:text-indigo-500">step-by-step guide</Link> for details.
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
                  Once submitted, reviews cannot be edited or deleted to maintain platform integrity. Please review your content carefully before posting.
                  If you need to report an issue with your own review, <Link href="/contact" className="text-indigo-600 hover:text-indigo-500">contact support</Link>.
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

          {/* Platform Features */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Building className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Platform Features</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">What information can I find about landlords?</h3>
                <p className="text-gray-600 mt-1">
                  Each landlord profile includes contact information, property addresses, average ratings, 
                  and detailed reviews from tenants. Some profiles may include additional details like 
                  websites and verification status.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">How are landlord ratings calculated?</h3>
                <p className="text-gray-600 mt-1">
                  Ratings are calculated as the average of all submitted reviews on a 1-5 star scale. 
                  The overall rating reflects the collective experience of all tenants who have reviewed that landlord.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Can I search for landlords in specific areas?</h3>
                <p className="text-gray-600 mt-1">
                  Yes! Use our search filters to find landlords by city, state, or ZIP code. 
                  You can also search by landlord name or property management company.
                </p>
              </div>
            </div>
          </div>

          {/* Safety and Community */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Safety & Community</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">How do I report inappropriate content?</h3>
                <p className="text-gray-600 mt-1">
                  Use our <Link href="/report-issue" className="text-indigo-600 hover:text-indigo-500">report system</Link> to 
                  flag reviews that violate our guidelines. Common reasons include harassment, false information, or spam. 
                  Our team reviews all reports within 24 hours.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">What are the community guidelines?</h3>
                <p className="text-gray-600 mt-1">
                  Reviews should be honest, factual, and based on personal experience. Avoid profanity, 
                  personal attacks, or unverifiable claims. Read our full 
                  <Link href="/review-guidelines" className="text-indigo-600 hover:text-indigo-500"> review guidelines</Link> for details.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">How is my privacy protected?</h3>
                <p className="text-gray-600 mt-1">
                  All reviews are posted anonymously by default. Your personal information is never shared publicly. 
                  Read our <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</Link> for full details.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">How are disputes handled?</h3>
                <p className="text-gray-600 mt-1">
                  We investigate all reports fairly and may remove content that violates guidelines. 
                  Both tenants and landlords can contact support if they believe content is inaccurate or inappropriate.
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
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/landlords"
              className="flex items-center text-indigo-600 hover:text-indigo-500 text-sm"
            >
              <Search className="h-4 w-4 mr-2" />
              Browse Landlords
            </Link>
            <Link
              href="/auth/sign-up"
              className="flex items-center text-indigo-600 hover:text-indigo-500 text-sm"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create Account
            </Link>
            <Link
              href="/landlords/new"
              className="flex items-center text-indigo-600 hover:text-indigo-500 text-sm"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Landlord
            </Link>
            <Link
              href="/contact"
              className="flex items-center text-indigo-600 hover:text-indigo-500 text-sm"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Link>
            <Link
              href="/how-to-review"
              className="flex items-center text-indigo-600 hover:text-indigo-500 text-sm"
            >
              <Star className="h-4 w-4 mr-2" />
              How to Review
            </Link>
            <Link
              href="/review-guidelines"
              className="flex items-center text-indigo-600 hover:text-indigo-500 text-sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              Review Guidelines
            </Link>
            <Link
              href="/privacy"
              className="flex items-center text-indigo-600 hover:text-indigo-500 text-sm"
            >
              <Shield className="h-4 w-4 mr-2" />
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="flex items-center text-indigo-600 hover:text-indigo-500 text-sm"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}