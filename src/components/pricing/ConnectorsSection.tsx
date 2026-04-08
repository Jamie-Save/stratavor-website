import Marquee from "@/components/Marquee";
import { integrationLogos } from "@/data/marquee";

export function ConnectorsSection() {
  return (
    <section className="py-section sm:py-20" aria-label="Connectors">
      <div className="pricing-inner">
        <div className="text-center">
          <p className="section-subheading-flow mx-auto mt-3 text-center">
            Built and maintained by Stratavor. Available on all tiers.
          </p>
        </div>
      </div>
      <div className="mt-10 overflow-x-hidden sm:mt-12">
        <Marquee items={integrationLogos} variant="integrations" />
      </div>
    </section>
  );
}
