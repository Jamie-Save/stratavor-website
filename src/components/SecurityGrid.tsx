import Link from "next/link";
import { SECURITY_HOME_SECTION, securityItems } from "@/data/security";
import { SecurityIcon } from "./SecurityIcons";

export default function SecurityGrid() {
  return (
    <section
      id="security"
      className="bg-neutral-50 py-section"
      aria-labelledby="security-heading"
    >
      <div className="mx-auto max-w-content px-content lg:px-8">
        <p className="section-label mb-4 text-center">{SECURITY_HOME_SECTION.label}</p>
        <h2 id="security-heading" className="section-heading">
          {SECURITY_HOME_SECTION.heading}
        </h2>
        <p className="section-subheading">{SECURITY_HOME_SECTION.subheading}</p>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item, i) => (
            <li key={i}>
              <article
                className="group card-lift flex h-full flex-col p-6 sm:p-8 duration-normal hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:shadow-large"
                style={{ contain: "layout" }}
              >
                <SecurityIcon
                  name={item.icon}
                  className="transition-colors duration-normal group-hover:bg-white/20 group-hover:text-white"
                />
                <h3 className="mt-5 font-semibold text-neutral-900 transition-colors duration-normal group-hover:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-neutral-600 transition-colors duration-normal group-hover:text-white">
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link href={SECURITY_HOME_SECTION.trustCentrePath} className="btn-outline">
            Visit Trust Centre
          </Link>
        </div>
      </div>
    </section>
  );
}
