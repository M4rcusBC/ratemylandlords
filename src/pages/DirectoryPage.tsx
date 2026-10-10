import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Plus,
  SlidersHorizontal,
  Building2,
  AlertCircle,
  LayoutGrid,
  Map as MapIcon,
} from 'lucide-react';
import { fetchLandlords } from '../lib/api';
import { LandlordCard } from '../components/LandlordCard';
import { LandlordMap } from '../components/LandlordMap';
import type { Landlord } from '../lib/types';

export const DirectoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [landlords, setLandlords] = useState<Landlord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedLandlordId, setSelectedLandlordId] = useState<string | null>(null);

  const search = searchParams.get('search') || '';
  const city = searchParams.get('city') || '';
  const [sortBy, setSortBy] = useState<'highest' | 'reviews' | 'newest'>('highest');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError('');

    fetchLandlords({ search, city })
      .then((data) => {
        if (isMounted) {
          setLandlords(data);
          if (data.length > 0 && !selectedLandlordId) {
            setSelectedLandlordId(data[0].id);
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load landlords');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [search, city]);

  const handleSearchChange = (val: string) => {
    const next = new URLSearchParams(searchParams);
    if (val) {
      next.set('search', val);
    } else {
      next.delete('search');
    }
    setSearchParams(next);
  };

  const handleCityChange = (val: string) => {
    const next = new URLSearchParams(searchParams);
    if (val) {
      next.set('city', val);
    } else {
      next.delete('city');
    }
    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  // Sort landlords
  const sortedLandlords = useMemo(() => {
    const copy = [...landlords];
    if (sortBy === 'highest') {
      return copy.sort((a, b) => b.avgRating - a.avgRating || b.reviewCount - a.reviewCount);
    }
    if (sortBy === 'reviews') {
      return copy.sort((a, b) => b.reviewCount - a.reviewCount || b.avgRating - a.avgRating);
    }
    if (sortBy === 'newest') {
      return copy.sort((a, b) => b.createdAt - a.createdAt);
    }
    return copy;
  }, [landlords, sortBy]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Directory Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#c45b3f]">
            The Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
            Landlords, rated by tenants.
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Browse aggregated ratings, verified comments, and interactive map locations.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* List vs Map Toggle */}
          <div className="inline-flex p-1 bg-stone-200/70 rounded-lg text-xs font-semibold text-stone-700">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <LayoutGrid size={14} />
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'map'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MapIcon size={14} />
              <span>Map</span>
            </button>
          </div>

          <Link
            to="/landlords/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#202622] hover:bg-[#27695c] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            <Plus size={16} />
            <span>Add Landlord</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#dedbd2] shadow-xs mb-8 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Main search */}
          <div className="sm:col-span-6 relative">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name, state, or keywords..."
              className="w-full pl-10 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27695c]/20 focus:border-[#27695c]"
            />
          </div>

          {/* City filter */}
          <div className="sm:col-span-3 relative">
            <MapPin
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              placeholder="Filter by city..."
              className="w-full pl-10 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27695c]/20 focus:border-[#27695c]"
            />
          </div>

          {/* Sort selector */}
          <div className="sm:col-span-3 flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-stone-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'highest' | 'reviews' | 'newest')
              }
              className="w-full py-2 px-3 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27695c]/20 focus:border-[#27695c]"
            >
              <option value="highest">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="newest">Recently Added</option>
            </select>
          </div>
        </div>

        {/* Active Filter Tags */}
        {(search || city) && (
          <div className="flex items-center gap-2 pt-2 border-t border-stone-100 text-xs">
            <span className="text-stone-500">Filtered by:</span>
            {search && (
              <span className="inline-flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                "{search}"
              </span>
            )}
            {city && (
              <span className="inline-flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                City: {city}
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-[#27695c] font-semibold hover:underline ml-auto"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Error alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-r-md flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Content State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-[#dedbd2] rounded-lg p-5 animate-pulse space-y-4"
            >
              <div className="w-10 h-10 bg-stone-200 rounded-lg" />
              <div className="h-5 bg-stone-200 rounded w-3/4" />
              <div className="h-3 bg-stone-200 rounded w-1/2" />
              <div className="h-4 bg-stone-200 rounded w-2/3 pt-4" />
            </div>
          ))}
        </div>
      ) : sortedLandlords.length === 0 ? (
        <div className="bg-white border border-dashed border-stone-300 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 bg-[#e5eee8] text-[#27695c] rounded-full flex items-center justify-center mx-auto">
            <Building2 size={26} />
          </div>
          <h2 className="text-xl font-bold text-stone-900">No landlords found</h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            {search || city
              ? 'No matching landlords were found for your search criteria. Try modifying your filter or add a new landlord.'
              : 'The directory is currently empty. Be the first to add a landlord!'}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            {(search || city) && (
              <button
                onClick={clearFilters}
                className="px-3.5 py-2 border border-stone-300 text-xs font-semibold rounded-lg text-stone-700 hover:bg-stone-50"
              >
                Clear Filters
              </button>
            )}
            <Link
              to="/landlords/new"
              className="px-4 py-2 bg-[#27695c] hover:bg-[#1f5449] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Add This Landlord
            </Link>
          </div>
        </div>
      ) : viewMode === 'map' ? (
        /* Map View Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Map canvas */}
          <div className="lg:col-span-7 xl:col-span-8 lg:sticky lg:top-24">
            <LandlordMap
              landlords={sortedLandlords}
              selectedLandlordId={selectedLandlordId}
              onSelectLandlord={(l) => setSelectedLandlordId(l.id)}
              height="600px"
            />
          </div>

          {/* Landlord list sidebar */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
            <div className="text-xs text-stone-500 pb-1 font-semibold">
              {sortedLandlords.length} {sortedLandlords.length === 1 ? 'Location' : 'Locations'} on Map
            </div>
            {sortedLandlords.map((landlord) => {
              const isSelected = selectedLandlordId === landlord.id;
              return (
                <div
                  key={landlord.id}
                  onClick={() => setSelectedLandlordId(landlord.id)}
                  className={`cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-[#27695c] rounded-lg' : ''
                  }`}
                >
                  <LandlordCard landlord={landlord} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List View Layout */
        <>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-4 px-1">
            <span>
              Showing <strong>{sortedLandlords.length}</strong>{' '}
              {sortedLandlords.length === 1 ? 'landlord' : 'landlords'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedLandlords.map((landlord) => (
              <LandlordCard key={landlord.id} landlord={landlord} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};
