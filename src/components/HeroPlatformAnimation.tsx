"use client";

import { Titillium_Web } from "next/font/google";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MutableRefObject } from "react";
import {
  HERO_ACCOUNTING_LOGOS,
  HERO_CRM_LOGO,
  HERO_ERP_LOGO,
  HERO_WORKSPACE_LOGOS,
} from "@/data/marquee";
import "./hero-platform-animation.css";

const titillium = Titillium_Web({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-titillium-hero",
});

const NARRATIVES = [
  "Revenue declined <strong>32% YoY</strong> to €117.5m, yet net margin held at <strong>75.9%</strong>. Implementation revenue is the primary drag — subscription lines are stable.",
  "Cash position strengthened to <strong>€36.3m</strong>, up 55% YoY. However, receivable days at <strong>1,208</strong> signal collection risk requiring immediate attention.",
  "EBITDA compressed <strong>39% YoY</strong> to €89.2m. Operating expenses grew from 13.8% to 20.9% of revenue. Cost discipline across OpEx is recommended.",
  "4 of 10 KPIs flagged as <strong>Critical</strong>, concentrated in profitability and efficiency. Return on equity dropped 72pp — management review required.",
] as const;

function typeNarrative(
  html: string,
  aiEl: HTMLElement,
  charMs: number,
  timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null>,
) {
  const clearPending = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  aiEl.innerHTML = "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const txt = tmp.textContent ?? "";
  let i = 0;

  const step = () => {
    if (i <= txt.length) {
      let cc = 0;
      let ci = 0;
      let inTag = false;
      for (let j = 0; j < html.length && cc <= i; j++) {
        if (html[j] === "<") inTag = true;
        if (!inTag) cc++;
        if (html[j] === ">") inTag = false;
        ci = j + 1;
      }
      aiEl.innerHTML = `${html.slice(0, ci)}<span class="typing-cursor"></span>`;
      i++;
      timeoutRef.current = setTimeout(step, charMs);
    } else {
      aiEl.innerHTML = html;
      timeoutRef.current = null;
    }
  };

  clearPending();
  step();
}

