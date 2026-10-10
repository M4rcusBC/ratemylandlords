import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Cookie,
  MapPin,
  ExternalLink,
  Code2,
  FileText,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { openCookieSettings } from '../components/CookieConsent';

export const PrivacyPage: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#c45b3f]">
          Legal &amp; Data Transparency
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Privacy Notice &amp; Policies
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          At <strong>Rate My Landlords.info</strong>, we believe housing transparency
          requires uncompromising privacy protections for tenants.
        </p>
        <p className="text-xs text-stone-400 font-medium">
          Effective Date: September 2026 &bull; Maintained by Marcus Clements
        </p>
      </div>

      <div className="space-y-10">
        {/* Core Guarantee Card */}
        <div className="bg-[#202622] text-white rounded-2xl p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-[#27695c]">
            <div className="w-10 h-10 rounded-lg bg-stone-800 text-[#27695c] flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              The 100% Anonymous Review Guarantee
            </h2>
          </div>
          <p className="text-stone-300 text-sm leading-relaxed">
            Tenant vulnerability to retaliatory landlords or unfair lease terminations
            is real. For this reason:
          </p>
          <ul className="space-y-2 text-sm text-stone-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#27695c] shrink-0 mt-0.5" />
              <span>
                <strong>Your reviews are published anonymously:</strong> We never display
                your name, email address, or identity on public reviews.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#27695c] shrink-0 mt-0.5" />
              <span>
                <strong>Zero selling of user data:</strong> We do not sell, rent, or monetize
                renter data to property management companies, data brokers, or advertisers.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#27695c] shrink-0 mt-0.5" />
              <span>
                <strong>No pay-to-remove:</strong> Landlords cannot pay to unmask, alter,
                or delete genuine tenant reviews.
              </span>
            </li>
          </ul>
        </div>

        {/* User Authentication Notice */}
        <section className="bg-white rounded-2xl border border-[#dedbd2] p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-[#27695c]">
            <Lock size={22} />
            <h2 className="text-xl font-serif font-bold text-stone-900">
              User Authentication &amp; Account Notice
            </h2>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            Rate My Landlords uses Hexclave authentication for secure accounts,
            allowing renters to manage their review history and saved landlords.
          </p>
          <div className="space-y-3 text-sm text-stone-600">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <h3 className="font-semibold text-stone-900 text-xs uppercase tracking-wider">
                What information is processed:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-stone-700">
                <li>
                  <strong>Email Address:</strong> Required to verify account ownership and
                  prevent automated review spam.
                </li>
                <li>
                  <strong>Display Name:</strong> A chosen pseudonym or first name for your
                  profile.
                </li>
                <li>
                  <strong>Cryptographic Session Tokens:</strong> Secure session tokens issued
                  to maintain your signed-in state without storing plain-text passwords.
                </li>
              </ul>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              <strong>Tenant Protection:</strong> Authentication ensures platform integrity
              while guaranteeing that public reviews remain strictly anonymous.
            </p>
          </div>
        </section>

        {/* Cookies & Storage */}
        <section className="bg-white rounded-2xl border border-[#dedbd2] p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-[#27695c]">
            <Cookie size={22} />
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Cookie &amp; Local Storage Policy
            </h2>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            We prioritize lightweight, privacy-respecting client storage. Here is exactly
            what is saved in your browser:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">
                  user_session
                </span>
                <span className="text-[10px] bg-stone-200 px-2 py-0.5 rounded font-bold text-stone-600">
                  Strictly Necessary
                </span>
              </div>
              <p className="text-xs text-stone-600">
                Stores your client session profile and token if you choose to sign in.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">
                  ratemylandlords_cookie_consent
                </span>
                <span className="text-[10px] bg-stone-200 px-2 py-0.5 rounded font-bold text-stone-600">
                  Strictly Necessary
                </span>
              </div>
              <p className="text-xs text-stone-600">
                Remembers your cookie banner consent decision so you are not prompted on
                every page reload.
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-stone-500">
              You can adjust or revoke your cookie choices at any time:
            </p>
            <button
              onClick={openCookieSettings}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors border border-stone-200"
            >
              <Cookie size={14} className="text-[#27695c]" />
              <span>Open Cookie Preferences</span>
            </button>
          </div>
        </section>

        {/* OpenStreetMap Notice */}
        <section className="bg-white rounded-2xl border border-[#dedbd2] p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-[#27695c]">
            <MapPin size={22} />
            <h2 className="text-xl font-serif font-bold text-stone-900">
              OpenStreetMap Geospatial Notice
            </h2>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            Our interactive map uses client-side{' '}
            <a
              href="https://leafletjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#27695c] underline font-semibold"
            >
              Leaflet
            </a>{' '}
            and free tile data provided by{' '}
            <a
              href="https://www.openstreetmap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#27695c] underline font-semibold"
            >
              OpenStreetMap
            </a>{' '}
            (<a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#27695c] underline"
            >
              &copy; OpenStreetMap contributors
            </a>).
          </p>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            When you view map pins, your browser fetches map image tiles directly from
            OpenStreetMap foundation servers (`tile.openstreetmap.org`). We do not track,
            store, or transmit your device’s GPS location without your active and
            explicit permission.
          </p>
        </section>

        {/* Source Code Transparency */}
        <section className="bg-white rounded-2xl border border-[#dedbd2] p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-[#202622]">
            <Code2 size={22} className="text-[#27695c]" />
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Open Source Transparency
            </h2>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            Because privacy claims are strongest when they can be verified, Rate My
            Landlords is completely open source. You are welcome to audit our client and
            server code directly on GitHub:
          </p>
          <div>
            <a
              href="https://github.com/M4rcusBC/ratemylandlords"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
            >
              <span>View Source on GitHub</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </section>

        {/* Contact & Data Rights */}
        <section className="bg-stone-100 rounded-2xl p-8 border border-stone-200 space-y-4">
          <div className="flex items-center gap-3 text-stone-900">
            <Mail size={22} className="text-[#27695c]" />
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Your Rights &amp; Contact
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Under GDPR, CCPA, and standard privacy principles, you have the right to request
            access to, modification of, or complete deletion of your account and any reviews
            you have submitted.
          </p>
          <div className="text-xs text-stone-600">
            <p>
              To request data removal or report a privacy concern, open an issue on our{' '}
              <a
                href="https://github.com/M4rcusBC/ratemylandlords/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#27695c] font-semibold underline"
              >
                GitHub Issue Tracker
              </a>{' '}
              or email the project administrator.
            </p>
          </div>
        </section>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#27695c] hover:underline"
          >
            <FileText size={14} />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

