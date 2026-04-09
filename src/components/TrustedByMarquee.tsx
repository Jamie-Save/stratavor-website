"use client";

import Marquee from "./Marquee";
import { trustedByLogos } from "@/data/marquee";
import { HOME_TRUSTED_BY } from "@/data/marketing-copy";

export default function TrustedByMarquee() {
  return (
    <section
      className="relative overflow-hidden border-y border-white/10 bg-gradient-to-b from-brand-gunmetal to-brand-gunmetal-dark py-10 lg:py-12"
      aria-labelledby="trusted-by-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-90"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 15% 0%, rgba(255,255,255,0.07) 0%, transparent 45%), radial-gradient(ellipse 55% 45% at 85% 15%, rgba(232, 104, 58, 0.1) 0%, transparent 42%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,0,0,0.18) 0%, transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-0 mx-auto max-w-content px-content lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 lg:gap-x-10">
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="flex gap-4 sm:gap-5">
              <div
                className="mt-1.5 hidden h-[min(100%,4.5rem)] min-h-[3.5rem] w-1 shrink-0 rounded-full bg-gradient-to-b from-white/45 via-white/15 to-brand-accent/35 sm:block"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="mb-3 text-caption font-semibold uppercase tracking-widest text-white/85">
                  {HOME_TRUSTED_BY.sectionLabel}
                </p>
                <h2
                  id="trusted-by-heading"
                  className="text-left font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                >
                  {HOME_TRUSTED_BY.headline}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex items-end lg:col-span-6 xl:col-start-7">
            <p className="max-w-prose text-left text-body-lg text-white/70">{HOME_TRUSTED_BY.subline}</p>
          </div>
        </div>

        <div className="mt-8 lg:mt-10">
          <Marquee items={trustedByLogos} variant="trusted" surface="dark" />
        </div>
      </div>
    </section>
  );
}
