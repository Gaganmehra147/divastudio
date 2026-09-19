import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  Inbox,
  Image as ImageIcon,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Plus,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [
    totalEnquiries,
    newEnquiries,
    bookedEnquiries,
    totalProjects,
    totalPosts,
    totalTestimonials,
    recentEnquiries,
  ] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: 'NEW' } }),
    prisma.enquiry.count({ where: { status: 'BOOKED' } }),
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.testimonial.count(),
    prisma.enquiry.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const stats = [
    { label: 'Total Enquiries', value: totalEnquiries, icon: Inbox, color: 'text-neutral-900' },
    { label: 'New Inquiries', value: newEnquiries, icon: Clock, color: 'text-amber-600' },
    { label: 'Booked Sessions', value: bookedEnquiries, icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Portfolio Projects', value: totalProjects, icon: ImageIcon, color: 'text-neutral-900' },
    { label: 'Published Essays', value: totalPosts, icon: BookOpen, color: 'text-neutral-900' },
    { label: 'Client Reviews', value: totalTestimonials, icon: Calendar, color: 'text-neutral-900' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2]">
      <AdminHeader
        title="Atelier Overview"
        subtitle="Live metrics, active client inquiries, and studio operations."
        actionButton={{
          label: 'Add Project',
          href: '/admin/portfolio/new',
        }}
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-8 lg:space-y-10 max-w-7xl">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-[#FAF7F2] border border-[#1A1918]/10 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-[#9E9689]">
                  <span className="font-mono text-[10px] uppercase tracking-wider">{s.label}</span>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <p className="font-serif text-3xl font-light text-[#1A1918]">
                  {s.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions Strip */}
        <div className="p-6 bg-[#F4EFE6] border border-[#1A1918]/10 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#1A1918]">
            Quick Actions:
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/portfolio/new"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-wider hover:bg-[#BFA175] hover:text-[#1A1918] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Project</span>
            </Link>

            <Link
              href="/admin/enquiries"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-[#FAF7F2] border border-[#1A1918]/20 text-[#1A1918] text-xs uppercase tracking-wider hover:border-[#1A1918] transition-colors"
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Manage CRM</span>
            </Link>

            <Link
              href="/admin/blog"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-[#FAF7F2] border border-[#1A1918]/20 text-[#1A1918] text-xs uppercase tracking-wider hover:border-[#1A1918] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Write Essay</span>
            </Link>
          </div>
        </div>

        {/* Recent Enquiries Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-light text-[#1A1918]">
              Recent Inquiries & Requests
            </h2>
            <Link
              href="/admin/enquiries"
              className="text-xs uppercase tracking-wider text-[#BFA175] hover:text-[#1A1918] flex items-center space-x-1"
            >
              <span>View All Enquiries</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-[#FAF7F2] border border-[#1A1918]/10 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#1A1918]/10 bg-[#F4EFE6] text-[#6A6357] uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Discipline</th>
                  <th className="p-4">Preferred Date</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1918]/5">
                {recentEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-[#9E9689]">
                      No enquiries received yet.
                    </td>
                  </tr>
                ) : (
                  recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-[#F4EFE6]/50 transition-colors">
                      <td className="p-4 font-medium text-[#1A1918]">{enq.name}</td>
                      <td className="p-4 text-[#6A6357]">
                        <p>{enq.email}</p>
                        <p className="text-[11px] font-mono">{enq.phone}</p>
                      </td>
                      <td className="p-4 text-[#1A1918]">{enq.photographyType}</td>
                      <td className="p-4 text-[#6A6357]">{enq.preferredDate || 'Flexible'}</td>
                      <td className="p-4 font-mono text-[#BFA175]">{enq.budget || '—'}</td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider ${
                            enq.status === 'NEW'
                              ? 'bg-amber-100 text-amber-800'
                              : enq.status === 'BOOKED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : enq.status === 'CONTACTED'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-neutral-100 text-neutral-800'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="p-4 text-right text-[#9E9689] font-mono">
                        {formatDate(enq.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
