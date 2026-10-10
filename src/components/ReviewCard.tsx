import React from 'react';
import { StarRating } from './StarRating';
import { ShieldCheck, Tag } from 'lucide-react';
import type { Review } from '../lib/types';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      year: 'numeric',
    }
  );

  return (
    <article className="py-5 border-b border-[#dedbd2] last:border-b-0">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <StarRating rating={review.rating} size="sm" />
          <span className="text-xs font-bold text-stone-800">
            {review.rating}.0
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-sm">
            <ShieldCheck size={12} className="text-[#27695c]" />
            Anonymous Tenant
          </span>
        </div>
        <time className="text-xs text-stone-400">{formattedDate}</time>
      </div>

      <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line mb-3 font-normal">
        {review.comment}
      </p>

      {review.tags && review.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#edf4ee] text-[#27695c] border border-[#c9d8cc] px-2 py-0.5 rounded-full"
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};

