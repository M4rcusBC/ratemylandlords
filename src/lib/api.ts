import type {
  Landlord,
  LandlordProfile,
  CreateLandlordInput,
  CreateReviewInput,
  Review,
} from './types';

const getApiBase = (): string => {
  if (typeof import.meta === 'undefined') return '/api';
  const env = import.meta.env;
  if (env?.DEV) {
    // In local development, prefer /api so Vite proxies to the local backend without CORS
    if (env.VITE_DEV_API_URL) return env.VITE_DEV_API_URL;
    if (env.VITE_API_BASE_URL && !env.VITE_API_BASE_URL.includes('ratemylandlords.app')) {
      return env.VITE_API_BASE_URL;
    }
    return '/api';
  }
  return env?.VITE_API_BASE_URL || '/api';
};

const API_BASE = getApiBase().replace(/\/$/, '');

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.error || `Request failed with status ${response.status}`
    );
  }

  return data as T;
}

export async function fetchLandlords(params?: {
  search?: string;
  city?: string;
  state?: string;
}): Promise<Landlord[]> {
  const query = new URLSearchParams();
  if (params?.search?.trim()) query.set('search', params.search.trim());
  if (params?.city?.trim()) query.set('city', params.city.trim());
  if (params?.state?.trim()) query.set('state', params.state.trim());

  const queryString = query.toString();
  const res = await request<{ landlords: Landlord[] }>(
    `/landlords${queryString ? `?${queryString}` : ''}`
  );
  return res.landlords || [];
}

export async function fetchLandlordProfile(id: string): Promise<LandlordProfile> {
  return request<LandlordProfile>(`/landlords/${encodeURIComponent(id)}`);
}

export async function createLandlord(
  input: CreateLandlordInput
): Promise<Landlord> {
  return request<Landlord>('/landlords', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function submitReview(input: CreateReviewInput): Promise<Review> {
  return request<Review>('/reviews', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}



