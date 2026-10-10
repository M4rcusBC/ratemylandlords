export interface Landlord {
  id: string;
  name: string;
  city: string;
  state: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  createdAt: number;
  avgRating: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  landlordId: string;
  rating: number;
  comment: string;
  tags: string[];
  createdAt: number;
}

export type ScoreBreakdown = Record<1 | 2 | 3 | 4 | 5, number>;

export interface LandlordProfile extends Landlord {
  scoreBreakdown: ScoreBreakdown;
  tagCounts: Record<string, number>;
  reviews: Review[];
}

export interface CreateLandlordInput {
  name: string;
  city: string;
  state: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  turnstileToken?: string;
}

export interface CreateReviewInput {
  landlordId: string;
  rating: number;
  comment: string;
  tags: string[];
  turnstileToken?: string;
}

export const PRESET_REVIEW_TAGS = [
  'Responsive',
  'Fair Deposit Return',
  'Maintains Property',
  'Clear Communication',
  'Respectful',
  'Transparent Fees',
  'Quick Repairs',
  'Quiet Building',
  'Pet Friendly',
  'Easy Move-in',
] as const;

export const US_CITY_CENTROIDS: Record<string, [number, number]> = {
  'austin, tx': [30.2672, -97.7431],
  'dallas, tx': [32.7767, -96.797],
  'houston, tx': [29.7604, -95.3698],
  'san antonio, tx': [29.4241, -98.4936],
  'new york, ny': [40.7128, -74.006],
  'chicago, il': [41.8781, -87.6298],
  'los angeles, ca': [34.0522, -118.2437],
  'san francisco, ca': [37.7749, -122.4194],
  'san jose, ca': [37.3382, -121.8863],
  'san diego, ca': [32.7157, -117.1611],
  'seattle, wa': [47.6062, -122.3321],
  'denver, co': [39.7392, -104.9903],
  'boston, ma': [42.3601, -71.0589],
  'atlanta, ga': [33.749, -84.388],
  'miami, fl': [25.7617, -80.1918],
  'tampa, fl': [27.9506, -82.4572],
  'orlando, fl': [28.5383, -81.3792],
  'nashville, tn': [36.1627, -86.7816],
  'memphis, tn': [35.1495, -90.049],
  'charlotte, nc': [35.2271, -80.8431],
  'raleigh, nc': [35.7796, -78.6382],
  'phoenix, az': [33.4484, -112.074],
  'las vegas, nv': [36.1699, -115.1398],
  'portland, or': [45.5152, -122.6784],
  'washington, dc': [38.9072, -77.0369],
  'arlington, va': [38.8799, -77.1068],
  'springfield, ca': [37.9577, -121.2908],
};

export function getLandlordCoordinates(landlord: {
  city: string;
  state: string;
  latitude?: number | null;
  longitude?: number | null;
}): [number, number] {
  if (
    typeof landlord.latitude === 'number' &&
    typeof landlord.longitude === 'number' &&
    !isNaN(landlord.latitude) &&
    !isNaN(landlord.longitude)
  ) {
    return [landlord.latitude, landlord.longitude];
  }

  const key = `${landlord.city.toLowerCase().trim()}, ${landlord.state.toLowerCase().trim()}`;
  if (US_CITY_CENTROIDS[key]) {
    // Add tiny deterministic jitter so multiple properties in same city don't completely overlap
    const jitterLat = ((key.charCodeAt(0) % 10) - 5) * 0.003;
    const jitterLng = ((key.charCodeAt(1) % 10) - 5) * 0.003;
    const [baseLat, baseLng] = US_CITY_CENTROIDS[key];
    return [baseLat + jitterLat, baseLng + jitterLng];
  }

  // Fallback to center of US
  return [39.8283, -98.5795];
}
