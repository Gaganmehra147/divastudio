'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

interface BookingCtaProps {
  categories?: { id: string; name: string }[];
}

export default function BookingCta({ categories }: BookingCtaProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    photographyType: categories?.[0]?.name || 'Weddings & Elopements',
    preferredDate: '',
    peopleCount: '',
    budget: '$2,000 - $4,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const photographyOptions = categories?.map((c) => c.name) || [
    'Weddings & Elopements',
    'Fine Art Portraits',
    'Maternity & Motherhood',
    'Newborn & Early Days',
    'Fashion & Editorial',
    'Family & Heritage',
    'Commercial Commission',
  ];

  const budgetOptions = [
    '$1,200 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $8,000',
    '$8,000+',
    'Custom Commercial Commission',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Unable to transmit enquiry at this time.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 sm:py-36 bg-[#FAF7F2] text-[#1A1918]" id="book">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block font-sans">
            Reserve Your Session
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#1A1918] leading-tight">
            Let&apos;s Create Something Worth Remembering.
          </h2>
          <p className="text-xs sm:text-sm text-[#6A6357] font-light leading-relaxed">
            Please share a few details regarding your vision. We accept a limited number of commissions each season to ensure absolute devotion to every story.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#FAF7F2] border border-[#1A1918]/15 p-5 sm:p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#1A1918] text-[#BFA175] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1918]">
                  Thank you. Your story has reached us.
                </h3>
                <p className="text-sm text-[#6A6357] font-light max-w-md mx-auto leading-relaxed">
                  We will review your date and vision, and our studio concierge will be in touch shortly with our private investment monograph and availability.
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        city: '',
                        photographyType: photographyOptions[0],
                        preferredDate: '',
                        peopleCount: '',
                        budget: budgetOptions[1],
                        message: '',
                      });
                    }}
                    className="text-xs uppercase tracking-[0.2em] text-[#1A1918] underline hover:text-[#BFA175]"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-none">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#6A6357] font-medium">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alessandra Sterling"
                      className="w-full bg-transparent border-b border-[#1A1918]/25 py-2.5 text-sm text-[#1A1918] focus:border-[#1A1918] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#6A6357] font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alessandra@domain.com"
                      className="w-full bg-transparent border-b border-[#1A1918]/25 py-2.5 text-sm text-[#1A1918] focus:border-[#1A1918] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#6A6357] font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-transparent border-b border-[#1A1918]/25 py-2.5 text-sm text-[#1A1918] focus:border-[#1A1918] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* City / Location */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#6A6357] font-medium">
                      Session Location / City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Florence, Italy or SoHo Studio"
                      className="w-full bg-transparent border-b border-[#1A1918]/25 py-2.5 text-sm text-[#1A1918] focus:border-[#1A1918] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Photography Discipline */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#6A6357] font-medium">
                      Photography Type *
                    </label>
                    <select
                      value={formData.photographyType}
                      onChange={(e) => setFormData({ ...formData, photographyType: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1A1918]/25 py-2.5 text-sm text-[#1A1918] focus:border-[#1A1918] focus:outline-none transition-colors cursor-pointer"
                    >
                      {photographyOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#FAF7F2] text-[#1A1918]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#6A6357] font-medium">
                      Preferred Date / Season
                    </label>
                    <input
                      type="text"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      placeholder="e.g. October 2026 or Spring"
                      className="w-full bg-transparent border-b border-[#1A1918]/25 py-2.5 text-sm text-[#1A1918] focus:border-[#1A1918] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Number of People */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#6A6357] font-medium">
                      Estimated Guests / Subjects
                    </label>
                    <input
                      type="text"
                      value={formData.peopleCount}
                      onChange={(e) => setFormData({ ...formData, peopleCount: e.target.value })}
                      placeholder="e.g. 2 (Couple) or 85 (Guests)"
                      className="w-full bg-transparent border-b border-[#1A1918]/25 py-2.5 text-sm text-[#1A1918] focus:border-[#1A1918] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Investment / Budget Range */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#6A6357] font-medium">
                      Planned Investment Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-transparent border-b border-[#1A1918]/25 py-2.5 text-sm text-[#1A1918] focus:border-[#1A1918] focus:outline-none transition-colors cursor-pointer"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#FAF7F2] text-[#1A1918]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message / Vision */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-[#6A6357] font-medium">
                    Tell Us About Your Vision *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share any thoughts on atmosphere, architectural venues, or what draws you to our work..."
                    className="w-full bg-transparent border-b border-[#1A1918]/25 py-2.5 text-sm text-[#1A1918] focus:border-[#1A1918] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="text-[11px] text-[#9E9689] font-light">
                    * All communications remain private and confidential.
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#BFA175] hover:text-[#1A1918] transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Start The Conversation</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

