"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { whatWeDoImages } from "@/data/marquee";

function getIndices(center: number, total: number) {
  const prev = (center - 1 + total) % total;
  const next = (center + 1) % total;
  return [prev, center, next];
}

export default function WhatWeDoGallery() {
  const [centerIndex, setCenterIndex] = useState(0);
  const total = whatWeDoImages.length;
  const [prevIdx, centerIdx, nextIdx] = getIndices(centerIndex, total);

  const goPrev = useCallback(() => {
    setCenterIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setCenterIndex((i) => (i + 1) % total);
  }, [total]);

  return (
    <div
      className="relative flex flex-col items-center gap-4"
      role="region"
      aria-label="What we do imagery"
    >
      <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous image"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus-visible:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/20"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="flex items-end gap-4">
        {/* Left: smaller */}
        <div className="hidden w-[140px] shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-soft sm:block">
          <div className="relative aspect-[4/3]">
            <Image
              src={whatWeDoImages[prevIdx].src}
              alt={whatWeDoImages[prevIdx].alt}
              fill
              className="object-cover"
              sizes="140px"
            />
          </div>
        </div>

        {/* Center: larger, focus */}
        <div className="relative w-[280px] shrink-0 overflow-hidden rounded-xl border-2 border-brand-orange/30 bg-white shadow-medium ring-2 ring-brand-orange/10 sm:w-[340px] lg:w-[400px]">
          <div className="relative aspect-[4/3]">
            <Image
              src={whatWeDoImages[centerIdx].src}
              alt={whatWeDoImages[centerIdx].alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 400px"
              priority
            />
          </div>
        </div>

        {/* Right: smaller */}
        <div className="hidden w-[140px] shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-soft sm:block">
          <div className="relative aspect-[4/3]">
            <Image
              src={whatWeDoImages[nextIdx].src}
              alt={whatWeDoImages[nextIdx].alt}
              fill
              className="object-cover"
              sizes="140px"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={goNext}
        aria-label="Next image"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus-visible:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/20"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      </div>
      <div className="flex justify-center gap-1.5">
        {whatWeDoImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCenterIndex(i)}
            aria-label={`Go to slide ${i + 1} of ${total}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === centerIndex
                ? "bg-brand-orange"
                : "bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
