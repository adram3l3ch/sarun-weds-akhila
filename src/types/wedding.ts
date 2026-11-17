export interface CoupleData {
   /** First partner's name, exactly as it should be printed. */
   partnerOne: string;
   /** Second partner's name, exactly as it should be printed. */
   partnerTwo: string;
   /** Optional explicit monogram. Generated from the names when omitted. */
   monogram?: string;
   /** A short, warm introduction. */
   introduction: string;
   /** Path to a portrait in /public. */
   portrait: string;
   portraitAlt?: string;
}

export interface InvitationData {
   /** Used for invite copy and share previews. */
   title: string;
   /** The invitation paragraph shown in the editorial section. */
   message: string;
   /** ISO date (YYYY-MM-DD) of the main wedding day. */
   date: string;
   /** Pre-formatted date for display. */
   displayDate: string;
   /** Short location line for the cover and share text. */
   locationLine: string;
   /** IANA timezone used for calendar events. */
   timeZone: string;
}

export type WeddingEventKind = "wedding" | "reception" | "other";

export interface WeddingEvent {
   id: string;
   kind: WeddingEventKind;
   title: string;
   /** Optional small label above the title, e.g. "The Wedding". */
   kicker?: string;
   /** ISO date (YYYY-MM-DD). */
   date: string;
   /** Pre-formatted day, e.g. "Friday". */
   day: string;
   /** 24-hour time (HH:mm). */
   startTime: string;
   /** 24-hour time (HH:mm). */
   endTime: string;
   /** Auspicious time window, pre-formatted for display. */
   muhurtham?: string;
   /** Ceremony details, pre-formatted for display. */
   ceremony?: string;
   /** Additional line of event information. */
   details?: string;
   /** Optional venue override for this event. Falls back to the main venue. */
   venueName?: string;
   side?: "bride" | "groom";
   location?: string;
}

export interface VenueData {
   name: string;
   address: string;
   /** Google Maps directions URL. Rendered only when provided. */
   mapUrl?: string;
   /** Path to a venue photograph in /public. */
   image: string;
   imageAlt?: string;
   /** Optional short note below the address. */
   note?: string;
}

export interface MediaData {
   /** Path to an audio file in /public. */
   musicUrl: string;
   enableMusic: boolean;
   /** Playback volume from 0 to 1. */
   volume?: number;
}

export interface FeatureFlags {
   enableRsvp: boolean;
   enableWishes: boolean;
   enableCalendar: boolean;
   enableWhatsappShare: boolean;
}

export interface WebsiteData {
   /** Public URL of this invitation. Used for SEO and sharing. */
   url: string;
   title: string;
   description: string;
   /** Path to a 1200 × 630 share image in /public. */
   ogImage: string;
   ogImageAlt?: string;
}

export interface ClosingData {
   /** Large closing line. */
   message: string;
   /** Warm sign-off, e.g. "With love and gratitude". */
   thankYou: string;
   /** Optional quiet note beneath the signature. */
   note?: string;
}

export interface WishSample {
   name: string;
   message: string;
}

export interface WishesData {
   /** Sample wishes used to populate the modal for visual testing. */
   samples: WishSample[];
}

export interface WeddingData {
   couple: CoupleData;
   invitation: InvitationData;
   events: WeddingEvent[];
   venue: VenueData;
   media: MediaData;
   features: FeatureFlags;
   website: WebsiteData;
   closing: ClosingData;
   wishes: WishesData;
}
