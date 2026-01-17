'use client';

import { useState } from 'react';
import { MessageCircle, ThumbsUp, Send } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Comment {
  id: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  content: string;
  likes: number;
  createdAt: string;
}

interface CommentSectionProps {
  seriesId: string;
  comments: Comment[];
}

export default function CommentSection({ seriesId, comments: initialComments }: CommentSectionProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seriesId, content }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([newComment, ...comments]);
        setContent('');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-6 h-6" />
        <h2 className="text-2xl font-bold">ความคิดเห็น ({comments.length})</h2>
      </div>

      {/* Submit Comment Form */}
      {session ? (
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            {/* User Avatar */}
            <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-800">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg font-bold">
                  {(session.user?.name || 'U')[0].toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 transition-colors resize-none"
                placeholder="แสดงความคิดเห็น..."
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={loading || !content.trim()}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'กำลังส่ง...' : 'ส่ง'}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <p className="text-gray-400 mb-3">เข้าสู่ระบบเพื่อแสดงความคิดเห็น</p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold text-sm transition-colors"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-8 text-center text-gray-400">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็น!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                {/* User Avatar */}
                <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-800">
                  {comment.user.image ? (
                    <Image
                      src={comment.user.image}
                      alt={comment.user.name || 'User'}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-bold">
                      {(comment.user.name || 'U')[0].toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  {/* User Info */}
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm">{comment.user.name || 'ผู้ใช้'}</h4>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Comment Content */}
                  <p className="text-gray-300 text-sm mb-2">{comment.content}</p>

                  {/* Actions */}
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs">{comment.likes}</span>
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
