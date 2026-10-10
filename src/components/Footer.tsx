import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Github, Cookie } from 'lucide-react';
import { openCookieSettings } from './CookieConsent';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#dedbd2] bg-[#f6f3ec] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-200">
          <div>
            <span className="font-bold text-base text-[#202622]">
              Rate My <em className="not-italic text-[#c45b3f]">Landlords</em><span className="text-[#27695c] text-xs font-semibold ml-0.5">.app</span>
            </span>
            <p className="text-xs text-stone-500 mt-1 max-w-sm">
              An independent, tenant-driven platform built to bring transparency
              and accountability to rental housing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-stone-600">
            <Link to="/landlords" className="hover:text-stone-900 transition-colors">
              Browse Directory
            </Link>
            <Link to="/how-it-works" className="hover:text-stone-900 transition-colors">
              How It Works
            </Link>
            <Link to="/about" className="hover:text-stone-900 transition-colors">
              About
            </Link>
            <Link to="/privacy" className="hover:text-stone-900 transition-colors">
              Privacy Notice
            </Link>
            <button
              onClick={openCookieSettings}
              className="hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Cookie size={13} className="text-[#27695c]" />
              <span>Cookie Settings</span>
            </button>
            <a
              href="https://buymeacoffee.com/marcusbc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 transition-colors flex items-center gap-1 text-orange-600 bg-orange-100/50 px-2 py-1 rounded-md"
            >
              <Heart size={13} className="fill-orange-600" />
              <span>Support the Project</span>
            </a>
            <a
              href="https://github.com/M4rcusBC/ratemylandlords"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 transition-colors flex items-center gap-1"
            >
              <Github size={13} />
              <span>View Source</span>
            </a>
            <Link to="/landlords/new" className="hover:text-stone-900 transition-colors">
              Add a Landlord
            </Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2 text-[11px] text-stone-400">
            <ShieldCheck size={14} className="text-[#27695c]" />
            <span>Tenant reviews are 100% anonymous.</span>
          </div>

          <div className="flex items-center text-xs text-stone-600 font-medium">
            <span>Built with</span>
            <Heart size={14} className="text-red-500 fill-current mx-1.5 animate-pulse" />
            <span>by independent tenants. &copy; 2026.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
