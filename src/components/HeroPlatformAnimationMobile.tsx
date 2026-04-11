import Image from "next/image";
import {
  HERO_ACCOUNTING_LOGOS,
  HERO_CRM_LOGO,
  HERO_ERP_LOGO,
  HERO_WORKSPACE_LOGOS,
} from "@/data/marquee";

/** Matches first desktop narrative (static on mobile; no typing loop). */
const MOBILE_AI_SNIPPET =
  "Revenue declined <strong>32% YoY</strong> to €117.5m, yet net margin held at <strong>75.9%</strong>. Implementation revenue is the primary drag — subscription lines are stable.";

const MOBILE_LOGOS = [
  ...HERO_ACCOUNTING_LOGOS,
  HERO_ERP_LOGO,
  HERO_CRM_LOGO,
  ...HERO_WORKSPACE_LOGOS,
];

/**
 * Simplified hero diagram for viewports below `lg`: flow layout, no absolute canvas.
 * Desktop uses {@link HeroPlatformAnimation}.
 */
export default function HeroPlatformAnimationMobile() {
  return (
    <div
      className="mx-auto w-full max-w-lg px-1 py-4"
      aria-label="Stratavor connects your systems and turns data into AI narrative intelligence"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {MOBILE_LOGOS.map((logo) => (
            <div
              key={logo.src}
              className="flex h-[52px] min-w-[52px] items-center justify-center rounded-full bg-white px-2.5 shadow-[0_1px_4px_rgba(57,84,96,0.08)] ring-1 ring-brand-gunmetal/10"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={56}
                height={56}
                unoptimized={logo.src.endsWith(".svg")}
                className="w-auto object-contain"
                style={{ maxHeight: Math.min(logo.maxHeightPx, 36) }}
              />
            </div>
          ))}
        </div>

        <div className="relative flex h-[88px] w-[88px] shrink-0 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full shadow-[0_0_0_8px_rgba(57,84,96,0.05),0_8px_24px_rgba(57,84,96,0.18)]"
            style={{
              background:
                "radial-gradient(circle at 40% 35%, #4a6d7d, #395460 40%, #1a3340 100%)",
            }}
            aria-hidden
          />
          <svg
            className="relative z-[1] h-[38px] w-auto text-white drop-shadow-md"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 97.47 172.77"
            aria-hidden
          >
            <path
              d="M52.28,155.02l-7.08.06v-8.68s-6.98,0-6.98,0l-.04,8.63h-7.06s-.04-8.63-.04-8.63l-6.97-.02v8.67s-8.73-.02-8.73-.02c2.45-3.23,4.28-6.53,6.03-10.16,3.73-7.74,6.54-15.67,9.15-23.91,3.43-11.07,6.2-22.11,8.68-33.59h18.98c2.57,11.87,5.47,23.43,9.12,34.96,2.52,7.79,5.21,15.29,8.76,22.62,1.74,3.59,3.54,6.86,5.97,10.06h-8.75s-.04-8.62-.04-8.62l-6.85-.03-.09,8.67h-7.03s-.09-8.67-.09-8.67l-6.89.02-.04,8.6Z"
              fill="currentColor"
            />
            <path
              d="M83.66,159.33c7.71-.18,13.9,5.9,13.8,13.44H0c-.15-7.34,5.87-13.41,13.34-13.44h70.32Z"
              fill="currentColor"
            />
            <path
              d="M69.61,20.09c-.39,2.64.66,5.62-.14,8.29l-8.2,27.34-25.06-.02-8.33-27.28,16.62-.04.05-8.28,8.37-.02.06,8.3h8.19s.04-8.3.04-8.3h8.4Z"
              fill="currentColor"
            />
            <path
              d="M69.24,83.03l-40.79.04c-2.33,0-3.82-2.17-3.79-4.12.04-2.31,1.86-4.06,4.22-4.03l7.29-.05.03-14.88h25.04s.03,14.91.03,14.91l7.67.02c2.14.18,3.7,1.74,3.83,3.82.11,1.8-1.15,4.29-3.54,4.29Z"
              fill="currentColor"
            />
            <polygon
              points="43.1 18.21 33.88 18.26 33.87 9.16 43.07 9.12 43.1 18.21"
              fill="#38AB45"
            />
            <polygon
              points="25.88 23.23 17.83 23.27 17.83 15.26 25.84 15.26 25.88 23.23"
              fill="#FFD500"
            />
            <polygon points="27.95 6.02 21.87 6.12 21.83 .03 27.9 0 27.95 6.02" fill="#E30613" />
          </svg>
        </div>

        <div className="w-full max-w-sm rounded-xl border border-brand-gunmetal/10 bg-white px-4 py-3 text-center shadow-sm">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-brand-gunmetal/10 px-2 py-1">
            <svg
              className="h-3 w-3 shrink-0 text-brand-gunmetal"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M12 2a4 4 0 014 4v1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2V6a4 4 0 014-4z" />
              <path d="M9 18h6M10 22h4" />
              <path d="M12 14v4" />
            </svg>
            <span className="text-[10px] font-semibold text-brand-gunmetal">AI narrative intelligence</span>
          </div>
          <p
            className="text-left text-[11px] leading-relaxed text-neutral-600 sm:text-xs [&_strong]:font-semibold [&_strong]:text-brand-gunmetal"
            dangerouslySetInnerHTML={{ __html: MOBILE_AI_SNIPPET }}
          />
        </div>
      </div>
    </div>
  );
}
