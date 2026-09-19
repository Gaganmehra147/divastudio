'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
}

interface CategoryShowcaseProps {
  categories: CategoryItem[];
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');

  return (
    <section className="py-24 sm:py-32 bg-[#1A1918] text-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#FAF7F2]/10 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#BFA175] block mb-3 font-sans">
              Disciplines of Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FAF7F2]">
              Photography Categories
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.22em] text-[#BFA175] hover:text-[#FAF7F2] transition-colors"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Editorial Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              onMouseEnter={() => setActiveCategory(cat.id)}
              className="group relative flex flex-col justify-end aspect-[3/4] overflow-hidden bg-[#141312] border border-[#FAF7F2]/10 shadow-lg"
              data-cursor="explore"
            >
              {/* Background Image with Slow Smooth Zoom */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={cat.coverImage}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/50 transition-colors duration-500" />
              </div>

              {/* Category Info Overlay */}
              <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#BFA175]">
                  0{idx + 1}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF7F2] group-hover:text-[#BFA175] transition-colors duration-300">
                  {cat.name}
                </h3>

                <p className="text-xs text-[#DCD7CF] font-light leading-relaxed line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  {cat.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/portfolio?category=${cat.slug}`}
                    className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.2em] font-medium text-[#FAF7F2] group-hover:text-[#BFA175] transition-colors"
                  >
                    <span>View Stories</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

