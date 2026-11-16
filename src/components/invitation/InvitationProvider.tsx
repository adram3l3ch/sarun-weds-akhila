"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RsvpModal } from "@/components/overlays/RsvpModal";
import { WishesModal } from "@/components/overlays/WishesModal";
import { MusicControl } from "@/components/shared/MusicControl";
import { ShareControl } from "@/components/shared/ShareControl";
import { useWeddingAudio } from "@/hooks/useWeddingAudio";
import { getCoupleNames } from "@/lib/format";
import { buildShareText } from "@/lib/sharing";
import type { WeddingData } from "@/types/wedding";
import { InvitationContext } from "./InvitationContext";

type Overlay = "rsvp" | "wishes" | null;

interface InvitationProviderProps {
   wedding: WeddingData;
   children: React.ReactNode;
}

export function InvitationProvider({ wedding, children }: InvitationProviderProps) {
   const [opened, setOpened] = useState(false);
   const [overlay, setOverlay] = useState<Overlay>(null);

   const {
      isPlaying,
      isLoading,
      failed: musicFailed,
      play,
      toggle,
   } = useWeddingAudio({
      src: wedding.media.musicUrl,
      enabled: wedding.media.enableMusic,
      volume: wedding.media.volume,
   });

   const openInvitation = useCallback(() => {
      setOpened(true);

      if (!wedding.media.enableMusic) return;

      // Do not start audio for guests who have asked for reduced motion.
      const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion) {
         // Called directly from the opening click so browsers allow playback.
         void play();
      }
   }, [play, wedding.media.enableMusic]);

   const openRsvp = useCallback(() => {
      if (wedding.features.enableRsvp) setOverlay("rsvp");
   }, [wedding.features.enableRsvp]);

   const openWishes = useCallback(() => {
      if (wedding.features.enableWishes) setOverlay("wishes");
   }, [wedding.features.enableWishes]);

   const closeOverlay = useCallback(() => setOverlay(null), []);

   // Keep the cover and any open overlay scroll-locked.
   useEffect(() => {
      if (opened && !overlay) return;

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
         document.body.style.overflow = previousOverflow;
      };
   }, [opened, overlay]);

   // Move focus into the invitation once the cover has left.
   useEffect(() => {
      if (!opened) return;
      const timer = window.setTimeout(() => {
         document.getElementById("invitation")?.focus({ preventScroll: true });
      }, 650);
      return () => window.clearTimeout(timer);
   }, [opened]);

   const coupleNames = getCoupleNames(wedding.couple);
   const shareText = buildShareText({
      title: wedding.website.title,
      coupleNames,
      displayDate: wedding.invitation.displayDate,
      venueName: wedding.venue.name,
      url: wedding.website.url,
   });

   const contextValue = useMemo(() => ({ opened, openInvitation, openRsvp, openWishes }), [opened, openInvitation, openRsvp, openWishes]);

   const floatingTransition = { duration: 0.5, delay: 0.55 };

   return (
      <InvitationContext.Provider value={contextValue}>
         {children}

         <AnimatePresence>
            {opened && wedding.media.enableMusic && !musicFailed ? (
               <motion.div
                  key="music-control"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={floatingTransition}
                  className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-5 z-[60]"
               >
                  <MusicControl isPlaying={isPlaying} isLoading={isLoading} onToggle={toggle} />
               </motion.div>
            ) : null}

            {opened && wedding.features.enableWhatsappShare ? (
               <motion.div
                  key="share-control"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={floatingTransition}
                  className="fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-[60]"
               >
                  <ShareControl shareText={shareText} shareTitle={wedding.website.title} url={wedding.website.url} />
               </motion.div>
            ) : null}
         </AnimatePresence>

         <RsvpModal open={wedding.features.enableRsvp && overlay === "rsvp"} onClose={closeOverlay} coupleNames={coupleNames} />

         <WishesModal
            open={wedding.features.enableWishes && overlay === "wishes"}
            onClose={closeOverlay}
            coupleNames={coupleNames}
            samples={wedding.wishes.samples}
         />
      </InvitationContext.Provider>
   );
}
