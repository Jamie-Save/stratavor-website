"use client";

import type { PricingFAQItem } from "@/data/pricing-faq";

interface FAQItemProps {
  item: PricingFAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-brand-gunmetal">{item.question}</span>
        <span
          className={`shrink-0 text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-5 pr-8 text-neutral-600">{item.answer}</p>
      </div>
    </div>
  );
}
