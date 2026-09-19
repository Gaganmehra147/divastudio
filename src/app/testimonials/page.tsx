import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowUpRight, Star } from 'lucide-react';

export const revalidate = 60;

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="pt-24 sm:pt-32 pb-24 text-[#1A1918]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-16 sm:mb-28">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block font-sans">
            Words of Reverence
          </span>
          <h1 className="font-serif font-light text-[#1A1918] leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
            Client Stories & Reflections
          </h1>
          <p className="text-base sm:text-lg text-[#6A6357] font-light leading-relaxed max-w-2xl">
            We are honored to have documented vows, motherhood, and generational legacies for families and artists across the globe.
          </p>
        </div>
      </section>

      {/* Testimonials Editorial Grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              className="p-8 sm:p-10 border border-[#1A1918]/15 bg-[#FAF7F2] flex flex-col justify-between space-y-8"
            >
              <blockquote className="font-serif text-xl sm:text-2xl font-light text-[#1A1918] italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-[#1A1918]/10 space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#1A1918]">
                  {t.clientName}
                </p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#6A6357]">
                  {t.sessionType} {t.location ? `· ${t.location}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-[#F4EFE6]">
        <div className="max-w-xl mx-auto px-5 space-y-4">
          <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1918]">
            Begin Your Story
          </h3>
          <p className="text-xs sm:text-sm text-[#6A6357] font-light">
            We would be honored to create timeless photographic memories for you.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#BFA175] hover:text-[#1A1918] transition-colors"
            >
              <span>Book A Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

