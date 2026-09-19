import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export async function GET() {
  const faqs = await prisma.faq.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(faqs);
}

export async function POST(req: Request) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { question, answer, category, order, isPublished } = await req.json();

    const faq = await prisma.faq.create({
      data: {
        question,
        answer,
        category: category || 'General',
        order: order ? parseInt(order, 10) : 0,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (error: any) {
    console.error('Create FAQ error:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ.' },
      { status: 500 }
    );
  }
}
