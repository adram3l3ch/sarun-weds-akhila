import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";
import type { CoupleData } from "@/types/wedding";
import Image from "next/image";

interface CoupleSectionProps {
   couple: CoupleData;
   locationLine: string;
}

export function CoupleSection({ couple, locationLine }: CoupleSectionProps) {
   return (
      <section aria-labelledby="couple-heading" className="relative px-6 pt-20 pb-20 sm:px-10 sm:pt-24 lg:pt-32 lg:pb-28">
         <div className="mx-auto max-w-6xl">
            <Reveal className="flex items-center gap-5">
               <Eyebrow tone="gold">The Couple</Eyebrow>
               <span aria-hidden="true" className="h-px flex-1 bg-gold/25" />
               <span className="text-[0.5625rem] font-medium tracking-[0.3em] text-teak/30">01</span>
            </Reveal>

            <div className="mt-12 grid items-center gap-14 sm:mt-16 lg:grid-cols-12 lg:gap-20">
               <Reveal className="lg:col-span-5">
                  <figure className="relative">
                     <div aria-hidden="true" className="pointer-events-none absolute -inset-2.5 border border-gold/30 sm:-inset-4" />
                     <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                        <Image
                           src={couple.portrait}
                           alt={couple.portraitAlt ?? `${couple.partnerOne} and ${couple.partnerTwo}`}
                           fill
                           sizes="(min-width: 1024px) 38vw, 88vw"
                           loading="eager"
                           className="object-cover"
                        />
                        <span aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-ivory/25 ring-inset" />
                     </div>
                  </figure>
               </Reveal>

               <div className="lg:col-span-7 lg:pl-4 mx-auto lg:mx-0">
                  <Reveal delay={0.08}>
                     <Eyebrow className="text-center lg:text-left">Together with our families</Eyebrow>
                     <h2
                        id="couple-heading"
                        className="mt-6 font-display text-[clamp(3.1rem,8.2vw,5.7rem)] leading-[0.92] font-light tracking-[-0.03em] text-teak text-center lg:text-left"
                     >
                        <span className="block">{couple.partnerOne}</span>
                        <span aria-hidden="true" className="my-2 flex items-center gap-4 sm:my-3 justify-center lg:justify-start">
                           <span className="h-px w-10 bg-gold/45 sm:w-14 hidden lg:block" />
                           <span className="font-display text-[0.52em] font-normal text-gold italic">&amp;</span>
                        </span>
                        <span className="block">{couple.partnerTwo}</span>
                     </h2>
                  </Reveal>

                  <Reveal delay={0.16}>
                     <p className="pretty mt-8 max-w-md font-display text-[1.35rem] leading-[1.5] font-light text-teak/70 italic sm:text-[1.6rem] text-center lg:text-left">
                        {couple.introduction}
                     </p>
                  </Reveal>

                  <Reveal delay={0.24}>
                     <div className="mt-9 flex items-center gap-2.5 justify-center lg:justify-start">
                        <span aria-hidden="true" className="h-px w-10 bg-gold/40 hidden lg:block" />
                        <span className="text-[0.5625rem] font-medium tracking-[0.32em] text-moss uppercase">{locationLine}</span>
                     </div>
                  </Reveal>
               </div>
            </div>
         </div>
      </section>
   );
}
