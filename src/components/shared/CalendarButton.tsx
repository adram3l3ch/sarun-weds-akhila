"use client";

import { CalendarCheck2, CalendarPlus } from "lucide-react";
import { useState } from "react";
import {
  downloadWeddingCalendar,
  type WeddingCalendar,
} from "@/lib/calendar";
import { actionClass, type ActionVariant } from "@/lib/styles";

interface CalendarButtonProps {
  calendar: WeddingCalendar;
  label?: string;
  variant?: ActionVariant;
  className?: string;
}

export function CalendarButton({
  calendar,
  label = "Add to calendar",
  variant = "outline",
  className = "",
}: CalendarButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        downloadWeddingCalendar(calendar);
        setDownloaded(true);
      }}
      className={actionClass(variant, className)}
      aria-live="polite"
    >
      {downloaded ? (
        <CalendarCheck2 className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
      ) : (
        <CalendarPlus className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
      )}
      {downloaded ? "Calendar saved" : label}
    </button>
  );
}
