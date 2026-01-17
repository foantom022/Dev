import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  try {
    if (!session?.user) {
      // Return popular series for non-authenticated users
      const popular = await prisma.series.findMany({
        orderBy: { rating: 'desc' },
        take: 10,
      });
      return NextResponse.json(popular);
    }

    const userId = (session.user as any).id;

    // Get user's watch history
    const watchHistory = await prisma.watchHistory.findMany({
      where: { userId },
      include: { series: true },
    });

    // Get user's watchlist
    const watchlist = await prisma.watchlist.findMany({
      where: { userId },
      include: { series: true },
    });

    // Extract genres from watched series
    const watchedGenres: { [key: string]: number } = {};
    [...watchHistory.map(w => w.series), ...watchlist.map(w => w.series)].forEach(series => {
      const genres = JSON.parse(series.genre);
      genres.forEach((genre: string) => {
        watchedGenres[genre] = (watchedGenres[genre] || 0) + 1;
      });
    });

    // Get top 3 genres
    const topGenres = Object.entries(watchedGenres)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([genre]) => genre);

    // Find series with similar genres that user hasn't watched
    const watchedSeriesIds = new Set([
      ...watchHistory.map(w => w.seriesId),
      ...watchlist.map(w => w.seriesId),
    ]);

    const allSeries = await prisma.series.findMany({
      orderBy: { rating: 'desc' },
    });

    const recommendations = allSeries
      .filter(series => !watchedSeriesIds.has(series.id))
      .map(series => {
        const genres = JSON.parse(series.genre);
        const matchCount = genres.filter((g: string) => topGenres.includes(g)).length;
        return { series, matchCount };
      })
      .sort((a, b) => {
        if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
        return b.series.rating - a.series.rating;
      })
      .slice(0, 10)
      .map(r => r.series);

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Recommendation error:', error);
    return NextResponse.json({ error: 'Failed to get recommendations' }, { status: 500 });
  }
}
