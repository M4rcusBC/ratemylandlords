import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Plus,
  ArrowLeft,
  Calendar,
  Tag,
  Star,
  MessageSquare,
} from 'lucide-react';
import { fetchLandlordProfile } from '../lib/api';
import { StarRating } from '../components/StarRating';
import { ScoreBreakdown } from '../components/ScoreBreakdown';
import { ReviewCard } from '../components/ReviewCard';
import { LandlordMap } from '../components/LandlordMap';
import type { LandlordProfile } from '../lib/types';

export const LandlordProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<LandlordProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [starFilter, setStarFilter] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    setLoading(true);

    fetchLandlordProfile(id)
      .then((data) => {
        if (isMounted) setProfile(data);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Landlord not found');
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 animate-pulse space-y-6">
        <div className="h-4 bg-stone-200 rounded w-24" />
        <div className="h-28 bg-stone-200 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 bg-stone-200 rounded-xl" />
          <div className="md:col-span-2 h-64 bg-stone-200 rounded-xl" />
        </div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <Building2 size={24} />
        </div>
        <h1 className="text-2xl font-bold text-stone-900">Landlord Not Found</h1>
        <p className="text-xs text-stone-500">
          The requested landlord could not be found or has been removed.
        </p>
        <Link
          to="/landlords"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#202622] text-white text-xs font-semibold rounded-lg hover:bg-[#27695c] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Directory</span>
        </Link>
      </main>
    );
  }

  const filteredReviews = starFilter
    ? profile.reviews.filter((r) => r.rating === starFilter)
    : profile.reviews;

  const formattedCreatedDate = new Date(profile.createdAt).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      year: 'numeric',
    }
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Back Link */}
      <button
        onClick={() => navigate('/landlords')}
        className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 mb-6 font-medium transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back to directory</span>
      </button>

      {/* Header Profile Section */}
      <div className="bg-white rounded-2xl border border-[#dedbd2] p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-[#e5eee8] text-[#27695c] flex items-center justify-center shrink-0 shadow-xs">
              <Building2 size={32} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#c45b3f]">
                Landlord Profile
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-0.5">
                {profile.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-[#27695c]" />
                  {profile.city}, {profile.state}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} className="text-stone-400" />
                  Listed {formattedCreatedDate}
                </span>
              </div>
            </div>
          </div>

          <Link
            to={`/landlords/${profile.id}/review`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#27695c] hover:bg-[#1f5449] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs shrink-0 self-start md:self-center"
          >
            <Plus size={16} />
            <span>Write a Review</span>
          </Link>
        </div>
      </div>

      {/* Overview and Score Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Left Column: Overall score & Score Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main rating summary box */}
          <div className="bg-white p-6 rounded-xl border border-[#dedbd2] shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Overall Score
            </h2>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-serif font-bold text-stone-900">
                {profile.reviewCount > 0 ? profile.avgRating.toFixed(1) : '—'}
              </span>
              <div className="space-y-0.5">
                <StarRating rating={profile.avgRating} size="md" />
                <p className="text-xs text-stone-500">
                  Based on {profile.reviewCount}{' '}
                  {profile.reviewCount === 1 ? 'tenant review' : 'tenant reviews'}
                </p>
              </div>
            </div>
          </div>

          {/* Core Feature: Score Breakdown Distribution */}
          <ScoreBreakdown
            breakdown={profile.scoreBreakdown}
            totalReviews={profile.reviewCount}
          />

          {/* Frequent Tags Widget */}
          {profile.tagCounts && Object.keys(profile.tagCounts).length > 0 && (
            <div className="bg-white p-5 rounded-xl border border-[#dedbd2] shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                Key Tenant Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(profile.tagCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([tag, count]) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-xs bg-[#edf4ee] text-[#27695c] px-3 py-1 rounded-full border border-[#c9d8cc]"
                    >
                      <Tag size={12} />
                      <span className="font-medium">{tag}</span>
                      <span className="text-[10px] bg-white text-[#27695c] px-1.5 py-0.2 rounded-full font-bold">
                        {count}
                      </span>
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Location Map Widget */}
          <div className="bg-white p-5 rounded-xl border border-[#dedbd2] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Location Map
              </h3>
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <MapPin size={12} className="text-[#27695c]" />
                {profile.city}, {profile.state}
              </span>
            </div>
            {profile.address && (
              <p className="text-xs text-stone-600 font-medium">
                {profile.address}
              </p>
            )}
            <LandlordMap
              landlords={[profile]}
              height="220px"
              zoom={13}
            />
          </div>
        </div>

        {/* Right Column: Reviews Feed */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl border border-[#dedbd2] p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-[#27695c]" />
                <h2 className="font-serif font-bold text-xl text-stone-900">
                  Tenant Feedback
                </h2>
                <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-semibold">
                  {profile.reviewCount}
                </span>
              </div>

              {/* Quick star filter */}
              {profile.reviewCount > 0 && (
                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setStarFilter(null)}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      starFilter === null
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'text-stone-500 hover:bg-stone-100'
                    }`}
                  >
                    All
                  </button>
                  {[5, 4, 3, 2, 1].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStarFilter(s === starFilter ? null : s)}
                      className={`px-2 py-1 rounded-md transition-colors flex items-center gap-0.5 ${
                        starFilter === s
                          ? 'bg-[#27695c] text-white font-semibold'
                          : 'text-stone-500 hover:bg-stone-100'
                      }`}
                    >
                      <span>{s}</span>
                      <Star size={10} className="fill-current" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews List */}
            {profile.reviews.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-amber-50 text-[#d5843d] rounded-full flex items-center justify-center mx-auto">
                  <Star size={24} />
                </div>
                <h3 className="font-bold text-stone-800">No reviews yet</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Have you rented from {profile.name}? Share your experience to
                  help others make informed choices.
                </p>
                <Link
                  to={`/landlords/${profile.id}/review`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#27695c] hover:bg-[#1f5449] text-white text-xs font-semibold rounded-lg transition-colors mt-2"
                >
                  <Plus size={15} />
                  <span>Write the First Review</span>
                </Link>
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="py-8 text-center text-xs text-stone-500">
                No reviews found for {starFilter} star{starFilter && starFilter > 1 ? 's' : ''}.{' '}
                <button
                  onClick={() => setStarFilter(null)}
                  className="text-[#27695c] font-semibold underline"
                >
                  View all reviews
                </button>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {filteredReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

