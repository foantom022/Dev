import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET user's watchlist
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const watchlist = await prisma.watchlist.findMany({
      where: { userId: (session.user as any).id },
      include: {
        series: true,
      },
    });

    return NextResponse.json(watchlist);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch watchlist' }, { status: 500 });
  }
}

// POST add to watchlist
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { seriesId } = await request.json();

    if (!seriesId) {
      return NextResponse.json({ error: 'Series ID required' }, { status: 400 });
    }

    const watchlist = await prisma.watchlist.create({
      data: {
        userId: (session.user as any).id,
        seriesId,
      },
    });

    return NextResponse.json(watchlist, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add to watchlist' }, { status: 500 });
  }
}

// DELETE remove from watchlist
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const seriesId = searchParams.get('seriesId');

    if (!seriesId) {
      return NextResponse.json({ error: 'Series ID required' }, { status: 400 });
    }

    await prisma.watchlist.delete({
      where: {
        userId_seriesId: {
          userId: (session.user as any).id,
          seriesId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove from watchlist' }, { status: 500 });
  }
}
