import { type ClassValue, clsx } from "clsx";

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format duration to readable format
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours} ชม. ${mins} นาที`;
  }
  return `${mins} นาที`;
}

// Format number with comma separator
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('th-TH').format(num);
}

// Format date to Thai format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Calculate reading time
export function getYearFromDate(dateString: string): number {
  return new Date(dateString).getFullYear();
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

// Get genre color
export function getGenreColor(genre: string): string {
  const colors: Record<string, string> = {
    Action: 'bg-red-500',
    Comedy: 'bg-yellow-500',
    Drama: 'bg-blue-500',
    Fantasy: 'bg-purple-500',
    Horror: 'bg-gray-800',
    Mystery: 'bg-indigo-500',
    Romance: 'bg-pink-500',
    'Sci-Fi': 'bg-cyan-500',
    Thriller: 'bg-orange-500',
    Documentary: 'bg-green-500',
    Crime: 'bg-red-700',
    Adventure: 'bg-emerald-500',
  };
  return colors[genre] || 'bg-gray-500';
}
