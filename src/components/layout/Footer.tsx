'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#141312] text-[#FAF7F2] pt-20 pb-12 border-t border-[#FAF7F2]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Editorial Invitation */}
        <div className="border-b border-[#FAF7F2]/10 pb-16 mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#BFA175] block mb-3 font-sans">
              Commission an Heirloom
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-[#FAF7F2]">
              Photographs made with intention, emotion, and architectural stillness.
            </h2>
          </div>
          <div className="w-full lg:w-auto">
            <Link
              href="/contact"
              className="w-full lg:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-[#FAF7F2] text-[#141312] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#BFA175] hover:text-[#141312] transition-colors duration-300"
              data-cursor="book"
            >
              <span>Begin a Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 text-sm">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4 pr-6">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.18em] uppercase font-light text-[#FAF7F2]">
                DIVASTUDIO
              </span>
            </Link>
            <p className="text-[#9E9689] text-sm leading-relaxed max-w-sm">
              An international fine art photography studio and creative atelier. We document love, identity, and legacy across the world with timeless editorial restraint.
            </p>
            <div className="pt-2 flex items-center space-x-4 text-xs tracking-widest text-[#BFA175]">
              <span>NEW YORK</span>
              <span>•</span>
              <span>MILAN</span>
              <span>•</span>
              <span>PARIS</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#9E9689]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-[#FAF7F2]/80">
              <li>
                <Link href="/about" className="hover:text-[#BFA175] transition-colors">
                  About the Studio
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#BFA175] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#BFA175] transition-colors">
                  Selected Stories
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-[#BFA175] transition-colors">
                  The Experience
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#BFA175] transition-colors">
                  Investment & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Stories & Heirlooms */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#9E9689]">
              Editorial
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-[#FAF7F2]/80">
              <li>
                <Link href="/blog" className="hover:text-[#BFA175] transition-colors">
                  Journal & Essays
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-[#BFA175] transition-colors">
                  Client Stories
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#BFA175] transition-colors">
                  Frequently Asked
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#BFA175] transition-colors">
                  Fine Art Albums
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Contact */}
          <div className="space-y-4 text-xs text-[#9E9689]">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#9E9689]">
              Atelier
            </h4>
            <div className="space-y-2.5 leading-relaxed">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#BFA175] shrink-0" />
                <span>128 Mercer St, Floor 4, SoHo, New York</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#BFA175] shrink-0" />
                <a href="tel:+12128479200" className="hover:text-[#FAF7F2] transition-colors">
                  +1 (212) 847-9200
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#BFA175] shrink-0 mt-0.5" />
                <a href="mailto:concierge@divastudio.com" className="hover:text-[#FAF7F2] transition-colors break-all">
                  concierge@divastudio.com
                </a>
              </div>
              <div className="flex items-start space-x-2 pt-1">
                <Clock className="w-3.5 h-3.5 mt-0.5 text-[#BFA175] shrink-0" />
                <span>Tue — Sat: 10AM — 6:30PM<br />By Private Appointment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Link */}
        <div className="border-t border-[#FAF7F2]/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] tracking-wider text-[#9E9689] gap-4">
          <p>© {new Date().getFullYear()} DIVASTUDIO Atelier. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FAF7F2] transition-colors">
              Instagram
            </a>
            <a href="https://wa.me/12128479200" target="_blank" rel="noopener noreferrer" className="hover:text-[#FAF7F2] transition-colors">
              WhatsApp
            </a>
            <Link href="/admin/login" className="hover:text-[#BFA175] transition-colors opacity-60 hover:opacity-100">
              Studio CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

