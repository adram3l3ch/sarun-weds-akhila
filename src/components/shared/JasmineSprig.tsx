interface JasmineSprigProps {
  className?: string;
  flip?: boolean;
}

/** A delicate jasmine sprig, drawn in a single line weight. */
export function JasmineSprig({ className = "", flip = false }: JasmineSprigProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 140 52"
      fill="none"
      className={`${className} ${flip ? "-scale-x-100" : ""}`}
    >
      <path
        d="M2 44c22-4 40-12 55-25 9-8 18-12 29-13"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />
      <path
        d="M47 31c-8-1-14-5-17-12 8-1 14 3 17 12ZM62 21c-6-4-8-10-6-17 7 3 9 9 6 17ZM75 12c-2-7 1-12 7-15 4 6 1 12-7 15Z"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeOpacity="0.42"
        strokeLinejoin="round"
      />
      <g stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.65">
        <path d="M88 13c-3-4-2-8 2-10 4 2 5 6 2 10 4-2 8 0 9 4-3 3-7 3-9 0 0 4-3 7-7 6-2-4 0-8 3-10Z" />
        <circle cx="93" cy="13" r="1.3" fill="currentColor" fillOpacity="0.5" />
        <path d="M108 4c-2-3-1-6 2-7 3 1 4 4 2 7 3-2 6 0 6 3-2 2-5 2-6 0 0 3-2 5-5 4-1-3 0-6 1-7Z" />
        <path d="M121 16c-2-3-1-6 2-7 3 1 4 4 2 7 3-2 6 0 6 3-2 2-5 2-6 0 0 3-2 5-5 4-1-3 0-6 1-7Z" />
      </g>
    </svg>
  );
}
