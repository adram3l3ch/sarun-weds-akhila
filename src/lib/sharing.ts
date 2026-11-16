export interface ShareDetails {
  title: string;
  coupleNames: string;
  displayDate: string;
  venueName: string;
  url: string;
}

export function buildShareText({
  title,
  coupleNames,
  displayDate,
  venueName,
  url,
}: ShareDetails) {
  return [
    title,
    "",
    `${coupleNames} are getting married.`,
    `${displayDate} · ${venueName}`,
    "",
    `View the invitation: ${url}`,
  ].join("\n");
}

export function buildWhatsAppUrl(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
