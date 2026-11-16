import type { WeddingData } from "@/types/wedding";

/**
 * ---------------------------------------------------------------------------
 *  THE ONLY FILE YOU NEED TO EDIT
 * ---------------------------------------------------------------------------
 *  Every detail below is placeholder content for a sample invitation.
 *  Replace the names, dates, venue, links, images, audio and copy here and
 *  the whole website — cover, sections, modals, calendar and share text —
 *  will update with it.
 *
 *  Assets live in /public:
 *    images/placeholders/couple.png
 *    images/placeholders/venue.png
 *    images/og-cover.png
 *    audio/wedding-ambient.mp3
 * ---------------------------------------------------------------------------
 */
export const wedding: WeddingData = {
   couple: {
      partnerOne: "Sarun",
      partnerTwo: "Akhila",
      monogram: "S & A",
      introduction:
         "With the blessings of our families, and with hearts full of gratitude, we invite you to share in the beginning of our life together.",
      portrait: "/images/placeholders/couple.jpg",
      portraitAlt: "Portrait of Sarun and Akhila",
   },

   invitation: {
      title: "Two families, one celebration",
      message:
         "We joyfully invite you to join us as we begin our life together — in the presence of our families, our friends, and the traditions that shaped us.",
      date: "2026-12-06",
      displayDate: "Sunday, 06 December 2026",
      locationLine: "Muthukulam, Alappuzha, Kerala",
      timeZone: "Asia/Kolkata",
   },

   events: [
      {
         id: "reception",
         kind: "reception",
         title: "Reception",
         kicker: "An Evening Together",
         date: "2026-12-05",
         day: "Saturday",
         startTime: "",
         endTime: "21:30",
      },
      {
         id: "muhurtham",
         kind: "wedding",
         title: "Wedding Ceremony",
         kicker: "The Muhurtham",
         date: "2026-12-06",
         day: "Sunday",
         startTime: "",
         endTime: "11:15",
         muhurtham: "11:51 AM – 12:13 PM",
         ceremony: "",
         details: "",
      },
   ],

   venue: {
      name: "C.K Kesavapilla Memorial NSS Auditorium",
      address: "Choolatheruvu, Alappuzha, Kerala 690506",
      mapUrl: "https://maps.app.goo.gl/78CaJEBfxi6QoWCE7",
      image: "/images/placeholders/venue.jpg",
      imageAlt: "The venue",
      note: "",
   },

   media: {
      musicUrl: "/audio/wedding-ambient.m4a",
      enableMusic: true,
      volume: 0.3,
   },

   features: {
      enableRsvp: false,
      enableWishes: false,
      enableCalendar: true,
      enableWhatsappShare: true,
   },

   website: {
      url: "https://example.com/sarun-weds-akhila",
      title: "Sarun & Akhila · Wedding Invitation",
      description: "Join Sarun and Akhila as they celebrate their wedding on Sunday, 06 December 2026",
      ogImage: "/images/og-cover.png",
      ogImageAlt: "Sarun and Akhila wedding invitation cover",
   },

   closing: {
      message: "We would love to celebrate with you.",
      thankYou: "With love and gratitude",
      note: "Your presence is the greatest blessing.",
   },

   wishes: {
      samples: [
         {
            name: "Meera & Arun",
            message: "Wishing you a lifetime of laughter, patience and quiet Sunday mornings. So happy for you both.",
         },
         {
            name: "The Nair family",
            message: "May your home always be full of warmth, good food and the people you love. Congratulations!",
         },
         {
            name: "Riya",
            message: "From school corridors to this beautiful day — I could not be happier for you. Lots of love.",
         },
      ],
   },
};
