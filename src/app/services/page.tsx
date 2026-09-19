import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowUpRight, Check, Clock, Sparkles } from 'lucide-react';

export const revalidate = 0;

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="pt-24 sm:pt-32 pb-24 text-[#1A1918]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-16 sm:mb-28">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block font-sans">
            Commissions & Disciplines
          </span>
          <h1 className="font-serif font-light text-[#1A1918] leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
            Our Services
          </h1>
          <p className="text-base sm:text-lg text-[#6A6357] font-light leading-relaxed max-w-2xl">
            Each photographic commission is approached as a bespoke artistic assignment. We limit our bookings each year to preserve unmatched attentiveness, creative depth, and white-glove curation.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24 sm:space-y-32">
        {services.map((svc, idx) => {
          const isReversed = idx % 2 === 1;
          const deliverablesList = svc.deliverables.split('\n').filter(Boolean);

          return (
            <div
              key={svc.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                isReversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Col */}
              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-[#1E1D1B] shadow-xl" data-cursor="view">
                  <Image
                    src={svc.coverImage}
                    alt={svc.title}
                    fill
                    className="object-cover img-zoom-hover"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                  <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-[#FAF7F2] bg-black/50 backdrop-blur-sm px-3 py-1">
                    SERVICE NO. 0{idx + 1}
                  </div>
                </div>
              </div>

              {/* Content Col */}
              <div className={`lg:col-span-6 space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-4 text-xs font-mono text-[#BFA175] tracking-widest uppercase">
                    {svc.duration && (
                      <span className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{svc.duration}</span>
                      </span>
                    )}
                    {svc.startingPrice && <span>From {svc.startingPrice}</span>}
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1918]">
                    {svc.title}
                  </h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6A6357]">
                    {svc.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#6A6357] font-light leading-relaxed">
                  {svc.description}
                </p>

                {/* Deliverables */}
                {deliverablesList.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#1A1918]/10">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#9E9689]">
                      Curated Deliverables
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A453E]">
                      {deliverablesList.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-[#BFA175] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4">
                  <Link
                    href={`/contact?service=${encodeURIComponent(svc.title)}`}
                    className="inline-flex items-center space-x-3 px-7 py-3.5 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#BFA175] hover:text-[#1A1918] transition-colors"
                  >
                    <span>Inquire For This Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Booking CTA Footer */}
      <section className="mt-32 py-20 bg-[#FAF7F2] border-t border-[#1A1918]/10 text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1918]">
            Need a Bespoke Commission?
          </h3>
          <p className="text-sm text-[#6A6357] font-light">
            We collaborate with architectural studios, global brands, and international private clients on bespoke visual direction.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#BFA175] hover:text-[#1A1918] transition-colors"
          >
            <span>Start A Conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