export default function HeroPlatformAnimation() {
  const [rkBounce, setRkBounce] = useState(false);
  const aiTextRef = useRef<HTMLDivElement>(null);
  const narrativeIndexRef = useRef(0);

  const pop = useCallback(() => {
    setRkBounce(false);
    requestAnimationFrame(() => setRkBounce(true));
  }, []);

  useEffect(() => {
    const rkInterval = setInterval(pop, 5500);
    return () => clearInterval(rkInterval);
  }, [pop]);

  useEffect(() => {
    const aiEl = aiTextRef.current;
    if (!aiEl) return;

    const typeTimeoutRef = { current: null as ReturnType<typeof setTimeout> | null };

    const startFirst = setTimeout(() => {
      typeNarrative(NARRATIVES[0], aiEl, 18, typeTimeoutRef);
    }, 1800);

    const rotate = setInterval(() => {
      narrativeIndexRef.current = (narrativeIndexRef.current + 1) % NARRATIVES.length;
      typeNarrative(NARRATIVES[narrativeIndexRef.current], aiEl, 18, typeTimeoutRef);
    }, 8000);

    return () => {
      clearTimeout(startFirst);
      clearInterval(rotate);
      if (typeTimeoutRef.current) clearTimeout(typeTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`stratavorHeroPlatformAnim ${titillium.variable}`}
      style={{
        fontFamily: "var(--font-titillium-hero), Titillium Web, system-ui, sans-serif",
      }}
    >
      <svg className="conn-svg" viewBox="0 0 680 680" preserveAspectRatio="none" aria-hidden>
        <path d="M120,106 C212,104 252,270 302,272" opacity="0.5" />
        <path d="M132,256 C228,252 252,290 304,292" opacity="0.5" />
        <path d="M100,400 C198,396 262,302 308,306" opacity="0.5" />
        <path d="M132,526 C228,522 252,318 304,322" opacity="0.5" />
        <path className="flow" d="M120,106 C212,104 252,270 302,272" />
        <path className="flow flow--d1" d="M132,256 C228,252 252,290 304,292" />
        <path className="flow flow--d2" d="M100,400 C198,396 262,302 308,306" />
        <path className="flow flow--d3" d="M132,526 C228,522 252,318 304,322" />
        <path d="M378,280 C430,278 470,96 548,96" opacity="0.5" />
        <path d="M380,306 C430,306 460,306 520,306" opacity="0.5" />
        <path d="M378,330 C430,332 470,506 548,506" opacity="0.5" />
        <path className="flow flow--r1" d="M378,280 C430,278 470,96 548,96" />
        <path className="flow flow--r2" d="M380,306 C430,306 460,306 520,306" />
        <path className="flow flow--r3" d="M378,330 C430,332 470,506 548,506" />
      </svg>

      <div className="hub">
        <div className="hub-bg" />
        <div className="hub-r hub-r1" />
        <div className="hub-r hub-r2" />
        <div className="hub-r hub-r3" />
        <svg
          className={`rk${rkBounce ? " stratavorHeroPlatformAnim__rkBounce" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 97.47 172.77"
          aria-hidden
          onClick={pop}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              pop();
            }
          }}
          onAnimationEnd={() => setRkBounce(false)}
          role="img"
          tabIndex={0}
        >
          <title>Stratavor hub</title>
          <path
            d="M52.28,155.02l-7.08.06v-8.68s-6.98,0-6.98,0l-.04,8.63h-7.06s-.04-8.63-.04-8.63l-6.97-.02v8.67s-8.73-.02-8.73-.02c2.45-3.23,4.28-6.53,6.03-10.16,3.73-7.74,6.54-15.67,9.15-23.91,3.43-11.07,6.2-22.11,8.68-33.59h18.98c2.57,11.87,5.47,23.43,9.12,34.96,2.52,7.79,5.21,15.29,8.76,22.62,1.74,3.59,3.54,6.86,5.97,10.06h-8.75s-.04-8.62-.04-8.62l-6.85-.03-.09,8.67h-7.03s-.09-8.67-.09-8.67l-6.89.02-.04,8.6Z"
            fill="#fff"
          />
          <path
            d="M83.66,159.33c7.71-.18,13.9,5.9,13.8,13.44H0c-.15-7.34,5.87-13.41,13.34-13.44h70.32Z"
            fill="#fff"
          />
          <path
            d="M69.61,20.09c-.39,2.64.66,5.62-.14,8.29l-8.2,27.34-25.06-.02-8.33-27.28,16.62-.04.05-8.28,8.37-.02.06,8.3h8.19s.04-8.3.04-8.3h8.4Z"
            fill="#fff"
          />
          <path
            d="M69.24,83.03l-40.79.04c-2.33,0-3.82-2.17-3.79-4.12.04-2.31,1.86-4.06,4.22-4.03l7.29-.05.03-14.88h25.04s.03,14.91.03,14.91l7.67.02c2.14.18,3.7,1.74,3.83,3.82.11,1.8-1.15,4.29-3.54,4.29Z"
            fill="#fff"
          />
          <polygon points="43.1 18.21 33.88 18.26 33.87 9.16 43.07 9.12 43.1 18.21" fill="#38AB45" />
          <polygon points="25.88 23.23 17.83 23.27 17.83 15.26 25.84 15.26 25.88 23.23" fill="#FFD500" />
          <polygon points="27.95 6.02 21.87 6.12 21.83 .03 27.9 0 27.95 6.02" fill="#E30613" />
        </svg>
      </div>

      <div className="nd nd--accounting" aria-label="Accounting: Xero and QuickBooks">
        <div className="logo-pair">
          {HERO_ACCOUNTING_LOGOS.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={48}
              className="w-auto object-contain"
              style={{ maxHeight: logo.maxHeightPx }}
            />
          ))}
        </div>
        <div className="nd-lbl">Accounting</div>
      </div>

      <div className="nd nd--netsuite">
        <div className="logo-circ logo-circ--img">
          <Image
            src={HERO_ERP_LOGO.src}
            alt={HERO_ERP_LOGO.alt}
            width={160}
            height={64}
            className="max-h-[34px] w-auto object-contain"
            style={{ maxHeight: HERO_ERP_LOGO.maxHeightPx }}
          />
        </div>
        <div className="nd-lbl">ERP</div>
      </div>

      <div className="nd nd--hubspot">
        <div className="logo-circ logo-circ--img">
          <Image
            src={HERO_CRM_LOGO.src}
            alt={HERO_CRM_LOGO.alt}
            width={160}
            height={64}
            className="max-h-[34px] w-auto object-contain"
            style={{ maxHeight: HERO_CRM_LOGO.maxHeightPx }}
          />
        </div>
        <div className="nd-lbl">CRM</div>
      </div>

      <div className="nd nd--workspace" aria-label="Workspace: Google and Microsoft">
        <div className="logo-stack">
          {HERO_WORKSPACE_LOGOS.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={40}
              className="w-auto object-contain"
              style={{ maxHeight: logo.maxHeightPx }}
            />
          ))}
        </div>
        <div className="nd-lbl">Workspace</div>
      </div>

      <div className="nd nd--out1">
        <div className="out-card">
          <div className="out-prev">
            <table className="mt">
              <tbody>
                <tr>
                  <td className="mh" colSpan={3}>
                    Numbers that matter
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Revenue</td>
                  <td>€117.5m</td>
                  <td>
                    <span className="tag tr">▼ 32%</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Net profit</td>
                  <td>€89.2m</td>
                  <td>
                    <span className="tag tg">75.9%</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>EBITDA</td>
                  <td>€89.2m</td>
                  <td>
                    <span className="tag tr">▼ 39%</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Cash</td>
                  <td>€36.3m</td>
                  <td>
                    <span className="tag tg">▲ 55%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="out-t">Financial Snapshot</div>
          <div className="out-s">Board-ready PDF report</div>
        </div>
      </div>

      <div className="nd nd--out2">
        <div className="out-card">
          <div className="out-prev" style={{ padding: "10px 8px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 30 }}>
              <div style={{ flex: 1, height: "28%", background: "#D1D7DA", borderRadius: "1.5px 1.5px 0 0" }} />
              <div style={{ flex: 1, height: "48%", background: "#979A9C", borderRadius: "1.5px 1.5px 0 0" }} />
              <div style={{ flex: 1, height: "38%", background: "#D1D7DA", borderRadius: "1.5px 1.5px 0 0" }} />
              <div style={{ flex: 1, height: "70%", background: "#395460", borderRadius: "1.5px 1.5px 0 0" }} />
              <div style={{ flex: 1, height: "52%", background: "#979A9C", borderRadius: "1.5px 1.5px 0 0" }} />
              <div style={{ flex: 1, height: "85%", background: "#395460", borderRadius: "1.5px 1.5px 0 0" }} />
              <div style={{ flex: 1, height: "60%", background: "#979A9C", borderRadius: "1.5px 1.5px 0 0" }} />
            </div>
            <svg viewBox="0 0 140 22" preserveAspectRatio="none" style={{ width: "100%", height: 20, marginTop: 4 }} aria-hidden>
              <path
                d="M0,18 15,15 30,16 50,9 70,11 90,5 110,7 130,3 140,5"
                fill="none"
                stroke="#395460"
                strokeWidth={1.2}
                strokeLinecap="round"
                opacity={0.35}
              />
            </svg>
          </div>
          <div className="out-t">KPI Dashboard</div>
          <div className="out-s">Interactive Power BI</div>
        </div>
      </div>

      <div className="nd nd--out3">
        <div className="out-card">
          <div className="out-prev" style={{ padding: "6px 8px" }}>
            <div style={{ background: "#395460", borderRadius: 3, padding: "4px 6px", marginBottom: 4 }}>
              <span style={{ fontSize: 7, color: "#fff", fontWeight: 600 }}>Executive Summary</span>
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              <div style={{ flex: 1, background: "rgba(57,84,96,0.04)", borderRadius: 2, padding: "3px 4px" }}>
                <div style={{ fontSize: 5, color: "#979A9C", textTransform: "uppercase", letterSpacing: 0.3 }}>Highlights</div>
                <div style={{ width: "80%", height: 2, background: "#D1D7DA", margin: "3px 0", borderRadius: 1 }} />
                <div style={{ width: "55%", height: 2, background: "#D1D7DA", margin: "2px 0", borderRadius: 1 }} />
              </div>
              <div style={{ flex: 1, background: "rgba(57,84,96,0.04)", borderRadius: 2, padding: "3px 4px" }}>
                <div style={{ fontSize: 5, color: "#979A9C", textTransform: "uppercase", letterSpacing: 0.3 }}>Actions</div>
                <div style={{ width: "65%", height: 2, background: "#D1D7DA", margin: "3px 0", borderRadius: 1 }} />
                <div style={{ width: "85%", height: 2, background: "#D1D7DA", margin: "2px 0", borderRadius: 1 }} />
              </div>
            </div>
          </div>
          <div className="out-t">Board Pack</div>
          <div className="out-s">Strategy-ready narrative</div>
        </div>
      </div>

      <div className="ai-wrap">
        <div className="ai-card ai-card--animate">
          <div className="ai-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="#395460" strokeWidth={2} strokeLinecap="round" aria-hidden>
              <path d="M12 2a4 4 0 014 4v1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2V6a4 4 0 014-4z" />
              <path d="M9 18h6M10 22h4" />
              <path d="M12 14v4" />
            </svg>
            AI narrative intelligence
          </div>
          <div ref={aiTextRef} className="ai-text" />
        </div>
      </div>
    </div>
  );
}
