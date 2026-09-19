import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowUpRight, Check, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import AlbumsPrints from '@/components/home/AlbumsPrints';

export const revalidate = 0;

export default async function PricingPage() {
  const [packages, addons, albums] = await Promise.all([
    prisma.package.findMany({
      orderBy: { order: 'asc' },
      include: { category: true },
    }),
    prisma.packageAddon.findMany({
      where: { isAvailable: true },
      orderBy: { order: 'asc' },
    }),
    prisma.albumPrint.findMany({
      where: { isAvailable: true },
      orderBy: { order: 'asc' },
    }),
  ]);

  return (
    <div className="pt-24 sm:pt-32 pb-24 text-[#1A1918]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-16 sm:mb-28">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block font-sans">
            Investment & Collections
          </span>
          <h1 className="font-serif font-light text-[#1A1918] leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
            Curated Collections
          </h1>
          <p className="text-base sm:text-lg text-[#6A6357] font-light leading-relaxed max-w-2xl">
            We offer transparent, all-inclusive commissions with white-glove curation. Every collection includes dedicated pre-session styling, master fine art retouching, and personal archive storage.
          </p>
        </div>
      </section>

      {/* Photography Collections Grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {packages.map((pkg, idx) => {
            const deliverables = pkg.deliverables.split('\n').filter(Boolean);
            const isFeatured = pkg.isFeatured;

            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between p-8 sm:p-10 border transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[#1E1D1B] text-[#FAF7F2] border-[#BFA175] shadow-2xl relative'
                    : 'bg-[#FAF7F2] text-[#1A1918] border-[#1A1918]/15'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-8 bg-[#BFA175] text-[#141312] text-[10px] uppercase tracking-[0.24em] font-medium py-1 px-3">
                    Most Revered
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#BFA175] block mb-1">
                      COLLECTION 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-3xl font-light mb-2">
                      {pkg.name}
                    </h3>
                    <p className={`text-xs font-light leading-relaxed ${isFeatured ? 'text-[#DCD7CF]' : 'text-[#6A6357]'}`}>
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price & Specs */}
                  <div className={`py-6 border-t border-b ${isFeatured ? 'border-[#FAF7F2]/15' : 'border-[#1A1918]/15'} space-y-2`}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-3xl sm:text-4xl font-light">
                        {pkg.showPrice ? pkg.price : 'Contact for Price'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-xs font-mono text-[#9E9689] pt-1">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#BFA175]" />
                        <span>{pkg.duration}</span>
                      </span>
                      <span>·</span>
                      <span>{pkg.imagesCount}</span>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-3">
                    <span className={`text-[10px] uppercase tracking-widest font-mono ${isFeatured ? 'text-[#BFA175]' : 'text-[#9E9689]'}`}>
                      Inclusions
                    </span>
                    <ul className="space-y-2.5 text-xs font-light">
                      {deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-2.5">
                          <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isFeatured ? 'text-[#BFA175]' : 'text-[#1A1918]'}`} />
                          <span className={isFeatured ? 'text-[#FAF7F2]/90' : 'text-[#4A453E]'}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                    className={`w-full py-4 text-center text-xs uppercase tracking-[0.22em] font-medium transition-colors flex items-center justify-center space-x-2 ${
                      isFeatured
                        ? 'bg-[#BFA175] text-[#141312] hover:bg-[#D4BC9B]'
                        : 'bg-[#1A1918] text-[#FAF7F2] hover:bg-[#BFA175] hover:text-[#1A1918]'
                    }`}
                  >
                    <span>Reserve Collection</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Add-on Services Section */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-32">
        <div className="max-w-xl mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block mb-2 font-sans">
            Bespoke Enhancements
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1918]">
            A La Carte Add-Ons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addons.map((addon) => (
            <div
              key={addon.id}
              className="p-6 border border-[#1A1918]/15 bg-[#FAF7F2] flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="font-serif text-xl font-light text-[#1A1918]">
                    {addon.name}
                  </h4>
                  <span className="font-mono text-xs text-[#BFA175] shrink-0 font-medium">
                    {addon.price}
                  </span>
                </div>
                <p className="text-xs text-[#6A6357] font-light leading-relaxed">
                  {addon.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tangible Heirlooms */}
      <AlbumsPrints albums={albums} />
    </div>
  );
}

