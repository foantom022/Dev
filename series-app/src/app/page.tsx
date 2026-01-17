'use client';

import { useState } from 'react';
import { mockSeries } from '@/data/mockData';
import HeroSection from '@/components/series/HeroSection';
import SeriesRow from '@/components/series/SeriesRow';
import { Genre } from '@/types';

export default function HomePage() {
  const [watchlist, setWatchlist] = useState<string[]>(['1', '4', '5']);

  const handleToggleWatchlist = (seriesId: string) => {
    setWatchlist((prev) =>
      prev.includes(seriesId)
        ? prev.filter((id) => id !== seriesId)
        : [...prev, seriesId]
    );
  };

  // Featured series for hero
  const featuredSeries = mockSeries[0];

  // Filter series by different criteria
  const trendingSeries = mockSeries.filter((s) => s.rating >= 4.7);
  const newReleases = mockSeries.filter(
    (s) => new Date(s.createdAt).getFullYear() >= 2022
  );
  const actionSeries = mockSeries.filter((s) =>
    s.genre.includes('Action' as Genre)
  );
  const dramaSeries = mockSeries.filter((s) =>
    s.genre.includes('Drama' as Genre)
  );
  const scifiSeries = mockSeries.filter((s) =>
    s.genre.includes('Sci-Fi' as Genre)
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        series={featuredSeries}
        isInWatchlist={watchlist.includes(featuredSeries.id)}
        onToggleWatchlist={handleToggleWatchlist}
      />

      {/* Series Rows */}
      <div className="space-y-8 -mt-32 relative z-10">
        {/* Trending */}
        {trendingSeries.length > 0 && (
          <SeriesRow
            title="🔥 กำลังฮิต"
            series={trendingSeries}
            userWatchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {/* New Releases */}
        {newReleases.length > 0 && (
          <SeriesRow
            title="🆕 เพิ่งออกใหม่"
            series={newReleases}
            userWatchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {/* My List */}
        {watchlist.length > 0 && (
          <SeriesRow
            title="📌 รายการของฉัน"
            series={mockSeries.filter((s) => watchlist.includes(s.id))}
            userWatchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {/* Action */}
        {actionSeries.length > 0 && (
          <SeriesRow
            title="💥 แอคชั่น"
            series={actionSeries}
            userWatchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {/* Drama */}
        {dramaSeries.length > 0 && (
          <SeriesRow
            title="🎭 ดราม่า"
            series={dramaSeries}
            userWatchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {/* Sci-Fi */}
        {scifiSeries.length > 0 && (
          <SeriesRow
            title="🚀 ไซไฟ"
            series={scifiSeries}
            userWatchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {/* All Series */}
        <SeriesRow
          title="📺 ทุกซีรี่ย์"
          series={mockSeries}
          userWatchlist={watchlist}
          onToggleWatchlist={handleToggleWatchlist}
        />
      </div>
    </div>
  );
}
