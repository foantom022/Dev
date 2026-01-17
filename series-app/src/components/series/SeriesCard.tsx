'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, Star, Check } from 'lucide-react';
import { Series } from '@/types';
import { getGenreColor } from '@/lib/utils';

interface SeriesCardProps {
  series: Series;
  isInWatchlist?: boolean;
  onToggleWatchlist?: (seriesId: string) => void;
}

export default function SeriesCard({
  series,
  isInWatchlist = false,
  onToggleWatchlist,
}: SeriesCardProps) {
  return (
    <div className="group relative">
      <Link href={`/series/${series.id}`}>
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
          <Image
            src={series.thumbnail}
            alt={series.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              <h3 className="font-bold text-lg line-clamp-2">{series.title}</h3>
              <p className="text-sm text-gray-300 line-clamp-1">
                {series.titleThai}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-semibold">{series.rating}</span>
                </div>
                <span className="text-sm text-gray-400">
                  {series.releaseYear}
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-1">
                {series.genre.slice(0, 2).map((g) => (
                  <span
                    key={g}
                    className={`text-xs px-2 py-1 rounded ${getGenreColor(g)} text-white`}
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Link
                  href={`/watch/${series.id}`}
                  className="flex-1 flex items-center justify-center space-x-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-semibold">ดูเลย</span>
                </Link>
                {onToggleWatchlist && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onToggleWatchlist(series.id);
                    }}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                  >
                    {isInWatchlist ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Status Badge */}
          {series.status === 'ongoing' && (
            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
              กำลังฉาย
            </div>
          )}
          {series.status === 'upcoming' && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              เร็วๆ นี้
            </div>
          )}
        </div>
      </Link>

      {/* Quick info visible without hover */}
      <div className="mt-2">
        <h4 className="font-semibold text-sm line-clamp-1">{series.title}</h4>
        <p className="text-xs text-gray-400">
          {series.totalSeasons} ซีซั่น • {series.totalEpisodes} ตอน
        </p>
      </div>
    </div>
  );
}
