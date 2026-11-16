"use client";

import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { ModalShell } from "@/components/overlays/ModalShell";
import {
  demoNoteClass,
  errorClass,
  inputClass,
  labelClass,
  textareaClass,
} from "@/components/overlays/formStyles";
import { actionClass } from "@/lib/styles";
import type { WishSample } from "@/types/wedding";

interface WishesModalProps {
  open: boolean;
  onClose: () => void;
  coupleNames: string;
  samples: WishSample[];
}

interface WishErrors {
  name?: string;
  message?: string;
}

export function WishesModal({
  open,
  onClose,
  coupleNames,
  samples,
}: WishesModalProps) {
  const [wishes, setWishes] = useState<WishSample[]>(samples);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<WishErrors>({});
  const [successName, setSuccessName] = useState<string | null>(null);

  const clearError = (field: keyof WishErrors) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: WishErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = "Please share your name.";
    }
    if (message.trim().length < 4) {
      nextErrors.message = "Please write a few words for the couple.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = nextErrors.name ? "wish-name" : "wish-message";
      window.requestAnimationFrame(() =>
        document.getElementById(firstInvalid)?.focus(),
      );
      return;
    }

    const trimmedName = name.trim();
    setWishes((current) => [
      { name: trimmedName, message: message.trim() },
      ...current,
    ]);
    setSuccessName(trimmedName);
    setMessage("");
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      eyebrow="Wishes"
      title="Leave a wish"
      description={`A few words for ${coupleNames}, to be read and kept.`}
      onExitComplete={() => {
        setSuccessName(null);
        setErrors({});
        setMessage("");
      }}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="wish-name" className={labelClass}>
            Your name
          </label>
          <input
            id="wish-name"
            name="name"
            type="text"
            data-autofocus
            autoComplete="name"
            placeholder="e.g. Riya"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              clearError("name");
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "wish-name-error" : undefined}
            className={inputClass}
          />
          {errors.name ? (
            <p id="wish-name-error" role="alert" className={errorClass}>
              <AlertCircle className="size-3" aria-hidden="true" />
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="wish-message" className={labelClass}>
            Your wish
          </label>
          <textarea
            id="wish-message"
            name="message"
            rows={3}
            maxLength={400}
            placeholder="Wishing you a lifetime of…"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              clearError("message");
            }}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "wish-message-error" : "wish-message-hint"
            }
            className={textareaClass}
          />
          {errors.message ? (
            <p id="wish-message-error" role="alert" className={errorClass}>
              <AlertCircle className="size-3" aria-hidden="true" />
              {errors.message}
            </p>
          ) : (
            <p id="wish-message-hint" className={`mt-2 ${demoNoteClass}`}>
              {message.length}/400
            </p>
          )}
        </div>

        <button type="submit" className={actionClass("primary", "w-full")}>
          Send a wish
        </button>

        <p className={demoNoteClass}>
          Demonstration only — wishes stay in this browser and are not sent.
        </p>
      </form>

      <div aria-live="polite">
        {successName ? (
          <p className="mt-6 flex items-start gap-2 border border-gold/30 bg-sand/30 px-4 py-3 text-sm leading-relaxed text-teak/75">
            <Check className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
            Thank you, {successName}. Your wish has been added below.
          </p>
        ) : null}
      </div>

      <div className="mt-8 border-t border-gold/20 pt-6">
        <p className="text-[0.625rem] font-medium tracking-[0.32em] text-moss uppercase">
          Wishes already shared
        </p>
        <ul className="mt-4 space-y-5">
          {wishes.slice(0, 4).map((wish, index) => (
            <li
              key={`${wish.name}-${index}`}
              className="border-l border-gold/35 pl-4"
            >
              <p className="font-display text-lg leading-snug text-teak/80 italic">
                “{wish.message}”
              </p>
              <p className="mt-1.5 text-[0.625rem] font-medium tracking-[0.24em] text-teak/45 uppercase">
                {wish.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </ModalShell>
  );
}
