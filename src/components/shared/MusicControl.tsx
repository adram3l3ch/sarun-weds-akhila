"use client";

import { Loader2, Pause, Play } from "lucide-react";

interface MusicControlProps {
  isPlaying: boolean;
  isLoading: boolean;
  onToggle: () => void;
}

export function MusicControl({
  isPlaying,
  isLoading,
  onToggle,
}: MusicControlProps) {
  const label = isLoading
    ? "Loading background music"
    : isPlaying
      ? "Pause background music"
      : "Play background music";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-pressed={isPlaying}
      title={label}
      className="group relative grid size-11 place-items-center rounded-full border border-gold/45 bg-ivory/90 text-teak shadow-[0_8px_28px_rgba(99,59,50,0.1)] backdrop-blur transition-colors duration-300 hover:border-gold hover:bg-sand/60"
    >
      {isLoading ? (
        <Loader2
          className="size-4 animate-spin text-gold"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ) : isPlaying ? (
        <Pause className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
      ) : (
        <Play className="ml-0.5 size-3.5" strokeWidth={1.6} aria-hidden="true" />
      )}
      {isPlaying ? (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-gold"
        />
      ) : null}
    </button>
  );
}
