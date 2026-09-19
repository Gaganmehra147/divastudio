'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { X, ArrowRight, Instagram, Mail, Phone } from 'lucide-react';

interface MobileMenuProps {
  links: { name: string; href: string }[];
  onClose: () => void;
}

export default function MobileMenu({ links, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Focus the close button for keyboard accessibility
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard: close on Escape, trap Tab within menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Backdrop — click to close */}
      <div
        className="fixed inset-0 z-[49] bg-black/20 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#141312] text-[#FAF7F2] flex flex-col justify-between overflow-y-auto shadow-2xl"
      >
        {/* Inner padding wrapper */}
        <div className="flex flex-col flex-1 p-7 sm:p-10">
          {/* Header with Logo & Close */}
          <div className="flex items-center justify-between border-b border-[#FAF7F2]/10 pb-6 mb-2">
            <div>
              <span className="font-serif text-xl tracking-[0.2em] uppercase font-light text-[#FAF7F2]">
                DIVASTUDIO
              </span>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#9E9689]">
                Atelier Photographique
              </p>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#FAF7F2] hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA175] rounded-sm transition-opacity"
              aria-label="Close Navigation"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Editorial Navigation Links */}
          <nav className="flex flex-col mt-2" aria-label="Site navigation">
            {links.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * idx, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between min-h-[52px] py-2 border-b border-[#FAF7F2]/8 text-[#FAF7F2]/85 hover:text-[#BFA175] transition-colors duration-300 focus:outline-none focus-visible:text-[#BFA175]"
                >
                  <span className="font-serif text-2xl sm:text-3xl tracking-wide font-light">
                    {link.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#9E9689] font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 ml-3">
                    0{idx + 1}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Footer Info & Booking */}
        <div className="border-t border-[#FAF7F2]/10 p-7 sm:p-10 space-y-5">
          <Link
            href="/contact"
            onClick={onClose}
            className="w-full flex items-center justify-center space-x-3 min-h-[52px] py-4 bg-[#BFA175] text-[#141312] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#D4BC9B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7F2]"
          >
            <span>Reserve a Commission</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>

          {/* Contact details — break-all prevents email overflow on 320px */}
          <div className="space-y-3 text-xs tracking-wider text-[#9E9689]">
            <a
              href="tel:+12128479200"
              className="hover:text-[#FAF7F2] transition-colors flex items-center space-x-2 min-h-[36px]"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>+1 (212) 847-9200</span>
            </a>
            <a
              href="mailto:concierge@divastudio.com"
              className="hover:text-[#FAF7F2] transition-colors flex items-start space-x-2 min-h-[36px]"
            >
              <Mail className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span className="break-all">concierge@divastudio.com</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FAF7F2] transition-colors flex items-center space-x-2 min-h-[36px]"
            >
              <Instagram className="w-3.5 h-3.5 shrink-0" />
              <span>@divastudio.official</span>
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
