import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminHeader from '@/components/admin/AdminHeader';
import { Star } from 'lucide-react';

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2]">
      <AdminHeader
        title="Client Testimonials"
        subtitle="Manage client reflections, reviews, and featured status."
      />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-[#FAF7F2] border border-[#1A1918]/15 space-y-4 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#BFA175]">ORDER 0{t.order}</span>
                  <div className="flex items-center space-x-1 text-[#BFA175]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                <blockquote className="font-serif text-lg italic text-[#1A1918] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-3 border-t border-[#1A1918]/10 text-xs">
                <p className="font-medium text-[#1A1918]">{t.clientName}</p>
                <p className="text-[11px] text-[#6A6357]">{t.sessionType} · {t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
