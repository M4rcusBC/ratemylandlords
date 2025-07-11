import Link from 'next/link'
import { FileText, Shield, Eye, AlertTriangle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <FileText className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="mt-2 text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-lg shadow p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to RateMyLandlords ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website and services (the "Service") operated by RateMyLandlords.
            </p>
            <p className="text-gray-700">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By creating an account or using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
            </p>
            <p className="text-gray-700">
              We reserve the right to update these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Service after changes are posted constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Account Creation</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>You must be at least 18 years old to create an account</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Account Termination</h3>
                <p className="text-gray-700 mt-2">
                  We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason we deem necessary.
                </p>
              </div>
            </div>
          </section>

          {/* User Content and Reviews */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Content and Reviews</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Review Guidelines</h3>
                <p className="text-gray-700 mt-2">When posting reviews, you agree to:</p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Provide honest, factual information based on your personal experience</li>
                  <li>Avoid profanity, hate speech, or discriminatory language</li>
                  <li>Not include personal information about landlords or other tenants</li>
                  <li>Not post false, misleading, or defamatory content</li>
                  <li>Not violate any applicable laws or regulations</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Content Ownership</h3>
                <p className="text-gray-700 mt-2">
                  You retain ownership of content you post, but grant us a non-exclusive, royalty-free license to use, display, and distribute your content on our Service.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Content Moderation</h3>
                <p className="text-gray-700 mt-2">
                  We reserve the right to remove any content that violates these Terms or is otherwise objectionable. We are not obligated to pre-screen content but may do so at our discretion.
                </p>
              </div>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Prohibited Uses</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                <div>
                  <p className="text-red-800 font-medium">You may not use our Service to:</p>
                </div>
              </div>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Post false, misleading, or defamatory reviews</li>
              <li>Harass, threaten, or intimidate other users</li>
              <li>Impersonate another person or entity</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Upload malicious software or attempt to hack our systems</li>
              <li>Spam other users or flood the platform with content</li>
              <li>Use automated tools to scrape or download content</li>
              <li>Attempt to manipulate ratings or reviews</li>
            </ul>
          </section>

          {/* Privacy and Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Please review our <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</Link> to understand how we collect, use, and protect your information.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Anonymous Reviews</h3>
                <p className="text-gray-700 mt-2">
                  All reviews are posted anonymously by default to protect user privacy and prevent retaliation from landlords.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Data Security</h3>
                <p className="text-gray-700 mt-2">
                  We implement appropriate security measures to protect your personal information, but cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The Service and its original content, features, and functionality are owned by RateMyLandlords and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-gray-700">
              You may not reproduce, distribute, modify, or create derivative works of our content without explicit written permission.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimers</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <Eye className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                <div>
                  <p className="text-yellow-800 font-medium">Important Notice:</p>
                  <p className="text-yellow-700 mt-1">
                    The information on our Service is provided by users and is not verified by us. We do not guarantee the accuracy, completeness, or reliability of any user-generated content.
                  </p>
                </div>
              </div>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>The Service is provided "as is" without warranties of any kind</li>
              <li>We do not endorse or verify the accuracy of user reviews</li>
              <li>We are not responsible for decisions made based on information found on our Service</li>
              <li>We do not guarantee uninterrupted or error-free service</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the fullest extent permitted by applicable law, RateMyLandlords shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill.
            </p>
            <p className="text-gray-700">
              Our total liability to you for any claims arising out of or relating to these Terms or the Service shall not exceed the amount you paid us in the twelve months preceding the claim.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
            <p className="text-gray-700">
              These Terms shall be interpreted and governed by the laws of the State of California, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts of California.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong> <Link href="mailto:legal@ratemylandlords.com" className="text-indigo-600 hover:text-indigo-500">legal@ratemylandlords.com</Link>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Support:</strong> <Link href="/help" className="text-indigo-600 hover:text-indigo-500">Help Center</Link>
              </p>
            </div>
          </section>
        </div>

        {/* Quick Links */}
        <div className="mt-8 bg-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Related Pages</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/privacy"
              className="flex items-center text-indigo-600 hover:text-indigo-500 text-sm"
            >
              <Shield className="h-4 w-4 mr-2" />
              Privacy Policy
            </Link>
            <Link
              href="/help"
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Help Center
            </Link>
            <Link
              href="/contact"
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
