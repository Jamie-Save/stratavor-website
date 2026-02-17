"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

export type MarqueeDirection = "horizontal" | "vertical";

export type MarqueeItemLogo = {
  src?: string;
  alt: string;
  name: string;
};

export type MarqueeItemImage = {
  src: string;
  alt: string;
};

type MarqueeProps =
  | {
      direction: "horizontal";
      items: MarqueeItemLogo[];
      variant?: "trusted" | "integrations";
      showPlayPause?: boolean;
    }
  | {
      direction: "vertical";
      items: MarqueeItemImage[];
      variant?: "images";
      showPlayPause?: boolean;
    };

// Logo slot: image or placeholder div (fixed aspect for no layout shift)
function LogoSlot({
  item,
  variant,
}: {
  item: MarqueeItemLogo;
  variant: "trusted" | "integrations";
}) {
  const base =
    "flex shrink-0 items-center justify-center text-sm font-medium text-neutral-500";
  const trusted = "h-12 w-32 rounded-lg bg-neutral-100 px-6";
  const integrations =
    "h-14 w-36 rounded-lg border border-neutral-200 bg-white px-8 text-neutral-600";

  const imgH = variant === "integrations" ? "h-9" : "h-8";

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
          className={`${imgH} w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0`}
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

export default function Marquee(props: MarqueeProps) {
  const { direction, showPlayPause = true } = props;
  const items = props.items;
  const variant = props.variant ?? (direction === "horizontal" ? "trusted" : "images");

  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const paused = isPaused || isHovered || isFocused || prefersReducedMotion;

  const handleFocusOut = useCallback((e: React.FocusEvent) => {
    if (!containerRef.current) return;
    const related = e.relatedTarget as Node | null;
    if (related && containerRef.current.contains(related)) return;
    setIsFocused(false);
  }, []);

  const duplicated = [...items, ...items];

  // Static layout for reduced motion
  if (prefersReducedMotion) {
    if (direction === "horizontal") {
      return (
        <div
          ref={containerRef}
          className="flex flex-wrap items-center justify-center gap-4"
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={handleFocusOut}
        >
          {items.map((item, i) => (
            <LogoSlot
              key={i}
              item={item as MarqueeItemLogo}
              variant={variant as "trusted" | "integrations"}
            />
          ))}
        </div>
      );
    }
    // Vertical: static stack
    return (
      <div
        ref={containerRef}
        className="flex flex-col items-center gap-4"
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={handleFocusOut}
      >
        {(items as MarqueeItemImage[]).map((item, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] w-[200px] shrink-0 overflow-hidden rounded-lg bg-neutral-200"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
        ))}
      </div>
    );
  }

  if (direction === "horizontal") {
    const logos = items as MarqueeItemLogo[];
    return (
      <div
        ref={containerRef}
        className="relative flex items-center gap-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={handleFocusOut}
      >
        <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
          <div
            className="flex gap-8 whitespace-nowrap will-change-transform"
            style={{
              animation: paused ? "none" : "marquee-h 30s linear infinite",
            }}
          >
            {duplicated.map((item, i) => (
              <LogoSlot
                key={`${i}`}
                item={item as MarqueeItemLogo}
                variant={variant as "trusted" | "integrations"}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Vertical marquee (images)
  const images = items as MarqueeItemImage[];
  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-[280px] flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={handleFocusOut}
    >
      {showPlayPause && (
        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          aria-label={paused ? "Play marquee" : "Pause marquee"}
          className="absolute right-0 top-0 z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded text-neutral-500 transition-colors hover:text-neutral-700 focus-visible:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
        >
          {paused ? (
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          )}
        </button>
      )}
      <div className="flex-1 overflow-hidden">
        <div
          className="flex flex-col gap-6"
          style={{
            animation: paused ? "none" : "marquee-v 40s linear infinite",
          }}
        >
          {[...images, ...images].map((item, i) => (
            <div
              key={`${i}`}
              className="relative aspect-[4/3] w-[200px] shrink-0 overflow-hidden rounded-lg bg-neutral-200"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
