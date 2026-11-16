"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Copy, Link2, Share2 } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

interface ShareControlProps {
  shareText: string;
  url: string;
  shareTitle: string;
}

export function ShareControl({
  shareText,
  url,
  shareTitle,
}: ShareControlProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const reduceMotion = useReducedMotion();

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  // Only rendered inside the popover, which is closed during hydration.
  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      return;
    } catch {
      // Some in-app browsers block the Clipboard API. Fall back to a hidden
      // textarea so the guest still gets the link.
    }

    const textarea = document.createElement("textarea");
    textarea.value = url;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const copiedWithFallback = document.execCommand("copy");
      setCopied(copiedWithFallback);
    } catch {
      setCopied(false);
    } finally {
      textarea.remove();
    }
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title: shareTitle, text: shareText, url });
      setOpen(false);
    } catch {
      // The guest dismissed the native share sheet; nothing to do.
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Share invitation"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        title="Share invitation"
        className="grid size-11 place-items-center rounded-full border border-gold/45 bg-ivory/90 text-teak shadow-[0_8px_28px_rgba(99,59,50,0.1)] backdrop-blur transition-colors duration-300 hover:border-gold hover:bg-sand/60"
      >
        <Share2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Share invitation"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={reduceMotion ? { duration: 0.01 } : { duration: 0.25 }}
            className="absolute right-0 bottom-full z-10 mb-3 w-[17rem] border border-gold/30 bg-ivory p-2 shadow-[0_20px_60px_rgba(99,59,50,0.16)]"
          >
            <p className="px-3 pt-2 pb-1 text-[0.5625rem] font-medium tracking-[0.32em] text-moss uppercase">
              Share invitation
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center gap-3 px-3 text-sm text-teak/80 transition-colors hover:bg-sand/45 hover:text-teak"
            >
              <Share2 className="size-3.5 text-gold" strokeWidth={1.5} aria-hidden="true" />
              Share on WhatsApp
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="flex min-h-11 w-full items-center gap-3 px-3 text-left text-sm text-teak/80 transition-colors hover:bg-sand/45 hover:text-teak"
            >
              {copied ? (
                <Check className="size-3.5 text-gold" strokeWidth={1.6} aria-hidden="true" />
              ) : (
                <Copy className="size-3.5 text-gold" strokeWidth={1.5} aria-hidden="true" />
              )}
              {copied ? "Link copied" : "Copy link"}
            </button>

            {canNativeShare ? (
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex min-h-11 w-full items-center gap-3 px-3 text-left text-sm text-teak/80 transition-colors hover:bg-sand/45 hover:text-teak"
              >
                <Link2 className="size-3.5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                More options
              </button>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
