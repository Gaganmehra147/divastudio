'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface EditorialStatementProps {
  quote?: string;
  story?: string;
}

export default function EditorialStatement({
  quote = 'PHOTOGRAPHS ARE NOT JUST IMAGES. THEY ARE PIECES OF TIME.',
  story = 'We exist for those who cherish the quiet weight of a memory and the grandeur of heritage. In palace courtyards across Rajasthan and worldwide, we create photographs that will anchor your family legacy for generations.',
}: EditorialStatementProps) {
  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-[#FAF7F2] text-[#1A1918] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Bold Editorial Statement & Manifesto */}
          <div className="lg:col-span-7 space-y-8 lg:pr-8">
            <div className="inline-flex items-center space-x-3 text-[10px] uppercase tracking-[0.3em] text-[#9E9689]">
              <span className="w-6 h-[1px] bg-[#9E9689]" />
              <span>Royal Heritage Manifesto</span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-[#1A1918]"
            >
              {quote}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-[#6A6357] font-light leading-relaxed max-w-xl"
            >
              {story}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-2"
            >
              <Link
                href="/about"
                className="group inline-flex items-center space-x-3 text-xs uppercase tracking-[0.24em] font-medium text-[#1A1918] hover:text-[#BFA175] transition-colors"
              >
                <span>Read Our Philosophy</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Royal Bridal Composition */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full max-w-md mx-auto shadow-2xl overflow-hidden border border-[#1A1918]/10"
              data-cursor="view"
            >
              <Image
                src="/images/cat_bridal_portrait.jpg"
                alt="Royal Indian Bridal Portrait Study by DIVASTUDIO"
                fill
                className="object-cover img-zoom-hover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute bottom-4 left-4 right-4 text-[10px] uppercase font-mono tracking-widest text-[#FAF7F2]/90 bg-black/60 backdrop-blur-sm px-3 py-1.5">
                PLATE NO. 01 · ROYAL BRIDAL MONOGRAPH IN RAMBAGH PALACE
              </div>
            </motion.div>

            {/* Overlapping secondary image element */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden sm:block absolute -bottom-10 -left-10 w-48 h-60 border-4 border-[#FAF7F2] shadow-2xl overflow-hidden"
            >
              <Image
                src="/images/cat_royal_weddings.jpg"
                alt="Varmala celebration"
                fill
                className="object-cover"
                sizes="220px"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

