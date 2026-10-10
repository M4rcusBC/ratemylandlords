import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showScore?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
  showScore = false,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  const activeRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="inline-flex items-center gap-1">
      <div
        className="flex items-center gap-0.5"
        role={interactive ? 'radiogroup' : 'img'}
        aria-label={`${rating} out of ${maxRating} stars`}
      >
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = activeRating >= starValue;
          const isHalf =
            !interactive &&
            activeRating >= starValue - 0.5 &&
            activeRating < starValue;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange?.(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={`${
                interactive
                  ? 'cursor-pointer p-1 transition-transform hover:scale-110'
                  : 'cursor-default'
              } text-[#d5843d] focus:outline-none`}
              aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
            >
              <Star
                size={starSizes[size]}
                fill={isFilled || isHalf ? '#d5843d' : 'transparent'}
                stroke={isFilled || isHalf ? '#d5843d' : '#c9c5ba'}
                className="transition-colors"
              />
            </button>
          );
        })}
      </div>
      {showScore && (
        <span className="font-semibold text-stone-800 ml-1 text-sm">
          {rating > 0 ? rating.toFixed(1) : 'No ratings'}
        </span>
      )}
    </div>
  );
};

