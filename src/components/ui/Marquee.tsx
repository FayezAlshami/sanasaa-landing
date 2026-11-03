"use client";

type Props = {
  items: string[];
  className?: string;
};

export default function Marquee({ items, className = "" }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y border-gold/15 bg-surface/40 py-5 ${className}`} dir="ltr">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap text-lg font-semibold text-cream/80 md:text-2xl"
            dir="rtl"
          >
            <span className="mx-3 text-gold">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
