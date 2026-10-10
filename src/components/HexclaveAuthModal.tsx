import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Key, User, Lock, Mail } from 'lucide-react';
import { useHexclaveAuth } from '../lib/hexclave-auth';

interface HexclaveAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export const HexclaveAuthModal: React.FC<HexclaveAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  
  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp } = useHexclaveAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'signup' && displayName.trim().length < 2) {
      setError('Please provide a display name (at least 2 characters).');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password, displayName.trim());
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-1 text-xs font-semibold uppercase tracking-wider text-[#27695c]">
          <Key size={14} />
          <span>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</span>
        </div>

        <h2 className="text-2xl font-bold text-stone-900 mb-1">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="text-xs text-stone-500 mb-6">
          {mode === 'signin'
            ? 'Sign in to manage your saved landlords and review history.'
            : 'Join our tenant community to rate landlords and leave verified feedback.'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-r-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Display Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Alex M."
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27695c]/20 focus:border-[#27695c]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27695c]/20 focus:border-[#27695c]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27695c]/20 focus:border-[#27695c]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#202622] hover:bg-[#27695c] text-white font-medium text-sm rounded-lg transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {loading
              ? 'Authenticating...'
              : mode === 'signin'
              ? 'Sign In'
              : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-[11px] text-center text-stone-500 leading-tight">
          By continuing, you acknowledge our{' '}
          <Link
            to="/privacy"
            onClick={onClose}
            className="text-[#27695c] underline font-medium hover:text-stone-900"
          >
            Privacy Notice
          </Link>
          . Your tenant reviews always remain 100% anonymous.
        </p>

        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>
            {mode === 'signin'
              ? "Don't have an account?"
              : 'Already have an account?'}
          </span>
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError('');
            }}
            className="font-semibold text-[#27695c] hover:underline cursor-pointer"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};
