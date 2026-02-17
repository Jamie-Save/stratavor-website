"use client";

import Image from "next/image";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const SLIDE_COUNT = 5;
const AUTO_ADVANCE_MS = 5000;

const slides: { src: string; title: string; description: string }[] = [
  {
    src: "/hero/slide-1.png",
    title: "Lifetime Value, CAC & Payback",
    description: "Connects retention and pricing to customer lifetime value and CAC payback.",
  },
  {
    src: "/hero/slide-2.png",
    title: "Revenue Churn, Expansion & NRR",
    description: "Gross MRR churn, upsell expansion and net revenue retention in a single view.",
  },
  {
    src: "/hero/slide-3.png",
    title: "Insights & Commentary",
    description: "AI-powered virtual analyst explains what changed, why it matters, and where to focus.",
  },
  {
    src: "/hero/slide-4.png",
    title: "Financial Snapshot",
    description: "Executive-ready summaries with data sourced directly from your systems.",
  },
  {
    src: "/hero/slide-5.png",
    title: "Numbers That Matter",
    description: "Headline financials and customer metrics with MoM and YoY movements, plus AI narrative.",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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

  const goTo = useCallback(
    (i: number) => {
      const next = ((i % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;
      setIndex(next);
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = `Slide ${next + 1} of ${SLIDE_COUNT}: ${slides[next].title}`;
      }
    },
    []
  );

  const goNext = useCallback(() => goTo(index + 1), [index, goTo]);
  const goPrev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    if (
      prefersReducedMotion ||
      isPaused ||
      isHovered ||
      isFocused
    ) {
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
  }, [prefersReducedMotion, isPaused, isHovered, isFocused, index, goNext]);

  const pauseForInteraction = useCallback(() => {
    setIsHovered(true);
    setIsFocused(true);
  }, []);
  const resumeAfterInteraction = useCallback(() => {
    setIsHovered(false);
    setIsFocused(false);
  }, []);

  const handleFocusOut = useCallback((e: React.FocusEvent) => {
    if (!containerRef.current) return;
    const related = e.relatedTarget as Node | null;
    if (related && containerRef.current.contains(related)) return;
    setIsFocused(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-800 shadow-large ring-1 ring-neutral-200/50"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero image carousel"
      tabIndex={0}
      onMouseEnter={pauseForInteraction}
      onMouseLeave={resumeAfterInteraction}
      onFocusCapture={pauseForInteraction}
      onBlurCapture={handleFocusOut}
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

      {/* Slides strip: right-to-left slide (enter from right, exit to left) */}
      <div
        className={`flex h-full will-change-transform transition-transform ${
          prefersReducedMotion ? "duration-0" : "duration-500 ease-out"
        }`}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative h-full w-full shrink-0">
            <Image
              src={slide.src}
              alt=""
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={i === 0}
            />
            {/* Hover overlay: gradient + text */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-brand-gunmetal/80 via-brand-gunmetal/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              aria-hidden
            >
              <p className="text-center text-lg font-semibold text-white">
                {slide.title}
              </p>
              <p className="mt-2 max-w-md text-center text-sm text-white/90">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle inner vignette ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.04]" aria-hidden />

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
        {/* Pagination dots */}
        <div
          role="tablist"
          aria-label="Slide thumbnails"
          className="flex items-center gap-2"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1} of ${SLIDE_COUNT}: ${slides[i].title}`}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index
                  ? "w-7 bg-white"
                  : "w-2.5 bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Prev / Play-Pause / Next */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm text-white transition-colors hover:bg-white/25 focus-visible:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? "Play carousel" : "Pause carousel"}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm text-white transition-colors hover:bg-white/25 focus-visible:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isPaused ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm text-white transition-colors hover:bg-white/25 focus-visible:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}
