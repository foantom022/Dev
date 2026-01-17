// ประเภทข้อมูลหลักสำหรับระบบ

export interface Series {
  id: string;
  title: string;
  titleThai?: string;
  description: string;
  thumbnail: string;
  banner: string;
  genre: Genre[];
  releaseYear: number;
  rating: number;
  totalSeasons: number;
  totalEpisodes: number;
  status: 'ongoing' | 'completed' | 'upcoming';
  cast: Cast[];
  seasons: Season[];
  trailer?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Season {
  id: string;
  seriesId: string;
  seasonNumber: number;
  title: string;
  description: string;
  episodes: Episode[];
  releaseDate: string;
  thumbnail: string;
}

export interface Episode {
  id: string;
  seasonId: string;
  episodeNumber: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in minutes
  videoUrl: string;
  releaseDate: string;
  views: number;
}

export interface Cast {
  id: string;
  name: string;
  nameThai?: string;
  role: string;
  character: string;
  image: string;
}

export type Genre =
  | 'Action'
  | 'Comedy'
  | 'Drama'
  | 'Fantasy'
  | 'Horror'
  | 'Mystery'
  | 'Romance'
  | 'Sci-Fi'
  | 'Thriller'
  | 'Documentary'
  | 'Crime'
  | 'Adventure';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  watchlist: string[]; // series IDs
  watchHistory: WatchHistory[];
  createdAt: string;
}

export interface WatchHistory {
  seriesId: string;
  seasonId: string;
  episodeId: string;
  watchedAt: string;
  progress: number; // percentage 0-100
  completed: boolean;
}

export interface Review {
  id: string;
  userId: string;
  seriesId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
}

export interface SearchFilters {
  query?: string;
  genre?: Genre[];
  year?: number;
  rating?: number;
  status?: Series['status'];
  sortBy?: 'latest' | 'rating' | 'popular' | 'title';
}
