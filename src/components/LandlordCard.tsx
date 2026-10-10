import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, ArrowUpRight } from 'lucide-react';
import { StarRating } from './StarRating';
import type { Landlord } from '../lib/types';

interface LandlordCardProps {
  landlord: Landlord;
}

export const LandlordCard: React.FC<LandlordCardProps> = ({ landlord }) => {
  return (
    <Link
      to={`/landlords/${landlord.id}`}
      className="group block bg-white border border-[#dedbd2] rounded-lg p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#27695c]/50 text-left"
    >
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-lg bg-[#e5eee8] text-[#27695c] flex items-center justify-center group-hover:bg-[#27695c] group-hover:text-white transition-colors">
          <Building2 size={20} />
        </div>
        <span className="text-stone-400 group-hover:text-[#27695c] transition-colors">
          <ArrowUpRight size={18} />
        </span>
      </div>

      <h3 className="font-semibold text-lg text-stone-900 mt-4 line-clamp-1 group-hover:text-[#27695c] transition-colors">
        {landlord.name}
      </h3>

      <p className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
        <MapPin size={13} className="text-stone-400" />
        <span>
          {landlord.city}, {landlord.state}
        </span>
      </p>

      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
        {landlord.reviewCount > 0 ? (
          <div className="flex items-center gap-2">
            <StarRating rating={landlord.avgRating} size="sm" />
            <span className="text-xs font-bold text-stone-800">
              {landlord.avgRating.toFixed(1)}
            </span>
            <span className="text-xs text-stone-400">
              ({landlord.reviewCount}{' '}
              {landlord.reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        ) : (
          <span className="text-xs italic text-stone-400">
            No reviews yet
          </span>
        )}

        <span className="text-xs font-medium text-[#27695c] underline-offset-2 group-hover:underline">
          View
        </span>
      </div>
    </Link>
  );
};

