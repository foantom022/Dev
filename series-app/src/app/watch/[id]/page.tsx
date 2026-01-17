'use client';

import { use, useState } from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { mockSeries } from '@/data/mockData';
import SimpleVideoPlayer from '@/components/series/SimpleVideoPlayer';
import { ChevronRight, List } from 'lucide-react';
import Image from 'next/image';

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default function WatchPage({ params }: WatchPageProps) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const seasonParam = searchParams.get('season');
  const episodeParam = searchParams.get('episode');

  const series = mockSeries.find((s) => s.id === id);
  const [showEpisodeList, setShowEpisodeList] = useState(true);

  if (!series) {
    notFound();
  }

  // Get current season and episode
  const currentSeasonNumber = seasonParam ? parseInt(seasonParam) : 1;
  const currentEpisodeNumber = episodeParam ? parseInt(episodeParam) : 1;

  const currentSeason = series.seasons.find(
    (s) => s.seasonNumber === currentSeasonNumber
  );
  const currentEpisode = currentSeason?.episodes.find(
    (e) => e.episodeNumber === currentEpisodeNumber
  );

  if (!currentSeason || !currentEpisode) {
    notFound();
  }

  // Get next episode
  const nextEpisode =
    currentSeason.episodes.find(
      (e) => e.episodeNumber === currentEpisodeNumber + 1
    ) ||
    series.seasons
      .find((s) => s.seasonNumber === currentSeasonNumber + 1)
      ?.episodes[0];

  const handleVideoEnd = () => {
    if (nextEpisode) {
      const nextSeason = series.seasons.find((s) =>
        s.episodes.some((e) => e.id === nextEpisode.id)
      );
      if (nextSeason) {
        window.location.href = `/watch/${series.id}?season=${nextSeason.seasonNumber}&episode=${nextEpisode.episodeNumber}`;
      }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Video Player */}
      <div className="w-full">
        <SimpleVideoPlayer
          url={currentEpisode.videoUrl}
          title={`${series.title} - ซีซั่น ${currentSeasonNumber} ตอนที่ ${currentEpisodeNumber}: ${currentEpisode.title}`}
          onEnded={handleVideoEnd}
        />
      </div>

      {/* Content Below Video */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Episode Info */}
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <Link href="/" className="hover:text-white">
                  หน้าแรก
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link
                  href={`/series/${series.id}`}
                  className="hover:text-white"
                >
                  {series.title}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span>ซีซั่น {currentSeasonNumber}</span>
              </div>

              <h1 className="text-3xl font-bold mb-2">
                {currentEpisode.title}
              </h1>
              <p className="text-gray-400">
                ซีซั่น {currentSeasonNumber} ตอนที่ {currentEpisodeNumber}
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-2">เรื่องย่อ</h2>
              <p className="text-gray-300">{currentEpisode.description}</p>
            </div>

            {/* Next Episode */}
            {nextEpisode && (
              <div>
                <h2 className="text-xl font-semibold mb-4">ตอนถัดไป</h2>
                <Link
                  href={`/watch/${series.id}?season=${
                    series.seasons.find((s) =>
                      s.episodes.some((e) => e.id === nextEpisode.id)
                    )?.seasonNumber
                  }&episode=${nextEpisode.episodeNumber}`}
                  className="flex gap-4 p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors group"
                >
                  <div className="relative w-40 h-24 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={nextEpisode.thumbnail}
                      alt={nextEpisode.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="160px"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{nextEpisode.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {nextEpisode.description}
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar - Episode List */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center space-x-2">
                  <List className="w-5 h-5" />
                  <span>ตอนทั้งหมด</span>
                </h2>
                <button
                  onClick={() => setShowEpisodeList(!showEpisodeList)}
                  className="lg:hidden px-3 py-1 bg-gray-800 rounded"
                >
                  {showEpisodeList ? 'ซ่อน' : 'แสดง'}
                </button>
              </div>

              {(showEpisodeList || window.innerWidth >= 1024) && (
                <div className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                  {series.seasons.map((season) => (
                    <div key={season.id} className="space-y-2">
                      <h3 className="font-semibold text-sm text-gray-400 sticky top-0 bg-black py-2">
                        ซีซั่น {season.seasonNumber}
                      </h3>
                      {season.episodes.map((episode) => {
                        const isCurrentEpisode =
                          season.seasonNumber === currentSeasonNumber &&
                          episode.episodeNumber === currentEpisodeNumber;

                        return (
                          <Link
                            key={episode.id}
                            href={`/watch/${series.id}?season=${season.seasonNumber}&episode=${episode.episodeNumber}`}
                            className={`flex gap-3 p-3 rounded-lg transition-colors ${
                              isCurrentEpisode
                                ? 'bg-red-600'
                                : 'bg-gray-900 hover:bg-gray-800'
                            }`}
                          >
                            <div className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden">
                              <Image
                                src={episode.thumbnail}
                                alt={episode.title}
                                fill
                                className="object-cover"
                                sizes="96px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold line-clamp-1">
                                {episode.episodeNumber}. {episode.title}
                              </p>
                              <p className="text-xs text-gray-400">
                                {episode.duration} นาที
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
