'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: { url: string; caption?: string | null }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  // Touch swipe state
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown, isOpen]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartXRef.current;
    const dy = e.changedTouches[0].clientY - touchStartYRef.current;
    // Only trigger swipe if horizontal movement is dominant
    if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx) * 0.8) return;
    if (dx < 0) onNext();
    else onPrev();
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100000] bg-[#0A0A09]/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-8 select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top bar: Counter & Close */}
        <div className="flex items-center justify-between text-[#FAF7F2] z-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9E9689] font-mono">
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>

          {/* Close button — min 44×44px touch target */}
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#FAF7F2] hover:text-[#BFA175] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA175] rounded-sm"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Center: Image Display with Next/Prev Controls */}
        <div className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden">
          {/* Prev Button — min 44×44px */}
          {images.length > 1 && (
            <button
              onClick={onPrev}
              className="absolute left-0 sm:left-4 z-20 min-w-[44px] min-h-[60px] sm:min-h-[44px] flex items-center justify-center rounded-r sm:rounded-full bg-black/40 text-[#FAF7F2] hover:bg-black/70 hover:text-[#BFA175] transition-all backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA175]"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Main Image with AnimatePresence */}
          <div className="relative w-full h-full max-h-[82vh] flex items-center justify-center">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
            >
              <Image
                src={currentImage.url}
                alt={currentImage.caption || 'Photograph'}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </motion.div>
          </div>

          {/* Next Button — min 44×44px */}
          {images.length > 1 && (
            <button
              onClick={onNext}
              className="absolute right-0 sm:right-4 z-20 min-w-[44px] min-h-[60px] sm:min-h-[44px] flex items-center justify-center rounded-l sm:rounded-full bg-black/40 text-[#FAF7F2] hover:bg-black/70 hover:text-[#BFA175] transition-all backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA175]"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Bottom bar: Caption + touch swipe hint */}
        <div className="text-center z-10 min-h-[30px] flex flex-col items-center justify-center gap-2 px-4">
          {currentImage.caption && (
            <motion.p
              key={`caption-${currentIndex}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm font-serif italic text-[#FAF7F2]/80 tracking-wide max-w-xl"
            >
              &ldquo;{currentImage.caption}&rdquo;
            </motion.p>
          )}
          {images.length > 1 && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#9E9689] sm:hidden">
              ← swipe to navigate →
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
