"use client";

import { Eyebrow } from "@/components/shared/Eyebrow";
import { JasmineSprig } from "@/components/shared/JasmineSprig";
import { Monogram } from "@/components/shared/Monogram";
import type { CoupleData, InvitationData } from "@/types/wedding";
import { ArrowDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import PetalFall from "../overlays/PetalFall";
import { useInvitation } from "./InvitationContext";

interface InvitationCoverProps {
   couple: CoupleData;
   invitation: InvitationData;
   monogram: string;
}

export function InvitationCover({ couple, invitation, monogram }: InvitationCoverProps) {
   const { opened, openInvitation } = useInvitation();

   const fadeUp = (delay: number) => ({
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
   });

   return (
      <AnimatePresence>
         {!opened ? (
            <motion.div
               key="invitation-cover"
               role="dialog"
               aria-modal="true"
               aria-labelledby="cover-title"
               exit={{
                  opacity: 0,
                  transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
               }}
               className="fixed inset-0 z-[70] overflow-y-auto bg-[radial-gradient(130%_95%_at_50%_32%,#fcf8f1_0%,#f8f3e9_56%,#f1e8d8_100%)]"
            >
               <PetalFall />

               <div aria-hidden="true" className="kasavu-selvedge pointer-events-none absolute inset-x-0 top-0 h-4 opacity-75" />
               <div aria-hidden="true" className="kasavu-selvedge pointer-events-none absolute inset-x-0 bottom-0 h-4 rotate-180 opacity-75" />

               <div aria-hidden="true" className="pointer-events-none absolute inset-3 border border-gold/25 sm:inset-5 md:inset-6">
                  <span className="absolute top-0 left-0 size-4 border-t border-l border-gold/50" />
                  <span className="absolute top-0 right-0 size-4 border-t border-r border-gold/50" />
                  <span className="absolute bottom-0 left-0 size-4 border-b border-l border-gold/50" />
                  <span className="absolute right-0 bottom-0 size-4 border-r border-b border-gold/50" />
               </div>

               <div className="safe-x relative mx-auto flex min-h-svh w-full max-w-4xl flex-col items-center px-2 pb-6 text-center sm:pb-10">
                  <motion.div
                     {...fadeUp(0.1)}
                     className="flex flex-col items-center gap-3 pt-[max(3.5rem,calc(env(safe-area-inset-top)+2.5rem))] sm:pt-16"
                  >
                     <Eyebrow tone="gold">Together with our families</Eyebrow>
                     <span aria-hidden="true" className="h-px w-10 bg-gold/45" />
                  </motion.div>

                  <div className="flex flex-1 flex-col items-center justify-center py-10 sm:py-14">
                     <motion.div {...fadeUp(0.22)}>
                        <Monogram value={monogram} className="w-[5.5rem] sm:w-28" textClassName="text-[1.3rem] sm:text-[1.6rem]" />
                     </motion.div>

                     <motion.div {...fadeUp(0.32)} className="mt-9 flex flex-col items-center gap-3 sm:mt-11">
                        <Eyebrow>The wedding of</Eyebrow>
                     </motion.div>

                     <motion.h1
                        {...fadeUp(0.4)}
                        id="cover-title"
                        className="balance mt-4 font-display text-[clamp(3.3rem,13vw,6.6rem)] leading-[0.94] font-light tracking-[-0.025em] text-teak sm:mt-5"
                     >
                        <span className="block sm:inline">{couple.partnerOne}</span>
                        <span
                           aria-hidden="true"
                           className="mx-1 inline-block align-middle font-display text-[0.5em] font-normal text-gold italic sm:mx-5"
                        >
                           &amp;
                        </span>
                        <span className="block sm:inline">{couple.partnerTwo}</span>
                     </motion.h1>

                     <motion.div {...fadeUp(0.5)} className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
                        <span aria-hidden="true" className="h-px w-8 bg-gold/40" />
                        <p className="font-display text-lg font-light tracking-[0.03em] text-teak/80 sm:text-xl">{invitation.displayDate}</p>
                        <p className="text-[0.6rem] font-medium tracking-[0.34em] text-moss uppercase">{invitation.locationLine}</p>
                     </motion.div>

                     <motion.div {...fadeUp(0.62)} className="mt-10 sm:mt-12">
                        <button
                           type="button"
                           onClick={openInvitation}
                           className="group inline-flex min-h-12 items-center gap-3 border border-gold/60 px-8 py-4 text-[0.625rem] font-medium tracking-[0.3em] text-teak uppercase transition-colors duration-500 hover:border-teak hover:bg-teak hover:text-ivory sm:px-10"
                        >
                           Open Invitation
                           <ArrowDown
                              className="size-3.5 transition-transform duration-500 group-hover:translate-y-0.5"
                              strokeWidth={1.5}
                              aria-hidden="true"
                           />
                        </button>
                     </motion.div>
                  </div>

                  <motion.div {...fadeUp(0.75)} className="flex flex-col items-center gap-3 pb-2 text-gold/70 sm:pb-4">
                     <JasmineSprig className="h-9 w-24 sm:h-10 sm:w-28" />
                     <p className="text-[0.5625rem] font-medium tracking-[0.34em] text-teak/40 uppercase">An invitation to celebrate</p>
                  </motion.div>
               </div>
            </motion.div>
         ) : null}
      </AnimatePresence>
   );
}
