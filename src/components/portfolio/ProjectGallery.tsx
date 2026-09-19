'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from '@/components/ui/Lightbox';

interface GalleryImage {
  id: string;
  url: string;
  caption?: string | null;
  aspectRatio?: string | null;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="space-y-12 sm:space-y-16">
        {images.map((img, idx) => {
          // Editorial rhythm: full width, 2-column portrait pairings, landscape
          const isFullWidth = img.aspectRatio === 'wide' || idx % 4 === 0;
          const isPortrait = img.aspectRatio === 'portrait';

          return (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="cursor-pointer group"
              data-cursor="view"
            >
              <div
                className={`relative w-full overflow-hidden bg-[#1E1D1B] shadow-lg ${
                  isFullWidth
                    ? 'aspect-[16/9] sm:aspect-[21/9]'
                    : isPortrait
                    ? 'aspect-[3/4] max-w-2xl mx-auto'
                    : 'aspect-[4/3] sm:aspect-[16/10]'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.caption || `Photograph 0${idx + 1}`}
                  fill
                  className="object-cover img-zoom-hover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>

              {img.caption && (
                <p className="mt-3 text-center text-xs font-serif italic text-[#6A6357] tracking-wide">
                  &ldquo;{img.caption}&rdquo;
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Cinematic Lightbox */}
      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
