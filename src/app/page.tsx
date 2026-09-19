import React from 'react';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/home/Hero';
import EditorialStatement from '@/components/home/EditorialStatement';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import SelectedStories from '@/components/home/SelectedStories';
import ThroughTheLens from '@/components/home/ThroughTheLens';
import BehindTheLens from '@/components/home/BehindTheLens';
import ExperienceTimeline from '@/components/home/ExperienceTimeline';
import TestimonialQuote from '@/components/home/TestimonialQuote';
import AlbumsPrints from '@/components/home/AlbumsPrints';
import FaqAccordion from '@/components/home/FaqAccordion';
import VisualJournal from '@/components/home/VisualJournal';
import BookingCta from '@/components/home/BookingCta';

export const revalidate = 60; // Instant cached response with ISR background revalidation

export default async function HomePage() {
  // Fetch dynamic studio content from database
  const [categories, projects, testimonials, faqs, albums, settings, profile] = await Promise.all([
    prisma.category.findMany({
      where: { isFeatured: true },
      orderBy: { order: 'asc' },
    }),
    prisma.project.findMany({
      where: { isPublished: true },
      include: { category: true },
      orderBy: { order: 'asc' },
      take: 6,
    }),
    prisma.testimonial.findMany({
      where: { isFeatured: true },
      orderBy: { order: 'asc' },
    }),
    prisma.faq.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
      take: 6,
    }),
    prisma.albumPrint.findMany({
      where: { isAvailable: true },
      orderBy: { order: 'asc' },
    }),
    prisma.siteSetting.findMany(),
    prisma.photographerProfile.findFirst(),
  ]);

  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Cinematic Hero */}
      <Hero
        headline={settingsMap['hero_headline'] || 'Stories Worth\nRemembering.'}
        subheadline={settingsMap['hero_subheadline']}
        heroImage={settingsMap['hero_image_desktop']}
      />

      {/* 2. Editorial Brand Statement */}
      <EditorialStatement
        quote={settingsMap['statement_quote']}
        story={settingsMap['statement_story']}
      />

      {/* 3. Photography Categories */}
      <CategoryShowcase categories={categories} />

      {/* 4. Selected Stories (Portfolio) */}
      <SelectedStories projects={projects} categories={categories} />

      {/* 5. Signature Interactive Experience: Through The Lens */}
      <ThroughTheLens />

      {/* 6. Behind The Lens (Photographer story & philosophy) */}
      <BehindTheLens profile={profile || undefined} />

      {/* 7. The Divastudio Experience (6-step timeline) */}
      <ExperienceTimeline />

      {/* 8. Editorial Testimonials */}
      <TestimonialQuote testimonials={testimonials} />

      {/* 10. Physical Heirlooms: Albums & Prints */}
      <AlbumsPrints albums={albums} />

      {/* 11. FAQ Accordion */}
      <FaqAccordion faqs={faqs} />

      {/* 12. Instagram / Visual Journal */}
      <VisualJournal />

      {/* 13. Booking CTA & Enquiry Form */}
      <BookingCta categories={categories} />
    </div>
  );
}
