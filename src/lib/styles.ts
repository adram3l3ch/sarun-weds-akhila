export type ActionVariant = "primary" | "outline" | "quiet";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2.5 px-6 py-3 text-center text-[0.625rem] font-medium uppercase tracking-[0.28em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ActionVariant, string> = {
  primary: "bg-teak text-ivory hover:bg-teak/90",
  outline: "border border-gold/50 text-teak hover:border-gold hover:bg-sand/40",
  quiet:
    "min-h-0 px-0 py-1 text-teak/65 underline-offset-[6px] hover:text-teak hover:underline decoration-gold/60",
};

export function actionClass(variant: ActionVariant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`.trim();
}
