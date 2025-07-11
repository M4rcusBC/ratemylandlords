'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { X, Cookie, Shield, Eye, Info, ExternalLink, UserCheck, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { 
  getCookieConsentData, 
  setCookieConsentData, 
  clearNonEssentialCookies,
  initializeAnalytics,
  COOKIE_NAMES,
  type CookieConsentData 
} from '@/lib/cookieUtils'

// Privacy policy version - update this when privacy policy changes
const PRIVACY_POLICY_VERSION = '2025-07-11'

interface CookieConsentContextType {
  hasConsented: boolean
  showModal: boolean
  acceptCookies: () => void
  declineCookies: () => void
  reopenModal: () => void
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  }
  return context
}

interface CookieConsentProviderProps {
  children: React.ReactNode
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [hasConsented, setHasConsented] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if user has already consented and if it's for the current privacy policy version
    const consentData = getCookieConsentData()
    
    if (consentData?.hasConsented && consentData?.privacyPolicyVersion === PRIVACY_POLICY_VERSION) {
      setHasConsented(true)
      setShowModal(false)
      // Initialize analytics if user has consented
      if (consentData.preferences.analytics) {
        initializeAnalytics()
      }
    } else {
      // Show modal if no consent or outdated privacy policy
      setShowModal(true)
    }
    
    setIsLoaded(true)
  }, [])

  const acceptCookies = () => {
    const consentData: CookieConsentData = {
      hasConsented: true,
      consentDate: new Date().toISOString(),
      privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      preferences: {
        essential: true,
        analytics: true,
        functional: true
      }
    }
    
    setCookieConsentData(consentData)
    // Legacy storage for backward compatibility
    localStorage.setItem(COOKIE_NAMES.CONSENT, 'accepted')
    localStorage.setItem(COOKIE_NAMES.CONSENT_VERSION, PRIVACY_POLICY_VERSION)
    
    setHasConsented(true)
    setShowModal(false)
    initializeAnalytics()
  }

  const declineCookies = () => {
    const consentData: CookieConsentData = {
      hasConsented: false,
      consentDate: new Date().toISOString(),
      privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      preferences: {
        essential: true,
        analytics: false,
        functional: false
      }
    }
    
    setCookieConsentData(consentData)
    // Legacy storage for backward compatibility
    localStorage.setItem(COOKIE_NAMES.CONSENT, 'declined')
    localStorage.setItem(COOKIE_NAMES.CONSENT_VERSION, PRIVACY_POLICY_VERSION)
    
    setHasConsented(false)
    setShowModal(false)
    clearNonEssentialCookies()
  }

  const reopenModal = () => {
    setShowModal(true)
  }

  return (
    <CookieConsentContext.Provider value={{
      hasConsented,
      showModal,
      acceptCookies,
      declineCookies,
      reopenModal
    }}>
      {children}
      {isLoaded && <CookieConsentModal />}
    </CookieConsentContext.Provider>
  )
}

