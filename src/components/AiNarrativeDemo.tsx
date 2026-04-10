"use client";

import { useCallback, useEffect, useRef } from "react";
import { HOME_AI_NARRATIVE_SNIPPETS } from "@/data/marketing-copy";

function textLength(html: string): number {
  if (typeof document === "undefined") {
    return html.replace(/<[^>]*>/g, "").length;
  }
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent?.length ?? 0;
}

export default function AiNarrativeDemo() {
  const hostRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const snippetIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const setHostHtml = useCallback((inner: string) => {
    const el = hostRef.current;
    if (el) el.innerHTML = inner;
  }, []);

  const runTyping = useCallback(
    (fullHtml: string) => {
      clearTimers();
      const total = textLength(fullHtml);
      charIndexRef.current = 0;

      const step = () => {
        const i = charIndexRef.current;
        if (i <= total) {
          let cc = 0;
          let ci = 0;
          let inTag = false;
          for (let j = 0; j < fullHtml.length && cc <= i; j++) {
            if (fullHtml[j] === "<") inTag = true;
            if (!inTag) cc++;
            if (fullHtml[j] === ">") inTag = false;
            ci = j + 1;
          }
          const slice = fullHtml.substring(0, ci);
          if (i < total) {
            setHostHtml(`${slice}<span class="sdb-demoCur" aria-hidden="true"></span>`);
          } else {
            setHostHtml(fullHtml);
          }
          charIndexRef.current = i + 1;
          if (i < total) {
            timersRef.current.push(window.setTimeout(step, 20));
          }
        }
      };

      step();
    },
    [clearTimers, setHostHtml],
  );

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return undefined;

    const showSnippet = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const html = HOME_AI_NARRATIVE_SNIPPETS[snippetIndexRef.current];
      snippetIndexRef.current =
        (snippetIndexRef.current + 1) % HOME_AI_NARRATIVE_SNIPPETS.length;

      if (reduced) {
        el.innerHTML = html;
        return;
      }
      runTyping(html);
    };

    const startId = window.setTimeout(showSnippet, 800);
    const intervalId = window.setInterval(showSnippet, 8000);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
      clearTimers();
    };
  }, [clearTimers, runTyping]);

  return (
    <div className="sdb-demo">
      <div ref={hostRef} className="sdb-demoTxt" aria-live="polite" />
    </div>
  );
}
