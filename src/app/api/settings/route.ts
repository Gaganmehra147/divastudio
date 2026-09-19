import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionAdmin } from '@/lib/auth';

export async function GET() {
  const [settings, profile, studio] = await Promise.all([
    prisma.siteSetting.findMany(),
    prisma.photographerProfile.findFirst(),
    prisma.studioInfo.findFirst(),
  ]);

  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return NextResponse.json({
    settings: settingsMap,
    profile,
    studio,
  });
}

export async function POST(req: Request) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { settings, profile, studio } = await req.json();

    // Update settings
    if (settings && typeof settings === 'object') {
      for (const [key, value] of Object.entries(settings)) {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        });
      }
    }

    // Update photographer profile
    if (profile && profile.id) {
      await prisma.photographerProfile.update({
        where: { id: profile.id },
        data: {
          name: profile.name,
          role: profile.role,
          portraitImage: profile.portraitImage,
          bio: profile.bio,
          philosophy: profile.philosophy,
          specialties: profile.specialties,
          studioLocation: profile.studioLocation,
        },
      });
    }

    // Update studio info
    if (studio && studio.id) {
      await prisma.studioInfo.update({
        where: { id: studio.id },
        data: {
          name: studio.name,
          description: studio.description,
          address: studio.address,
          phone: studio.phone,
          email: studio.email,
          whatsapp: studio.whatsapp,
          instagram: studio.instagram,
          hours: studio.hours,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { error: 'Failed to update settings.' },
      { status: 500 }
    );
  }
}
