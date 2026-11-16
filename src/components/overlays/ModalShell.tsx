"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Eyebrow } from "@/components/shared/Eyebrow";

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Runs after the panel has fully left the screen. Useful for form resets. */
  onExitComplete?: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const subscribeToHydration = () => () => {};

export function ModalShell({
  open,
  onClose,
  title,
  eyebrow,
  description,
  children,
  footer,
  onExitComplete,
}: ModalShellProps) {
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const preferred = panel.querySelector<HTMLElement>("[data-autofocus]");
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.getClientRects().length > 0);
      (preferred ?? focusables[0] ?? panel).focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusables.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const transition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

  return createPortal(
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && (
        <div
          key="modal"
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-teak/45 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            className="relative flex max-h-[92svh] w-full max-w-lg flex-col overflow-y-auto overscroll-contain rounded-t-[1.6rem] border border-gold/30 bg-ivory px-6 pt-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] shadow-[0_-24px_80px_rgba(99,59,50,0.18)] sm:max-h-[88svh] sm:rounded-[0.35rem] sm:p-8 sm:pr-10 sm:pb-8"
            initial={reduceMotion ? false : { opacity: 0, y: 42, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.995 }}
            transition={transition}
          >
            <div
              aria-hidden="true"
              className="mx-auto mb-5 h-1 w-10 rounded-full bg-gold/35 sm:hidden"
            />

            <div className="flex items-start justify-between gap-5">
              <div>
                <Eyebrow tone="gold">{eyebrow}</Eyebrow>
                <h2
                  id={titleId}
                  className="mt-3 font-display text-[2rem] leading-[1.08] font-light tracking-[-0.01em] text-teak sm:text-[2.4rem]"
                >
                  {title}
                </h2>
                {description ? (
                  <p
                    id={descriptionId}
                    className="mt-3 max-w-sm text-sm leading-relaxed text-teak/65"
                  >
                    {description}
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="-mt-1 -mr-2 grid size-11 shrink-0 place-items-center rounded-full text-teak/55 transition-colors hover:bg-sand/60 hover:text-teak"
              >
                <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-7">{children}</div>

            {footer ? <div className="mt-7">{footer}</div> : null}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
