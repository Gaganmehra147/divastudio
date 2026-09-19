import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowUpRight, Camera, Sparkles, MapPin, Compass } from 'lucide-react';
import StudioCraft from '@/components/home/StudioCraft';

export const revalidate = 60;

export default async function AboutPage() {
  const [profile, studio] = await Promise.all([
    prisma.photographerProfile.findFirst(),
    prisma.studioInfo.findFirst(),
  ]);

  return (
    <div className="pt-24 sm:pt-32 pb-24 text-[#1A1918]">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-16 sm:mb-28">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block font-sans">
            Atelier &amp; Philosophy
          </span>
          <h1
            className="font-serif font-light text-[#1A1918] leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Behind The Lens &amp; Craft
          </h1>
          <p className="text-base sm:text-lg text-[#6A6357] font-light leading-relaxed max-w-2xl">
            DIVASTUDIO was founded on a singular conviction: that photographic art should not manufacture emotion, but patiently wait for the quiet truth that exists between poses.
          </p>
        </div>
      </section>

      {/* Editorial Split: Portrait & Biography */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 shadow-2xl overflow-hidden bg-[#1E1D1B]" data-cursor="view">
              <Image
                src={profile?.portraitImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85'}
                alt="Elena Vance & Julian Thorne"
                fill
                priority
                className="object-cover img-zoom-hover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#9E9689] uppercase">
              <span>Elena Vance & Julian Thorne</span>
              <span>Founders & Directors</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 lg:pl-6">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#BFA175] font-mono">
                Creative Direction
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-snug text-[#1A1918]">
                &ldquo;{profile?.philosophy || 'We do not photograph poses. We photograph the moments between them.'}&rdquo;
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#6A6357] font-light leading-relaxed">
              <p>
                {profile?.bio || 'Trained in classical fine arts and editorial direction in Paris and Milan, Elena and Julian founded DIVASTUDIO to bring museum-grade intentionality back to private portraiture and celebratory documentation.'}
              </p>
              <p>
                Every commission begins with silence, space, and deep listening. Rather than dictating how a bride, a mother, or an artist should stand, we sculpt the atmospheric environment—natural light pouring through high factory windows, continuous warm tungsten glows, and a slow, meditative tempo.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#1A1918]/10 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#BFA175] font-mono">Disciplines</span>
                <p className="text-[#1A1918] font-medium">{profile?.specialties || 'Weddings, Portraits, Maternity, Fashion'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#BFA175] font-mono">Ateliers</span>
                <p className="text-[#1A1918] font-medium">{profile?.studioLocation || 'New York & Milan'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Physical Studio Space */}
      <StudioCraft />

      {/* Values & Principles */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-xl mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] block mb-2 font-sans">
              Foundational Values
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1918]">
              Principles of Our Atelier
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-3 pt-6 border-t border-[#1A1918]/15">
              <span className="font-mono text-xs text-[#BFA175] tracking-widest">01 / RETICENCE</span>
              <h3 className="font-serif text-2xl font-light text-[#1A1918]">Artistic Restraint</h3>
              <p className="text-xs sm:text-sm text-[#6A6357] font-light leading-relaxed">
                We reject visual noise, hyperbolic poses, and transient digital filters. Our color science and monochrome palettes are modeled after classic silver halide chemistry.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#1A1918]/15">
              <span className="font-mono text-xs text-[#BFA175] tracking-widest">02 / EMBRACE</span>
              <h3 className="font-serif text-2xl font-light text-[#1A1918]">Atmospheric Comfort</h3>
              <p className="text-xs sm:text-sm text-[#6A6357] font-light leading-relaxed">
                Great portraiture cannot occur in tense bodies. Our studio sessions are structured around genuine hospitality, calm pacing, and private breathing room.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#1A1918]/15">
              <span className="font-mono text-xs text-[#BFA175] tracking-widest">03 / HEIRLOOMS</span>
              <h3 className="font-serif text-2xl font-light text-[#1A1918]">Physical Permanence</h3>
              <p className="text-xs sm:text-sm text-[#6A6357] font-light leading-relaxed">
                We craft physical heirlooms meant to outlive digital platforms. Printed on 310gsm cotton rag and bound in Tuscany to last over 150 years without fading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section className="py-20 text-center bg-[#FAF7F2] border-t border-[#1A1918]/10">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1918]">
            Inquire About A Private Session
          </h3>
          <p className="text-sm text-[#6A6357] font-light">
            We welcome intimate portrait commissions, destination weddings, and commercial inquiries.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#BFA175] hover:text-[#1A1918] transition-colors"
          >
            <span>Book an Atelier Session</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
