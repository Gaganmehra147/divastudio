'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';

export default function VisualJournal() {
  const feed = [
    {
      url: '/images/hero_indian_wedding.jpg',
      alt: 'Udaipur palace royal wedding couple',
    },
    {
      url: '/images/cat_bridal_portrait.jpg',
      alt: 'Royal Indian bride with heirloom polki jewels',
    },
    {
      url: '/images/cat_royal_weddings.jpg',
      alt: 'Emotional varmala garland exchange',
    },
    {
      url: '/images/cat_haldi_mehendi.jpg',
      alt: 'Joyful haldi ceremony with yellow marigolds',
    },
    {
      url: '/images/cat_prewedding_palace.jpg',
      alt: 'Lake Palace Udaipur sunset jharokha',
    },
    {
      url: '/images/cat_heritage_family.jpg',
      alt: 'Generations united in blessing',
    },
  ];

  return (
    <section className="py-24 bg-[#141312] text-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#BFA175] block mb-2 font-sans">
            Visual Diary
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#FAF7F2]">
            Follow The Royal Visual Journey
          </h2>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.22em] text-[#FAF7F2]/90 hover:text-[#BFA175] transition-colors"
        >
          <Instagram className="w-3.5 h-3.5" />
          <span>@divastudio.official</span>
          <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
        </a>
      </div>

      {/* Edge-to-Edge Grid of High-Resolution Imagery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 px-4 sm:px-6">
        {feed.map((post, idx) => (
          <motion.a
            key={idx}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 * idx }}
            className="group relative aspect-square overflow-hidden bg-[#1E1D1B]"
            data-cursor="view"
          >
            <Image
              src={post.url}
              alt={post.alt}
              fill
              className="object-cover img-zoom-hover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram className="w-6 h-6 text-[#FAF7F2]" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

