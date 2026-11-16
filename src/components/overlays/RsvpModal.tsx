"use client";

import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { ModalShell } from "@/components/overlays/ModalShell";
import {
  demoNoteClass,
  errorClass,
  hintClass,
  inputClass,
  labelClass,
  radioClass,
  textareaClass,
} from "@/components/overlays/formStyles";
import { actionClass } from "@/lib/styles";

interface RsvpModalProps {
  open: boolean;
  onClose: () => void;
  coupleNames: string;
}

type Attendance = "" | "accept" | "decline";

interface FormErrors {
  name?: string;
  attendance?: string;
  guests?: string;
}

export function RsvpModal({ open, onClose, coupleNames }: RsvpModalProps) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("");
  const [guests, setGuests] = useState("2");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setName("");
    setAttendance("");
    setGuests("2");
    setMessage("");
    setErrors({});
    setSubmitted(false);
  };

  const clearError = (field: keyof FormErrors) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = "Please share the name we should greet.";
    }
    if (!attendance) {
      nextErrors.attendance = "Please let us know if you can join.";
    }
    if (attendance === "accept") {
      const guestCount = Number(guests);
      if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10) {
        nextErrors.guests = "Please choose between 1 and 10 guests.";
      }
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = nextErrors.name
        ? "rsvp-name"
        : nextErrors.attendance
          ? "rsvp-accept"
          : "rsvp-guests";
      window.requestAnimationFrame(() =>
        document.getElementById(firstInvalid)?.focus(),
      );
      return;
    }

    setSubmitted(true);
  };

  const attending = attendance === "accept";

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      eyebrow="RSVP"
      title="Will you join us?"
      description={`Please let ${coupleNames} know if you can celebrate with them.`}
      onExitComplete={resetForm}
    >
      {submitted ? (
        <div className="py-2 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full border border-gold/45 text-gold">
            <Check className="size-6" strokeWidth={1.4} aria-hidden="true" />
          </span>
          <h3 className="mt-5 font-display text-[1.85rem] leading-tight font-light text-teak">
            Thank you, {name.trim()}.
          </h3>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-teak/65">
            {attending
              ? `We are so glad you will be there${
                  Number(guests) > 1
                    ? ` — ${guests} guests in all.`
                    : "."
                }`
              : "We will miss you, and we are grateful for your warm wishes."}
          </p>
          {message.trim() ? (
            <p className="mx-auto mt-4 max-w-sm border-t border-gold/20 pt-4 font-display text-lg leading-snug text-teak/65 italic">
              “{message.trim()}”
            </p>
          ) : null}
          <p className={`mx-auto mt-6 max-w-xs ${demoNoteClass}`}>
            This is a demonstration. Your response has not been sent or stored.
          </p>
          <button
            type="button"
            onClick={onClose}
            className={actionClass("outline", "mt-6")}
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <label htmlFor="rsvp-name" className={labelClass}>
              Your name
            </label>
            <input
              id="rsvp-name"
              name="name"
              type="text"
              data-autofocus
              autoComplete="name"
              placeholder="e.g. Ananya Menon"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                clearError("name");
              }}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "rsvp-name-error" : undefined}
              className={inputClass}
            />
            {errors.name ? (
              <p id="rsvp-name-error" role="alert" className={errorClass}>
                <AlertCircle className="size-3" aria-hidden="true" />
                {errors.name}
              </p>
            ) : null}
          </div>

          <fieldset
            aria-describedby={
              errors.attendance ? "rsvp-attendance-error" : undefined
            }
          >
            <legend className={labelClass}>Will you attend?</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <label className={radioClass(attending)}>
                <span>Joyfully accepts</span>
                <span
                  aria-hidden="true"
                  className={`grid size-4 shrink-0 place-items-center rounded-full border ${
                    attending ? "border-ivory/80" : "border-teak/30"
                  }`}
                >
                  {attending ? <span className="size-1.5 rounded-full bg-ivory" /> : null}
                </span>
                <input
                  id="rsvp-accept"
                  type="radio"
                  name="attendance"
                  value="accept"
                  checked={attending}
                  onChange={() => {
                    setAttendance("accept");
                    clearError("attendance");
                  }}
                  className="sr-only"
                />
              </label>

              <label className={radioClass(attendance === "decline")}>
                <span>Regretfully declines</span>
                <span
                  aria-hidden="true"
                  className={`grid size-4 shrink-0 place-items-center rounded-full border ${
                    attendance === "decline" ? "border-ivory/80" : "border-teak/30"
                  }`}
                >
                  {attendance === "decline" ? (
                    <span className="size-1.5 rounded-full bg-ivory" />
                  ) : null}
                </span>
                <input
                  type="radio"
                  name="attendance"
                  value="decline"
                  checked={attendance === "decline"}
                  onChange={() => {
                    setAttendance("decline");
                    clearError("attendance");
                  }}
                  className="sr-only"
                />
              </label>
            </div>
            {errors.attendance ? (
              <p id="rsvp-attendance-error" role="alert" className={errorClass}>
                <AlertCircle className="size-3" aria-hidden="true" />
                {errors.attendance}
              </p>
            ) : null}
          </fieldset>

          {attending ? (
            <div>
              <label htmlFor="rsvp-guests" className={labelClass}>
                Number of guests
              </label>
              <select
                id="rsvp-guests"
                name="guests"
                value={guests}
                onChange={(event) => {
                  setGuests(event.target.value);
                  clearError("guests");
                }}
                aria-invalid={Boolean(errors.guests)}
                aria-describedby={errors.guests ? "rsvp-guests-error" : undefined}
                className={inputClass}
              >
                {Array.from({ length: 10 }, (_, index) => index + 1).map(
                  (count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? "guest" : "guests"}
                    </option>
                  ),
                )}
              </select>
              {errors.guests ? (
                <p id="rsvp-guests-error" role="alert" className={errorClass}>
                  <AlertCircle className="size-3" aria-hidden="true" />
                  {errors.guests}
                </p>
              ) : (
                <p className={`mt-2 ${hintClass}`}>
                  Including yourself, so we can plan the sadya.
                </p>
              )}
            </div>
          ) : null}

          <div>
            <label htmlFor="rsvp-message" className={labelClass}>
              A note for the couple <span className="normal-case tracking-normal text-teak/35">(optional)</span>
            </label>
            <textarea
              id="rsvp-message"
              name="message"
              rows={3}
              maxLength={400}
              placeholder="A blessing, a memory, or a dietary note…"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={textareaClass}
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              className={actionClass("primary", "w-full")}
            >
              Send RSVP
            </button>
            <p className={`mt-4 text-center ${demoNoteClass}`}>
              Demonstration only — nothing is sent or stored.
            </p>
          </div>
        </form>
      )}
    </ModalShell>
  );
}
