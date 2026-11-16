"use client";

import { MotionConfig } from "motion/react";

/**
 * Lets Motion automatically soften transform animations for guests who have
 * asked for reduced motion. Kept at the root so server-rendered initial styles
 * stay identical on both sides of hydration.
 */
export function MotionPreferences({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
