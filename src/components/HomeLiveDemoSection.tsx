import Link from "next/link";
import { CONTACT_DEMO_URL } from "@/data/contact-links";
import { LIVE_DEMO_URL } from "@/data/demo-config";

export function HomeLiveDemoSection() {
  return (
    <section
      className="bg-white py-section"
      aria-labelledby="home-live-demo-heading"
    >
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-content lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="section-label mb-4">Live demo</p>
          <h2
            id="home-live-demo-heading"
            className="text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl"
          >
            See Stratavor in action
          </h2>
          <p className="mt-6 max-w-xl text-body-lg text-neutral-600">
            Experience the executive intelligence layer: drill into insights,
            explore risk visibility, and see how your reporting becomes strategy.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={LIVE_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              See Live Preview
            </Link>
            <Link href={CONTACT_DEMO_URL} className="btn-outline">
              Book a Demo
            </Link>
          </div>
        </div>

        <div
          className="rounded-2xl border border-neutral-200 bg-white shadow-soft overflow-hidden"
          aria-hidden
        >
          <iframe
            src={LIVE_DEMO_URL}
            title="Stratavor Live Demo"
            allowFullScreen
            className="min-h-[420px] w-full border-0"
            loading="lazy"
          />
          <div className="px-6 py-4">
            <p className="text-center text-xs text-neutral-500">
              If the embedded preview doesn’t load, open the live preview in
              a new tab.
            </p>
            <div className="mt-3 flex justify-center">
              <Link
                href={LIVE_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-brand-gunmetal transition-colors hover:text-brand-gunmetal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal"
              >
                See Live Preview
              </Link>
            </div>
          </div>
          <noscript>
            <div className="px-6 pb-6 pt-3 text-sm text-neutral-600">
              Preview requires JavaScript. Use the{" "}
              <a
                href={LIVE_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                See Live Preview
              </a>{" "}
              link.
            </div>
          </noscript>
        </div>
      </div>
    </section>
  );
}

