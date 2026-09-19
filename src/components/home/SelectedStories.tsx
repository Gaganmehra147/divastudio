'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: { name: string; slug: string };
  client?: string | null;
  location?: string | null;
  date?: string | null;
  sessionType?: string | null;
  coverImage: string;
  story: string;
}

interface SelectedStoriesProps {
  projects: ProjectItem[];
  categories: { id: string; name: string; slug: string }[];
}

export default function SelectedStories({ projects, categories }: SelectedStoriesProps) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filteredProjects =
    selectedFilter === 'ALL'
      ? projects
      : projects.filter((p) => p.category.slug === selectedFilter);

  return (
    <section className="py-24 sm:py-36 bg-[#FAF7F2] text-[#1A1918]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block mb-3 font-sans">
            Curated Archive
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1A1918] mb-4">
            Selected Stories
          </h2>
          <p className="text-sm sm:text-base text-[#6A6357] font-light leading-relaxed max-w-xl">
            A collection of moments, people and places we&apos;ve had the privilege to photograph with reverence and intention.
          </p>
        </div>

        {/* Dynamic Category Filter Tabs — horizontal scroll on mobile */}
        <div className="overflow-x-auto scrollbar-hide -mx-5 sm:-mx-8 px-5 sm:px-8 lg:mx-0 lg:px-0 mb-16 pb-6 border-b border-[#1A1918]/10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max lg:min-w-0 lg:flex-wrap">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`px-4 py-2 text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 whitespace-nowrap min-h-[36px] ${
                selectedFilter === 'ALL'
                  ? 'bg-[#1A1918] text-[#FAF7F2]'
                  : 'bg-transparent text-[#6A6357] hover:text-[#1A1918]'
              }`}
            >
              All Stories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.slug)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 whitespace-nowrap min-h-[36px] ${
                  selectedFilter === cat.slug
                    ? 'bg-[#1A1918] text-[#FAF7F2]'
                    : 'bg-transparent text-[#6A6357] hover:text-[#1A1918]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Mixed Editorial Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              // Create visual rhythm with varying column spans and aspect ratios
              const isLarge = index % 3 === 0;
              const isMedium = index % 3 === 1;
              const colSpan = isLarge
                ? 'md:col-span-8'
                : isMedium
                ? 'md:col-span-4'
                : 'md:col-span-6';
              const aspectRatio = isLarge
                ? 'aspect-[16/10]'
                : isMedium
                ? 'aspect-[3/4]'
                : 'aspect-[4/3]';

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className={`${colSpan} group flex flex-col`}
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="block relative overflow-hidden bg-[#1E1D1B]"
                    data-cursor="view"
                  >
                    <div className={`relative w-full ${aspectRatio} overflow-hidden`}>
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover img-zoom-hover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                    </div>
                  </Link>

                  {/* Project Metadata & Narrative */}
                  <div className="pt-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#9E9689]">
                      <span>{project.category.name}</span>
                      {project.location && (
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-[#BFA175]" />
                          <span>{project.location.split(',')[0]}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1918] group-hover:text-[#BFA175] transition-colors">
                      <Link href={`/portfolio/${project.slug}`} className="inline-flex items-center space-x-2">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </h3>

                    {project.client && (
                      <p className="text-xs text-[#6A6357] font-light">
                        Client: {project.client}
                      </p>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Portfolio CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#BFA175] hover:text-[#1A1918] transition-all duration-300"
          >
            <span>Explore Complete Archive</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

