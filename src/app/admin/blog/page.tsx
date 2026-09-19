import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import AdminHeader from '@/components/admin/AdminHeader';
import { formatDate } from '@/lib/utils';
import { Edit } from 'lucide-react';

export const revalidate = 0;

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2]">
      <AdminHeader
        title="Editorial Journal & Essays"
        subtitle="Manage photography philosophy articles, styling guides, and journal entries."
      />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="bg-[#FAF7F2] border border-[#1A1918]/10 overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#1A1918]/10 bg-[#F4EFE6] text-[#6A6357] uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="p-4">Cover</th>
                <th className="p-4">Article Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Read Time</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1918]/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#F4EFE6]/50 transition-colors">
                  <td className="p-4">
                    <div className="relative w-16 h-12 bg-[#1E1D1B] overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-[#1A1918]">
                    <p className="font-serif text-base">{post.title}</p>
                    <span className="text-[10px] text-[#9E9689] font-mono">/{post.slug}</span>
                  </td>
                  <td className="p-4 text-[#BFA175] font-mono">{post.category}</td>
                  <td className="p-4 text-[#6A6357]">{post.author}</td>
                  <td className="p-4 text-[#6A6357]">{post.readTime}</td>
                  <td className="p-4 text-[#6A6357] font-mono">{formatDate(post.publishedAt)}</td>
                  <td className="p-4">
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5">
                      PUBLISHED
                    </span>
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
