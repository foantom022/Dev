'use client';

import { useState } from 'react';
import { Star, ThumbsUp, Send } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Review {
  id: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  rating: number;
  comment: string;
  likes: number;
  createdAt: string;
}

interface ReviewSectionProps {
  seriesId: string;
  reviews: Review[];
}

export default function ReviewSection({ seriesId, reviews: initialReviews }: ReviewSectionProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seriesId, rating, comment }),
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews([newReview, ...reviews]);
        setComment('');
        setRating(5);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">รีวิวและคะแนน</h2>

      {/* Submit Review Form */}
      {session && (
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">คะแนนของคุณ</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      value <= rating
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-lg font-semibold">{rating}.0</span>
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              รีวิวของคุณ
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
              placeholder="เล่าถึงความรู้สึกของคุณเกี่ยวกับซีรี่ย์นี้..."
            />
          </div>

          <button
            type="submit"
            disabled={loading || !comment.trim()}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Send className="w-5 h-5" />
            <span>{loading ? 'กำลังส่ง...' : 'ส่งรีวิว'}</span>
          </button>
        </form>
      )}

      {!session && (
        <div className="bg-gray-900 rounded-lg p-6 text-center">
          <p className="text-gray-400 mb-4">เข้าสู่ระบบเพื่อเขียนรีวิว</p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-8 text-center text-gray-400">
            <p>ยังไม่มีรีวิว เป็นคนแรกที่รีวิวซีรี่ย์นี้!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                {/* User Avatar */}
                <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden bg-gray-800">
                  {review.user.image ? (
                    <Image
                      src={review.user.image}
                      alt={review.user.name || 'User'}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl font-bold">
                      {(review.user.name || 'U')[0].toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  {/* User Info & Rating */}
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{review.user.name || 'ผู้ใช้'}</h4>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-400 ml-2">
                          {new Date(review.createdAt).toLocaleDateString('th-TH')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-300 mb-3">{review.comment}</p>

                  {/* Actions */}
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{review.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
