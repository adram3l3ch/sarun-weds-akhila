"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type AudioStatus = "idle" | "loading" | "playing" | "paused" | "error";

interface UseWeddingAudioOptions {
  src: string;
  enabled: boolean;
  volume?: number;
}

/**
 * Owns the background audio element. Playback is only ever started by an
 * explicit call from a user interaction, so autoplay policies are respected.
 */
export function useWeddingAudio({
  src,
  enabled,
  volume = 0.3,
}: UseWeddingAudioOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<AudioStatus>("idle");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!enabled || !src) return;

    const audio = new Audio();
    audio.src = src;
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = volume;
    audioRef.current = audio;

    const handlePlaying = () => setStatus("playing");
    const handlePause = () =>
      setStatus((current) => (current === "error" ? current : "paused"));
    const handleWaiting = () => setStatus((current) => current === "playing" ? current : "loading");
    const handleError = () => {
      setFailed(true);
      setStatus("error");
    };

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, [enabled, src, volume]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
    } catch {
      // Usually a browser autoplay restriction or a missing file. Keep the
      // control usable so the guest can try again.
      setStatus((current) => (current === "error" ? current : "paused"));
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void play();
    } else {
      pause();
    }
  }, [pause, play]);

  // If the guest leaves the tab or locks their phone, pause rather than
  // playing to an empty room.
  useEffect(() => {
    if (!enabled) return;

    const handleVisibility = () => {
      if (document.hidden) {
        const audio = audioRef.current;
        if (audio && !audio.paused) audio.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [enabled]);

  return {
    status,
    isPlaying: status === "playing",
    isLoading: status === "loading",
    failed: failed || status === "error",
    play,
    pause,
    toggle,
  };
}
