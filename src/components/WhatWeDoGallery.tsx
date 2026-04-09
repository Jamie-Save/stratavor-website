"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { whatWeDoImages } from "@/data/marquee";

const IMG_W = 1024;
const IMG_H = 475;

export default function WhatWeDoGallery() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="border-l-2 border-brand-gunmetal/[0.12] pl-6 sm:pl-8 lg:pl-10">
      <div className="flex flex-col gap-16 lg:gap-24">
        {whatWeDoImages.map((item, i) => {
          const step = String(i + 1).padStart(2, "0");
          const tiltEven = i % 2 === 0;
          const tiltClass =
            prefersReducedMotion
              ? ""
              : tiltEven
                ? "lg:rotate-1 lg:transition-transform lg:duration-300 lg:ease-out lg:group-hover:rotate-0"
                : "lg:-rotate-1 lg:transition-transform lg:duration-300 lg:ease-out lg:group-hover:rotate-0";

          const isEven = i % 2 === 0;
          return (
            <article
              key={item.src}
              className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12 lg:gap-x-10"
              aria-labelledby={`what-we-do-${i}-title`}
            >
              {/* DOM: copy before image for screen-reader order; visual order uses CSS order (image first on small screens). */}
              <div
                className={`flex flex-col justify-center pl-0 lg:pl-2 lg:col-span-5 ${
                  isEven ? "order-2 lg:order-1" : "order-2 lg:order-2"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="mt-1 hidden min-w-[2.5rem] font-heading text-sm font-semibold tabular-nums text-brand-gunmetal/40 lg:block"
                    aria-hidden
                  >
                    {step}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="section-label mb-2 lg:hidden">Step {step}</p>
                    <h3
                      id={`what-we-do-${i}-title`}
                      className="font-heading text-xl font-semibold tracking-tight text-brand-gunmetal sm:text-2xl 2xl:text-3xl"
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 text-body-lg text-neutral-600">{item.description}</p>
                  </div>
                </div>
              </div>

              <div
                className={`group relative lg:col-span-7 ${
                  isEven ? "order-1 lg:order-2" : "order-1 lg:order-1"
                }`}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-medium ring-1 ring-black/[0.04] ${tiltClass}`}
                >
                  <div
                    className="flex h-9 items-center gap-1.5 border-b border-neutral-200 bg-neutral-100/80 px-3"
                    aria-hidden
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
                  </div>
                  <div className="relative aspect-[1024/475] w-full bg-neutral-50">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={IMG_W}
                      height={IMG_H}
                      className="h-full w-full object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 62vw, 900px"
                      priority={i === 0}
                    />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
