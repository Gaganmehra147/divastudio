'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  headline?: string;
  subheadline?: string;
  heroImage?: string;
}

export default function Hero({
  headline = 'Stories Worth\nRemembering.',
  subheadline = 'Timeless royal celebrations, bridal portraiture, and human devotion captured with cinematic grace and editorial stillness.',
  heroImage = '/images/hero_indian_wedding.jpg',
}: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-start overflow-hidden bg-[#0F0E0D] py-28 sm:py-36">
      {/* Background Cinematic Image */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={heroImage}
          alt="Royal Indian Wedding by DIVASTUDIO"
          fill
          priority
          className="object-cover object-[center_35%] brightness-[0.92] contrast-[1.05]"
          sizes="100vw"
        />
        {/* Directional Vignette & Subtle Left-to-Right Editorial Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] via-transparent to-black/50 pointer-events-none" />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="max-w-2xl sm:max-w-3xl space-y-5 sm:space-y-7">
          {/* Eyebrow — abbreviated on very small screens */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-flex items-center space-x-3 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#BFA175] font-sans font-medium bg-black/40 backdrop-blur-md px-3 sm:px-3.5 py-1.5 border border-[#BFA175]/30 shadow-sm max-w-full"
          >
            <span className="w-4 h-[1px] bg-[#BFA175] shrink-0" />
            <span className="truncate">DIVASTUDIO · LUXURY EDITORIAL ATELIER</span>
          </motion.div>

          {/* Main Editorial Headline — fluid clamp sizing */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light text-[#FAF7F2] leading-[0.96] tracking-tight whitespace-pre-line drop-shadow-md"
            style={{ fontSize: 'clamp(2.75rem, 10vw, 7rem)' }}
          >
            {headline}
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-sm sm:text-base md:text-lg text-[#FAF7F2]/90 max-w-xl font-light leading-relaxed drop-shadow-sm"
          >
            {subheadline}
          </motion.p>

          {/* Action CTAs — stacks on small mobile, row from sm up */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-2 sm:pt-4 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-5"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center space-x-3 px-7 py-3.5 sm:px-8 sm:py-4 bg-[#BFA175] text-[#141312] text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#FAF7F2] transition-all duration-300 shadow-xl w-full sm:w-auto justify-center sm:justify-start"
              data-cursor="explore"
            >
              <span>View Wedding Stories</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 px-7 py-3.5 sm:px-8 sm:py-4 border border-[#FAF7F2]/60 text-[#FAF7F2] text-xs uppercase tracking-[0.22em] font-medium hover:border-[#BFA175] hover:bg-black/40 hover:text-[#BFA175] transition-all duration-300 backdrop-blur-md bg-black/20 w-full sm:w-auto justify-center sm:justify-start"
              data-cursor="book"
            >
              <span>Book a Consultation</span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute right-6 sm:right-12 bottom-6 hidden md:flex flex-col items-center space-y-2 text-[10px] uppercase tracking-[0.3em] text-[#FAF7F2]/60"
        >
          <span className="[writing-mode:vertical-rl]">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#BFA175]" />
        </motion.div>
      </div>
    </section>
  );
}
