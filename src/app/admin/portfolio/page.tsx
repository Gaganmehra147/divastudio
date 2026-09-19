import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import AdminHeader from '@/components/admin/AdminHeader';
import { Plus, Edit, Trash2, CheckCircle, XCircle, MapPin } from 'lucide-react';

export const revalidate = 0;

export default async function AdminPortfolioPage() {
  const projects = await prisma.project.findMany({
    include: {
      category: true,
      images: true,
    },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2]">
      <AdminHeader
        title="Portfolio CMS"
        subtitle="Curate projects, reorder galleries, and upload high-resolution photographs."
        actionButton={{
          label: 'Create Project',
          href: '/admin/portfolio/new',
        }}
      />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="bg-[#FAF7F2] border border-[#1A1918]/10 overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#1A1918]/10 bg-[#F4EFE6] text-[#6A6357] uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="p-4">Cover</th>
                <th className="p-4">Title & Client</th>
                <th className="p-4">Category</th>
                <th className="p-4">Location</th>
                <th className="p-4">Photos</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1918]/5">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-[#F4EFE6]/50 transition-colors">
                  <td className="p-4">
                    <div className="relative w-16 h-12 bg-[#1E1D1B] overflow-hidden">
                      <Image
                        src={proj.coverImage}
                        alt={proj.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-[#1A1918]">
                    <Link
                      href={`/admin/portfolio/${proj.id}`}
                      className="hover:text-[#BFA175] transition-colors"
                    >
                      {proj.title}
                    </Link>
                    {proj.client && (
                      <span className="block text-[10px] text-[#9E9689] font-normal">
                        {proj.client}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-[#6A6357]">{proj.category.name}</td>
                  <td className="p-4 text-[#6A6357]">{proj.location || '—'}</td>
                  <td className="p-4 font-mono">{proj.images.length} images</td>
                  <td className="p-4">
                    {proj.isFeatured ? (
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5">
                        FEATURED
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-neutral-500">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    {proj.isPublished ? (
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5">
                        PUBLISHED
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-neutral-600 bg-neutral-200 px-2 py-0.5">
                        DRAFT
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/admin/portfolio/${proj.id}`}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#1A1918] text-[#FAF7F2] text-[10px] uppercase tracking-wider hover:bg-[#BFA175] transition-colors"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
