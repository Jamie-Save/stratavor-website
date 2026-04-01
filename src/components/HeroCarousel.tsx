"use client";

import Image from "next/image";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const AUTO_ADVANCE_MS = 5000;

/** All hero screenshots are exported at this size (keeps layout tight, no letterboxing). */
const HERO_IMG_WIDTH = 1024;
const HERO_IMG_HEIGHT = 475;

const slides: { src: string; alt: string }[] = [
  {
    src: "/hero/intelligence-hub.png",
    alt: "Stratavor Intelligence Hub dashboard with executive summary and KPI cards",
  },
  {
    src: "/hero/reporting-snapshots.png",
    alt: "Stratavor Reporting Snapshots library with report types and ready-to-view reports",
  },
  {
    src: "/hero/risk-intelligence.png",
    alt: "Stratavor Risk Intelligence risk register with scores and AI-suggested mitigations",
  },
  {
    src: "/hero/dashboard-with-chat.png",
    alt: "Stratavor dashboard with Ask Stratavor AI assistant panel open alongside reporting",
  },
  {
    src: "/hero/ask-stratavor.png",
    alt: "Ask Stratavor AI chat with suggested questions and input field",
  },
];

const SLIDE_COUNT = slides.length;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goTo = useCallback((i: number) => {
    setIndex(((i % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDE_COUNT);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `Slide ${index + 1} of ${SLIDE_COUNT}`;
    }
  }, [index]);

  useEffect(() => {
    if (prefersReducedMotion || isHovered || isFocused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [prefersReducedMotion, isHovered, isFocused, goNext]);

  const onCarouselMouseEnter = useCallback(() => setIsHovered(true), []);
  const onCarouselMouseLeave = useCallback(() => setIsHovered(false), []);

  const handleFocusOut = useCallback((e: React.FocusEvent) => {
    if (!containerRef.current) return;
    const related = e.relatedTarget as Node | null;
    if (related && containerRef.current.contains(related)) return;
    setIsFocused(false);
  }, []);

  const handleCarouselClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      goNext();
    },
    [goNext],
  );

  return (
    <div
      ref={containerRef}
      className="group relative w-full cursor-pointer overflow-hidden rounded-2xl shadow-large ring-1 ring-neutral-200/80"
      role="region"
      aria-roledescription="carousel"
      aria-label="Product screenshots. Click the image to advance to the next slide."
      tabIndex={0}
      onMouseEnter={onCarouselMouseEnter}
      onMouseLeave={onCarouselMouseLeave}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={handleFocusOut}
      onClick={handleCarouselClick}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          goPrev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          goNext();
        }
      }}
    >
      {/* Live region for slide change announcements */}
      <div
        ref={liveRegionRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Track width = N × viewport; each slide is 1/N of track so translate is by slide index */}
      <div
        className={`flex will-change-transform transition-transform ${
          prefersReducedMotion ? "duration-0" : "duration-500 ease-out"
        }`}
        style={{
          width: `${SLIDE_COUNT * 100}%`,
          transform: `translateX(-${(index * 100) / SLIDE_COUNT}%)`,
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="shrink-0"
            style={{ width: `${100 / SLIDE_COUNT}%` }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={HERO_IMG_WIDTH}
              height={HERO_IMG_HEIGHT}
              className="block h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Subtle inner vignette ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.04]" aria-hidden />

      {/* Pagination pills: bottom-left, show on hover / focus */}
      <div
        className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/40 px-2.5 py-2 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
      >
        <div
          role="tablist"
          aria-label="Slides"
          className="flex items-center gap-2"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1} of ${SLIDE_COUNT}`}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index
                  ? "w-7 bg-white"
                  : "w-2.5 bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
