'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  // Mock user state - in real app, use context or state management
  const isLoggedIn = true;
  const isAdmin = true;

  return (
    <nav className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">
                SeriesHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              หน้าแรก
            </Link>
            <Link
              href="/series"
              className="text-gray-300 hover:text-white transition-colors"
            >
              ซีรี่ย์
            </Link>
            <Link
              href="/categories"
              className="text-gray-300 hover:text-white transition-colors"
            >
              หมวดหมู่
            </Link>
            <Link
              href="/my-list"
              className="text-gray-300 hover:text-white transition-colors"
            >
              รายการของฉัน
            </Link>
          </div>

          {/* Search & User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => router.push('/search')}
              className="p-2 text-gray-300 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-800 py-2">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <User className="w-4 h-4" />
                      <span>โปรไฟล์</span>
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <hr className="my-2 border-gray-800" />
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white w-full">
                      <LogOut className="w-4 h-4" />
                      <span>ออกจากระบบ</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black/95 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-gray-300 hover:text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              หน้าแรก
            </Link>
            <Link
              href="/series"
              className="block text-gray-300 hover:text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              ซีรี่ย์
            </Link>
            <Link
              href="/categories"
              className="block text-gray-300 hover:text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              หมวดหมู่
            </Link>
            <Link
              href="/my-list"
              className="block text-gray-300 hover:text-white py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              รายการของฉัน
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
