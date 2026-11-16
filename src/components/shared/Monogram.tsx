interface MonogramProps {
  value: string;
  className?: string;
  textClassName?: string;
}

/**
 * A fine-line ornamental frame around the couple's monogram. Purely
 * decorative — the couple's names are always announced in nearby text.
 */
export function Monogram({
  value,
  className = "",
  textClassName = "text-xl",
}: MonogramProps) {
  return (
    <span
      aria-hidden="true"
      className={`relative block aspect-square ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        className="absolute inset-0 h-full w-full text-gold"
      >
        <circle cx="60" cy="60" r="58" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.7" />
        <circle
          cx="60"
          cy="60"
          r="52"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="0.6"
          strokeDasharray="0.7 4"
          strokeLinecap="round"
        />
        <path
          d="M60 1.5v5M60 113.5v5M1.5 60h5M113.5 60h5"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="0.7"
        />
        <path
          d="m60 6.5 2.6 2.6L60 11.7l-2.6-2.6L60 6.5ZM60 108.3l2.6 2.6-2.6 2.6-2.6-2.6 2.6-2.6ZM6.5 60l2.6-2.6 2.6 2.6-2.6 2.6L6.5 60ZM108.3 60l2.6-2.6 2.6 2.6-2.6 2.6-2.6-2.6Z"
          fill="currentColor"
          fillOpacity="0.35"
        />
        <circle cx="17" cy="17" r="1" fill="currentColor" fillOpacity="0.4" />
        <circle cx="103" cy="17" r="1" fill="currentColor" fillOpacity="0.4" />
        <circle cx="17" cy="103" r="1" fill="currentColor" fillOpacity="0.4" />
        <circle cx="103" cy="103" r="1" fill="currentColor" fillOpacity="0.4" />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center whitespace-nowrap font-display font-light tracking-[0.08em] text-teak ${textClassName}`}
      >
        {value}
      </span>
    </span>
  );
}
