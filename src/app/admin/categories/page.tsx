import React from 'react';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import AdminHeader from '@/components/admin/AdminHeader';

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: { projects: true },
      },
    },
  });

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2]">
      <AdminHeader
        title="Photography Disciplines & Categories"
        subtitle="Manage public portfolio filters and category cover images."
      />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className="bg-[#FAF7F2] border border-[#1A1918]/15 p-6 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1E1D1B]">
                <Image
                  src={cat.coverImage}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  sizes="350px"
                />
                <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-[#FAF7F2] bg-black/60 px-2 py-0.5">
                  ORDER 0{cat.order}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-light text-[#1A1918]">
                    {cat.name}
                  </h3>
                  <span className="font-mono text-[10px] text-[#BFA175] bg-[#1A1918] px-2 py-0.5">
                    {cat._count.projects} Projects
                  </span>
                </div>
                <p className="text-xs text-[#6A6357] font-light leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#1A1918]/10 text-[11px] font-mono text-[#9E9689]">
                Slug: /{cat.slug}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
