// Utility functions for managing cookies and analytics based on consent

export interface CookieConsentData {
  hasConsented: boolean
  consentDate: string
  privacyPolicyVersion: string
  preferences: {
    essential: boolean
    analytics: boolean
    functional: boolean
  }
}

export const COOKIE_NAMES = {
  CONSENT: 'cookie-consent',
  CONSENT_VERSION: 'cookie-consent-version',
  CONSENT_DATA: 'cookie-consent-data'
} as const

export function getCookieConsentData(): CookieConsentData | null {
  if (typeof window === 'undefined') return null
  
  try {
    const data = localStorage.getItem(COOKIE_NAMES.CONSENT_DATA)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export function setCookieConsentData(data: CookieConsentData): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem(COOKIE_NAMES.CONSENT_DATA, JSON.stringify(data))
}

export function hasAnalyticsConsent(): boolean {
  const data = getCookieConsentData()
  return Boolean(data?.hasConsented && data?.preferences?.analytics === true)
}

export function hasFunctionalConsent(): boolean {
  const data = getCookieConsentData()
  return Boolean(data?.hasConsented && data?.preferences?.functional === true)
}

// Initialize analytics only if user has consented
export function initializeAnalytics(): void {
  if (!hasAnalyticsConsent()) return
  
  // Initialize your analytics here (Google Analytics, etc.)
  // Example:
  // gtag('config', 'GA_MEASUREMENT_ID');
  console.log('Analytics initialized with user consent')
}

// Set functional cookies only if user has consented
export function setFunctionalCookie(name: string, value: string, days: number = 30): void {
  if (!hasFunctionalConsent()) return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

// Clear all non-essential cookies
export function clearNonEssentialCookies(): void {
  if (typeof document === 'undefined') return
  
  // List of non-essential cookie names to clear
  const nonEssentialCookies = [
    '_ga',
    '_gid',
    '_gat',
    'fbp',
    '_fbp',
    // Add other tracking cookies as needed
  ]
  
  nonEssentialCookies.forEach(cookieName => {
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`
  })
}
