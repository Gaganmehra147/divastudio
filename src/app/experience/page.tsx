import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, Clock, Heart, Sparkles, Compass } from 'lucide-react';
import ExperienceTimeline from '@/components/home/ExperienceTimeline';

export const revalidate = 60;

export default function ExperiencePage() {
  return (
    <div className="pt-24 sm:pt-32 pb-24 text-[#1A1918]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-16 sm:mb-28">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block font-sans">
            The Atelier Journey
          </span>
          <h1 className="font-serif font-light text-[#1A1918] leading-[1.05] tracking-tight">
            The DIVASTUDIO Experience
          </h1>
          <p className="text-base sm:text-lg text-[#6A6357] font-light leading-relaxed max-w-2xl">
            A photography session should feel like an unhurried sanctuary, not an obligation. Here is how we guide you from our first conversation to holding your Florentine heirloom album.
          </p>
        </div>
      </section>

      {/* 6-Step Editorial Process */}
      <ExperienceTimeline />

      {/* What to Expect & Wardrobe Guidelines */}
      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block font-sans">
                Curating Elegance
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1918]">
                Wardrobe & Preparation
              </h2>
              <div className="space-y-4 text-sm text-[#6A6357] font-light leading-relaxed">
                <p>
                  Upon confirming your session date, you will receive our comprehensive private Styling & Wardrobe Guidebook. We assist in curating textures that breathe in natural light: raw silks, organic linens, tactile wools, and tailored monochrome tones.
                </p>
                <p>
                  We coordinate with premier hair and makeup artists who specialize in effortless, skin-first editorial radiance.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3 text-xs text-[#1A1918]">
                  <Check className="w-4 h-4 text-[#BFA175] shrink-0 mt-0.5" />
                  <span>Complimentary pre-session styling consultation via video or atelier visit.</span>
                </div>
                <div className="flex items-start space-x-3 text-xs text-[#1A1918]">
                  <Check className="w-4 h-4 text-[#BFA175] shrink-0 mt-0.5" />
                  <span>Access to our curated collection of fine art styling fabrics and props.</span>
                </div>
                <div className="flex items-start space-x-3 text-xs text-[#1A1918]">
                  <Check className="w-4 h-4 text-[#BFA175] shrink-0 mt-0.5" />
                  <span>Private changing suite with refreshments, espresso, and curated music.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] w-full shadow-2xl overflow-hidden bg-[#1E1D1B]" data-cursor="view">
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
                  alt="Styling and wardrobe textures"
                  fill
                  className="object-cover img-zoom-hover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24 text-center bg-[#FAF7F2]">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h3 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1918]">
            Begin Your Experience
          </h3>
          <p className="text-sm text-[#6A6357] font-light">
            Sessions are limited each calendar quarter to guarantee our focused devotion.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#BFA175] hover:text-[#1A1918] transition-colors"
          >
            <span>Inquire About Dates</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