function CookieConsentModal() {
  const { showModal, acceptCookies, declineCookies } = useCookieConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  if (!showModal) return null

  return (
    <>
      {/* Subtle backdrop overlay to dim and disable background */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-10 backdrop-blur-[1px]" />
      
      {/* Modal positioned at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3">
        <div className="relative bg-white rounded-t-lg shadow-2xl max-w-5xl mx-auto overflow-hidden border border-gray-300">
          {/* Header */}
          <div className="bg-indigo-600 text-white px-4 py-3">
            <div className="flex items-center space-x-2">
              <Cookie className="h-4 w-4" />
              <h2 className="text-base font-semibold">Cookie Consent</h2>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-3 space-y-3">
            <div className="space-y-2">
              <p className="text-gray-800 text-sm font-medium">
                We use cookies to enhance your experience on RateMyLandlords. These help us provide better services and analyze how our site is used.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                <div className="flex items-start space-x-2">
                  <Shield className="h-3 w-3 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-blue-900 font-medium text-xs">Privacy First</p>
                    <p className="text-blue-800 text-xs">
                      We respect your privacy and give you control over your data.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why am I seeing this section */}
              <div className="border-t pt-2">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <Info className="h-3 w-3" />
                  <span className="text-xs font-medium">Why am I seeing this?</span>
                </button>
                
                {showDetails && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-lg text-xs text-gray-800 space-y-1">
                    <p>
                      <strong>You're seeing this because:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 ml-1 text-xs">
                      <li>This is your first visit to our site and you haven't accepted cookies yet</li>
                      <li>Our privacy policy has been updated</li>
                      <li>Your previous consent has expired</li>
                    </ul>
                    <p className="mt-1 text-xs">
                      We're legally required to get your consent before using cookies that aren't essential for the site to function.
                    </p>
                  </div>
                )}
              </div>

              {/* Cookie types - compact version */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 text-sm">What cookies do we use?</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Essential</p>
                      <p className="text-gray-600">Required functionality</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Analytics</p>
                      <p className="text-gray-600">Usage insights</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Functional</p>
                      <p className="text-gray-600">Preferences</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Policy Link */}
              <div className="text-xs text-gray-700">
                <button 
                  onClick={() => setShowPrivacyModal(true)}
                  className="inline-flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 transition-colors underline"
                >
                  <Eye className="h-3 w-3" />
                  <span>Read our Privacy Policy</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 flex flex-col sm:flex-row gap-2">
            <button
              onClick={acceptCookies}
              className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium text-sm"
            >
              Accept All Cookies
            </button>
            <button
              onClick={declineCookies}
              className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium text-sm"
            >
              Decline Non-Essential
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)} 
      />
    </>
  )
}

// Privacy Policy Modal Component
interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <h2 className="text-base font-semibold">Privacy Policy</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(85vh-100px)] text-gray-900">
          <div className="space-y-4 text-sm">
            {/* Introduction */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Introduction</h3>
              <p className="text-gray-800 mb-3">
                At RateMyLandlords, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start">
                  <UserCheck className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                  <div>
                    <p className="text-blue-900 font-medium text-sm">Our Commitment:</p>
                    <p className="text-blue-800 mt-1 text-sm">
                      We respect your privacy and give you control over your personal information.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Information We Collect</h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">Account Information</h4>
                  <ul className="list-disc list-inside text-gray-800 space-y-0.5 ml-3 text-sm">
                    <li>Email address (required for account creation)</li>
                    <li>Display name or username</li>
                    <li>Authentication data through Stack Auth</li>
                    <li>Profile preferences and settings</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">Usage Information</h4>
                  <ul className="list-disc list-inside text-gray-800 space-y-0.5 ml-3 text-sm">
                    <li>Pages visited and time spent on our site</li>
                    <li>Search queries and filters used</li>
                    <li>Device information (browser type, operating system)</li>
                    <li>IP address and general location data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookies and Tracking</h3>
              <p className="text-gray-800 mb-3 text-sm">
                We use cookies and similar technologies to enhance your experience:
              </p>
              
              <div className="space-y-2">
                <div className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-medium text-green-900 text-sm">Essential Cookies (Always Active)</h4>
                  <p className="text-gray-800 text-xs mt-1">
                    Required for basic website functionality, user authentication, and security.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-medium text-blue-900 text-sm">Analytics Cookies (Optional)</h4>
                  <p className="text-gray-800 text-xs mt-1">
                    Help us understand how visitors use our site so we can improve the experience.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-3">
                  <h4 className="font-medium text-purple-900 text-sm">Functional Cookies (Optional)</h4>
                  <p className="text-gray-800 text-xs mt-1">
                    Remember your preferences and provide enhanced features.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Security</h3>
              <p className="text-gray-800 mb-3 text-sm">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 mr-2" />
                  <div>
                    <p className="text-yellow-900 font-medium text-sm">Important Note:</p>
                    <p className="text-yellow-800 mt-1 text-sm">
                      While we strive to protect your information, no method of transmission over the internet is 100% secure.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-800 mb-2 text-sm">
                If you have any questions about this Privacy Policy:
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-800 text-sm">
                  <strong>Email:</strong> privacy@ratemylandlords.com
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// Component to show cookie settings in footer or settings page
export function CookieSettings() {
  const { hasConsented, reopenModal } = useCookieConsent()
  
  return (
    <button
      onClick={reopenModal}
      className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
    >
      <Cookie className="h-4 w-4" />
      <span className="text-sm">Cookie Settings</span>
    </button>
  )
}
