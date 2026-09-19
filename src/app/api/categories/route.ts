import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: { projects: true },
      },
    },
  });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, slug, description, coverImage, isFeatured, order } = await req.json();

    if (!name || !description || !coverImage) {
      return NextResponse.json(
        { error: 'Name, description, and cover image are required.' },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug: slug ? slugify(slug) : slugify(name),
        description,
        coverImage,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : true,
        order: order ? parseInt(order, 10) : 0,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { error: 'Failed to create category.' },
      { status: 500 }
    );
  }
}
