import AiNarrativeDemo from "./AiNarrativeDemo";
import { HOME_SOLUTIONS, HOME_SOLUTION_CARDS } from "@/data/marketing-copy";
import "./solutions-deliver-bento.css";

function cardClassName(card: (typeof HOME_SOLUTION_CARDS)[number]): string {
  const parts = ["sdb-card"];
  if (card.spanWide) parts.push("sdb-card--wide");
  if (card.variant === "featured") parts.push("sdb-card--feat");
  return parts.join(" ");
}

export default function OutcomeGrid() {
  return (
    <section
      id="solutions"
      className="bg-neutral-50 py-section"
      aria-labelledby="outcome-grid-heading"
    >
      <div className="mx-auto max-w-content px-content lg:px-8">
        <p className="sdb-label">{HOME_SOLUTIONS.sectionLabel}</p>
        <h2 id="outcome-grid-heading" className="sdb-head">
          {HOME_SOLUTIONS.heading}
        </h2>
        <p className="sdb-sub">{HOME_SOLUTIONS.subheading}</p>

        <div className="sdb-grid">
          {HOME_SOLUTION_CARDS.map((card) => (
            <article key={card.id} className={cardClassName(card)}>
              <div className="sdb-cardTop">
                <div className="sdb-ic" aria-hidden>
                  {/* Local SVG marks; sizing from solutions-deliver-bento.css */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.iconSrc} alt="" width={32} height={32} decoding="async" />
                </div>
                <h3 className="sdb-title">{card.title}</h3>
              </div>
              <p className="sdb-desc">{card.description}</p>
              {card.variant === "featured" ? <AiNarrativeDemo /> : null}
              {card.variant === "ask" ? (
                <div className="sdb-ask" aria-hidden>
                  <span>Why did margin compress in Q3?</span>
                  <span className="sdb-askCur" />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
