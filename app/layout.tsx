import type { Metadata } from "next";
import { StackProvider } from '@stackframe/stack'
import { stackClientApp } from '@/lib/stack'
import Navigation from '@/components/Navigation'
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
    <html lang="en">
      <body className="antialiased">
        <StackProvider app={stackClientApp}>
          <Navigation />
          {children}
        </StackProvider>
      </body>
    </html>
  );
}
