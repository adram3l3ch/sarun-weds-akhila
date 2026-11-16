import type { CoupleData } from "@/types/wedding";

/** Returns "First & Second". */
export function getCoupleNames(couple: Pick<CoupleData, "partnerOne" | "partnerTwo">) {
  return `${couple.partnerOne} & ${couple.partnerTwo}`;
}

/**
 * Uses the configured monogram when present, otherwise builds one from the
 * couple's initials. Both names are always represented.
 */
export function getMonogram(
  couple: Pick<CoupleData, "partnerOne" | "partnerTwo" | "monogram">,
) {
  const configured = couple.monogram?.trim();
  if (configured) return configured;

  const initials = [couple.partnerOne, couple.partnerTwo]
    .map((name) => name.trim().charAt(0).toUpperCase())
    .filter(Boolean);

  return initials.join(" & ");
}

/** Turns "10:30" into "10:30 AM" for display. */
export function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

/** Date parts read in UTC so the printed day never shifts by timezone. */
export function getDateParts(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return {
    day: String(day).padStart(2, "0"),
    month: new Intl.DateTimeFormat("en-GB", {
      month: "long",
      timeZone: "UTC",
    }).format(date),
    shortMonth: new Intl.DateTimeFormat("en-GB", {
      month: "short",
      timeZone: "UTC",
    }).format(date),
    weekday: new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      timeZone: "UTC",
    }).format(date),
    year: String(year),
  };
}

/** A URL-safe slug for filenames and event identifiers. */
export function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
