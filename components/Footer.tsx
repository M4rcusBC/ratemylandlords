import Link from 'next/link'
import { 
  Home, 
  Search, 
  PlusCircle, 
  HelpCircle, 
  Mail, 
  Shield, 
  FileText,
  Star,
  Building
} from 'lucide-react'
import { CookieSettings } from './CookieConsent'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-indigo-400 mr-2" />
              <span className="text-xl font-bold text-white">RateMyLandlords</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering tenants with transparent landlord reviews and ratings. 
              Building better rental communities through honest feedback.
            </p>
            <div className="flex space-x-4">
              <Link
                href="mailto:support@ratemylandlords.com"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/landlords"
                  className="flex items-center text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Browse Landlords
                </Link>
              </li>
              <li>
                <Link
                  href="/landlords/new"
                  className="flex items-center text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Landlord
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="flex items-center text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              For Users
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/auth/sign-up"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/sign-in"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-review"
                  className="flex items-center text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  <Star className="h-4 w-4 mr-2" />
                  How to Review
                </Link>
              </li>
              <li>
                <Link
                  href="/review-guidelines"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Review Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal & Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="flex items-center text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="flex items-center text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/report-issue"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Report Issue
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} RateMyLandlords. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
                Privacy
              </Link>
              <CookieSettings />
              <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
