import Marquee from "@/components/Marquee";
import { integrationLogos } from "@/data/marquee";

export function ConnectorsSection() {
  return (
    <section className="py-section sm:py-20" aria-labelledby="connectors-heading">
      <div className="pricing-inner">
        <div className="flex flex-col gap-2 text-center md:flex-row md:items-end md:justify-between md:gap-8 md:text-left">
          <div className="md:max-w-xl">
            <h2 id="connectors-heading" className="section-heading-flow mx-auto md:mx-0">
              Core connectors
            </h2>
            <p className="section-subheading-flow mx-auto mt-3 text-center md:mx-0 md:text-left">
              Built and maintained by Stratavor. Available on all tiers.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 overflow-x-hidden sm:mt-12">
        <Marquee items={integrationLogos} variant="integrations" />
      </div>
    </section>
  );
}
