import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  Heart,
  Scale,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#c45b3f]">
          About Rate My Landlords
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Transparency in housing starts with real tenant voices.
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          Too often, renters sign 12-month leases with thousands of dollars on the
          line without knowing if their landlord fixes leaks, respects privacy,
          or returns security deposits fairly. We are here to change that.
        </p>
      </div>

      <div className="space-y-12">
        {/* Mission Statement */}
        <section className="bg-white rounded-2xl border border-[#dedbd2] p-8 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 text-[#27695c]">
            <Scale size={24} />
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Our Core Mission
            </h2>
          </div>
          <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
            <strong>Rate My Landlords</strong> was established to level the playing
            field between tenants and property managers. While landlords conduct
            extensive background and credit checks on prospective renters, tenants
            traditionally had zero verified insight into how a landlord operates
            once the lease is signed.
          </p>
          <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
            By crowd-sourcing authentic experiences, score distributions, and
            location-based mapping, we provide renters with the leverage and clarity
            they need to make confident, informed housing decisions.
          </p>
        </section>

        {/* Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#dedbd2] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#e5eee8] text-[#27695c] flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold text-base text-stone-900">
              100% Anonymous
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Reviews are completely anonymous by design. Tenants can speak
              truthfully about their rental experience without fear of lease
              retaliation or negative references.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#dedbd2] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#e5eee8] text-[#27695c] flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <h3 className="font-bold text-base text-stone-900">
              Zero Pay-to-Remove
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We are strictly independent. Landlords and management companies
              cannot pay to alter, suppress, or delete honest tenant reviews.
              Good managers earn high ratings; poor ones cannot buy them.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#dedbd2] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#e5eee8] text-[#27695c] flex items-center justify-center">
              <MapPin size={20} />
            </div>
            <h3 className="font-bold text-base text-stone-900">
              Geospatial Mapping
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Powered by OpenStreetMap, our interactive mapping feature visualizes
              landlord ratings across neighborhood clusters so you can explore your
              city visually.
            </p>
          </div>
        </section>

        {/* Project Independence Section */}
        <section className="bg-[#202622] text-white rounded-2xl p-8 sm:p-10 shadow-lg space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-[#de8d48] text-xs font-semibold uppercase tracking-wider">
            <Heart size={14} className="fill-current text-red-400" />
            <span>Independent Project</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold">
            Built by and for Renters
          </h2>

          <p className="text-stone-300 text-sm leading-relaxed max-w-2xl">
            Rate My Landlords is a completely independent community tool. The goal is simple: replace anxiety and opacity in renting with open,
            independent community data that benefits responsible renters and
            accountable property owners alike.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-stone-400">
            <div className="flex items-center gap-1.5 text-stone-300">
              <CheckCircle2 size={16} className="text-[#27695c]" />
              <span>Independent &amp; Non-Corporate</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-300">
              <CheckCircle2 size={16} className="text-[#27695c]" />
              <span>OpenStreetMap Integrated</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-300">
              <CheckCircle2 size={16} className="text-[#27695c]" />
              <span>Community-Driven &amp; Tenant-First</span>
            </div>
          </div>
        </section>

        {/* Action Callouts */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/landlords"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#202622] hover:bg-[#27695c] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
          >
            <Building2 size={16} />
            <span>Explore the Directory</span>
          </Link>
          <Link
            to="/landlords/new"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-semibold rounded-xl transition-colors shadow-xs"
          >
            <span>Add a Landlord</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  );
};

