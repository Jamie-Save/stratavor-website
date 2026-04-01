import { LIVE_DEMO_URL } from "@/data/demo-config";

export function HomeLiveDemoSection() {
  return (
    <section
      className="bg-white py-section"
      aria-labelledby="home-live-demo-heading"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center px-content lg:px-8">
        <div className="w-full max-w-2xl text-center">
          <p className="section-label mb-4">Live demo</p>
          <h2
            id="home-live-demo-heading"
            className="text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl"
          >
            See Stratavor in action
          </h2>
          <p className="mt-6 text-body-lg text-neutral-600">
            Experience the executive intelligence layer: drill into insights,
            explore risk visibility, and see how your reporting becomes strategy.
          </p>
        </div>

        <div className="mt-12 w-full max-w-6xl rounded-2xl border border-neutral-200 bg-white shadow-soft overflow-hidden">
          <iframe
            src={LIVE_DEMO_URL}
            title="Stratavor Live Demo"
            allowFullScreen
            className="block min-h-[480px] w-full border-0 sm:min-h-[520px]"
            loading="lazy"
          />
          <noscript>
            <div className="border-t border-neutral-200 px-6 py-4 text-center text-sm text-neutral-600">
              Preview requires JavaScript. Open the{" "}
              <a
                href={LIVE_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-gunmetal underline-offset-2 hover:underline"
              >
                live demo
              </a>{" "}
              in a new tab.
            </div>
          </noscript>
        </div>
      </div>
    </section>
  );
}
