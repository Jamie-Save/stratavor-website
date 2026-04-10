"use client";

import { Fragment, useEffect, useState } from "react";
import { HOME_TRUSTED_BY, TRUSTED_BY_TICKER_ROLES } from "@/data/marketing-copy";
import "./trusted-by-banner.css";

const TICKER_LOOPS = [0, 1] as const;

function TickerTrack({ duplicate }: { duplicate: boolean }) {
  const loops = duplicate ? TICKER_LOOPS : ([0] as const);
  return (
    <>
      {loops.flatMap((loop) =>
        TRUSTED_BY_TICKER_ROLES.map((role, i) => (
          <Fragment key={`${loop}-${i}`}>
            <span className="stratavorTrustedBanner__dot" aria-hidden>
              ·
            </span>
            <span
              className={
                role.highlighted
                  ? "stratavorTrustedBanner__role stratavorTrustedBanner__role--hi"
                  : "stratavorTrustedBanner__role"
              }
            >
              {role.label}
            </span>
          </Fragment>
        )),
      )}
    </>
  );
}

export default function TrustedByMarquee() {
  const rolesSrList = TRUSTED_BY_TICKER_ROLES.map((r) => r.label).join(", ");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section
      className="w-full bg-neutral-50 py-10 lg:py-14"
      aria-labelledby="trusted-by-heading"
    >
      <div className="stratavorTrustedBanner font-body w-full">
          <div className="stratavorTrustedBanner__top">
            <div className="stratavorTrustedBanner__topCluster">
              <div className="stratavorTrustedBanner__left">
                <div className="stratavorTrustedBanner__label">{HOME_TRUSTED_BY.sectionLabel}</div>
                <h2 id="trusted-by-heading" className="stratavorTrustedBanner__head">
                  {HOME_TRUSTED_BY.headlineLines[0]}
                  <br />
                  {HOME_TRUSTED_BY.headlineLines[1]}
                </h2>
              </div>
              <div className="stratavorTrustedBanner__right">
                <p className="stratavorTrustedBanner__sub">
                  {HOME_TRUSTED_BY.sublineLines[0]}
                  <br />
                  {HOME_TRUSTED_BY.sublineLines[1]}
                </p>
                <p className="stratavorTrustedBanner__cred">{HOME_TRUSTED_BY.credentialLine}</p>
              </div>
            </div>
          </div>

          <p className="sr-only">Audience roles highlighted in the band include: {rolesSrList}.</p>
          <div className="stratavorTrustedBanner__tickerWrap" aria-hidden>
            <div className="stratavorTrustedBanner__ticker">
              <TickerTrack duplicate={!reduceMotion} />
            </div>
          </div>
        </div>
    </section>
  );
}
