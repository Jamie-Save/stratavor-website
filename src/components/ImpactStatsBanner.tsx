"use client";

import { useEffect, useRef } from "react";
import "./impact-stats-banner.css";

function easeOutCubic(p: number) {
  return 1 - Math.pow(1 - p, 3);
}

export default function ImpactStatsBanner() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el1 = ref1.current;
    const el2 = ref2.current;
    const el3 = ref3.current;
    if (!el1 || !el2 || !el3) return;

    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setFinal = () => {
      el1.innerHTML = `73<span class="impactStatsBanner__unit">%</span>`;
      el2.innerHTML = `4.7<span class="impactStatsBanner__unit">×</span>`;
      el3.textContent = "24";
    };

    if (reduced) {
      setFinal();
      return;
    }

    let cancelled = false;
    const timeouts: number[] = [];

    const runRaf = (step: (now: number) => void) => {
      const id = requestAnimationFrame((t) => {
        if (!cancelled) step(t);
      });
      return id;
    };

    const animateCount = (
      el: HTMLElement,
      target: number,
      durationMs: number,
      delayMs: number,
      render: (value: number, progress: number) => void,
    ) => {
      const startTimeout = window.setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          if (cancelled) return;
          const p = Math.min((now - start) / durationMs, 1);
          const e = easeOutCubic(p);
          render(target * e, p);
          if (p < 1) runRaf(tick);
        };
        runRaf(tick);
      }, delayMs);
      timeouts.push(startTimeout);
    };

    animateCount(el1, 73, 1600, 300, (v, p) => {
      const n = p >= 1 ? 73 : Math.round(v);
      el1.innerHTML = `${n}<span class="impactStatsBanner__unit">%</span>`;
    });

    animateCount(el2, 4.7, 1800, 500, (v, p) => {
      const x = p >= 1 ? 4.7 : v;
      el2.innerHTML = `${x.toFixed(1)}<span class="impactStatsBanner__unit">×</span>`;
    });

    const t3 = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const p = Math.min((now - start) / 2000, 1);
        const e = easeOutCubic(p);
        el3.textContent = String(Math.round(24 * e));
        if (p < 1) runRaf(tick);
      };
      runRaf(tick);
    }, 700);
    timeouts.push(t3);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="impactStatsBanner font-body">
      <h2 className="sr-only">Stratavor impact statistics banner with three key metrics</h2>
      <div className="impactStatsBanner__stats">
        <div className="impactStatsBanner__stat">
          <div className="impactStatsBanner__num" ref={ref1}>
            0<span className="impactStatsBanner__unit">%</span>
          </div>
          <div className="impactStatsBanner__label">
            Less time producing
            <br />
            board-ready reporting
          </div>
          <div className="impactStatsBanner__source">vs. manual preparation</div>
        </div>
        <div className="impactStatsBanner__stat">
          <div className="impactStatsBanner__num" ref={ref2}>
            0<span className="impactStatsBanner__unit">×</span>
          </div>
          <div className="impactStatsBanner__label">
            Faster from raw data
            <br />
            to strategic insight
          </div>
          <div className="impactStatsBanner__source">data to narrative in minutes</div>
        </div>
        <div className="impactStatsBanner__stat">
          <div className="impactStatsBanner__num" ref={ref3}>
            0
          </div>
          <div className="impactStatsBanner__label">
            Working days reclaimed
            <br />
            per year, per finance team
          </div>
          <div className="impactStatsBanner__source">Sage Fast Close Research, 2025</div>
        </div>
      </div>
    </div>
  );
}
