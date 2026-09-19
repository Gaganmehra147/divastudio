import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminHeader from '@/components/admin/AdminHeader';
import ProjectForm from '@/components/admin/ProjectForm';

export const revalidate = 0;

export default async function NewProjectPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    select: { id: true, name: true },
  });

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2]">
      <AdminHeader
        title="Create Portfolio Project"
        subtitle="Add a new commissioned story or fine art project to the studio archive."
      />
      <ProjectForm categories={categories} />
    </div>
  );
}
