import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const project = await prisma.project.findFirst({
    where: {
      OR: [{ id: params.id }, { slug: params.id }],
    },
    include: {
      category: true,
      images: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      slug,
      categoryId,
      client,
      location,
      date,
      sessionType,
      coverImage,
      story,
      featuredImage,
      tags,
      isFeatured,
      isPublished,
      seoTitle,
      seoDescription,
      images,
    } = body;

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(slug && { slug: slugify(slug) }),
        ...(categoryId && { categoryId }),
        ...(client !== undefined && { client }),
        ...(location !== undefined && { location }),
        ...(date !== undefined && { date }),
        ...(sessionType !== undefined && { sessionType }),
        ...(coverImage && { coverImage }),
        ...(story && { story }),
        ...(featuredImage !== undefined && { featuredImage }),
        ...(tags !== undefined && { tags }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(isPublished !== undefined && { isPublished }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDescription !== undefined && { seoDescription }),
      },
    });

    // If new images array provided, replace project images
    if (images && Array.isArray(images)) {
      await prisma.projectImage.deleteMany({
        where: { projectId: params.id },
      });

      if (images.length > 0) {
        await prisma.projectImage.createMany({
          data: images.map((img: any, idx: number) => ({
            projectId: params.id,
            url: img.url,
            caption: img.caption || null,
            aspectRatio: img.aspectRatio || 'landscape',
            order: img.order !== undefined ? img.order : idx + 1,
            isFeatured: Boolean(img.isFeatured),
          })),
        });
      }
    }

    const updated = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.project.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
