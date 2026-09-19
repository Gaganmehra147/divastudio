'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@divastudio.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0E0E0D] text-[#FAF7F2]">
      <div className="w-full max-w-md space-y-8 p-8 sm:p-10 bg-[#161514] border border-[#FAF7F2]/10 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#BFA175] font-mono">
            Atelier Management
          </span>
          <h1 className="font-serif text-3xl font-light tracking-wide text-[#FAF7F2]">
            DIVASTUDIO CMS
          </h1>
          <p className="text-xs text-[#9E9689] font-light">
            Enter authorized studio credentials to access the editorial CMS & CRM.
          </p>
        </div>

        {/* Demo Credentials Alert */}
        <div className="p-3.5 bg-[#FAF7F2]/5 border border-[#BFA175]/30 text-xs text-[#DCD7CF] flex items-start space-x-2.5">
          <KeyRound className="w-4 h-4 text-[#BFA175] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-medium text-[#FAF7F2]">Default Seed Credentials:</span>
            <p className="font-mono text-[11px] text-[#BFA175]">admin@divastudio.com / admin123</p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#9E9689]">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1A1918] border border-[#FAF7F2]/15 py-3 px-4 text-sm text-[#FAF7F2] focus:border-[#BFA175] focus:outline-none transition-colors"
              />
              <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-[#9E9689]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#9E9689]">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1918] border border-[#FAF7F2]/15 py-3 px-4 text-sm text-[#FAF7F2] focus:border-[#BFA175] focus:outline-none transition-colors"
              />
              <Lock className="absolute right-3.5 top-3.5 w-4 h-4 text-[#9E9689]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#BFA175] text-[#141312] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#D4BC9B] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Enter Studio CMS</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
