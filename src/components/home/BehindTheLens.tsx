'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Compass, Camera } from 'lucide-react';

interface BehindTheLensProps {
  profile?: {
    name: string;
    role: string;
    portraitImage: string;
    bio: string;
    philosophy: string;
    specialties?: string | null;
    studioLocation?: string | null;
  };
}

export default function BehindTheLens({ profile }: BehindTheLensProps) {
  const data = profile || {
    name: 'Elena Vance & Julian Thorne',
    role: 'Founders & Creative Directors',
    portraitImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    bio: 'Trained in classical fine arts and editorial direction in Paris and Milan, Elena and Julian founded DIVASTUDIO to bring museum-grade intentionality back to celebratory documentation. Their work balances architectural rigor with tender, unforced human intimacy.',
    philosophy: 'We do not photograph poses. We photograph the moments between them.',
    specialties: 'Weddings & Celebrations, Fine Art Monochromatic Studio, Maternity, Editorial Fashion',
    studioLocation: 'Atelier SoHo (New York) & Via Montenapoleone (Milan)',
  };

  return (
    <section className="py-24 sm:py-36 bg-[#161514] text-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Image on Left */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto shadow-2xl border border-[#FAF7F2]/10 overflow-hidden"
            >
              <Image
                src={data.portraitImage}
                alt={data.name}
                fill
                className="object-cover brightness-95 contrast-105"
                sizes="(max-width: 1024px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#BFA175] block font-mono">
                  THE ARTISTS
                </span>
                <p className="font-serif text-xl text-[#FAF7F2] font-light">
                  {data.name}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Editorial Biography on Right */}
          <div className="lg:col-span-7 space-y-8 lg:pl-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#BFA175] block mb-3 font-sans">
                Behind The Lens
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FAF7F2] tracking-tight leading-tight">
                &ldquo;{data.philosophy}&rdquo;
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#DCD7CF] font-light leading-relaxed">
              {data.bio}
            </p>

            {/* Disciplines & Studio Location Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#FAF7F2]/10 text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-[#BFA175]">
                  <Camera className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-[0.2em] font-medium">Core Focus</span>
                </div>
                <p className="text-[#9E9689] font-light leading-relaxed">
                  {data.specialties}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-[#BFA175]">
                  <Compass className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-[0.2em] font-medium">Base of Operations</span>
                </div>
                <p className="text-[#9E9689] font-light leading-relaxed">
                  {data.studioLocation}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.22em] font-medium text-[#FAF7F2] hover:text-[#BFA175] transition-colors"
              >
                <span>Read Full Studio Biography</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

