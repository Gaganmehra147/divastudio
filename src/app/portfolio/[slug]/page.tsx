import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ArrowLeft, ArrowUpRight, MapPin, Calendar, User, Tag } from 'lucide-react';
import ProjectGallery from '@/components/portfolio/ProjectGallery';

export const revalidate = 0;

export default async function ProjectStoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      images: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!project) {
    notFound();
  }

  // Fetch adjacent project for next story link
  const nextProject = await prisma.project.findFirst({
    where: {
      isPublished: true,
      id: { not: project.id },
    },
    orderBy: { order: 'asc' },
  });

  return (
    <article className="min-h-screen text-[#1A1918] bg-[#FAF7F2]">
      {/* Full-Screen Project Hero */}
      <section className="relative w-full h-[85vh] sm:h-[92vh] flex items-end justify-start overflow-hidden bg-[#141312] pb-16 sm:pb-24">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          className="object-cover object-center brightness-90 contrast-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-black/20 to-transparent" />

        <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <Link
            href="/portfolio"
            className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.24em] text-[#FAF7F2]/80 hover:text-[#BFA175] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>

          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#BFA175] block mb-2">
            {project.category.name}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#FAF7F2] leading-tight">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Editorial Metadata Strip */}
      <section className="border-b border-[#1A1918]/10 bg-[#F4EFE6] py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[#6A6357]">
            {project.client && (
              <div className="space-y-1">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#9E9689] font-mono">
                  Client / Couple
                </span>
                <p className="text-[#1A1918] font-medium">{project.client}</p>
              </div>
            )}

            {project.location && (
              <div className="space-y-1">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#9E9689] font-mono">
                  Location
                </span>
                <p className="text-[#1A1918] font-medium">{project.location}</p>
              </div>
            )}

            {project.sessionType && (
              <div className="space-y-1">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#9E9689] font-mono">
                  Session Type
                </span>
                <p className="text-[#1A1918] font-medium">{project.sessionType}</p>
              </div>
            )}

            {project.date && (
              <div className="space-y-1">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#9E9689] font-mono">
                  Season / Date
                </span>
                <p className="text-[#1A1918] font-medium">{project.date}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Narrative Story */}
      <section className="py-16 sm:py-28 max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E9689] font-mono">
            The Narrative
          </span>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1918] leading-relaxed italic">
            &ldquo;{project.story}&rdquo;
          </p>
        </div>
      </section>

      {/* Complete Mixed Editorial Photo Gallery with Lightbox */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-28">
        <ProjectGallery images={project.images} />
      </section>

      {/* Next Story Navigation Banner */}
      {nextProject && (
        <section className="border-t border-[#1A1918]/10 py-16 sm:py-24 bg-[#141312] text-[#FAF7F2]">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#BFA175] font-mono">
              Next Visual Story
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl font-light">
              {nextProject.title}
            </h3>
            <div className="pt-4">
              <Link
                href={`/portfolio/${nextProject.slug}`}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-[#FAF7F2] text-[#141312] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#BFA175] transition-colors"
              >
                <span>Explore This Story</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
