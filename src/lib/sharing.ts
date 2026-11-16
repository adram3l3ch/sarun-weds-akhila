export interface ShareDetails {
   title: string;
   coupleNames: string;
   displayDate: string;
   venueName: string;
   url: string;
}

export function buildShareText({ title, coupleNames, displayDate, venueName, url }: ShareDetails) {
   return [
      title,
      "",
      `With the blessings of our families, and with hearts full of gratitude, we invite you to share in the beginning of our life together.`,
      "",
      "**Wedding Ceremony**",
      `${displayDate} · ${venueName}`,
      "",
      `View the invitation: ${url}`,
      "",
      "We look forward to celebrating with you! 💕",
   ].join("\n");
}

export function buildWhatsAppUrl(text: string) {
   return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
