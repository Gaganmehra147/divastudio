import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' },
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, slug, excerpt, content, coverImage, category, author, readTime, isPublished } =
      await req.json();

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: slug ? slugify(slug) : slugify(title),
        excerpt,
        content,
        coverImage,
        category,
        author: author || 'DIVASTUDIO Editorial',
        readTime: readTime || '4 min read',
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error('Create blog post error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post.' },
      { status: 500 }
    );
  }
}
