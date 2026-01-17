'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import SeriesCard from './SeriesCard';
import { Sparkles } from 'lucide-react';
import { Series } from '@/types';

export default function RecommendationSection() {
  const { data: session } = useSession();
  const [recommendations, setRecommendations] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, [session]);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('/api/recommendations');
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session || loading) return null;

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-6 h-6 text-purple-500" />
        <h2 className="text-2xl font-bold">แนะนำสำหรับคุณ</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {recommendations.slice(0, 6).map((series) => (
          <SeriesCard key={series.id} series={series} />
        ))}
      </div>
    </div>
  );
}
