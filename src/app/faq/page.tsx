import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import FaqAccordion from '@/components/home/FaqAccordion';
import { ArrowUpRight } from 'lucide-react';

export const revalidate = 0;

export default async function FaqPage() {
  const faqs = await prisma.faq.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="pt-24 sm:pt-32 pb-24 text-[#1A1918]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block font-sans">
            Inquiries & Information
          </span>
          <h1 className="font-serif font-light text-[#1A1918] leading-[1.05] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-[#6A6357] font-light leading-relaxed max-w-2xl">
            Everything you need to know regarding reserving your date, wardrobe guidance, travel logistics, and archival heirloom delivery.
          </p>
        </div>
      </section>

      {/* Accordion Component */}
      <FaqAccordion faqs={faqs} />

      {/* Direct Contact */}
      <section className="text-center py-20 bg-[#F4EFE6] border-t border-[#1A1918]/10 mt-20">
        <div className="max-w-xl mx-auto px-6 space-y-4">
          <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1918]">
            Have a Specific Question?
          </h3>
          <p className="text-xs sm:text-sm text-[#6A6357] font-light">
            Our atelier concierge is available to answer any bespoke scheduling or location questions.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#BFA175] hover:text-[#1A1918] transition-colors"
            >
              <span>Contact Our Atelier</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

