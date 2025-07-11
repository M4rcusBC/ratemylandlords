import Link from 'next/link'
import { Mail, MessageSquare, HelpCircle, AlertTriangle, Bug, UserPlus } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Mail className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-2 text-lg text-gray-600">
            We're here to help with any questions or concerns
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* General Support */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <MessageSquare className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">General Support</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Have questions about using RateMyLandlords? Need help with your account? 
              Our support team is here to assist you.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                <strong>Email:</strong> <a href="mailto:support@ratemylandlords.com" className="text-indigo-600 hover:text-indigo-500">support@ratemylandlords.com</a>
              </p>
              <p className="text-sm text-gray-700">
                <strong>Response Time:</strong> Within 24 hours
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/help"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Visit Help Center
              </Link>
            </div>
          </div>

          {/* Report Issues */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Report Issues</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Found inappropriate content? Need to report a review that violates our guidelines? 
              We take all reports seriously.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                <strong>Email:</strong> <a href="mailto:reports@ratemylandlords.com" className="text-indigo-600 hover:text-indigo-500">reports@ratemylandlords.com</a>
              </p>
              <p className="text-sm text-gray-700">
                <strong>Response Time:</strong> Within 12 hours
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/report-issue"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report an Issue
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Technical Issues */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-3">
              <Bug className="h-6 w-6 text-orange-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Technical Issues</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Found a bug or experiencing technical problems?
            </p>
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> <a href="mailto:tech@ratemylandlords.com" className="text-indigo-600 hover:text-indigo-500">tech@ratemylandlords.com</a>
            </p>
          </div>

          {/* Business Inquiries */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-3">
              <UserPlus className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Business Inquiries</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Partnerships, media inquiries, or business questions?
            </p>
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> <a href="mailto:business@ratemylandlords.com" className="text-indigo-600 hover:text-indigo-500">business@ratemylandlords.com</a>
            </p>
          </div>

          {/* Legal & Privacy */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-3">
              <Mail className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Legal & Privacy</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Privacy concerns, legal matters, or policy questions?
            </p>
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> <a href="mailto:legal@ratemylandlords.com" className="text-indigo-600 hover:text-indigo-500">legal@ratemylandlords.com</a>
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How long does it take to get a response?</h3>
              <p className="text-gray-600 text-sm">
                We aim to respond to all inquiries within 24 hours during business days. 
                Urgent reports (inappropriate content, safety concerns) are typically addressed within 12 hours.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I request to have my review removed?</h3>
              <p className="text-gray-600 text-sm">
                Once published, reviews cannot be edited to maintain integrity. However, you can contact support 
                to request removal if there are exceptional circumstances or errors.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I claim my landlord profile?</h3>
              <p className="text-gray-600 text-sm">
                Landlords can claim their profiles by contacting support with verification documents. 
                Claimed profiles receive a verification badge and can respond to reviews.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What should I include when reporting an issue?</h3>
              <p className="text-gray-600 text-sm">
                Please include: the specific review or content URL, the reason for reporting, 
                and any additional context that might help our team understand the issue.
              </p>
            </div>
          </div>
        </div>

        {/* Before You Contact Us */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Before You Contact Us</h3>
          <p className="text-gray-700 mb-4">
            You might find your answer faster by checking these resources:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/help"
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              Help Center
            </Link>
            <Link
              href="/terms"
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              Privacy Policy
            </Link>
            <Link
              href="/review-guidelines"
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              Review Guidelines
            </Link>
          </div>
        </div>

        {/* Response Expectations */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What to Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Our Commitment</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Professional and helpful responses</li>
                <li>• Timely communication within stated timeframes</li>
                <li>• Clear explanations of our policies and decisions</li>
                <li>• Follow-up if additional information is needed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Please Include</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Your account email (if applicable)</li>
                <li>• Specific URLs or content in question</li>
                <li>• Clear description of the issue or question</li>
                <li>• Any relevant screenshots or documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
