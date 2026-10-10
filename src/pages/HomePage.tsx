import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  MapPin,
  Heart,
  Scale,
} from 'lucide-react';
import { fetchLandlords } from '../lib/api';
import { LandlordMap } from '../components/LandlordMap';
import type { Landlord } from '../lib/types';

export const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mapLandlords, setMapLandlords] = useState<Landlord[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLandlords()
      .then((data) => {
        setMapLandlords(data.slice(0, 12));
      })
      .catch(() => {
        // Ignore fallback
      });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/landlords?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/landlords');
    }
  };

  const handleQuickSearch = (city: string) => {
    navigate(`/landlords?city=${encodeURIComponent(city)}`);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1ebe0] text-[#c45b3f] text-xs font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#de8d48] animate-pulse" />
            Tenant-powered &amp; 100% Independent
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-semibold text-stone-900 leading-[1.05] tracking-tight">
            Know who you’re{' '}
            <span className="text-[#27695c] italic">renting from.</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
            Real experiences from verified and anonymous tenants. Check the
            landlord directory, explore ratings on OpenStreetMap, and read reviews
            before signing your next lease.
          </p>

          {/* Search Bar Form */}
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 p-1.5 bg-white border border-[#dedbd2] rounded-xl shadow-md max-w-lg focus-within:ring-2 focus-within:ring-[#27695c]/20 focus-within:border-[#27695c] transition-all"
          >
            <div className="pl-3 text-stone-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by landlord name, city, or state..."
              className="flex-1 px-2 py-2 text-sm text-stone-800 bg-transparent outline-none placeholder:text-stone-400"
              aria-label="Search landlords"
            />
            <button
              type="submit"
              className="bg-[#27695c] hover:bg-[#1f5449] text-white p-2.5 rounded-lg transition-colors flex items-center justify-center shrink-0"
              aria-label="Submit search"
            >
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 pt-1">
            <span className="font-semibold text-stone-700">Popular:</span>
            {['Austin', 'Denver', 'New York', 'Seattle', 'Chicago', 'San Francisco'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => handleQuickSearch(city)}
                className="px-2.5 py-1 rounded-md bg-stone-200/60 hover:bg-stone-200 text-stone-700 transition-colors"
              >
                {city}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500 pt-2">
            <ShieldCheck size={16} className="text-[#27695c]" />
            <span>Anonymous reviews • No landlord retaliation</span>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="lg:col-span-5 relative">
          <div className="bg-[#e3ece4] rounded-2xl p-6 border border-stone-200 relative overflow-hidden shadow-inner min-h-[380px] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#27695c] flex items-center gap-1.5">
                  <MapPin size={14} />
                  <span>OpenStreetMap Visualizer</span>
                </span>
                <span className="text-[11px] bg-white text-stone-600 px-2 py-0.5 rounded-full font-medium border border-stone-200">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-stone-600">
                Explore real landlord ratings across key rental corridors.
              </p>
            </div>

            {/* Embedded OpenStreetMap Preview */}
            <div className="my-2 rounded-xl overflow-hidden border border-stone-300 shadow-sm">
              {mapLandlords.length > 0 ? (
                <LandlordMap
                  landlords={mapLandlords}
                  height="220px"
                  zoom={4}
                  interactive={true}
                />
              ) : (
                <div className="h-[220px] bg-stone-100 flex items-center justify-center text-xs text-stone-400">
                  Loading map locations...
                </div>
              )}
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
              <div>
                <strong className="text-xs font-bold text-stone-800 block">
                  Find properties near you
                </strong>
                <span className="text-[11px] text-stone-500">
                  Click pins on the map to view scores.
                </span>
              </div>
              <Link
                to="/landlords"
                className="text-xs font-semibold text-[#27695c] hover:underline flex items-center gap-1"
              >
                <span>Full Map</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OpenStreetMap Location Illustration Section */}
      <section className="bg-white border-y border-[#dedbd2] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#c45b3f] flex items-center gap-1.5">
                <MapPin size={14} />
                <span>Geospatial Tenant Intelligence</span>
              </span>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mt-2">
                Illustrating locations with OpenStreetMap.
              </h2>
              <p className="text-sm text-stone-600 mt-2 max-w-xl">
                See where landlords operate and how they maintain properties across
                neighborhoods. No blind lease signings.
              </p>
            </div>

            <Link
              to="/landlords"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#202622] hover:bg-[#27695c] text-white text-xs font-semibold rounded-lg transition-colors self-start md:self-auto shadow-xs"
            >
              <span>Explore Interactive Map View</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#dedbd2] shadow-sm">
            <LandlordMap
              landlords={mapLandlords}
              height="450px"
              zoom={4}
              interactive={true}
            />
          </div>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#c45b3f]">
            Why Rate My Landlords
          </span>
          <h2 className="text-3xl font-serif font-bold text-stone-900 mt-2">
            Transparency shifts power back to renters.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#e5eee8] text-[#27695c] flex items-center justify-center">
              <Search size={20} />
            </div>
            <h3 className="font-semibold text-lg text-stone-900">
              Search Local Landlords
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Look up property managers, apartment complexes, or individual
              landlords in your city before signing any lease.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#e5eee8] text-[#27695c] flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-semibold text-lg text-stone-900">
              Review Safely &amp; Anonymously
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Submit honest feedback on responsiveness, maintenance, and
              security deposits without risking your tenant record.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#e5eee8] text-[#27695c] flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <h3 className="font-semibold text-lg text-stone-900">
              Score Breakdowns
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Inspect star distribution charts and key tags to see if a
              landlord delivers on repairs or hoards security deposits.
            </p>
          </div>
        </div>
      </section>

      {/* About Section on Homepage */}
      <section className="bg-white border-y border-[#dedbd2] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c45b3f] flex items-center gap-1.5">
                <Scale size={14} />
                <span>About Our Platform</span>
              </span>
              <h2 className="text-3xl font-serif font-bold text-stone-900">
                An open platform built with integrity.
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Rate My Landlords is an independent community project created by{' '}
                <strong>Marcus Clements</strong>, an aspiring developer at UW-La Crosse. We believe housing is a basic
                necessity that deserves full transparency.
              </p>
              <p className="text-sm text-stone-600 leading-relaxed">
                Unlike corporate review directories, property managers cannot pay
                us to hide bad ratings or manufacture false reviews. Every voice
                is verified and preserved anonymously.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#27695c] hover:underline"
                >
                  <span>Read more about our mission</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#f6f3ec] p-6 rounded-2xl border border-stone-200 space-y-4">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-sm">
                <Heart size={16} className="text-red-500 fill-current" />
                <span>Built by Marcus Clements</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                "As an aspiring developer at UW-La Crosse, I created this platform to give renters peace of mind before signing a lease. Renters deserve to know who holds their security deposit and whether repairs are handled with care."
              </p>
              <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#27695c]" />
                <span>Student-Led Project • UW-La Crosse • Tenant-First Transparency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-18">
        <div className="bg-[#202622] rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#de8d48]">
              Build The Community Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">
              Can’t find your landlord?
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              Add them to the directory in under 30 seconds. Help future renters
              make informed, confident decisions.
            </p>
          </div>
          <button
            onClick={() => navigate('/landlords/new')}
            className="px-6 py-3 bg-[#f6f3ec] hover:bg-white text-stone-900 font-semibold text-sm rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-xs"
          >
            <span>Add a Landlord</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
};
