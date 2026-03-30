"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export type MarqueeItemLogo = {
  src?: string;
  alt: string;
  name: string;
};

type MarqueeProps = {
  items: MarqueeItemLogo[];
  variant?: "trusted" | "integrations";
};

// Logo slot: image or placeholder div (fixed aspect for no layout shift)
function LogoSlot({
  item,
  variant,
  grayscale,
}: {
  item: MarqueeItemLogo;
  variant: "trusted" | "integrations";
  grayscale?: boolean;
}) {
  const base =
    "flex shrink-0 items-center justify-center text-sm font-medium text-neutral-500";
  const trusted = "h-12 w-32 rounded-lg bg-neutral-100 px-6";
  const integrations =
    "h-14 w-36 rounded-lg border border-neutral-200 bg-white px-8 text-neutral-600";

  const imgH = variant === "integrations" ? "h-9" : "h-8";
  const imgFilter =
    grayscale === undefined
      ? "grayscale transition-all duration-300"
      : grayscale
        ? "grayscale transition-all duration-300"
        : "grayscale-0 transition-all duration-300";

  if (item.src) {
    return (
      <div
        className={`${base} ${variant === "trusted" ? trusted : integrations}`}
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={120}
          height={40}
          className={`${imgH} w-auto object-contain ${imgFilter}`}
        />
      </div>
    );
  }
  return (
    <div
      className={`${base} ${variant === "trusted" ? trusted : integrations}`}
      aria-hidden
    >
      {item.name}
    </div>
  );
}

export default function Marquee({ items, variant = "trusted" }: MarqueeProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const duplicated = [...items, ...items];

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {items.map((item, i) => (
          <LogoSlot key={i} item={item} variant={variant} />
        ))}
      </div>
    );
  }

  const isIntegrations = variant === "integrations";
  const scrollStyle = {
    animation: "marquee-h 30s linear infinite",
  };
  const stripClasses = "flex gap-8 whitespace-nowrap will-change-transform";

  return (
    <div ref={containerRef} className="relative flex items-center gap-3">
      <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
        <div className={stripClasses} style={scrollStyle}>
          {duplicated.map((item, i) => (
            <LogoSlot
              key={i}
              item={item}
              variant={variant}
              grayscale={isIntegrations ? false : true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
