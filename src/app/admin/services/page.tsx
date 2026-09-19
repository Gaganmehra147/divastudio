import React from 'react';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import AdminHeader from '@/components/admin/AdminHeader';
import { Clock, Check } from 'lucide-react';

export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2]">
      <AdminHeader
        title="Services & Offerings"
        subtitle="Manage public service pages, duration, deliverables, and starting pricing."
      />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc) => {
            const deliverables = svc.deliverables.split('\n').filter(Boolean);
            return (
              <div
                key={svc.id}
                className="p-6 bg-[#FAF7F2] border border-[#1A1918]/15 space-y-4 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1E1D1B]">
                    <Image
                      src={svc.coverImage}
                      alt={svc.title}
                      fill
                      className="object-cover"
                      sizes="500px"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#BFA175]">
                      <span>{svc.duration}</span>
                      <span>From {svc.startingPrice}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-light text-[#1A1918] mt-1">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-[#6A6357] font-light mt-1">
                      {svc.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#4A453E] font-light leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#1A1918]/10 text-xs">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#9E9689]">
                      Deliverables:
                    </span>
                    <ul className="space-y-1">
                      {deliverables.map((d, i) => (
                        <li key={i} className="flex items-center space-x-2 text-[#4A453E]">
                          <Check className="w-3 h-3 text-[#BFA175]" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
