"use client";

import { useRef, useState } from "react";
import { Reveal, SectionHeading, TierLegend } from "@/components/ui";
import { processes, read, TIER_COLOR, type CombinedProcess as Process, type Tier } from "@/lib/data";

const FILTERS: (Tier | "all")[] = ["all", "A", "B", "C"];

export function Evidence() {
  const [filter, setFilter] = useState<Tier | "all">("all");
  const [hover, setHover] = useState<{ p: Process; x: number; y: number; w: number } | null>(null);
  const box = useRef<HTMLDivElement>(null);

  const rows = [...processes].sort((a, b) => a.tier.localeCompare(b.tier) || b.share - a.share);

  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={`What an AI agent could have done · ${read.withRequest.toLocaleString("en-IE")} calls read`}
          title="How each process splits across the tiers."
          lead="Each bar is one process, split by what we judged an AI agent could have done on each of its calls. Where a person was needed, the right-hand column says why."
        />

        <Reveal className="mt-12">
          <div className="rounded-3xl bg-white p-5 ring-1 ring-line sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <TierLegend />
              <div className="flex rounded-full bg-paper p-1 text-xs font-semibold ring-1 ring-line" role="group" aria-label="Filter by tier">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={`rounded-full px-3 py-1.5 transition ${filter === f ? "bg-forest text-white" : "text-ink-2 hover:text-forest"}`}
                  >
                    {f === "all" ? "All processes" : `Mostly Tier ${f}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 hidden grid-cols-[200px_64px_1fr_64px_minmax(0,1.1fr)] gap-4 border-b border-line pb-3 text-[11px] font-semibold uppercase tracking-wider text-muted lg:grid">
              <span>Process</span>
              <span className="text-right">Share</span>
              <span>How its calls split across the tiers</span>
              <span />
              <span>What needed a person, when one did</span>
            </div>

            <div ref={box} className="relative" onMouseLeave={() => setHover(null)}>
              <ul>
                {rows.map((p, idx) => {
                  const dim = filter !== "all" && p.tier !== filter;
                  const newGroup = idx > 0 && rows[idx - 1].tier !== p.tier;
                  const top = Math.max(...p.mix);
                  const topTier = (["A", "B", "C"] as Tier[])[p.mix.indexOf(top)];
                  return (
                    <li
                      key={p.key}
                      className={`grid grid-cols-1 gap-2 py-3 transition-opacity duration-300 lg:grid-cols-[200px_64px_1fr_64px_minmax(0,1.1fr)] lg:items-center lg:gap-4 ${
                        newGroup ? "mt-3 border-t border-line pt-6" : ""
                      } ${dim ? "opacity-25" : ""}`}
                    >
                      <span className="text-sm font-semibold text-ink">{p.label}</span>
                      <span className="tabular hidden text-right text-sm text-ink-2 lg:block">{p.share.toFixed(1)}%</span>
                      <button
                        type="button"
                        className="flex h-6 w-full gap-[2px] rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-panda"
                        onMouseMove={(e) => {
                          const r = box.current?.getBoundingClientRect();
                          if (r) setHover({ p, x: e.clientX - r.left, y: e.clientY - r.top, w: r.width });
                        }}
                        onFocus={(e) => {
                          const r = box.current?.getBoundingClientRect();
                          const t = e.currentTarget.getBoundingClientRect();
                          if (r) setHover({ p, x: t.left - r.left + t.width / 2, y: t.bottom - r.top, w: r.width });
                        }}
                        onBlur={() => setHover(null)}
                        aria-label={`${p.label}: Tier A ${p.mix[0]}%, Tier B ${p.mix[1]}%, Tier C ${p.mix[2]}%`}
                      >
                        {p.mix.map((v, i) =>
                          v > 0 ? (
                            <span
                              key={i}
                              className={`h-full ${i === 0 ? "rounded-l-[4px]" : ""} ${i === 2 || p.mix.slice(i + 1).every((x) => x === 0) ? "rounded-r-[4px]" : ""}`}
                              style={{ width: `${v}%`, background: TIER_COLOR[(["A", "B", "C"] as Tier[])[i]] }}
                            />
                          ) : null,
                        )}
                      </button>
                      <span className="tabular text-sm text-ink-2 lg:text-left">
                        {top}% {topTier}
                      </span>
                      <span className="text-sm leading-snug text-muted">
                        {p.needsPerson}
                        {p.tier === "C" ? <span className="ml-1 font-semibold text-tier-c">· split open for review</span> : null}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {hover ? (
                <div
                  className="pointer-events-none absolute z-10 w-60 rounded-2xl bg-forest p-4 text-white shadow-xl"
                  style={{ left: Math.max(0, Math.min(hover.x + 14, hover.w - 250)), top: hover.y + 14 }}
                >
                  <p className="font-display font-semibold">{hover.p.label}</p>
                  <dl className="tabular mt-3 space-y-1 text-sm">
                    {(["A", "B", "C"] as Tier[]).map((t, i) => (
                      <div key={t} className="flex items-center justify-between gap-3">
                        <dt className="flex items-center gap-2 text-white/75">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ background: TIER_COLOR[t] }} aria-hidden />
                          Tier {t}
                        </dt>
                        <dd className="font-semibold">{hover.p.mix[i]}%</dd>
                      </div>
                    ))}
                    <div className="flex justify-between gap-3 border-t border-white/15 pt-2">
                      <dt className="text-white/75">Price decision made</dt>
                      <dd className="font-semibold">{hover.p.priceDecisionPct}%</dd>
                    </div>
                  </dl>
                </div>
              ) : null}
            </div>

            <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">
              Every inbound call in both samples read. Tiers checked against {read.secondReadJan} January calls and {read.secondReadOct}{" "}
              October calls read a second time by a stronger model; the January tiers were corrected per process where the first reader
              leaned cautious. Long tail: business enquiries, {read.businessPct}%.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
