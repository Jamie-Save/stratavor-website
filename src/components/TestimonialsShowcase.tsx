"use client";

import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import ImpactStatsBanner from "@/components/ImpactStatsBanner";
import {
  testimonials,
  filterPills,
  type Testimonial,
  type FilterRole,
} from "@/data/testimonials";

const TESTIMONIALS_HEADLINE = "Loved by teams who ship";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Avatar({
  testimonial,
  size = "md",
  variant = "light",
}: {
  testimonial: Testimonial;
  size?: "sm" | "md";
  variant?: "light" | "dark";
}) {
  const dim = size === "sm" ? "h-8 w-8" : "h-12 w-12";
  const px = size === "sm" ? 32 : 48;
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  const darkInitials =
    variant === "dark"
      ? "bg-white/15 text-white ring-1 ring-white/20"
      : "bg-[rgba(229,57,53,0.1)] text-[var(--label-red)]";

  if (testimonial.avatar) {
    return (
      <div
        className={`${dim} shrink-0 overflow-hidden rounded-full ${variant === "dark" ? "ring-2 ring-white/25" : ""}`}
        aria-hidden
      >
        <Image
          src={testimonial.avatar}
          alt=""
          width={px}
          height={px}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${dim} flex shrink-0 items-center justify-center rounded-full font-semibold ${textSize} ${darkInitials}`}
      aria-hidden
    >
      {getInitials(testimonial.name)}
    </div>
  );
}

function FeaturedCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="relative rounded-2xl border border-white/15 bg-white/[0.06] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-sm sm:p-10 lg:p-12">
      <span
        className="pointer-events-none absolute left-5 top-2 select-none font-serif text-7xl leading-none text-brand-accent/35 sm:left-7 sm:text-8xl lg:text-9xl"
        aria-hidden
      >
        &ldquo;
      </span>
      <blockquote className="relative z-10">
        <p className="whitespace-pre-line text-xl font-light leading-relaxed text-white/95 sm:text-2xl">
          {testimonial.quote}
        </p>
      </blockquote>
      <footer className="relative z-10 mt-8 flex items-center gap-4 border-t border-white/10 pt-8">
        <Avatar testimonial={testimonial} size="md" variant="dark" />
        <div className="min-w-0">
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-sm text-white/65">
            {testimonial.title}
            {testimonial.company ? `, ${testimonial.company}` : ""}
          </p>
        </div>
        {testimonial.companyLogo && (
          <div className="ml-auto hidden h-8 w-20 shrink-0 brightness-0 invert opacity-60 sm:block">
            <Image
              src={testimonial.companyLogo}
              alt=""
              width={80}
              height={32}
              className="h-full w-auto object-contain"
            />
          </div>
        )}
      </footer>
    </article>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:border-brand-accent hover:bg-brand-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal-dark"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}

function RailSelectButton({
  testimonial,
  active,
  onSelect,
}: {
  testimonial: Testimonial;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      aria-label={`Show testimonial from ${testimonial.name}`}
      className={`flex w-full min-w-[min(17rem,calc(100vw-2.5rem))] shrink-0 snap-center items-center gap-3 rounded-xl border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal-dark lg:min-w-0 ${
        active
          ? "border-brand-accent bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
          : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.08]"
      }`}
    >
      <Avatar testimonial={testimonial} size="sm" variant="dark" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">{testimonial.name}</p>
        <p className="truncate text-xs text-white/60">
          {testimonial.title}
          {testimonial.company ? ` · ${testimonial.company}` : ""}
        </p>
      </div>
    </button>
  );
}

export default function TestimonialsShowcase() {
  const [selectedRole, setSelectedRole] = useState<FilterRole>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const filtered =
    selectedRole === "All"
      ? testimonials
      : testimonials.filter((t) => t.role === selectedRole);

  const safeIndex = Math.min(currentIndex, Math.max(0, filtered.length - 1));
  const featured = filtered[safeIndex];

  const goTo = useCallback(
    (i: number) => {
      if (filtered.length <= 0) return;
      setCurrentIndex(((i % filtered.length) + filtered.length) % filtered.length);
    },
    [filtered.length],
  );

  const goPrev = useCallback(() => goTo(safeIndex - 1), [goTo, safeIndex]);
  const goNext = useCallback(() => goTo(safeIndex + 1), [goTo, safeIndex]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedRole]);

  useEffect(() => {
    if (isPaused || filtered.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filtered.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, filtered.length]);

  useEffect(() => {
    if (!regionRef.current) return;
    const el = regionRef.current;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target !== el && !el.contains(e.target as Node)) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    el.setAttribute("tabindex", "0");
    el.addEventListener("keydown", handleKeyDown);
    return () => el.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext]);

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const delta = touchStart - e.changedTouches[0].clientX;
    if (delta > 50) goNext();
    else if (delta < -50) goPrev();
    setTouchStart(null);
  };

  if (filtered.length === 0) return null;

  return (
    <section
      id="customers"
      className="relative overflow-hidden bg-gradient-to-b from-brand-gunmetal to-brand-gunmetal-dark py-section"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-90"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 15% 0%, rgba(255,255,255,0.07) 0%, transparent 45%), radial-gradient(ellipse 55% 45% at 85% 15%, rgba(232, 104, 58, 0.12) 0%, transparent 42%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,0,0,0.2) 0%, transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-0 mx-auto max-w-content px-content lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 lg:gap-x-12">
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="flex gap-5">
              <div
                className="mt-2 hidden h-[min(100%,6rem)] min-h-[4.5rem] w-1 shrink-0 rounded-full bg-gradient-to-b from-white/50 via-white/20 to-brand-accent/40 sm:block"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="mb-4 text-caption font-semibold uppercase tracking-widest text-white/85">
                  What our customers say
                </p>
                <h2
                  id="testimonials-heading"
                  className="text-left text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight"
                >
                  {TESTIMONIALS_HEADLINE}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex items-end lg:col-span-6 xl:col-start-7">
            <p className="max-w-prose text-left text-body-lg text-white/75">
              Real stories from finance and ops leaders who needed clarity, speed, and fewer spreadsheets.
            </p>
          </div>
        </div>

        <div
          className="mt-10 flex flex-wrap gap-2 lg:mt-12"
          role="tablist"
          aria-label="Filter testimonials by role"
        >
          {filterPills.map((pill) => (
            <button
              key={pill.id}
              type="button"
              role="tab"
              aria-selected={selectedRole === pill.id}
              aria-controls="testimonials-panel"
              id={`pill-${pill.id}`}
              onClick={() => setSelectedRole(pill.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal-dark ${
                selectedRole === pill.id
                  ? "border border-white bg-white text-brand-gunmetal hover:bg-white/95"
                  : "border border-white/25 bg-white/10 text-white/90 hover:border-brand-accent hover:bg-brand-accent/20"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {featured
            ? `Showing testimonial from ${featured.name}, ${featured.title} at ${featured.company}`
            : ""}
        </p>

        <div
          ref={regionRef}
          id="testimonials-panel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonial carousel"
          aria-live="polite"
          className="mt-10 lg:mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filtered.map((t, i) => (
              <RailSelectButton
                key={`${t.name}-${i}`}
                testimonial={t}
                active={i === safeIndex}
                onSelect={() => goTo(i)}
              />
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:mt-8 lg:grid-cols-12 lg:gap-10">
            <div className="hidden flex-col gap-2 lg:col-span-4 lg:flex xl:col-span-4">
              {filtered.map((t, i) => (
                <RailSelectButton
                  key={`${t.name}-desktop-${i}`}
                  testimonial={t}
                  active={i === safeIndex}
                  onSelect={() => goTo(i)}
                />
              ))}
            </div>
            <div className="lg:col-span-8 xl:col-span-8">
              {featured ? <FeaturedCard testimonial={featured} /> : null}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 lg:mt-10">
            <ArrowButton direction="prev" onClick={goPrev} />
            <div className="flex items-center gap-1.5" role="group" aria-label="Testimonial slides">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === safeIndex
                      ? "w-6 bg-white shadow-sm"
                      : "w-2 bg-white/35 hover:bg-white/55"
                  }`}
                />
              ))}
            </div>
            <ArrowButton direction="next" onClick={goNext} />
          </div>
        </div>
      </div>

      <div className="relative z-0 mt-16 w-full lg:mt-20">
        <ImpactStatsBanner />
      </div>
    </section>
  );
}
