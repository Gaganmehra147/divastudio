'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Aperture, Focus } from 'lucide-react';

export default function ThroughTheLens() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focalLength, setFocalLength] = useState('85mm');
  const [aperture, setAperture] = useState('f/1.4');
  const [isTouch, setIsTouch] = useState(false);

  // Detect touch device on mount
  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(hasTouch);
  }, []);

  // Mouse position normalized (-1 to 1)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D rotation and parallax
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);
  const lensRotate = useTransform(mouseXSpring, [-0.5, 0.5], [-35, 35]);
  const textTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);
  const textTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isTouch) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Touch swipe to cycle between presets
  const touchStartXRef = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(delta) < 40) return; // ignore tiny taps
    const currentIdx = focalPresets.findIndex((p) => p.label === focalLength);
    if (delta < 0) {
      // swipe left → next
      const next = focalPresets[(currentIdx + 1) % focalPresets.length];
      setFocalLength(next.label);
      setAperture(next.aperture);
    } else {
      // swipe right → prev
      const prev = focalPresets[(currentIdx - 1 + focalPresets.length) % focalPresets.length];
      setFocalLength(prev.label);
      setAperture(prev.aperture);
    }
  };

  const focalPresets = [
    { label: '50mm', aperture: 'f/1.2', name: 'Haldi Ecstasy & Candid Motion', img: '/images/cat_haldi_mehendi.jpg' },
    { label: '85mm', aperture: 'f/1.4', name: 'Royal Udaipur Palace Twilight', img: '/images/hero_indian_wedding.jpg' },
    { label: '110mm', aperture: 'f/2.0', name: 'Maharani Bridal Fine Art Portrait', img: '/images/cat_bridal_portrait.jpg' },
  ];

  const currentPreset = focalPresets.find((p) => p.label === focalLength) || focalPresets[1];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-24 md:py-36 bg-[#141312] text-[#FAF7F2] overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#BFA175]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#BFA175]">
            <Focus className="w-3.5 h-3.5 text-[#BFA175]" />
            <span>Signature Interactive Experience</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#FAF7F2]">
            Through The Lens
          </h2>
          <p className="text-xs sm:text-sm text-[#9E9689] max-w-xl mx-auto font-light leading-relaxed">
            {isTouch
              ? 'Tap a focal length below or swipe the frame to explore the optical depth, vintage lens tilt, and atmospheric stillness of our royal wedding documentation.'
              : 'Move your cursor to experience the optical depth of field, vintage lens tilt, and atmospheric stillness that defines our royal wedding documentation.'}
          </p>

          {/* Focal Length Selector Tabs — wrap on small screens */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {focalPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setFocalLength(preset.label);
                  setAperture(preset.aperture);
                }}
                className={`px-3 sm:px-4 py-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] rounded-full transition-all duration-300 border min-h-[40px] ${
                  focalLength === preset.label
                    ? 'border-[#BFA175] text-[#141312] bg-[#BFA175] font-medium'
                    : 'border-[#FAF7F2]/15 text-[#9E9689] hover:border-[#FAF7F2]/40 hover:text-[#FAF7F2]'
                }`}
                aria-pressed={focalLength === preset.label}
              >
                {preset.label} · {preset.aperture}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Interactive Stage */}
        <div
          className="relative max-w-4xl mx-auto aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] [perspective:1400px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            style={{
              rotateX: isTouch ? 0 : rotateX,
              rotateY: isTouch ? 0 : rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="w-full h-full relative rounded-sm overflow-hidden border border-[#BFA175]/30 shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
          >
            {/* Active Photograph with Depth Effect */}
            <motion.div
              key={currentPreset.img}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentPreset.img}
                alt="Through The Lens Study"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
            </motion.div>

            {/* Rotating Optics Reticle Overlay */}
            <motion.div
              style={{ rotate: isTouch ? 0 : lensRotate }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
            >
              <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-80 md:h-80 border border-[#FAF7F2]/20 rounded-full border-dashed flex items-center justify-center">
                <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 border border-[#BFA175]/50 rounded-full flex items-center justify-center">
                  <Aperture className="w-6 h-6 sm:w-8 sm:h-8 text-[#BFA175] animate-spin-slow stroke-[1]" />
                </div>
              </div>
            </motion.div>

            {/* Viewfinder HUD Metadata (Top) */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.2em] sm:tracking-[0.25em] text-[#FAF7F2]/90 pointer-events-none">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>AF-C · {focalLength}</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="hidden sm:inline">ISO 100</span>
                <span className="hidden sm:inline">1/250s</span>
                <span className="text-[#BFA175] font-bold">{aperture}</span>
              </div>
            </div>

            {/* Viewfinder Narrative (Bottom) */}
            <motion.div
              style={{
                x: isTouch ? 0 : textTranslateX,
                y: isTouch ? 0 : textTranslateY,
                transformStyle: 'preserve-3d',
                transform: isTouch ? undefined : 'translateZ(40px)',
              }}
              className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 sm:gap-4 pointer-events-none"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.26em] text-[#BFA175] font-sans font-medium">
                  {currentPreset.name}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#FAF7F2] font-light">
                  The Sacred Breath of Royal Vows
                </h3>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#FAF7F2]/80 tracking-wider font-mono sm:text-right shrink-0">
                HASSELBLAD H6D-100C
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Touch swipe hint — only on touch devices */}
        {isTouch && (
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#9E9689] mt-5">
            ← Swipe to change scene →
          </p>
        )}
      </div>
    </section>
  );
}
