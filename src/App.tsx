import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HexclaveProvider, HexclaveTheme } from '@hexclave/react';
import { hexclaveClientApp } from './hexclave/client';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { DirectoryPage } from './pages/DirectoryPage';
import { LandlordProfilePage } from './pages/LandlordProfilePage';
import { AddLandlordPage } from './pages/AddLandlordPage';
import { AddReviewPage } from './pages/AddReviewPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { CookieConsent } from './components/CookieConsent';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f6f3ec]">Loading...</div>}>
      <HexclaveProvider app={hexclaveClientApp}>
        <HexclaveTheme>
          <div className="min-h-screen flex flex-col bg-[#f6f3ec] text-[#202622] font-sans antialiased selection:bg-[#27695c]/20">
            <ScrollToTop />
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/landlords" element={<DirectoryPage />} />
                <Route path="/landlords/new" element={<AddLandlordPage />} />
                <Route path="/landlords/:id" element={<LandlordProfilePage />} />
                <Route path="/landlords/:id/review" element={<AddReviewPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </div>
            <Footer />
            <CookieConsent />
          </div>
        </HexclaveTheme>
      </HexclaveProvider>
    </Suspense>
  );
}

