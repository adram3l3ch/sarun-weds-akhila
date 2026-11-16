"use client";

import { useInvitation } from "@/components/invitation/InvitationContext";
import { actionClass, type ActionVariant } from "@/lib/styles";

interface TriggerProps {
  label?: string;
  variant?: ActionVariant;
  className?: string;
}

export function RsvpButton({
  label = "RSVP",
  variant = "primary",
  className = "",
}: TriggerProps) {
  const { openRsvp } = useInvitation();

  return (
    <button
      type="button"
      onClick={openRsvp}
      className={actionClass(variant, className)}
    >
      {label}
    </button>
  );
}

export function WishesButton({
  label = "Leave a wish",
  variant = "quiet",
  className = "",
}: TriggerProps) {
  const { openWishes } = useInvitation();

  return (
    <button
      type="button"
      onClick={openWishes}
      className={actionClass(variant, className)}
    >
      {label}
    </button>
  );
}
