import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Check,
  Plus,
  ShieldCheck,
  AlertCircle,
  Building2,
} from 'lucide-react';
import { z } from 'zod';
import { fetchLandlordProfile, submitReview } from '../lib/api';
import { PRESET_REVIEW_TAGS } from '../lib/types';
import type { LandlordProfile } from '../lib/types';

const reviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, 'Please select a star rating between 1 and 5')
    .max(5),
  comment: z
    .string()
    .trim()
    .min(10, 'Please write at least 10 characters so your review is helpful')
    .max(2000, 'Review cannot exceed 2000 characters'),
  tags: z.array(z.string().trim().max(40)).max(10),
});

export const AddReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [landlord, setLandlord] = useState<LandlordProfile | null>(null);
  const [loadingLandlord, setLoadingLandlord] = useState(true);

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchLandlordProfile(id)
      .then((data) => setLandlord(data))
      .catch(() => setLandlord(null))
      .finally(() => setLoadingLandlord(false));
  }, [id]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customTagInput.trim();
    if (clean && !selectedTags.includes(clean) && selectedTags.length < 10) {
      setSelectedTags((prev) => [...prev, clean]);
      setCustomTagInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!id) return;

    const validation = reviewSchema.safeParse({
      rating,
      comment,
      tags: selectedTags,
    });

    if (!validation.success) {
      setError(validation.error.issues[0]?.message || 'Invalid review data');
      return;
    }

    setSubmitting(true);
    try {
      await submitReview({
        landlordId: id,
        rating: validation.data.rating,
        comment: validation.data.comment,
        tags: validation.data.tags,
      });
      navigate(`/landlords/${id}`);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Failed to publish review.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const ratingDescriptions: Record<number, string> = {
    1: '1 - Poor (Unresponsive, persistent issues)',
    2: '2 - Fair (Below average experience)',
    3: '3 - Average (Met standard expectations)',
    4: '4 - Good (Prompt and respectful)',
    5: '5 - Excellent (Outstanding landlord)',
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        to={id ? `/landlords/${id}` : '/landlords'}
        className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 mb-6 font-medium transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back to {landlord ? landlord.name : 'profile'}</span>
      </Link>

      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#c45b3f]">
          Tenant Feedback
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
          Write a Review
        </h1>
        {loadingLandlord ? (
          <div className="h-4 bg-stone-200 rounded w-48 mt-2 animate-pulse" />
        ) : landlord ? (
          <p className="text-sm text-stone-600 mt-2 flex items-center gap-1.5">
            <Building2 size={16} className="text-[#27695c]" />
            <span>
              Reviewing <strong>{landlord.name}</strong> ({landlord.city},{' '}
              {landlord.state})
            </span>
          </p>
        ) : null}
      </div>

      <div className="bg-white border border-[#dedbd2] rounded-2xl p-6 sm:p-8 shadow-xs">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-r-md flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Overall Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="p-1 text-[#d5843d] hover:scale-110 transition-transform focus:outline-none"
                  aria-label={`${value} stars`}
                >
                  <Star
                    size={28}
                    fill={value <= rating ? '#d5843d' : 'transparent'}
                    stroke={value <= rating ? '#d5843d' : '#c9c5ba'}
                  />
                </button>
              ))}
            </div>
            {rating > 0 ? (
              <p className="text-xs font-medium text-[#27695c]">
                {ratingDescriptions[rating]}
              </p>
            ) : (
              <p className="text-[11px] text-stone-400">Click to select 1 to 5 stars.</p>
            )}
          </div>

          {/* Comment text review */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="comment"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700"
              >
                Written Review <span className="text-red-500">*</span>
              </label>
              <span
                className={`text-[11px] ${
                  comment.length > 2000
                    ? 'text-red-600 font-bold'
                    : 'text-stone-400'
                }`}
              >
                {comment.length} / 2,000
              </span>
            </div>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What was communication like? How were repairs handled? Did they return your security deposit fairly? Be honest, factual, and respectful."
              rows={6}
              className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27695c]/20 focus:border-[#27695c]"
              required
            />
            <p className="text-[11px] text-stone-400">
              Minimum 10 characters. Avoid including personally identifiable information
              such as phone numbers or private addresses.
            </p>
          </div>

          {/* Tags selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              What stood out? (Optional tags)
            </label>
            <p className="text-[11px] text-stone-500 mb-2">
              Select tags that describe your experience:
            </p>
            <div className="flex flex-wrap gap-2">
              {PRESET_REVIEW_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border transition-all ${
                      isSelected
                        ? 'bg-[#27695c] text-white border-[#27695c] shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {isSelected && <Check size={12} />}
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom tag addition */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                placeholder="Add another tag..."
                maxLength={30}
                className="px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#27695c]"
              />
              <button
                type="button"
                onClick={handleAddCustomTag}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-semibold rounded-lg transition-colors"
              >
                <Plus size={13} />
                <span>Add Tag</span>
              </button>
            </div>
          </div>

          {/* Anonymity note & submit */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              <ShieldCheck size={16} className="text-[#27695c] shrink-0" />
              <span>Reviews are 100% anonymous to prevent retaliation.</span>
            </div>

            <button
              type="submit"
              disabled={submitting || rating === 0 || comment.trim().length < 10}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#202622] hover:bg-[#27695c] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs disabled:opacity-50"
            >
              <span>{submitting ? 'Publishing Review...' : 'Publish Anonymous Review'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

