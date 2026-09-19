import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  const [packages, addons] = await Promise.all([
    prisma.package.findMany({
      orderBy: { order: 'asc' },
      include: { category: true },
    }),
    prisma.packageAddon.findMany({
      orderBy: { order: 'asc' },
    }),
  ]);

  return NextResponse.json({ packages, addons });
}

export async function POST(req: Request) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      name,
      slug,
      description,
      price,
      showPrice,
      duration,
      imagesCount,
      deliverables,
      categoryId,
      isFeatured,
      order,
    } = body;

    const pkg = await prisma.package.create({
      data: {
        name,
        slug: slug ? slugify(slug) : slugify(name),
        description,
        price: price || null,
        showPrice: showPrice !== undefined ? Boolean(showPrice) : true,
        duration,
        imagesCount,
        deliverables: typeof deliverables === 'string' ? deliverables : deliverables.join('\n'),
        categoryId: categoryId || null,
        isFeatured: Boolean(isFeatured),
        order: order ? parseInt(order, 10) : 0,
      },
    });

    return NextResponse.json(pkg, { status: 201 });
  } catch (error: any) {
    console.error('Create package error:', error);
    return NextResponse.json(
      { error: 'Failed to create package.' },
      { status: 500 }
    );
  }
}
