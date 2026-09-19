import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminHeader from '@/components/admin/AdminHeader';
import { Check, Clock, Eye, EyeOff } from 'lucide-react';

export const revalidate = 0;

export default async function AdminPackagesPage() {
  const [packages, addons] = await Promise.all([
    prisma.package.findMany({
      orderBy: { order: 'asc' },
    }),
    prisma.packageAddon.findMany({
      orderBy: { order: 'asc' },
    }),
  ]);

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2]">
      <AdminHeader
        title="Session Packages & Add-Ons"
        subtitle="Control photography tier pricing, inclusions, and toggle public price visibility."
      />

      <div className="p-8 space-y-12 max-w-7xl">
        {/* Packages Section */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-light text-[#1A1918]">
            Photography Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const deliverables = pkg.deliverables.split('\n').filter(Boolean);
              return (
                <div
                  key={pkg.id}
                  className="p-6 bg-[#FAF7F2] border border-[#1A1918]/15 space-y-4 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase text-[#BFA175] tracking-widest">
                        ORDER 0{pkg.order}
                      </span>
                      <span
                        className={`inline-flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 ${
                          pkg.showPrice ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {pkg.showPrice ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{pkg.showPrice ? 'PRICE VISIBLE' : 'CONTACT FOR PRICE'}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-light text-[#1A1918]">
                      {pkg.name}
                    </h3>
                    <p className="font-mono text-xl text-[#BFA175]">
                      {pkg.price || 'Custom'}
                    </p>
                    <p className="text-xs text-[#6A6357] font-light">
                      {pkg.description}
                    </p>

                    <div className="pt-2 border-t border-[#1A1918]/10 space-y-1 text-xs">
                      <p className="text-[11px] font-mono text-[#9E9689]">
                        Duration: {pkg.duration} · {pkg.imagesCount}
                      </p>
                      <ul className="space-y-1 pt-2">
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

        {/* Add-ons Section */}
        <div className="space-y-4 pt-6 border-t border-[#1A1918]/10">
          <h2 className="font-serif text-2xl font-light text-[#1A1918]">
            A La Carte Add-Ons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map((addon) => (
              <div
                key={addon.id}
                className="p-4 bg-[#F4EFE6] border border-[#1A1918]/10 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-medium text-[#1A1918]">
                    {addon.name}
                  </h4>
                  <span className="font-mono text-xs text-[#BFA175] font-medium">
                    {addon.price}
                  </span>
                </div>
                <p className="text-xs text-[#6A6357] font-light">
                  {addon.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
