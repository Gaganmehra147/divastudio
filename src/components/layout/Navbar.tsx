'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowUpRight } from 'lucide-react';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide public navbar on admin pages
  const isAdmin = pathname?.startsWith('/admin');
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdmin) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Experience', href: '/experience' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  // Dark text on scrolled or non-home pages; Crisp white/ivory on transparent hero
  const useLightText = !isScrolled && isHomePage;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md py-4 border-b border-[#1E1D1B]/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
            : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-6 md:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-col items-start focus:outline-none"
            aria-label="DIVASTUDIO Homepage"
          >
            <span
              className={`font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase font-light transition-colors duration-300 drop-shadow-sm ${
                useLightText ? 'text-[#FAF7F2]' : 'text-[#1A1918]'
              }`}
            >
              DIVASTUDIO
            </span>
            <span
              className={`text-[9px] uppercase tracking-[0.34em] -mt-1 font-sans transition-colors duration-300 ${
                useLightText ? 'text-[#BFA175]' : 'text-[#9E9689]'
              }`}
            >
              Atelier Photographique
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={`hidden lg:flex items-center space-x-8 text-[12px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
              useLightText ? 'text-[#FAF7F2]/90' : 'text-[#4A453E]'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-300 ${
                    useLightText
                      ? isActive
                        ? 'text-[#BFA175]'
                        : 'hover:text-[#BFA175]'
                      : isActive
                      ? 'text-[#1A1918]'
                      : 'hover:text-[#1A1918]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        useLightText ? 'bg-[#BFA175]' : 'bg-[#1A1918]'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Primary CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className={`hidden sm:inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.22em] font-medium py-2.5 px-5 rounded-full transition-all duration-300 shadow-sm ${
                useLightText
                  ? 'border border-[#FAF7F2]/80 text-[#FAF7F2] bg-black/20 backdrop-blur-sm hover:bg-[#BFA175] hover:border-[#BFA175] hover:text-[#141312]'
                  : 'border border-[#1A1918]/80 text-[#1A1918] hover:bg-[#1A1918] hover:text-[#FAF7F2]'
              }`}
              data-cursor="book"
            >
              <span>Book a Session</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </Link>

            {/* Mobile Hamburger Button — min 44×44px touch target */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA175] rounded-sm transition-colors ${
                useLightText ? 'text-[#FAF7F2]' : 'text-[#1A1918]'
              }`}
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-haspopup="dialog"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Luxury Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            links={navLinks}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

