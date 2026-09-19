'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Sun, Shield, Layers } from 'lucide-react';

export default function StudioCraft() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      caption: 'Main Daylight Loft · 14-ft north-facing industrial windows and lime-washed plaster walls.',
      ratio: 'aspect-[16/10]',
      colSpan: 'md:col-span-7',
    },
    {
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
      caption: 'The Private Consultation Salon · Hand-bound Italian leather swatches and museum print proofs.',
      ratio: 'aspect-[4/5]',
      colSpan: 'md:col-span-5',
    },
    {
      url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
      caption: 'Continuous Tungsten Lighting · Warm vintage Fresnel fixtures creating soft sculptural shadow.',
      ratio: 'aspect-[4/5]',
      colSpan: 'md:col-span-5',
    },
    {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
      caption: 'The Archival Print & Binding Desk · Where each heirloom album is inspected with cotton gloves.',
      ratio: 'aspect-[16/10]',
      colSpan: 'md:col-span-7',
    },
  ];

  return (
    <section className="py-24 sm:py-36 bg-[#161514] text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#BFA175] block mb-3 font-sans">
            The Sanctuary of Light
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#FAF7F2] mb-4">
            The Studio
          </h2>
          <p className="text-sm sm:text-base text-[#DCD7CF] font-light leading-relaxed">
            Our atelier is intentionally designed as an architectural sanctuary. A neutral, sun-drenched space where you can step away from noise and arrive fully in the moment.
          </p>
        </div>

        {/* Studio Spaces Asymmetric Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {images.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * idx }}
              className={`${item.colSpan} flex flex-col space-y-3`}
            >
              <div className={`relative w-full ${item.ratio} overflow-hidden border border-[#FAF7F2]/10 shadow-xl`} data-cursor="view">
                <Image
                  src={item.url}
                  alt={item.caption}
                  fill
                  className="object-cover img-zoom-hover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
              <p className="text-[11px] font-mono tracking-wider text-[#9E9689] uppercase">
                {item.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Equipment & Craftsmanship Credentials */}
        <div className="mt-20 pt-12 border-t border-[#FAF7F2]/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-[#9E9689]">
          <div className="space-y-1">
            <span className="block text-[10px] uppercase font-mono tracking-widest text-[#BFA175]">Medium Format</span>
            <p className="text-[#FAF7F2] font-serif text-lg">Hasselblad & Leica</p>
            <p className="text-[11px]">100MP archival resolving power</p>
          </div>
          <div className="space-y-1">
            <span className="block text-[10px] uppercase font-mono tracking-widest text-[#BFA175]">Film Archive</span>
            <p className="text-[#FAF7F2] font-serif text-lg">35mm & 120 Negative</p>
            <p className="text-[11px]">Kodak Portra & Ilford HP5</p>
          </div>
          <div className="space-y-1">
            <span className="block text-[10px] uppercase font-mono tracking-widest text-[#BFA175]">Paper Standards</span>
            <p className="text-[#FAF7F2] font-serif text-lg">Hahnemühle 310gsm</p>
            <p className="text-[11px]">100% Acid-free Cotton Rag</p>
          </div>
          <div className="space-y-1">
            <span className="block text-[10px] uppercase font-mono tracking-widest text-[#BFA175]">Global Atelier</span>
            <p className="text-[#FAF7F2] font-serif text-lg">New York & Milan</p>
            <p className="text-[11px]">International Commissions</p>
          </div>
        </div>
      </div>
    </section>
  );
}

