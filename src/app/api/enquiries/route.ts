import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export async function GET(req: Request) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  const where = status ? { status } : {};
  const enquiries = await prisma.enquiry.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(enquiries);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      city,
      photographyType,
      preferredDate,
      preferredTime,
      peopleCount,
      budget,
      message,
    } = body;

    if (!name || !phone || !email || !photographyType || !message) {
      return NextResponse.json(
        { error: 'Please provide all required fields.' },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        phone,
        email,
        city: city || null,
        photographyType,
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
        peopleCount: peopleCount || null,
        budget: budget || null,
        message,
        status: 'NEW',
      },
    });

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (error: any) {
    console.error('Enquiry creation error:', error);
    return NextResponse.json(
      { error: 'Failed to record enquiry.' },
      { status: 500 }
    );
  }
}
