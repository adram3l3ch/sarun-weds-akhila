import type { Metadata } from "next";
import { ClosingSection } from "@/components/invitation/ClosingSection";
import { CoupleSection } from "@/components/invitation/CoupleSection";
import { EventDetails } from "@/components/invitation/EventDetails";
import { InvitationCanvas } from "@/components/invitation/InvitationCanvas";
import { InvitationCover } from "@/components/invitation/InvitationCover";
import { InvitationMessage } from "@/components/invitation/InvitationMessage";
import { InvitationProvider } from "@/components/invitation/InvitationProvider";
import { VenueSection } from "@/components/invitation/VenueSection";
import { wedding } from "@/data/wedding";
import type { WeddingCalendar } from "@/lib/calendar";
import { getCoupleNames, getMonogram } from "@/lib/format";
import { buildShareText, buildWhatsAppUrl } from "@/lib/sharing";

const coupleNames = getCoupleNames(wedding.couple);
const monogram = getMonogram(wedding.couple);

const calendar: WeddingCalendar = {
   calendarName: `${coupleNames} · Wedding`,
   coupleNames,
   websiteUrl: wedding.website.url,
   timeZone: wedding.invitation.timeZone,
   venueName: wedding.venue.name,
   venueAddress: wedding.venue.address,
   description: wedding.website.description,
   events: wedding.events,
};

const shareText = buildShareText({
   title: wedding.website.title,
   coupleNames,
   displayDate: wedding.invitation.displayDate,
   venueName: wedding.venue.name,
   url: wedding.website.url,
});

const whatsappUrl = buildWhatsAppUrl(shareText);
const enabledCalendar = wedding.features.enableCalendar ? calendar : undefined;
const enabledWhatsappUrl = wedding.features.enableWhatsappShare ? whatsappUrl : undefined;

export const metadata: Metadata = {
   metadataBase: new URL(wedding.website.url),
   title: wedding.website.title,
   description: wedding.website.description,
   alternates: {
      canonical: wedding.website.url,
   },
   openGraph: {
      type: "website",
      locale: "en_IN",
      url: wedding.website.url,
      siteName: wedding.website.title,
      title: wedding.website.title,
      description: wedding.website.description,
      images: [
         {
            url: wedding.website.ogImage,
            width: 1200,
            height: 630,
            alt: wedding.website.ogImageAlt ?? wedding.website.title,
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: wedding.website.title,
      description: wedding.website.description,
      images: [wedding.website.ogImage],
   },
   robots: {
      index: true,
      follow: true,
   },
};

export default function Home() {
   return (
      <InvitationProvider wedding={wedding}>
         <InvitationCover couple={wedding.couple} invitation={wedding.invitation} monogram={monogram} />

         <InvitationCanvas>
            <main id="invitation" tabIndex={-1} className="relative outline-none">
               <CoupleSection couple={wedding.couple} locationLine={wedding.invitation.locationLine} />

               <InvitationMessage invitation={wedding.invitation} />

               <EventDetails invitation={wedding.invitation} events={wedding.events} venueName={wedding.venue.name} calendar={enabledCalendar} />

               <VenueSection venue={wedding.venue} />

               <ClosingSection
                  couple={wedding.couple}
                  monogram={monogram}
                  closing={wedding.closing}
                  invitation={wedding.invitation}
                  features={wedding.features}
                  calendar={enabledCalendar}
                  whatsappUrl={enabledWhatsappUrl}
               />
            </main>
         </InvitationCanvas>
      </InvitationProvider>
   );
}
