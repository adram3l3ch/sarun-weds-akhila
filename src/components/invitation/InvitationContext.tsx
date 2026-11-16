"use client";

import { createContext, useContext } from "react";

export interface InvitationContextValue {
  opened: boolean;
  openInvitation: () => void;
  openRsvp: () => void;
  openWishes: () => void;
}

export const InvitationContext = createContext<InvitationContextValue | null>(
  null,
);

export function useInvitation() {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error("useInvitation must be used inside InvitationProvider");
  }
  return context;
}
