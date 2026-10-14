"use client";

import { useState } from "react";
import { Reveal, SectionHeading } from "@/components/ui";
import { read, tiers, TIER_COLOR, type Tier } from "@/lib/data";

export function Tiers() {
  const [active, setActive] = useState<Tier | null>(null);
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="tiers"
          eyebrow="Assumed · open to additional scoping"
          title="Three tiers of automatability"
          lead={`Every inbound call read and judged on one question: could an AI agent, with the same systems your agents use and your rules written down, have finished it? ${read.withRequest.toLocaleString(
            "en-IE",
          )} calls had a real request.`}
        />

        <Reveal className="mt-12">
          <div
            className="flex h-16 gap-[2px] overflow-hidden rounded-2xl"
            role="img"
            aria-label={tiers.map((t) => `Tier ${t.tier} ${t.pct}%`).join(", ")}
          >
            {tiers.map((t, i) => (
              <button
                key={t.tier}
                type="button"
                onMouseEnter={() => setActive(t.tier)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(t.tier)}
                onBlur={() => setActive(null)}
                className={`flex items-center px-5 text-left text-white transition-opacity duration-300 ${i === 0 ? "rounded-l-2xl" : ""} ${
                  i === tiers.length - 1 ? "rounded-r-2xl" : ""
                }`}
                style={{
                  width: `${t.pct}%`,
                  background: TIER_COLOR[t.tier],
                  opacity: active && active !== t.tier ? 0.4 : 1,
                }}
                aria-label={`Tier ${t.tier}: ${t.pct}% of calls`}
              >
                <span className="font-display text-xl font-semibold">
                  {t.tier} · {t.pct}%{t.review ? <span className="ml-2 text-xs font-normal opacity-90">provisional</span> : null}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.tier} delay={i * 80}>
              <article
                onMouseEnter={() => setActive(t.tier)}
                onMouseLeave={() => setActive(null)}
                className={`flex h-full flex-col rounded-3xl bg-paper p-7 ring-1 transition duration-300 ${
                  active === t.tier ? "-translate-y-1 shadow-xl shadow-forest/10 ring-forest/20" : "ring-line"
                } ${active && active !== t.tier ? "opacity-60" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-ink-2">
                    <span className="h-3 w-3 rounded-full" style={{ background: TIER_COLOR[t.tier] }} aria-hidden />
                    Tier {t.tier}
                  </span>
                  <span className="tabular text-xs text-muted">≈ {t.calls.toLocaleString("en-IE")} calls</span>
                </div>
                <p className="mt-5 font-display text-6xl font-semibold text-forest">{t.pct}%</p>
                <h3 className="mt-3 text-2xl font-bold text-forest">{t.title}</h3>
                {t.body ? <p className="mt-3 leading-relaxed text-ink-2">{t.body}</p> : null}
                {t.review ? (
                  <div className="mt-4 rounded-2xl border border-dashed border-tier-c/60 bg-white p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-tier-c">Open for review</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{t.review}</p>
                  </div>
                ) : null}
                <div className="mt-6 border-t border-line pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Includes</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {t.includes.map((x) => (
                      <li key={x} className="rounded-full bg-white px-3 py-1 text-sm text-ink ring-1 ring-line">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
