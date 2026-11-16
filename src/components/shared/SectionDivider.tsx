interface SectionDividerProps {
  className?: string;
}

/** A restrained kasavu-inspired rule used between editorial sections. */
export function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-4 ${className}`}
    >
      <span className="h-px w-12 bg-gold/30 sm:w-20" />
      <svg
        viewBox="0 0 56 14"
        fill="none"
        className="h-3.5 w-14 shrink-0 text-gold"
      >
        <path
          d="M28 1.5 33.5 7 28 12.5 22.5 7 28 1.5Z"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.75"
        />
        <path d="M28 4.6 30.4 7 28 9.4 25.6 7 28 4.6Z" fill="currentColor" fillOpacity="0.22" />
        <circle cx="11" cy="7" r="1" fill="currentColor" fillOpacity="0.55" />
        <circle cx="45" cy="7" r="1" fill="currentColor" fillOpacity="0.55" />
        <path d="M0 7h5M51 7h5" stroke="currentColor" strokeOpacity="0.35" />
      </svg>
      <span className="h-px w-12 bg-gold/30 sm:w-20" />
    </div>
  );
}
