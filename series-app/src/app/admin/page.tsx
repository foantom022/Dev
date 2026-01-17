'use client';

import { useState } from 'react';
import { mockSeries, mockUsers } from '@/data/mockData';
import {
  Tv,
  Users,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'series' | 'users'>(
    'overview'
  );

  // Calculate statistics
  const totalSeries = mockSeries.length;
  const totalEpisodes = mockSeries.reduce(
    (sum, s) => sum + s.totalEpisodes,
    0
  );
  const totalUsers = mockUsers.length;
  const avgRating =
    mockSeries.reduce((sum, s) => sum + s.rating, 0) / mockSeries.length;
  const totalViews = mockSeries.reduce(
    (sum, s) => sum + s.seasons.reduce(
      (seasonSum, season) => seasonSum + season.episodes.reduce(
        (epSum, ep) => epSum + ep.views,
        0
      ),
      0
    ),
    0
  );

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">จัดการระบบและเนื้อหาซีรี่ย์</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ภาพรวม
          </button>
          <button
            onClick={() => setActiveTab('series')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'series'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            จัดการซีรี่ย์
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'users'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ผู้ใช้งาน
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Tv className="w-8 h-8" />
                  <TrendingUp className="w-5 h-5 text-red-200" />
                </div>
                <h3 className="text-2xl font-bold mb-1">{totalSeries}</h3>
                <p className="text-red-100 text-sm">ซีรี่ย์ทั้งหมด</p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="w-8 h-8" />
                  <TrendingUp className="w-5 h-5 text-blue-200" />
                </div>
                <h3 className="text-2xl font-bold mb-1">{totalEpisodes}</h3>
                <p className="text-blue-100 text-sm">ตอนทั้งหมด</p>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8" />
                  <TrendingUp className="w-5 h-5 text-green-200" />
                </div>
                <h3 className="text-2xl font-bold mb-1">{totalUsers}</h3>
                <p className="text-green-100 text-sm">ผู้ใช้งาน</p>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Eye className="w-8 h-8" />
                  <TrendingUp className="w-5 h-5 text-purple-200" />
                </div>
                <h3 className="text-2xl font-bold mb-1">
                  {formatNumber(totalViews)}
                </h3>
                <p className="text-purple-100 text-sm">ยอดวิวทั้งหมด</p>
              </div>
            </div>

            {/* Recent Series */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">ซีรี่ย์ล่าสุด</h2>
              <div className="space-y-4">
                {mockSeries.slice(0, 5).map((series) => (
                  <div
                    key={series.id}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative w-20 h-28 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={series.thumbnail}
                          alt={series.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{series.title}</h3>
                        <p className="text-sm text-gray-400">
                          {series.titleThai}
                        </p>
                        <div className="flex items-center space-x-3 mt-2 text-sm text-gray-500">
                          <span>{series.releaseYear}</span>
                          <span>•</span>
                          <span>⭐ {series.rating}</span>
                          <span>•</span>
                          <span>{series.totalEpisodes} ตอน</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded text-sm ${
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
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Series Management Tab */}
        {activeTab === 'series' && (
          <div className="space-y-6">
            {/* Header with Add Button */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">จัดการซีรี่ย์</h2>
                <p className="text-gray-400 text-sm">
                  เพิ่ม แก้ไข หรือลบซีรี่ย์
                </p>
              </div>
              <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
                <Plus className="w-5 h-5" />
                <span>เพิ่มซีรี่ย์ใหม่</span>
              </button>
            </div>

            {/* Series Table */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        ซีรี่ย์
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        สถานะ
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        คะแนน
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        ซีซั่น/ตอน
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        ปี
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold">
                        จัดการ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {mockSeries.map((series) => (
                      <tr
                        key={series.id}
                        className="hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative w-12 h-16 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={series.thumbnail}
                                alt={series.title}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            <div>
                              <p className="font-semibold">{series.title}</p>
                              <p className="text-sm text-gray-400">
                                {series.titleThai}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
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
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-yellow-500 font-semibold">
                            ⭐ {series.rating}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {series.totalSeasons}S / {series.totalEpisodes}E
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {series.releaseYear}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={`/series/${series.id}`}
                              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                              title="ดู"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                              title="แก้ไข"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-700 rounded transition-colors"
                              title="ลบ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">ผู้ใช้งาน</h2>
              <p className="text-gray-400 text-sm">จัดการบัญชีผู้ใช้งาน</p>
            </div>

            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        ผู้ใช้งาน
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        อีเมล
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        บทบาท
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        รายการ
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        สร้างเมื่อ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {mockUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            {user.avatar && (
                              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                  src={user.avatar}
                                  alt={user.name}
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              </div>
                            )}
                            <span className="font-semibold">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              user.role === 'admin'
                                ? 'bg-purple-600'
                                : 'bg-blue-600'
                            }`}
                          >
                            {user.role === 'admin' ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {user.watchlist.length} ซีรี่ย์
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {new Date(user.createdAt).toLocaleDateString('th-TH')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
