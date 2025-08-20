import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { stackClientApp } from '@/lib/stack'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { CookieConsentProvider } from '@/components/CookieConsent'
import { ThemeProvider } from '@/components/ThemeProvider'
import "./globals.css";

export const metadata: Metadata = {
  title: "RateMyLandlords",
  description: "Rate and review landlords in your area",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="transition-colors duration-300">
      <body className="antialiased flex flex-col min-h-screen">
        <ThemeProvider>
          <StackProvider app={stackServerApp}>
            <StackTheme>
              <StackProvider app={stackClientApp}>
                <CookieConsentProvider>
                  <Navigation />
                  <main className="flex-grow">
                    {children}
                  </main>
                  <Footer />
                </CookieConsentProvider>
              </StackProvider>
            </StackTheme>
          </StackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
