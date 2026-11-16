"use client";

import { motion } from "motion/react";
import { useInvitation } from "./InvitationContext";

interface InvitationCanvasProps {
  children: React.ReactNode;
}

/** Reveals the invitation after the cover begins to lift away. */
export function InvitationCanvas({ children }: InvitationCanvasProps) {
  const { opened } = useInvitation();

  return (
    <motion.div
      initial={false}
      animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 18 }}
      transition={{
        duration: 0.9,
        delay: opened ? 0.25 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-hidden={!opened}
      inert={!opened}
    >
      {children}
    </motion.div>
  );
}
