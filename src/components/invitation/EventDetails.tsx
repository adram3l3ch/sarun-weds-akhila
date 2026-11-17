"use client";

import { CalendarButton } from "@/components/shared/CalendarButton";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/shared/Reveal";
import type { WeddingCalendar } from "@/lib/calendar";
import { formatTime, getDateParts } from "@/lib/format";
import { actionClass } from "@/lib/styles";
import type { InvitationData, WeddingEvent } from "@/types/wedding";
import { ArrowUpRight, Clock, Sun } from "lucide-react";
import { useParams } from "next/navigation";

interface EventDetailsProps {
   invitation: InvitationData;
   events: WeddingEvent[];
   venueName: string;
   /** Present only when the calendar feature is enabled. */
   calendar?: WeddingCalendar;
}

export function EventDetails({ invitation, events, venueName, calendar }: EventDetailsProps) {
   const date = getDateParts(invitation.date);
   const { side } = useParams<{ side: string }>();

   return (
      <section aria-labelledby="event-details-heading" className="border-y border-gold/25 bg-sand/30 px-6 py-20 sm:px-10 sm:py-24 lg:py-28">
         <div className="mx-auto max-w-6xl">
            <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
               <div>
                  <Eyebrow tone="gold">03 · The Celebration</Eyebrow>
                  <h2
                     id="event-details-heading"
                     className="mt-4 font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05] font-light tracking-[-0.02em] text-teak"
                  >
                     Wedding details
                  </h2>
               </div>
               <p className="max-w-[16rem] text-[0.8125rem] leading-relaxed text-teak/55">
                  {invitation.displayDate}
                  <span className="mx-2 text-gold/60">·</span>
                  {venueName}
               </p>
            </Reveal>

            <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
               <Reveal className="lg:col-span-4">
                  <div className="flex items-start gap-5 lg:sticky lg:top-12">
                     <span aria-hidden="true" className="font-display text-[4.7rem] leading-[0.78] font-light text-gold sm:text-[5.4rem]">
                        {date.day}
                     </span>
                     <div className="pt-1">
                        <p className="text-[0.625rem] font-medium tracking-[0.3em] text-teak/50 uppercase">
                           {date.month} {date.year}
                        </p>
                        <p className="mt-2 font-display text-[1.65rem] leading-none font-light text-teak">{date.weekday}</p>
                        <span aria-hidden="true" className="mt-5 block h-px w-10 bg-gold/40" />
                        <p className="mt-4 max-w-[12rem] text-[0.8125rem] leading-relaxed text-teak/55">
                           We look forward to welcoming you in {invitation.locationLine}.
                        </p>
                     </div>
                  </div>
               </Reveal>

               <div className="lg:col-span-8">
                  <ol className="border-t border-teak/10">
                     {events.map((event, index) => {
                        if (event.side && side && event.side !== side) return null;
                        const eventDate = getDateParts(event.date);

                        return (
                           <li key={event.id} className="border-b border-teak/10">
                              <Reveal
                                 delay={index * 0.05}
                                 y={14}
                                 className="grid gap-5 py-7 sm:grid-cols-[6.5rem_1fr] sm:gap-8 sm:py-9 lg:grid-cols-[7.5rem_1fr]"
                              >
                                 <div>
                                    <p className="text-[0.5625rem] font-medium tracking-[0.3em] text-moss uppercase">{event.day}</p>
                                    <p className="mt-1.5 font-display text-lg leading-none text-teak/80">
                                       {eventDate.day} {eventDate.shortMonth}
                                    </p>
                                 </div>

                                 <div>
                                    {event.kicker ? (
                                       <p className="text-[0.5625rem] font-medium tracking-[0.3em] text-gold uppercase">{event.kicker}</p>
                                    ) : null}

                                    <h3 className="mt-2 font-display text-[1.75rem] leading-tight font-normal tracking-[-0.01em] text-teak sm:text-[2rem]">
                                       {event.title}
                                    </h3>

                                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-teak/65">
                                       {event.startTime && event.endTime ? (
                                          <span className="inline-flex items-center gap-2">
                                             <Clock className="size-3.5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                                             <time dateTime={`${event.date}T${event.startTime}`}>{formatTime(event.startTime)}</time>
                                             <span aria-hidden="true" className="text-teak/35">
                                                –
                                             </span>
                                             <time dateTime={`${event.date}T${event.endTime}`}>{formatTime(event.endTime)}</time>
                                          </span>
                                       ) : null}

                                       {event.muhurtham ? (
                                          <span className="inline-flex items-center gap-2 text-teak/75">
                                             <Sun className="size-3.5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                                             <span className="text-[0.6875rem] font-medium tracking-[0.16em] text-gold uppercase">Muhurtham</span>
                                             {event.muhurtham}
                                          </span>
                                       ) : null}
                                    </div>

                                    {event.ceremony ? <p className="mt-3 font-display text-base text-teak/60 italic">{event.ceremony}</p> : null}

                                    {event.details ? (
                                       <p className="pretty mt-3 max-w-md text-[0.8125rem] leading-relaxed text-teak/55">{event.details}</p>
                                    ) : null}

                                    {event.venueName ? (
                                       <p className="mt-3 text-[0.5625rem] font-medium tracking-[0.26em] text-teak/40 uppercase">{event.venueName}</p>
                                    ) : null}

                                    {event.location ? (
                                       <a href={event.location} target="_blank" rel="noopener noreferrer" className={actionClass("outline", "mt-4")}>
                                          Get directions
                                          <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                                       </a>
                                    ) : null}
                                 </div>
                              </Reveal>
                           </li>
                        );
                     })}
                  </ol>

                  {calendar ? (
                     <Reveal delay={0.1} className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                        <CalendarButton calendar={calendar} variant="primary" />
                        <p className="text-[0.6875rem] leading-relaxed text-teak/45">
                           Adds {calendar.events.length > 1 ? "both celebrations" : "the celebration"} to your calendar.
                        </p>
                     </Reveal>
                  ) : null}
               </div>
            </div>
         </div>
      </section>
   );
}
