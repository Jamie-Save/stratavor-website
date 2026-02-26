"use client";

import Image from "next/image";
import {
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  testimonials,
  filterPills,
  type Testimonial,
  type FilterRole,
} from "@/data/testimonials";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  Avatar                                                             */
/* ------------------------------------------------------------------ */

function Avatar({
  testimonial,
  size = "md",
}: {
  testimonial: Testimonial;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-8 w-8" : "h-12 w-12";
  const px = size === "sm" ? 32 : 48;
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  if (testimonial.avatar) {
    return (
      <div className={`${dim} shrink-0 overflow-hidden rounded-full`} aria-hidden>
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
      className={`${dim} flex shrink-0 items-center justify-center rounded-full font-semibold ${textSize} bg-[rgba(229,57,53,0.1)] text-[var(--label-red)]`}
      aria-hidden
    >
      {getInitials(testimonial.name)}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured Card                                                      */
/* ------------------------------------------------------------------ */

function FeaturedCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="relative mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-white p-8 shadow-medium sm:p-12">
      {/* Decorative opening quote */}
      <span
        className="pointer-events-none absolute left-6 top-4 select-none font-serif text-8xl leading-none text-brand-accent/20 sm:left-8 sm:top-2 sm:text-9xl"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <blockquote className="relative z-10">
        <p className="text-xl font-light leading-relaxed text-neutral-700 sm:text-2xl">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      <footer className="relative z-10 mt-8 flex items-center gap-4">
        <Avatar testimonial={testimonial} size="md" />
        <div className="min-w-0">
          <p className="font-semibold text-neutral-900">{testimonial.name}</p>
          <p className="text-sm text-neutral-500">
            {testimonial.title}
            {testimonial.company ? `, ${testimonial.company}` : ""}
          </p>
        </div>
        {testimonial.companyLogo && (
          <div className="ml-auto hidden h-8 w-20 shrink-0 sm:block">
            <Image
              src={testimonial.companyLogo}
              alt=""
              width={80}
              height={32}
              className="h-full w-auto object-contain opacity-50"
            />
          </div>
        )}
      </footer>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Compact (Side-Peek) Card                                           */
/* ------------------------------------------------------------------ */

function CompactCard({
  testimonial,
  onClick,
}: {
  testimonial: Testimonial;
  onClick: () => void;
}) {
  return (
    <article
      className="cursor-pointer rounded-xl border border-neutral-200 bg-white p-6 shadow-soft transition-all hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      aria-label={`View testimonial from ${testimonial.name}`}
    >
      <blockquote>
        <p className="text-body line-clamp-2 text-neutral-600">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>
      <footer className="mt-4 flex items-center gap-3">
        <Avatar testimonial={testimonial} size="sm" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-neutral-900">{testimonial.name}</p>
          <p className="truncate text-xs text-neutral-500">
            {testimonial.title}
            {testimonial.company ? `, ${testimonial.company}` : ""}
          </p>
        </div>
      </footer>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Arrow Button                                                       */
/* ------------------------------------------------------------------ */

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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition-colors hover:border-neutral-300 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
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

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

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

  // Pick 2 side-peek cards (the next 2 after featured, wrapping around)
  const peekCards: { testimonial: Testimonial; globalIndex: number }[] = [];
  if (filtered.length > 1) {
    for (let i = 1; i <= 2 && i < filtered.length; i++) {
      const idx = (safeIndex + i) % filtered.length;
      peekCards.push({ testimonial: filtered[idx], globalIndex: idx });
    }
  }

  /* Navigation helpers */
  const goTo = useCallback(
    (i: number) => {
      if (filtered.length <= 0) return;
      setCurrentIndex(((i % filtered.length) + filtered.length) % filtered.length);
    },
    [filtered.length],
  );

  const goPrev = useCallback(() => goTo(safeIndex - 1), [goTo, safeIndex]);
  const goNext = useCallback(() => goTo(safeIndex + 1), [goTo, safeIndex]);

  /* Reset index on filter change */
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedRole]);

  /* Autoplay – 6 s interval, pause on hover */
  useEffect(() => {
    if (isPaused || filtered.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filtered.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, filtered.length]);

  /* Keyboard navigation */
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

  /* Touch swipe */
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
      id="testimonials"
      className="bg-neutral-50 py-section"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-content px-content lg:px-8">
        {/* Label */}
        <p className="section-label mb-4 text-center">What our customers say</p>

        {/* Heading */}
        <h2
          id="testimonials-heading"
          className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl"
        >
          Loved by teams who ship
        </h2>

        {/* Filter pills */}
        <div
          className="mt-8 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter testimonials by role"
        >
          {filterPills.map((pill) => (
            <button
              key={pill.id}
              role="tab"
              aria-selected={selectedRole === pill.id}
              aria-controls="testimonials-panel"
              id={`pill-${pill.id}`}
              onClick={() => setSelectedRole(pill.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2 ${
                selectedRole === pill.id
                  ? "border border-brand-gunmetal bg-brand-gunmetal text-white"
                  : "border border-neutral-200 bg-white text-neutral-600 shadow-xs hover:border-neutral-300 hover:text-neutral-900"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Live announcement for screen readers */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {featured
            ? `Showing testimonial from ${featured.name}, ${featured.title} at ${featured.company}`
            : ""}
        </p>

        {/* Testimonials panel */}
        <div
          ref={regionRef}
          id="testimonials-panel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonial carousel"
          aria-live="polite"
          className="mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Featured card */}
          {featured && <FeaturedCard testimonial={featured} />}

          {/* Side-peek cards – desktop only */}
          {peekCards.length > 0 && (
            <div className="mx-auto mt-6 hidden max-w-3xl grid-cols-2 gap-6 lg:grid">
              {peekCards.map(({ testimonial, globalIndex }) => (
                <CompactCard
                  key={globalIndex}
                  testimonial={testimonial}
                  onClick={() => setCurrentIndex(globalIndex)}
                />
              ))}
            </div>
          )}

          {/* Navigation: arrows + dots */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <ArrowButton direction="prev" onClick={goPrev} />

            {/* Pagination dots */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === safeIndex
                      ? "w-6 bg-brand-gunmetal"
                      : "w-2 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>

            <ArrowButton direction="next" onClick={goNext} />
          </div>
        </div>

        {/* Metrics strip – bold, in-your-face with hover pop */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {[
            { value: "98%", label: "Customer satisfaction" },
            { value: "3x", label: "Faster reporting" },
            { value: "50%", label: "Less manual work" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl border-2 border-neutral-200 bg-white px-8 py-10 text-center shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:shadow-large sm:px-10 sm:py-12"
            >
              <p className="text-5xl font-bold tracking-tight text-brand-gunmetal transition-colors duration-300 group-hover:text-white sm:text-6xl lg:text-7xl">
                {stat.value}
              </p>
              <p className="mt-3 text-base font-semibold text-neutral-600 transition-colors duration-300 group-hover:text-white sm:text-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
