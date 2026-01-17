'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockSeries } from '@/data/mockData';
import { Play, Plus, Star, Calendar, Tv, Clock } from 'lucide-react';
import { formatDate, formatDuration, getGenreColor } from '@/lib/utils';

interface SeriesPageProps {
  params: Promise<{ id: string }>;
}

export default function SeriesDetailPage({ params }: SeriesPageProps) {
  const { id } = use(params);
  const series = mockSeries.find((s) => s.id === id);

  if (!series) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[60vh] w-full">
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

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            {series.title}
          </h1>
          {series.titleThai && (
            <p className="text-2xl text-gray-300 mb-4">{series.titleThai}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Meta Info & Actions */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                  <span className="text-2xl font-bold">{series.rating}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-5 h-5" />
                  <span>{series.releaseYear}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Tv className="w-5 h-5" />
                  <span>
                    {series.totalSeasons} ซีซั่น, {series.totalEpisodes} ตอน
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded ${
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

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/watch/${series.id}`}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>เริ่มดู</span>
                </Link>
                <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold transition-colors">
                  <Plus className="w-5 h-5" />
                  <span>เพิ่มในรายการ</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">เรื่องย่อ</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {series.description}
              </p>
            </div>

            {/* Genres */}
            <div>
              <h2 className="text-2xl font-bold mb-4">หมวดหมู่</h2>
              <div className="flex flex-wrap gap-2">
                {series.genre.map((g) => (
                  <span
                    key={g}
                    className={`px-4 py-2 rounded-lg text-white font-semibold ${getGenreColor(g)}`}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Cast */}
            {series.cast.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">นักแสดง</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {series.cast.map((c) => (
                    <div key={c.id} className="space-y-2">
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                        <Image
                          src={c.image}
                          alt={c.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{c.name}</p>
                        {c.nameThai && (
                          <p className="text-sm text-gray-400">{c.nameThai}</p>
                        )}
                        <p className="text-sm text-gray-500">{c.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seasons & Episodes */}
            <div>
              <h2 className="text-2xl font-bold mb-4">ตอนทั้งหมด</h2>
              <div className="space-y-6">
                {series.seasons.map((season) => (
                  <div key={season.id} className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      ซีซั่น {season.seasonNumber}: {season.title}
                    </h3>
                    <p className="text-gray-400">{season.description}</p>

                    <div className="space-y-3">
                      {season.episodes.map((episode) => (
                        <Link
                          key={episode.id}
                          href={`/watch/${series.id}?season=${season.seasonNumber}&episode=${episode.episodeNumber}`}
                          className="flex gap-4 p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors group"
                        >
                          <div className="relative w-40 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-800">
                            <Image
                              src={episode.thumbnail}
                              alt={episode.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              sizes="160px"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-8 h-8 fill-white" />
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">
                                  {episode.episodeNumber}. {episode.title}
                                </h4>
                                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{formatDuration(episode.duration)}</span>
                                  </div>
                                  <span>{formatDate(episode.releaseDate)}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2">
                              {episode.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trailer */}
            {series.trailer && (
              <div>
                <h3 className="text-xl font-bold mb-4">ตัวอย่าง</h3>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
                  <iframe
                    src={`https://www.youtube.com/embed/${new URL(series.trailer).searchParams.get('v')}`}
                    className="w-full h-full"
                    allowFullScreen
                    title="Trailer"
                  />
                </div>
              </div>
            )}

            {/* Info */}
            <div className="bg-gray-900 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-bold">ข้อมูลเพิ่มเติม</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">สถานะ:</span>
                  <span className="ml-2">
                    {series.status === 'ongoing'
                      ? 'กำลังฉาย'
                      : series.status === 'upcoming'
                        ? 'เร็วๆ นี้'
                        : 'จบแล้ว'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">ปีที่ออกฉาย:</span>
                  <span className="ml-2">{series.releaseYear}</span>
                </div>
                <div>
                  <span className="text-gray-400">จำนวนซีซั่น:</span>
                  <span className="ml-2">{series.totalSeasons}</span>
                </div>
                <div>
                  <span className="text-gray-400">จำนวนตอน:</span>
                  <span className="ml-2">{series.totalEpisodes}</span>
                </div>
                <div>
                  <span className="text-gray-400">คะแนน:</span>
                  <span className="ml-2">{series.rating} / 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
