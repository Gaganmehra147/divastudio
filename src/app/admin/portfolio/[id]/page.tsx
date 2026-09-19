import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminHeader from '@/components/admin/AdminHeader';
import ProjectForm from '@/components/admin/ProjectForm';

export const revalidate = 0;

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const [project, categories] = await Promise.all([
    prisma.project.findUnique({
      where: { id: params.id },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
    }),
    prisma.category.findMany({
      orderBy: { order: 'asc' },
      select: { id: true, name: true },
    }),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2]">
      <AdminHeader
        title={`Edit Project: ${project.title}`}
        subtitle="Update project imagery, client information, and gallery sequence."
      />
      <ProjectForm categories={categories} initialData={project} />
    </div>
  );
}
