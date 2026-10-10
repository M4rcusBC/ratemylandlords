import React from 'react';
import type { ScoreBreakdown as ScoreBreakdownType } from '../lib/types';
import { Star } from 'lucide-react';

interface ScoreBreakdownProps {
  breakdown: ScoreBreakdownType;
  totalReviews: number;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({
  breakdown,
  totalReviews,
}) => {
  const stars: (1 | 2 | 3 | 4 | 5)[] = [5, 4, 3, 2, 1];

  return (
    <div className="bg-white p-5 rounded-lg border border-[#dedbd2] shadow-xs">
      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4">
        Rating Distribution
      </h3>
      <div className="space-y-2.5">
        {stars.map((star) => {
          const count = breakdown[star] || 0;
          const percentage =
            totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

          return (
            <div key={star} className="flex items-center text-xs gap-3">
              <div className="flex items-center gap-1 w-14 font-medium text-stone-700 shrink-0">
                <span>{star}</span>
                <Star size={12} className="fill-[#d5843d] text-[#d5843d]" />
              </div>

              <div className="flex-1 h-2.5 bg-[#edf1ed] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#27695c] rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="w-12 text-right text-stone-500 shrink-0 tabular-nums">
                <span>{count}</span>
                <span className="text-[10px] text-stone-400 ml-1">
                  ({percentage}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

