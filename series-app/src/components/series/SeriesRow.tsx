'use client';

import { Series } from '@/types';
import SeriesCard from './SeriesCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

interface SeriesRowProps {
  title: string;
  series: Series[];
  userWatchlist?: string[];
  onToggleWatchlist?: (seriesId: string) => void;
}

export default function SeriesRow({
  title,
  series,
  userWatchlist = [],
  onToggleWatchlist,
}: SeriesRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 px-4 sm:px-6 lg:px-8">{title}</h2>

      <div className="relative group/row">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black p-2 rounded-r-lg opacity-0 group-hover/row:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Series Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {series.map((s) => (
            <div key={s.id} className="flex-shrink-0 w-48">
              <SeriesCard
                series={s}
                isInWatchlist={userWatchlist.includes(s.id)}
                onToggleWatchlist={onToggleWatchlist}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black p-2 rounded-l-lg opacity-0 group-hover/row:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
