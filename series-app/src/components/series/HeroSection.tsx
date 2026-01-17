'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, Info, Star } from 'lucide-react';
import { Series } from '@/types';

interface HeroSectionProps {
  series: Series;
  isInWatchlist?: boolean;
  onToggleWatchlist?: (seriesId: string) => void;
}

export default function HeroSection({
  series,
  isInWatchlist = false,
  onToggleWatchlist,
}: HeroSectionProps) {
  return (
    <div className="relative h-[70vh] min-h-[600px] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={series.banner}
          alt={series.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-20">
        <div className="max-w-2xl space-y-4">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            {series.title}
          </h1>
          {series.titleThai && (
            <p className="text-2xl text-gray-300">{series.titleThai}</p>
          )}

          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              <span className="font-semibold">{series.rating}</span>
            </div>
            <span className="text-gray-300">{series.releaseYear}</span>
            <span className="text-gray-300">
              {series.totalSeasons} ซีซั่น
            </span>
            <div
              className={`px-2 py-1 rounded text-xs ${
                series.status === 'ongoing'
                  ? 'bg-green-600'
                  : series.status === 'upcoming'
                    ? 'bg-blue-600'
                    : 'bg-gray-600'
              }`}
            >
              {series.status === 'ongoing'
                ? 'กำลังฉาย'
                : series.status === 'upcoming'
                  ? 'เร็วๆ นี้'
                  : 'จบแล้ว'}
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {series.genre.map((g) => (
              <span
                key={g}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-200 text-lg line-clamp-3 max-w-xl">
            {series.description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href={`/watch/${series.id}`}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>ดูเลย</span>
            </Link>

            {onToggleWatchlist && (
              <button
                onClick={() => onToggleWatchlist(series.id)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>{isInWatchlist ? 'ลบจากรายการ' : 'เพิ่มในรายการ'}</span>
              </button>
            )}

            <Link
              href={`/series/${series.id}`}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Info className="w-5 h-5" />
              <span>ข้อมูลเพิ่มเติม</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
