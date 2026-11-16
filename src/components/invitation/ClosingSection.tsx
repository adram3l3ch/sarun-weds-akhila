import { MessageCircle } from "lucide-react";
import { CalendarButton } from "@/components/shared/CalendarButton";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { JasmineSprig } from "@/components/shared/JasmineSprig";
import { Monogram } from "@/components/shared/Monogram";
import { Reveal } from "@/components/shared/Reveal";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { RsvpButton, WishesButton } from "@/components/invitation/InvitationActionButtons";
import type { WeddingCalendar } from "@/lib/calendar";
import { getCoupleNames } from "@/lib/format";
import { actionClass } from "@/lib/styles";
import type { ClosingData, CoupleData, FeatureFlags, InvitationData } from "@/types/wedding";

interface ClosingSectionProps {
   couple: CoupleData;
   monogram: string;
   closing: ClosingData;
   invitation: Pick<InvitationData, "displayDate" | "locationLine">;
   features: FeatureFlags;
   calendar?: WeddingCalendar;
   whatsappUrl?: string;
}

export function ClosingSection({ couple, monogram, closing, invitation, features, calendar, whatsappUrl }: ClosingSectionProps) {
   const coupleNames = getCoupleNames(couple);
   const hasActions = features.enableRsvp || (features.enableCalendar && Boolean(calendar)) || (features.enableWhatsappShare && Boolean(whatsappUrl));

   return (
      <section
         aria-labelledby="closing-heading"
         className="relative overflow-hidden border-t border-gold/25 bg-sand/25 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
         <div className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center sm:pt-28 sm:pb-20">
            <Reveal>
               <JasmineSprig className="mx-auto h-10 w-28 text-gold/70 sm:h-12 sm:w-32" />
            </Reveal>

            <Reveal delay={0.05}>
               <Eyebrow tone="gold" className="mt-8">
                  {closing.thankYou}
               </Eyebrow>
            </Reveal>

            <Reveal delay={0.1}>
               <h2
                  id="closing-heading"
                  className="balance mx-auto mt-6 max-w-2xl font-display text-[clamp(2.15rem,5.2vw,3.65rem)] leading-[1.12] font-light tracking-[-0.02em] text-teak"
               >
                  {closing.message}
               </h2>
            </Reveal>

            {closing.note ? (
               <Reveal delay={0.16}>
                  <p className="mx-auto mt-6 max-w-md text-[0.875rem] leading-relaxed text-teak/55">{closing.note}</p>
               </Reveal>
            ) : null}

            {hasActions ? (
               <Reveal delay={0.22}>
                  <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                     {features.enableRsvp ? <RsvpButton label="RSVP" variant="primary" className="w-full sm:w-auto" /> : null}

                     {features.enableCalendar && calendar ? (
                        <CalendarButton calendar={calendar} variant={features.enableRsvp ? "outline" : "primary"} className="w-full sm:w-auto" />
                     ) : null}

                     {features.enableWhatsappShare && whatsappUrl ? (
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={actionClass("outline", "w-full sm:w-auto")}>
                           <MessageCircle className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                           Share on WhatsApp
                        </a>
                     ) : null}
                  </div>
               </Reveal>
            ) : null}

            {features.enableWishes ? (
               <Reveal delay={0.28}>
                  <WishesButton label="Leave a wish for the couple" className="mt-6" />
               </Reveal>
            ) : null}

            <Reveal delay={0.3}>
               <SectionDivider className="mt-14 sm:mt-16" />
            </Reveal>

            <Reveal delay={0.34}>
               <div className="mt-10 flex flex-col items-center">
                  <Monogram value={monogram} className="w-16 sm:w-20" textClassName="text-[0.95rem] sm:text-[1.1rem]" />
                  <p className="mt-5 font-display text-[1.65rem] leading-tight font-light text-teak/85 italic sm:text-[1.9rem]">{coupleNames}</p>
                  <p className="mt-3 text-[0.5625rem] font-medium tracking-[0.3em] text-teak/40 uppercase">
                     {invitation.displayDate}
                     <span className="mx-2 text-gold/60">·</span>
                     {invitation.locationLine}
                  </p>
               </div>
            </Reveal>
         </div>

         <div className="kasavu-selvedge h-3 w-full opacity-60" aria-hidden="true" />

         <footer className="mx-auto mt-7 flex max-w-5xl flex-col items-center justify-between gap-2 px-6 text-[0.5rem] font-medium tracking-[0.3em] text-teak/30 uppercase sm:flex-row">
            <span>{coupleNames}</span>
            <span>With love</span>
         </footer>
      </section>
   );
}
