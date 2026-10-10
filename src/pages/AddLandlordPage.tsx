import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building2, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { createLandlord } from '../lib/api';

const landlordSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter a landlord or property management company name (at least 2 characters)')
    .max(120, 'Name must be under 120 characters'),
  city: z
    .string()
    .trim()
    .min(2, 'Please enter a valid city name')
    .max(80, 'City must be under 80 characters'),
  state: z
    .string()
    .trim()
    .min(2, 'Please enter a valid state (e.g. CA, TX, NY)')
    .max(40, 'State must be under 40 characters'),
  address: z.string().trim().max(200).optional(),
});

export const AddLandlordPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    address: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = landlordSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || 'Invalid form input');
      return;
    }

    setSubmitting(true);
    try {
      const created = await createLandlord(validation.data);
      navigate(`/landlords/${created.id}`);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Unable to create landlord profile.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        to="/landlords"
        className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 mb-6 font-medium transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back to directory</span>
      </Link>

      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#c45b3f]">
          Grow The Community
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
          Add a Landlord
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          Help future renters find useful, local context before signing a lease.
          You can add an individual landlord, property management company, or
          apartment complex.
        </p>
      </div>

      <div className="bg-white border border-[#dedbd2] rounded-2xl p-6 sm:p-8 shadow-xs">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-r-md flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
            >
              Landlord or Management Company Name
            </label>
            <div className="relative">
              <Building2
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Greystar or John Doe"
                className="w-full pl-10 pr-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27695c]/20 focus:border-[#27695c]"
                required
              />
            </div>
            <p className="text-[11px] text-stone-400 mt-1.5">
              Enter the legal business name or primary contact name tenants interact with.
            </p>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
            >
              Street Address <span className="text-stone-400 font-normal lowercase">(optional for map location)</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. 4600 Mueller Blvd"
              className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27695c]/20 focus:border-[#27695c]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Austin"
                className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27695c]/20 focus:border-[#27695c]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2"
              >
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. TX or Texas"
                className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#27695c]/20 focus:border-[#27695c]"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <p className="text-[11px] text-stone-400">
              Profiles are public to help renters find honest feedback.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#202622] hover:bg-[#27695c] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs disabled:opacity-50"
            >
              <span>{submitting ? 'Creating Profile...' : 'Add Landlord'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

