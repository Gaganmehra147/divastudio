import React from 'react';
import { prisma } from '@/lib/prisma';
import SelectedStories from '@/components/home/SelectedStories';

export const revalidate = 60;

export default async function PortfolioPage() {
  const [categories, projects] = await Promise.all([
    prisma.category.findMany({
      orderBy: { order: 'asc' },
    }),
    prisma.project.findMany({
      where: { isPublished: true },
      include: {
        category: true,
      },
      orderBy: { order: 'asc' },
    }),
  ]);

  return (
    <div className="pt-24 sm:pt-32 pb-24 text-[#1A1918]">
      {/* Portfolio Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block font-sans">
            Complete Archive
          </span>
          <h1
            className="font-serif font-light text-[#1A1918] leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Selected Stories &amp; Commissions
          </h1>
          <p className="text-base sm:text-lg text-[#6A6357] font-light leading-relaxed max-w-2xl">
            A visual anthology of celebrations, quiet motherhood, and human character documented across continents.
          </p>
        </div>
      </section>

      {/* Dynamic Stories Grid with Filters */}
      <SelectedStories projects={projects} categories={categories} />
    </div>
  );
}
