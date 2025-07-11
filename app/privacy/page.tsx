import Link from 'next/link'
import { Shield, Eye, Lock, Database, UserCheck, AlertCircle, Cookie } from 'lucide-react'

// Cookie policy version - should match the one in CookieConsent.tsx
const PRIVACY_POLICY_VERSION = '2025-07-11'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()} (Version: {PRIVACY_POLICY_VERSION})
          </p>
        </div>

        {/* Privacy Content */}
        <div className="bg-white rounded-lg shadow p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              At RateMyLandlords, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <UserCheck className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div>
                  <p className="text-blue-800 font-medium">Our Commitment:</p>
                  <p className="text-blue-700 mt-1">
                    We believe in transparency and your right to privacy. All reviews are anonymous by default to protect tenants from potential retaliation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-3">
                  <Database className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Personal Information</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  When you create an account or use our services, we may collect:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Email address (required for account creation)</li>
                  <li>Display name or username</li>
                  <li>Authentication data through Stack Auth</li>
                  <li>Profile preferences and settings</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <Eye className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Usage Information</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  We automatically collect information about how you use our service:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Pages visited and time spent on our site</li>
                  <li>Search queries and filters used</li>
                  <li>Device information (browser type, operating system)</li>
                  <li>IP address and general location data</li>
                  <li>Referral sources and exit pages</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <Lock className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Content You Provide</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Information you voluntarily submit to our service:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Reviews and ratings of landlords</li>
                  <li>Landlord information you add to our database</li>
                  <li>Communications with our support team</li>
                  <li>Reports of inappropriate content</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Service Operation</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Provide and maintain our review platform</li>
                  <li>Authenticate users and manage accounts</li>
                  <li>Process and display reviews anonymously</li>
                  <li>Enable search and discovery features</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Communication</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Send important account and service updates</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Notify you of policy changes (with your consent)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Platform Integrity</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Monitor for spam, fraud, and abuse</li>
                  <li>Moderate content according to our guidelines</li>
                  <li>Investigate reports and policy violations</li>
                  <li>Improve our security measures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How We Share Your Information</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                <div>
                  <p className="text-green-800 font-medium">Privacy Protection:</p>
                  <p className="text-green-700 mt-1">
                    We do not sell, trade, or rent your personal information to third parties. Your reviews are posted anonymously to protect your identity.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">We may share information in these limited circumstances:</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                  <li><strong>Service Providers:</strong> Trusted third parties who help us operate our service (hosting, authentication, analytics)</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect rights and safety</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with notice to users)</li>
                  <li><strong>Consent:</strong> When you explicitly consent to sharing your information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Security Measures Include:</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure authentication through Stack Auth</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and monitoring systems</li>
                  <li>Secure hosting infrastructure</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                  <div>
                    <p className="text-yellow-800 font-medium">Important Note:</p>
                    <p className="text-yellow-700 mt-1">
                      While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                We use cookies and similar tracking technologies to enhance your experience on our website. This section explains what cookies we use and how you can control them.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Cookie className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                  <div>
                    <p className="text-blue-800 font-medium">Cookie Consent Required:</p>
                    <p className="text-blue-700 mt-1">
                      We ask for your consent before using non-essential cookies. You can change your preferences at any time using the "Cookie Settings" link in our footer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Types of Cookies We Use:</h3>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-green-900">Essential Cookies (Always Active)</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Required for basic website functionality, user authentication, and security. These cannot be disabled.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
                    <li>Session management and user authentication</li>
                    <li>Security tokens and CSRF protection</li>
                    <li>Basic functionality and navigation</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-900">Analytics Cookies (Optional)</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Help us understand how visitors use our site so we can improve the experience.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
                    <li>Page views and user interactions</li>
                    <li>Traffic sources and popular content</li>
                    <li>Error tracking and performance monitoring</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-medium text-purple-900">Functional Cookies (Optional)</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Remember your preferences and provide enhanced features.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
                    <li>Theme and display preferences</li>
                    <li>Language and location settings</li>
                    <li>Recently viewed content</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">Managing Your Cookie Preferences</h4>
                <p className="text-gray-700 text-sm mt-2">
                  You can control cookies through:
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
                  <li>Our cookie consent banner when you first visit</li>
                  <li>The "Cookie Settings" link in our website footer</li>
                  <li>Your browser's privacy settings</li>
                </ul>
                <p className="text-gray-600 text-sm mt-2">
                  Note: Disabling certain cookies may affect website functionality and your user experience.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                  <div>
                    <p className="text-yellow-800 font-medium">Privacy Policy Updates:</p>
                    <p className="text-yellow-700 mt-1">
                      When we update our privacy policy or cookie practices, you'll see our consent banner again to acknowledge the changes. The current policy version is displayed at the top of this page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Your Privacy Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Privacy Rights</h2>
            <p className="text-gray-700 mb-4">
              You have certain rights regarding your personal information, depending on your location:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Access and Control</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Access the personal information we have about you</li>
                  <li>Update or correct your account information</li>
                  <li>Delete your account and associated data</li>
                  <li>Object to certain uses of your information</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Review Management</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Reviews cannot be edited after submission to maintain integrity</li>
                  <li>You can request review deletion through our support team</li>
                  <li>All reviews remain anonymous unless you choose otherwise</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Communication Preferences</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Opt out of non-essential communications</li>
                  <li>Choose your notification preferences</li>
                  <li>Unsubscribe from marketing emails</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              We use trusted third-party services to provide our platform:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Stack Auth</h3>
                <p className="text-gray-700 mt-2">
                  We use Stack Auth for secure user authentication. Please review their privacy policy for information about how they handle authentication data.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Analytics Services</h3>
                <p className="text-gray-700 mt-2">
                  We may use analytics services to understand site usage. These services collect anonymized data about site interactions.
                </p>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our service is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you believe we have collected information from a child under 18, please contact us immediately.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Data Retention</h2>
            <p className="text-gray-700 mb-4">
              We retain your information for as long as necessary to provide our services and comply with legal obligations:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Account information: Until you delete your account</li>
              <li>Reviews: Indefinitely to maintain platform integrity (but anonymously)</li>
              <li>Usage data: Typically 2-3 years for analytics purposes</li>
              <li>Support communications: 3 years for quality assurance</li>
            </ul>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Policy Updates</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Posting the updated policy on our website</li>
              <li>Sending an email notification to registered users</li>
              <li>Displaying a prominent notice on our platform</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Privacy Officer:</strong> <Link href="mailto:privacy@ratemylandlords.com" className="text-indigo-600 hover:text-indigo-500">privacy@ratemylandlords.com</Link>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>General Support:</strong> <Link href="mailto:support@ratemylandlords.com" className="text-indigo-600 hover:text-indigo-500">support@ratemylandlords.com</Link>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Help Center:</strong> <Link href="/help" className="text-indigo-600 hover:text-indigo-500">Visit our Help Center</Link>
              </p>
            </div>
          </section>
        </div>

        {/* Quick Links */}
        <div className="mt-8 bg-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Related Pages</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/terms"
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Terms of Service
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
