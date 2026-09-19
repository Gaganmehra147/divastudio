import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(testimonials);
}

export async function POST(req: Request) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { clientName, clientPhoto, sessionType, location, quote, rating, isFeatured, order } =
      await req.json();

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        clientPhoto: clientPhoto || null,
        sessionType,
        location: location || null,
        quote,
        rating: rating || 5,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : true,
        order: order ? parseInt(order, 10) : 0,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error: any) {
    console.error('Create testimonial error:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial.' },
      { status: 500 }
    );
  }
}
