import React from 'react';
import { prisma } from '@/lib/prisma';
import BookingCta from '@/components/home/BookingCta';
import { MapPin, Phone, Mail, Clock, Instagram, MessageSquare } from 'lucide-react';

export const revalidate = 0;

export default async function ContactPage() {
  const [categories, studio] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: 'asc' } }),
    prisma.studioInfo.findFirst(),
  ]);

  return (
    <div className="pt-24 sm:pt-32 pb-24 text-[#1A1918]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-12 sm:mb-20">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block font-sans">
            Atelier Inquiries
          </span>
          <h1
            className="font-serif font-light text-[#1A1918] leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Reserve Your Session
          </h1>
          <p className="text-base sm:text-lg text-[#6A6357] font-light leading-relaxed max-w-2xl">
            We accept a discerning number of commissions each calendar year. Please provide your dates, preferred locations, and an outline of your narrative vision.
          </p>
        </div>
      </section>

      {/* Atelier Details Strip */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-5 sm:p-8 md:p-10 bg-[#F4EFE6] border border-[#1A1918]/10 text-xs">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#BFA175]">
              <MapPin className="w-4 h-4" />
              <span className="uppercase font-mono tracking-widest">Main Atelier</span>
            </div>
            <p className="text-[#1A1918] font-medium leading-relaxed">
              {studio?.address || '128 Mercer Street, Floor 4, SoHo, New York'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#BFA175]">
              <Phone className="w-4 h-4" />
              <span className="uppercase font-mono tracking-widest">Telephone & WhatsApp</span>
            </div>
            <p className="text-[#1A1918] font-medium">
              <a href={`tel:${studio?.phone || '+12128479200'}`} className="hover:text-[#BFA175]">
                {studio?.phone || '+1 (212) 847-9200'}
              </a>
            </p>
            <p className="text-[11px] text-[#6A6357]">
              WhatsApp inquiries welcomed
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#BFA175]">
              <Mail className="w-4 h-4" />
              <span className="uppercase font-mono tracking-widest">Electronic Mail</span>
            </div>
            <p className="text-[#1A1918] font-medium">
              <a href={`mailto:${studio?.email || 'concierge@divastudio.com'}`} className="hover:text-[#BFA175]">
                {studio?.email || 'concierge@divastudio.com'}
              </a>
            </p>
            <p className="text-[11px] text-[#6A6357]">
              Confidential press & client desk
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#BFA175]">
              <Clock className="w-4 h-4" />
              <span className="uppercase font-mono tracking-widest">Consultations</span>
            </div>
            <p className="text-[#1A1918] font-medium">
              {studio?.hours || 'Tue — Sat: 10AM — 6:30PM'}
            </p>
            <p className="text-[11px] text-[#6A6357]">
              Strictly by private appointment
            </p>
          </div>
        </div>
      </section>

      {/* Main Booking Form */}
      <BookingCta categories={categories} />
    </div>
  );
}
