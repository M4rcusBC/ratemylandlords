import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Search, MessageSquareHeart, CheckCircle2 } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-[#c45b3f]">
          Transparency In Housing
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 mt-2">
          Built for better rental decisions.
        </h1>
        <p className="text-base text-stone-600 mt-4 leading-relaxed">
          Rate My Landlords empowers renters with honest, crowd-sourced tenant
          experiences to level the playing field between landlords and tenants.
        </p>
      </div>

      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-[#dedbd2] shadow-xs space-y-3">
            <span className="text-2xl font-serif font-bold text-[#c45b3f]">
              01
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#e5eee8] text-[#27695c] flex items-center justify-center">
              <Search size={18} />
            </div>
            <h3 className="font-bold text-base text-stone-900">
              Search Before You Sign
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Find your prospective landlord, property manager, or apartment
              building by city or name. Check average ratings and review feeds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#dedbd2] shadow-xs space-y-3">
            <span className="text-2xl font-serif font-bold text-[#c45b3f]">
              02
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#e5eee8] text-[#27695c] flex items-center justify-center">
              <MessageSquareHeart size={18} />
            </div>
            <h3 className="font-bold text-base text-stone-900">
              Share Your Story
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Leave a 1 to 5 star rating, describe repair responsiveness and
              deposit handling, and apply helpful tags for future tenants.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#dedbd2] shadow-xs space-y-3">
            <span className="text-2xl font-serif font-bold text-[#c45b3f]">
              03
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#e5eee8] text-[#27695c] flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-bold text-base text-stone-900">
              100% Anonymous
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tenant privacy is fundamental. All reviews are posted anonymously
              so you can share your honest experience without fear of retaliation.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-[#dedbd2] shadow-xs space-y-4">
          <h2 className="text-xl font-serif font-bold text-stone-900">
            Community Guidelines for Reviews
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#27695c] shrink-0 mt-0.5" />
              <span>
                <strong>Be factual:</strong> Focus on objective experiences such
                as responsiveness to maintenance, communication, and deposit returns.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#27695c] shrink-0 mt-0.5" />
              <span>
                <strong>Protect privacy:</strong> Do not post private phone
                numbers, private residential apartment unit numbers, or financial details.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#27695c] shrink-0 mt-0.5" />
              <span>
                <strong>Reward good managers:</strong> Highlighting honest,
                responsive landlords is just as important as flagging bad ones.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#27695c] shrink-0 mt-0.5" />
              <span>
                <strong>Keep it constructive:</strong> Share specific advice that
                will help future tenants ask better questions during walkthroughs.
              </span>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            to="/landlords"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#202622] hover:bg-[#27695c] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
          >
            <span>Explore the Landlord Directory</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  );
};

