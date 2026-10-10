import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Plus, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#f6f3ec]/90 backdrop-blur-md border-b border-[#dedbd2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2.5 font-bold text-base text-[#202622] group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#27695c] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Building2 size={18} />
            </div>
            <span>
              Rate My <em className="not-italic text-[#c45b3f]">Landlords</em><span className="text-[#27695c] text-xs font-semibold ml-0.5">.app</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#68716b]">
            <Link
              to="/landlords"
              className={`transition-colors hover:text-[#202622] ${
                isActive('/landlords') ? 'text-[#202622] font-bold' : ''
              }`}
            >
              Directory
            </Link>
            <Link
              to="/how-it-works"
              className={`transition-colors hover:text-[#202622] ${
                isActive('/how-it-works') ? 'text-[#202622] font-bold' : ''
              }`}
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className={`transition-colors hover:text-[#202622] ${
                isActive('/about') ? 'text-[#202622] font-bold' : ''
              }`}
            >
              About
            </Link>
            <Link
              to="/landlords/new"
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#c9c5ba] rounded-md text-[#202622] hover:bg-stone-100 hover:border-stone-400 transition-colors text-xs font-semibold"
            >
              <Plus size={15} />
              <span>Add Landlord</span>
            </Link>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 rounded-md hover:bg-stone-200/60"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#dedbd2] bg-[#f6f3ec] px-4 py-5 space-y-4 animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-3 font-semibold text-sm text-[#68716b]">
              <Link
                to="/landlords"
                onClick={closeMobileMenu}
                className="py-1 hover:text-[#202622]"
              >
                Directory
              </Link>
              <Link
                to="/how-it-works"
                onClick={closeMobileMenu}
                className="py-1 hover:text-[#202622]"
              >
                How It Works
              </Link>
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="py-1 hover:text-[#202622]"
              >
                About
              </Link>
              <Link
                to="/privacy"
                onClick={closeMobileMenu}
                className="py-1 hover:text-[#202622]"
              >
                Privacy Notice
              </Link>
              <Link
                to="/landlords/new"
                onClick={closeMobileMenu}
                className="inline-flex items-center gap-2 py-2 text-[#202622]"
              >
                <Plus size={16} />
                <span>Add Landlord</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
