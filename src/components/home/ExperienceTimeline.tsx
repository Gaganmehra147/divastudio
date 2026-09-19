'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ExperienceTimeline() {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      subtitle: 'Understanding Your Narrative',
      description: 'Before touching the camera, we invest time into understanding your dynamic, aesthetic sensibilities, and what matters most to your heritage. A slow, intimate dialogue.',
    },
    {
      number: '02',
      title: 'Planning & Styling',
      subtitle: 'Moodboards & Architectural Direction',
      description: 'We curate styling guides, scout natural light patterns, and coordinate wardrobe textures (raw linens, heavy wools, silks) to ensure every frame possesses artistic cohesion.',
    },
    {
      number: '03',
      title: 'The Session',
      subtitle: 'Unforced Presence & Natural Light',
      description: 'An unhurried experience. We curate music, light, and breathing room. You are guided gently without rigid staging, allowing involuntary truth to blossom.',
    },
    {
      number: '04',
      title: 'Curation',
      subtitle: 'Discerning the Masterpieces',
      description: 'From thousands of raw exposures, we distill the collection to only the strongest emotional frames—those with sculptural composition, honest gaze, and narrative depth.',
    },
    {
      number: '05',
      title: 'Editing & Color Grade',
      subtitle: 'Subtle Film Emulation',
      description: 'Every frame is individually color graded by hand. We replicate the organic grain, shadow density, and skin luminosity of classic medium-format color negative and silver gelatin film.',
    },
    {
      number: '06',
      title: 'Delivery & Heirlooms',
      subtitle: 'Private Gallery & Fine Art Prints',
      description: 'Unveiled through an exclusive digital suite followed by the handcrafting of your Italian leather albums and museum-grade cotton rag prints.',
    },
  ];

  return (
    <section className="py-24 sm:py-36 bg-[#FAF7F2] text-[#1A1918]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 pb-6 border-b border-[#1A1918]/10 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block mb-3 font-sans">
              The Journey
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#1A1918]">
              The DIVASTUDIO Experience
            </h2>
          </div>
          <Link
            href="/experience"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.22em] text-[#1A1918] hover:text-[#BFA175] transition-colors"
          >
            <span>Read Process Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Editorial Storytelling Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * idx }}
              className="flex flex-col justify-between space-y-4 pt-6 border-t border-[#1A1918]/15"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#BFA175]">
                  STEP {step.number}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9E9689]">
                  PHASE 0{idx + 1}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1918] mb-1">
                  {step.title}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#6A6357] mb-3">
                  {step.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#4A453E] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

