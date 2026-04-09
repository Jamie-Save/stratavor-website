"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { whatWeDoImages } from "@/data/marquee";

const AUTO_ADVANCE_MS = 5000;

const HERO_IMG_WIDTH = 1024;
const HERO_IMG_HEIGHT = 475;

const slides = whatWeDoImages.map(({ src, alt }) => ({ src, alt }));
const SLIDE_COUNT = slides.length;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const tiltClass = prefersReducedMotion
    ? ""
    : "lg:-rotate-1 lg:transition-transform lg:duration-300 lg:ease-out lg:group-hover:rotate-0";

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
    <div className="group relative w-full">
      {!prefersReducedMotion && (
        <>
          <div
            className="pointer-events-none absolute left-[10px] top-[14px] -z-20 hidden h-[calc(100%-8px)] w-[calc(100%-16px)] rounded-2xl border border-neutral-200/60 bg-gradient-to-br from-neutral-100 to-neutral-50 shadow-soft sm:block"
            style={{ transform: "translate(14px, 18px)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-[6px] top-[10px] -z-10 hidden h-[calc(100%-4px)] w-[calc(100%-12px)] rounded-2xl border border-neutral-200/40 bg-white/70 shadow-soft blur-[0.5px] sm:block"
            style={{ transform: "translate(7px, 9px)" }}
            aria-hidden
          />
        </>
      )}

      <div className={`relative z-0 ${tiltClass}`}>
        <div
          ref={containerRef}
          className="relative w-full cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-large ring-1 ring-black/[0.04]"
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
          <div
            ref={liveRegionRef}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          />

          <div
            className="flex h-9 items-center gap-1.5 border-b border-neutral-200 bg-neutral-100/80 px-3"
            aria-hidden
          >
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          </div>

          <div className="relative overflow-hidden bg-neutral-50">
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
                  key={slide.src}
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
          </div>

          <div
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.04]"
            aria-hidden
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent rounded-b-2xl" aria-hidden />

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <p className="pointer-events-none text-center text-xs font-medium tabular-nums text-white/95 drop-shadow-sm sm:text-sm">
              {index + 1} / {SLIDE_COUNT}
            </p>
            <div
              role="tablist"
              aria-label="Slides"
              className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-2 backdrop-blur-md"
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
                      ? "w-7 bg-white shadow-sm"
                      : "w-2.5 bg-white/55 hover:bg-white/85"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
