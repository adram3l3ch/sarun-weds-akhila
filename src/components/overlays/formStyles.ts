export const labelClass =
  "block text-[0.625rem] font-medium uppercase tracking-[0.28em] text-teak/55";

export const inputClass =
  "mt-2 block w-full appearance-none rounded-none border-0 border-b border-teak/20 bg-transparent px-0 py-2.5 font-sans text-[0.95rem] text-teak placeholder:text-teak/30 transition-colors focus:border-gold focus:outline-none focus-visible:outline-none";

export const textareaClass = `${inputClass} resize-none leading-relaxed`;

export const errorClass =
  "mt-1.5 flex items-center gap-1.5 text-xs font-medium text-teak";

export const hintClass = "text-[0.6875rem] leading-relaxed text-teak/45";

export const demoNoteClass =
  "text-[0.6875rem] leading-relaxed text-teak/45";

export function radioClass(selected: boolean) {
  return `flex min-h-12 cursor-pointer items-center justify-between gap-3 border px-4 py-3 text-sm transition-colors duration-200 focus-within:outline focus-within:outline-1 focus-within:outline-offset-2 focus-within:outline-gold ${
    selected
      ? "border-teak bg-teak text-ivory"
      : "border-teak/20 text-teak/75 hover:border-gold/60"
  }`;
}
