import { HOME_OUTCOMES, HOME_SOLUTIONS } from "@/data/marketing-copy";

const outcomeIcons = [
  (
    <svg
      key="doc"
      className="h-6 w-6 shrink-0 text-inherit"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  ),
  (
    <svg
      key="ai"
      className="h-6 w-6 shrink-0 text-inherit"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  ),
  (
    <svg
      key="link"
      className="h-6 w-6 shrink-0 text-inherit"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  ),
  (
    <svg
      key="chart"
      className="h-6 w-6 shrink-0 text-inherit"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  ),
  (
    <svg
      key="shield"
      className="h-6 w-6 shrink-0 text-inherit"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  ),
  (
    <svg
      key="chat"
      className="h-6 w-6 shrink-0 text-inherit"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.375l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a23.922 23.922 0 00-1.689-1.319 2.916 2.916 0 00-1.318-.084C15.876 2.5 14.056 2 12.25 2c-.785 0-1.56.086-2.31.254M3.75 20.25a.75.75 0 01-.75-.75V5.625A2.625 2.625 0 015.625 3h12.75a.75.75 0 01.75.75v12.022m-12.75-9h12.75m0 0l-.375-.375M12 8.25h.375"
      />
    </svg>
  ),
];

export default function OutcomeGrid() {
  return (
    <section
      id="solutions"
      className="bg-neutral-50 py-section"
      aria-labelledby="outcome-grid-heading"
    >
      <div className="mx-auto max-w-content px-content lg:px-8">
        <p className="section-label mb-4 text-center">{HOME_SOLUTIONS.sectionLabel}</p>
        <h2 id="outcome-grid-heading" className="section-heading">
          {HOME_SOLUTIONS.heading}
        </h2>
        <p className="section-subheading">{HOME_SOLUTIONS.subheading}</p>
        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {HOME_OUTCOMES.map((item, i) => (
            <li key={item.title}>
              <article
                className="group card-lift flex h-full flex-col p-6 sm:p-8 duration-normal hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:shadow-large"
                style={{ contain: "layout" }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-brand-gunmetal transition-colors duration-normal group-hover:bg-white/20 group-hover:text-white">
                  {outcomeIcons[i]}
                </div>
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
      </div>
    </section>
  );
}
