"use client";

import { useState } from "react";
import { PRICING_FAQ } from "@/data/pricing-faq";
import { FAQItem } from "./FAQItem";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-section sm:py-20" aria-labelledby="faq-heading">
      <div className="pricing-inner">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-start lg:gap-14 xl:gap-20">
          <header className="text-center lg:sticky lg:top-28 lg:text-left">
            <h2 id="faq-heading" className="section-heading-flow mx-auto lg:mx-0">
              Common questions
            </h2>
            <p className="section-subheading-flow mx-auto mt-3 text-center lg:mx-0 lg:text-left">
              Plans, pilots, and your data.
            </p>
          </header>
          <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200/90 bg-transparent px-4 sm:px-5 lg:mt-0 lg:border lg:border-neutral-200/90 lg:bg-white/60 lg:px-6 lg:shadow-soft lg:ring-1 lg:ring-black/[0.03] lg:backdrop-blur-sm">
            {PRICING_FAQ.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
