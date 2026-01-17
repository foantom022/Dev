'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipForward,
  SkipBack,
} from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title: string;
  onEnded?: () => void;
  onProgress?: (progress: number) => void;
}

export default function SimpleVideoPlayer({
  url,
  title,
  onEnded,
  onProgress,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onProgress && duration > 0) {
        onProgress((video.currentTime / duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setPlaying(false);
      if (onEnded) onEnded();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [duration, onProgress, onEnded]);

  useEffect(() => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [playing]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = muted;
    }
  }, [volume, muted]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleFullscreen = () => {
    const element = document.querySelector('.video-player-container');
    if (element) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        element.requestFullscreen();
      }
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 10,
        duration
      );
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        videoRef.current.currentTime - 10,
        0
      );
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (playing) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div
      className="video-player-container relative bg-black aspect-video group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full"
        onClick={handlePlayPause}
      />

      {/* Center Play/Pause Button */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <button
            onClick={handlePlayPause}
            className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all hover:scale-110"
          >
            <Play className="w-10 h-10 fill-white ml-1" />
          </button>
        </div>
      )}

      {/* Title Overlay */}
      <div
        className={`absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent transition-opacity ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent transition-opacity ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600 hover:[&::-webkit-slider-thumb]:bg-red-700"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              className="p-2 hover:bg-white/10 rounded transition-colors"
            >
              {playing ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 fill-white" />
              )}
            </button>

            {/* Skip Backward */}
            <button
              onClick={skipBackward}
              className="p-2 hover:bg-white/10 rounded transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Skip Forward */}
            <button
              onClick={skipForward}
              className="p-2 hover:bg-white/10 rounded transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {/* Volume */}
            <div className="flex items-center space-x-2 group/volume">
              <button
                onClick={toggleMute}
                className="p-2 hover:bg-white/10 rounded transition-colors"
              >
                {muted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/volume:w-20 transition-all h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="p-2 hover:bg-white/10 rounded transition-colors"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
