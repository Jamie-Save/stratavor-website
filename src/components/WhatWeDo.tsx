"use client";

import Marquee from "./Marquee";
import { whatWeDoImages } from "@/data/marquee";

const bullets = [
  "Placeholder bullet one: key benefit or capability.",
  "Placeholder bullet two: another benefit.",
  "Placeholder bullet three: optional third item.",
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-24">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-content lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left column: vertical rolling images */}
        <div className="relative min-h-[320px] order-1">
          <Marquee
            direction="vertical"
            items={whatWeDoImages}
            showPlayPause
          />
        </div>

        {/* Right column: text */}
        <div className="flex flex-col justify-center order-2">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            What we do
          </h2>
          <p className="mt-6 max-w-lg text-lg text-neutral-600">
            Placeholder paragraph. Describe your core offering in clear,
            benefit-focused language that resonates with your audience.
          </p>
          <ul className="mt-8 space-y-3" role="list">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-neutral-600">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                  aria-hidden
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
