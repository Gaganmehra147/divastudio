'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialItem {
  id: string;
  clientName: string;
  sessionType: string;
  location?: string | null;
  quote: string;
  rating: number;
}

interface TestimonialQuoteProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialQuote({ testimonials }: TestimonialQuoteProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 sm:py-36 bg-[#FAF7F2] text-[#1A1918] border-b border-[#1A1918]/10">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        {/* Eyebrow */}
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block mb-8 font-sans">
          Words from Those We&apos;ve Documented
        </span>

        {/* Big Editorial Quote with Animated Transition */}
        <div className="min-h-[220px] sm:min-h-[260px] flex items-center justify-center mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl font-light leading-snug text-[#1A1918] italic">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="space-y-1">
                <p className="text-sm uppercase tracking-[0.24em] font-medium text-[#1A1918]">
                  {current.clientName}
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-[#6A6357]">
                  {current.sessionType} {current.location ? `· ${current.location}` : ''}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls & Dots */}
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full border border-[#1A1918]/20 text-[#1A1918] hover:border-[#1A1918] hover:bg-[#1A1918] hover:text-[#FAF7F2] transition-colors focus:outline-none"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  currentIndex === idx ? 'w-8 bg-[#1A1918]' : 'w-2 bg-[#1A1918]/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-full border border-[#1A1918]/20 text-[#1A1918] hover:border-[#1A1918] hover:bg-[#1A1918] hover:text-[#FAF7F2] transition-colors focus:outline-none"
            aria-label="Next quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

