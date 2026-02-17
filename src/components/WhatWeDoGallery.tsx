"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { whatWeDoImages } from "@/data/marquee";

const AUTO_ADVANCE_MS = 5000;

function getIndices(center: number, total: number) {
  const prev = (center - 1 + total) % total;
  const next = (center + 1) % total;
  return [prev, center, next];
}

export default function WhatWeDoGallery() {
  const [centerIndex, setCenterIndex] = useState(0);
  const total = whatWeDoImages.length;
  const [prevIdx, centerIdx, nextIdx] = getIndices(centerIndex, total);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goNext = useCallback(() => {
    setCenterIndex((i) => (i + 1) % total);
  }, [total]);

  const goTo = useCallback((i: number) => {
    setCenterIndex(((i % total) + total) % total);
  }, [total]);

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

  const duration = prefersReducedMotion ? 0 : 500;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="What we do imagery"
      tabIndex={0}
      onMouseEnter={pauseForInteraction}
      onMouseLeave={resumeAfterInteraction}
      onFocusCapture={pauseForInteraction}
      onBlurCapture={handleFocusOut}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setCenterIndex((i) => (i - 1 + total) % total);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          goNext();
        }
      }}
    >
      {/* Flowstep-style 3D perspective scene: bent cards, center focus */}
      <div
        className="relative flex items-center justify-center overflow-visible py-8"
        style={{ perspective: "1600px", perspectiveOrigin: "50% 50%" }}
      >
        <div
          className="flex items-center justify-center gap-0"
          style={{ transformStyle: "preserve-3d", minHeight: "320px" }}
        >
          {/* Left card - rotated, scaled, peeking */}
          <div
            className="hidden shrink-0 cursor-pointer transition-all ease-out sm:block"
            style={{
              width: "240px",
              transform: "rotateY(26deg) scale(0.82)",
              transformOrigin: "right center",
              transitionDuration: `${duration}ms`,
              marginRight: "-20px",
              zIndex: 2,
            }}
            onClick={() => setCenterIndex((i) => (i - 1 + total) % total)}
          >
            <div className="relative w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft aspect-[4/3]">
              <Image
                src={whatWeDoImages[prevIdx].src}
                alt={whatWeDoImages[prevIdx].alt}
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
          </div>

          {/* Center card - larger, elevated */}
          <div
            className="relative z-10 shrink-0 transition-all ease-out"
            style={{
              width: "min(680px, 92vw)",
              transitionDuration: `${duration}ms`,
            }}
          >
            <div className="relative w-full overflow-hidden rounded-2xl border-2 border-brand-orange/35 bg-white shadow-medium ring-4 ring-brand-orange/10 aspect-[4/3]">
              <Image
                src={whatWeDoImages[centerIdx].src}
                alt={whatWeDoImages[centerIdx].alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 92vw, 680px"
                priority
              />
            </div>
          </div>

          {/* Right card - rotated, scaled, peeking */}
          <div
            className="hidden shrink-0 cursor-pointer transition-all ease-out sm:block"
            style={{
              width: "240px",
              transform: "rotateY(-26deg) scale(0.82)",
              transformOrigin: "left center",
              transitionDuration: `${duration}ms`,
              marginLeft: "-20px",
              zIndex: 2,
            }}
            onClick={goNext}
          >
            <div className="relative w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft aspect-[4/3]">
              <Image
                src={whatWeDoImages[nextIdx].src}
                alt={whatWeDoImages[nextIdx].alt}
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pagination dots only - no prev/next/pause buttons */}
      <div className="flex justify-center gap-2" role="tablist" aria-label="Slide thumbnails">
        {whatWeDoImages.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === centerIndex}
            aria-label={`Go to slide ${i + 1} of ${total}`}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all ${
              i === centerIndex
                ? "h-2 w-6 bg-brand-orange"
                : "h-2 w-2 bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
