'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface AlbumItem {
  id: string;
  name: string;
  type: string;
  description: string;
  dimensions?: string | null;
  price?: string | null;
  coverImage: string;
}

interface AlbumsPrintsProps {
  albums: AlbumItem[];
}

export default function AlbumsPrints({ albums }: AlbumsPrintsProps) {
  return (
    <section className="py-24 sm:py-36 bg-[#F4EFE6] text-[#1A1918]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1A1918]/10 gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block mb-3 font-sans">
              Tangible Heirlooms
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#1A1918] mb-4">
              Albums & Fine Art Prints
            </h2>
            <p className="text-sm sm:text-base text-[#6A6357] font-light leading-relaxed">
              We believe photography is not complete until it lives in physical weight. Bound by master artisans in Florence and printed with archival pigment inks.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.22em] text-[#1A1918] hover:text-[#BFA175] transition-colors"
          >
            <span>View Pricing & Inclusions</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Heirlooms Grid — 1col mobile → 2col tablet → 4col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {albums.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="group flex flex-col justify-between space-y-4"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF7F2] shadow-md border border-[#1A1918]/5">
                <Image
                  src={item.coverImage}
                  alt={item.name}
                  fill
                  className="object-cover img-zoom-hover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#9E9689] font-mono">
                  <span>{item.type}</span>
                  {item.price && <span className="text-[#1A1918] font-sans font-medium">{item.price}</span>}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1A1918] group-hover:text-[#BFA175] transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs text-[#6A6357] font-light leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {item.dimensions && (
                  <p className="text-[11px] font-mono text-[#9E9689] pt-1">
                    {item.dimensions}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

