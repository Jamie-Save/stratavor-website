const outcomes = [
  {
    title: "Board-Ready Reporting",
    description:
      "Turn manual reporting into automated, audit-ready outputs. Stratavor surfaces the numbers that matter so you spend less time building decks and more time on strategy.",
    icon: (
      <svg
        className="h-6 w-6 shrink-0 text-brand-gunmetal"
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
  },
  {
    title: "AI-Powered Variance Narratives",
    description:
      "Ask your data questions in plain language. Get clear, contextual explanations of what changed and why—so you can explain variances to the board without digging through spreadsheets.",
    icon: (
      <svg
        className="h-6 w-6 shrink-0 text-brand-gunmetal"
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
  },
  {
    title: "Unified System Intelligence",
    description:
      "Connect QuickBooks, Xero, NetSuite, Stripe and more in one place. One source of truth across your systems so your strategic view is always current and consistent.",
    icon: (
      <svg
        className="h-6 w-6 shrink-0 text-brand-gunmetal"
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
  },
];

export default function OutcomeGrid() {
  return (
    <section
      className="bg-neutral-50 py-section"
      aria-labelledby="outcome-grid-heading"
    >
      <div className="mx-auto max-w-content px-content lg:px-8">
        <h2
          id="outcome-grid-heading"
          className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl"
        >
          What Stratavor Delivers
        </h2>
        <ul className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {outcomes.map((item, i) => (
            <li key={i}>
              <article
                className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-medium focus-within:ring-2 focus-within:ring-brand-gunmetal/20 sm:p-8"
                style={{ contain: "layout" }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-brand-gunmetal">
                  {item.icon}
                </div>
                <h3 className="mt-5 font-semibold text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-neutral-600">
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
