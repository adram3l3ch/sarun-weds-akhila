import type { WeddingEvent } from "@/types/wedding";
import { toSlug } from "@/lib/format";

export interface WeddingCalendar {
  calendarName: string;
  coupleNames: string;
  websiteUrl: string;
  timeZone: string;
  venueName: string;
  venueAddress: string;
  description: string;
  events: WeddingEvent[];
}

const MINUTE = 60_000;

/** Offset, in minutes, of a time zone at a given instant. */
function getTimeZoneOffset(timeZone: string, date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  const wallClockAsUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
    Number(parts.second),
  );

  // The formatter has second-level precision.
  const instant = Math.floor(date.getTime() / 1000) * 1000;
  return Math.round((wallClockAsUtc - instant) / MINUTE);
}

/** Converts a wall-clock date + time in a specific zone to a UTC instant. */
function zonedDateTimeToUtc(
  date: string,
  time: string,
  timeZone: string,
): Date {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const wallClock = Date.UTC(year, month - 1, day, hours, minutes);

  const initialOffset = getTimeZoneOffset(timeZone, new Date(wallClock));
  let instant = wallClock - initialOffset * MINUTE;

  // Re-check once to handle offset changes at a DST boundary.
  const finalOffset = getTimeZoneOffset(timeZone, new Date(instant));
  if (finalOffset !== initialOffset) {
    instant = wallClock - finalOffset * MINUTE;
  }

  return new Date(instant);
}

function formatUtc(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** RFC 5545 recommends folding lines longer than 75 octets. */
function foldLine(line: string) {
  if (line.length <= 73) return line;

  const parts: string[] = [];
  let remaining = line;

  while (remaining.length > 73) {
    parts.push(remaining.slice(0, 73));
    remaining = remaining.slice(73);
  }
  parts.push(remaining);

  return parts.join("\r\n ");
}

function buildEvent(
  event: WeddingEvent,
  calendar: WeddingCalendar,
  host: string,
) {
  const start = zonedDateTimeToUtc(event.date, event.startTime, calendar.timeZone);
  const end = zonedDateTimeToUtc(event.date, event.endTime, calendar.timeZone);

  const description = [
    event.details,
    event.muhurtham ? `Muhurtham: ${event.muhurtham}` : undefined,
    event.ceremony,
    calendar.websiteUrl,
  ]
    .filter(Boolean)
    .join("\n");

  const lines = [
    "BEGIN:VEVENT",
    `UID:${toSlug(`${calendar.calendarName}-${event.id}-${event.date}`)}@${host}`,
    `DTSTAMP:${formatUtc(new Date())}`,
    `DTSTART:${formatUtc(start)}`,
    `DTEND:${formatUtc(end)}`,
    `SUMMARY:${escapeIcsText(`${calendar.coupleNames} — ${event.title}`)}`,
    `LOCATION:${escapeIcsText(`${calendar.venueName}, ${calendar.venueAddress}`)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `URL:${calendar.websiteUrl}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
  ];

  return lines.map(foldLine).join("\r\n");
}

export function buildWeddingCalendar(calendar: WeddingCalendar) {
  const host = (() => {
    try {
      return new URL(calendar.websiteUrl).hostname;
    } catch {
      return "wedding-invitation.local";
    }
  })();

  const eventBlocks = calendar.events
    .map((event) => buildEvent(event, calendar, host))
    .join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//Contemporary Kasavu//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeIcsText(calendar.calendarName)}`,
    `X-WR-TIMEZONE:${calendar.timeZone}`,
    `X-WR-CALDESC:${escapeIcsText(calendar.description)}`,
    eventBlocks,
    "END:VCALENDAR",
  ]
    .map(foldLine)
    .join("\r\n");
}

export function downloadWeddingCalendar(calendar: WeddingCalendar) {
  if (typeof window === "undefined") return;

  const contents = buildWeddingCalendar(calendar);
  const blob = new Blob([contents], {
    type: "text/calendar;charset=utf-8",
  });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = `${toSlug(calendar.calendarName) || "wedding"}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1_000);
}
