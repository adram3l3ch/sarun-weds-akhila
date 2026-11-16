import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";
import { actionClass } from "@/lib/styles";
import type { VenueData } from "@/types/wedding";

interface VenueSectionProps {
  venue: VenueData;
}

export function VenueSection({ venue }: VenueSectionProps) {
  return (
    <section
      aria-labelledby="venue-heading"
      className="px-6 py-20 sm:px-10 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex items-center gap-5">
          <Eyebrow tone="gold">04 · The Venue</Eyebrow>
          <span aria-hidden="true" className="h-px flex-1 bg-gold/25" />
        </Reveal>

        <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2
              id="venue-heading"
              className="font-display text-[clamp(2.5rem,5.5vw,3.9rem)] leading-[1.02] font-light tracking-[-0.025em] text-teak"
            >
              {venue.name}
            </h2>

            <span aria-hidden="true" className="mt-7 block h-px w-14 bg-gold/45" />

            <address className="mt-6 flex max-w-sm items-start gap-3 text-[0.9375rem] leading-relaxed font-normal text-teak/65 not-italic">
              <MapPin
                className="mt-1 size-4 shrink-0 text-gold"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <span className="whitespace-pre-line">{venue.address}</span>
            </address>

            {venue.note ? (
              <p className="mt-4 max-w-sm pl-7 text-[0.75rem] leading-relaxed text-teak/45">
                {venue.note}
              </p>
            ) : null}

            {venue.mapUrl ? (
              <a
                href={venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClass("outline", "mt-8")}
              >
                Get directions
                <ArrowUpRight
                  className="size-3.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            ) : null}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <figure className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2.5 border border-gold/30 sm:-inset-3"
              />
              <div className="relative aspect-[5/4] overflow-hidden bg-sand sm:aspect-[8/5]">
                <Image
                  src={venue.image}
                  alt={venue.imageAlt ?? venue.name}
                  fill
                  sizes="(min-width: 1024px) 55vw, 90vw"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 ring-1 ring-ivory/20 ring-inset"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="text-[0.5rem] font-medium tracking-[0.28em] text-teak/35 uppercase">
                  {venue.name}
                </span>
                <span className="font-display text-sm text-teak/40 italic">
                  Venue photograph
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
