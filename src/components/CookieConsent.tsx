import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck, X, Check } from 'lucide-react';

const STORAGE_KEY = 'ratemylandlords_cookie_consent';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  timestamp: number;
}

export const openCookieSettings = () => {
  window.dispatchEvent(new CustomEvent('open-cookie-consent'));
};

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Show after a brief delay for smooth appearance
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is disabled
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setVisible(true);
      setDetailsOpen(true);
    };

    window.addEventListener('open-cookie-consent', handleOpen);
    return () => window.removeEventListener('open-cookie-consent', handleOpen);
  }, []);

  const saveConsent = (preferences: CookiePreferences) => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      if (existing && existing !== JSON.stringify(preferences)) {
        window.location.reload();
      } else if (!existing) {
        // If it's the first time setting it, we should also reload so hexclave respects the new setting if it was initialized differently.
        window.location.reload();
      }
    } catch (e) {
      console.warn('Could not save cookie preferences', e);
    }
    setVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      timestamp: Date.now(),
    });
  };

  const handleEssentialOnly = () => {
    saveConsent({
      essential: true,
      analytics: false,
      timestamp: Date.now(),
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      essential: true,
      analytics: analyticsAllowed,
      timestamp: Date.now(),
    });
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and Privacy Preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      <div className="bg-white rounded-2xl border border-[#dedbd2] shadow-2xl p-5 sm:p-6 text-stone-900 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 text-[#27695c]">
            <div className="w-8 h-8 rounded-lg bg-[#e5eee8] flex items-center justify-center">
              <Cookie size={18} />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-stone-900">
              Cookie &amp; Privacy Notice
            </h3>
          </div>
          <button
            onClick={handleEssentialOnly}
            className="text-stone-400 hover:text-stone-600 p-1 rounded-md transition-colors"
            aria-label="Dismiss cookie notice"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body Text */}
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          We use strictly necessary cookies and local storage to keep your session
          secure, preserve your preferences, and maintain sign-in state. Your tenant
          reviews are always <strong>100% anonymous</strong>.
        </p>

        {/* Expandable Preferences */}
        {detailsOpen && (
          <div className="space-y-3 pt-3 border-t border-stone-100 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200">
              <div className="space-y-0.5">
                <span className="font-bold text-stone-800 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#27695c]" />
                  Essential &amp; Sign-In (Always Active)
                </span>
                <p className="text-[11px] text-stone-500">
                  Required for core functionality, account security, and session management.
                </p>
              </div>
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider bg-stone-200 px-2 py-0.5 rounded">
                Required
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200">
              <div className="space-y-0.5">
                <span className="font-bold text-stone-800">
                  Anonymous Performance
                </span>
                <p className="text-[11px] text-stone-500">
                  Helps us improve search speed and OpenStreetMap tile caching.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#27695c]"></div>
              </label>
            </div>
          </div>
        )}

        {/* Links & Information */}
        <div className="text-[11px] text-stone-500 flex items-center justify-between">
          <Link
            to="/privacy"
            onClick={() => setVisible(false)}
            className="underline hover:text-stone-900 transition-colors"
          >
            Read Full Privacy Notice
          </Link>

          <button
            type="button"
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="text-[#27695c] font-semibold hover:underline"
          >
            {detailsOpen ? 'Hide Options' : 'Customize Preferences'}
          </button>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {detailsOpen ? (
            <>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="col-span-1 py-2 px-3 bg-[#202622] hover:bg-[#27695c] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Check size={14} />
                <span>Save Choice</span>
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="col-span-1 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors border border-stone-200"
              >
                Accept All
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors border border-stone-200 text-center"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="py-2 px-3 bg-[#202622] hover:bg-[#27695c] text-white text-xs font-semibold rounded-lg transition-colors text-center shadow-xs"
              >
                Accept All
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

