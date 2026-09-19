import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get('category');
  const featured = searchParams.get('featured');

  const where: any = { isPublished: true };
  if (categorySlug && categorySlug !== 'ALL') {
    where.category = { slug: categorySlug };
  }
  if (featured === 'true') {
    where.isFeatured = true;
  }

  const projects = await prisma.project.findMany({
    where,
    include: {
      category: true,
      images: {
        orderBy: { order: 'asc' },
      },
    },
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
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

    if (!title || !categoryId || !coverImage || !story) {
      return NextResponse.json(
        { error: 'Title, category, cover image, and story are required.' },
        { status: 400 }
      );
    }

    const projectSlug = slug ? slugify(slug) : slugify(title);

    const project = await prisma.project.create({
      data: {
        title,
        slug: projectSlug,
        categoryId,
        client: client || null,
        location: location || null,
        date: date || null,
        sessionType: sessionType || null,
        coverImage,
        story,
        featuredImage: featuredImage || null,
        tags: tags || null,
        isFeatured: Boolean(isFeatured),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        images: images && images.length > 0 ? {
          create: images.map((img: any, idx: number) => ({
            url: img.url,
            caption: img.caption || null,
            aspectRatio: img.aspectRatio || 'landscape',
            order: img.order !== undefined ? img.order : idx + 1,
            isFeatured: Boolean(img.isFeatured),
          })),
        } : undefined,
      },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error('Project creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio project.' },
      { status: 500 }
    );
  }
}
