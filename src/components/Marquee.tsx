"use client";

import Image from "next/image";
import { Fragment, useState, useEffect, useRef } from "react";
import type { LogoItem } from "@/data/marquee";

export type { LogoItem as MarqueeItemLogo } from "@/data/marquee";

type MarqueeProps = {
  items: LogoItem[];
  variant?: "trusted" | "integrations";
  /** Dark gunmetal band (trusted row on home). */
  surface?: "light" | "dark";
};

function LogoSlot({
  item,
  variant,
  grayscale,
  surface,
}: {
  item: LogoItem;
  variant: "trusted" | "integrations";
  grayscale?: boolean;
  surface?: "light" | "dark";
}) {
  const isTrustedDark = variant === "trusted" && surface === "dark";

  if (isTrustedDark) {
    if (item.src) {
      return (
        <div className="flex min-h-12 shrink-0 items-center justify-center px-4">
          <Image
            src={item.src}
            alt={item.alt}
            width={120}
            height={40}
            className="h-9 max-h-10 w-auto object-contain opacity-85 transition-opacity duration-300 hover:opacity-100"
          />
        </div>
      );
    }
    return (
      <div
        className="flex min-h-12 min-w-[5.5rem] shrink-0 items-center justify-center px-5 font-heading text-lg font-medium tracking-wide text-white/75 transition-colors duration-300 hover:text-white sm:text-xl"
        aria-hidden
      >
        {item.name}
      </div>
    );
  }

  const base =
    surface === "dark" && variant === "trusted"
      ? "flex shrink-0 items-center justify-center text-sm font-medium text-white/85"
      : "flex shrink-0 items-center justify-center text-sm font-medium text-neutral-500";
  const trusted =
    surface === "dark"
      ? "h-12 w-32 rounded-lg border border-white/15 bg-white/10 px-6"
      : "h-12 w-32 rounded-lg bg-neutral-100 px-6";
  const integrations =
    "min-w-[5.5rem] shrink-0 items-center justify-center px-5 py-2 text-neutral-600";

  const imgH = variant === "integrations" ? "h-9" : "h-8";
  const imgFilter =
    grayscale === undefined
      ? "grayscale transition-all duration-300"
      : grayscale
        ? "grayscale transition-all duration-300"
        : "grayscale-0 transition-all duration-300";

  if (item.src) {
    const integrationsScale =
      variant === "integrations" ? (item.logoScale ?? 1) : 1;
    /** Home + pricing integrations marquee: logos 1.5× previous 2.25rem base. */
    const integrationsSizeMul = variant === "integrations" ? 1.5 : 1;
    const integrationsHeightRem = 2.25 * integrationsScale * integrationsSizeMul;
    const integrationsSlotMinRem =
      variant === "integrations"
        ? Math.max(
            4.75 * integrationsSizeMul,
            integrationsHeightRem + 0.4 * integrationsSizeMul,
          )
        : undefined;

    return (
      <div
        className={`${base} ${variant === "trusted" ? trusted : integrations}`}
        style={
          integrationsSlotMinRem != null
            ? { minHeight: `${integrationsSlotMinRem}rem` }
            : undefined
        }
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={120}
          height={40}
          className={
            variant === "integrations"
              ? `w-auto object-contain ${imgFilter}`
              : `${imgH} w-auto object-contain ${imgFilter}`
          }
          style={
            variant === "integrations"
              ? { height: `${integrationsHeightRem}rem`, width: "auto" }
              : undefined
          }
        />
      </div>
    );
  }
  return (
    <div
      className={`${base} ${variant === "trusted" ? trusted : integrations}`}
      aria-hidden
    >
      {item.name}
    </div>
  );
}

function MarqueeSeparator() {
  return (
    <span
      className="inline-flex shrink-0 select-none items-center self-center px-1 font-heading text-2xl leading-none text-white/25 sm:text-[1.75rem]"
      aria-hidden
    >
      ·
    </span>
  );
}

export default function Marquee({
  items,
  variant = "trusted",
  surface = "light",
}: MarqueeProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTrustedDark = variant === "trusted" && surface === "dark";
  const marqueeDurationSec = isTrustedDark ? 42 : 30;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isIntegrations = variant === "integrations";

  /** One loop of content; duplicated as two siblings so translateX(-50%) is pixel-seamless. */
  function MarqueeSegment({
    copyId,
    ariaHidden,
  }: {
    copyId: string;
    ariaHidden?: boolean;
  }) {
    if (isTrustedDark) {
      return (
        <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
          {items.map((item, i) => (
            <Fragment key={`${copyId}-${item.name}-${i}`}>
              {i > 0 ? <MarqueeSeparator /> : null}
              <LogoSlot
                item={item}
                variant={variant}
                surface={surface}
                grayscale={isIntegrations ? false : true}
              />
            </Fragment>
          ))}
        </div>
      );
    }
    const gapClass = variant === "integrations" ? "gap-8" : "gap-4";
    return (
      <div
        className={`flex shrink-0 items-center ${gapClass}`}
        aria-hidden={ariaHidden || undefined}
      >
        {items.map((item, i) => (
          <LogoSlot
            key={`${copyId}-${item.name}-${i}`}
            item={item}
            variant={variant}
            surface={surface}
            grayscale={isIntegrations ? false : true}
          />
        ))}
      </div>
    );
  }

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={`flex flex-wrap items-center justify-center gap-1 sm:gap-0 ${isTrustedDark ? "gap-x-0 gap-y-2" : "gap-4"}`}
      >
        {items.map((item, i) => (
          <Fragment key={`${item.name}-${i}`}>
            {isTrustedDark && i > 0 ? <MarqueeSeparator /> : null}
            <LogoSlot
              item={item}
              variant={variant}
              surface={surface}
              grayscale={isIntegrations ? false : true}
            />
          </Fragment>
        ))}
      </div>
    );
  }

  const scrollStyle = {
    animation: `marquee-h ${marqueeDurationSec}s linear infinite`,
  };

  return (
    <div ref={containerRef} className="relative flex items-center gap-3">
      <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
        <div
          className="flex w-max whitespace-nowrap will-change-transform"
          style={scrollStyle}
        >
          <MarqueeSegment copyId="a" />
          <MarqueeSegment copyId="b" ariaHidden />
        </div>
      </div>
    </div>
  );
}
