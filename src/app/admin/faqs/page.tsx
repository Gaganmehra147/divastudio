import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminHeader from '@/components/admin/AdminHeader';

export const revalidate = 0;

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2]">
      <AdminHeader
        title="Frequently Asked Questions"
        subtitle="Manage client questions, answers, and category assignments."
      />

      <div className="p-8 space-y-6 max-w-5xl">
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="p-6 bg-[#FAF7F2] border border-[#1A1918]/15 space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#BFA175]">
                  {faq.category} · ORDER 0{faq.order}
                </span>
                <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5">
                  PUBLISHED
                </span>
              </div>
              <h3 className="font-serif text-xl font-light text-[#1A1918]">
                {faq.question}
              </h3>
              <p className="text-xs text-[#6A6357] font-light leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
