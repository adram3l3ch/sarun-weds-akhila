interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  tone?: "gold" | "moss";
}

export function Eyebrow({
  children,
  className = "",
  tone = "moss",
}: EyebrowProps) {
  return (
    <p
      className={`text-[0.625rem] font-medium uppercase tracking-[0.38em] ${
        tone === "gold" ? "text-gold" : "text-moss"
      } ${className}`}
    >
      {children}
    </p>
  );
}
