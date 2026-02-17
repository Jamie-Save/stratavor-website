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

function TestimonialCard({
  testimonial,
  variant,
  isSelected,
  onClick,
}: {
  testimonial: Testimonial;
  variant: "featured" | "compact";
  isSelected?: boolean;
  onClick?: () => void;
}) {
  const card = (
    <article
        className={`rounded-xl border bg-white text-left shadow-soft transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 ${
        isSelected
          ? "border-brand-orange ring-2 ring-brand-orange/20"
          : "border-neutral-200 hover:shadow-medium"
      } ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={onClick ? "button" : undefined}
      aria-pressed={onClick ? isSelected : undefined}
    >
      <blockquote className="p-6 sm:p-8">
        <p
          className={`text-neutral-700 ${
            variant === "featured"
              ? "text-lg sm:text-xl leading-relaxed"
              : "text-sm sm:text-base line-clamp-3"
          }`}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>
      <footer className="flex items-center gap-3 border-t border-neutral-100 px-6 py-4 sm:px-8">
        <div
          className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral-200"
          aria-hidden
        >
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt=""
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-neutral-900">{testimonial.name}</p>
          <p className="truncate text-sm text-neutral-500">
            {testimonial.title}
            {testimonial.company ? `, ${testimonial.company}` : ""}
          </p>
        </div>
        {testimonial.companyLogo && (
          <div className="ml-auto hidden h-8 w-16 shrink-0 sm:block">
            <Image
              src={testimonial.companyLogo}
              alt=""
              width={64}
              height={32}
              className="h-full w-auto object-contain opacity-60"
            />
          </div>
        )}
      </footer>
    </article>
  );

  return card;
}

export default function TestimonialsShowcase() {
  const [selectedRole, setSelectedRole] = useState<FilterRole>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const filtered =
    selectedRole === "All"
      ? testimonials
      : testimonials.filter((t) => t.role === selectedRole);

  const safeIndex = Math.min(currentIndex, Math.max(0, filtered.length - 1));
  const featured = filtered[safeIndex];
  const secondary = filtered
    .filter((_, i) => i !== safeIndex)
    .slice(0, 3);

  const goTo = useCallback(
    (i: number) => {
      if (filtered.length <= 0) return;
      setCurrentIndex(((i % filtered.length) + filtered.length) % filtered.length);
    },
    [filtered.length]
  );

  const goPrev = useCallback(() => goTo(safeIndex - 1), [goTo, safeIndex]);
  const goNext = useCallback(() => goTo(safeIndex + 1), [goTo, safeIndex]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedRole]);

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
      id="testimonials"
      className="bg-white py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-content px-content lg:px-8">
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-brand-orange">
          Testimonials
        </p>
        <h2
          id="testimonials-heading"
          className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
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
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 ${
                selectedRole === pill.id
                  ? "bg-brand-orange text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Live announcement for screen readers when testimonial changes */}
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
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Mobile: single-card slider */}
          <div className="lg:hidden">
            {featured && (
              <div className="relative">
                <TestimonialCard testimonial={featured} variant="featured" />
                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 focus-visible:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/20"
                  >
                    <svg
                      className="h-5 w-5"
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
                  <span className="text-sm text-neutral-500">
                    {safeIndex + 1} of {filtered.length}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 focus-visible:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/20"
                  >
                    <svg
                      className="h-5 w-5"
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
              </div>
            )}
          </div>

          {/* Desktop: featured + row of 3 */}
          <div className="hidden lg:grid lg:grid-cols-[2fr_1fr] lg:gap-8">
            {featured && (
              <div className="min-w-0">
                <TestimonialCard testimonial={featured} variant="featured" />
              </div>
            )}
            <div className="flex flex-col gap-4">
              {secondary.map((t, i) => {
                const idx = filtered.indexOf(t);
                return (
                  <div key={idx} className="min-w-0">
                    <TestimonialCard
                      testimonial={t}
                      variant="compact"
                      isSelected={false}
                      onClick={() => setCurrentIndex(idx)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop: prev/next for keyboard users */}
          <div className="mt-8 hidden justify-center gap-2 lg:flex">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 focus-visible:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/20"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 focus-visible:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/20"
            >
              Next
            </button>
          </div>

          {/* Pagination dots for screen readers / optional visual */}
          <div className="mt-6 flex justify-center gap-1.5" aria-hidden>
            {filtered.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-colors ${
                  i === safeIndex ? "w-6 bg-brand-orange" : "w-2 bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
