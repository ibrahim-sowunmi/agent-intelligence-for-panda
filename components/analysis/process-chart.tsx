"use client";

import { useMemo, useRef, useState } from "react";
import { Reveal, SectionHeading, TierLegend } from "@/components/ui";
import { processes, read, TIER_COLOR, TIER_NAME, type Process } from "@/lib/data";

type Sort = "share" | "tier";

export function ProcessChart() {
  const [sort, setSort] = useState<Sort>("share");
  const [asTable, setAsTable] = useState(false);
  const [hover, setHover] = useState<{ p: Process; x: number; y: number; w: number } | null>(null);
  const box = useRef<HTMLDivElement>(null);

  const rows = useMemo(() => {
    const r = [...processes];
    if (sort === "tier") r.sort((a, b) => a.tier.localeCompare(b.tier) || b.share - a.share);
    else r.sort((a, b) => b.share - a.share);
    return r;
  }, [sort]);
  const max = Math.max(...processes.map((p) => p.share));

  const move = (p: Process, e: React.MouseEvent | React.FocusEvent) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    if ("clientX" in e) setHover({ p, x: e.clientX - rect.left, y: e.clientY - rect.top, w: rect.width });
    else {
      const t = (e.target as HTMLElement).getBoundingClientRect();
      setHover({ p, x: t.left - rect.left + t.width * 0.6, y: t.top - rect.top + t.height / 2, w: rect.width });
    }
  };

  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Intent breakdowns"
          title="Where the volume sits."
          lead="What each caller needed. The colour shows which tier most of those calls fall into."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_340px]">
          <Reveal>
            <div className="rounded-3xl bg-white p-5 ring-1 ring-line sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <TierLegend />
                <div className="flex items-center gap-2">
                  <div className="flex rounded-full bg-paper p-1 text-xs font-semibold ring-1 ring-line" role="group" aria-label="Sort">
                    {(["share", "tier"] as Sort[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSort(s)}
                        aria-pressed={sort === s}
                        className={`rounded-full px-3 py-1.5 transition ${sort === s ? "bg-forest text-white" : "text-ink-2 hover:text-forest"}`}
                      >
                        {s === "share" ? "By share" : "By tier"}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setAsTable((v) => !v)}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-ink-2 ring-1 ring-line transition hover:text-forest"
                  >
                    {asTable ? "Show chart" : "Show table"}
                  </button>
                </div>
              </div>

              {asTable ? (
                <div className="mt-6 overflow-x-auto">
                  <table className="tabular w-full text-sm">
                    <thead className="text-left text-xs uppercase tracking-wider text-muted">
                      <tr>
                        <th className="py-2 pr-4 font-semibold">Process</th>
                        <th className="py-2 pr-4 text-right font-semibold">Share</th>
                        <th className="py-2 pr-4 text-right font-semibold">Calls</th>
                        <th className="py-2 pr-4 text-right font-semibold">Median turns</th>
                        <th className="py-2 font-semibold">Tier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((p) => (
                        <tr key={p.key} className="border-t border-line">
                          <td className="py-2.5 pr-4 text-ink">{p.label}</td>
                          <td className="py-2.5 pr-4 text-right font-semibold">{p.share.toFixed(1)}%</td>
                          <td className="py-2.5 pr-4 text-right">{p.calls.toLocaleString("en-IE")}</td>
                          <td className="py-2.5 pr-4 text-right">{p.turns}</td>
                          <td className="py-2.5 text-ink-2">{TIER_NAME[p.tier]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div ref={box} className="relative mt-6" onMouseLeave={() => setHover(null)}>
                  <ul className="space-y-1">
                    {rows.map((p) => (
                      <li key={p.key}>
                        <button
                          type="button"
                          className="group grid w-full grid-cols-[1fr_56px] items-center gap-x-3 gap-y-1 rounded-lg py-1.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-panda sm:grid-cols-[210px_1fr_64px]"
                          onMouseMove={(e) => move(p, e)}
                          onFocus={(e) => move(p, e)}
                          onBlur={() => setHover(null)}
                          aria-label={`${p.label}: ${p.share}% of calls, ${p.calls} calls, ${TIER_NAME[p.tier]}`}
                        >
                          <span
                            className={`col-span-2 truncate text-sm sm:col-span-1 ${hover?.p.key === p.key ? "font-semibold text-forest" : "text-ink-2"}`}
                          >
                            {p.label}
                          </span>
                          <span className="relative h-5 sm:h-6">
                            <span
                              className="absolute inset-y-0 left-0 rounded-r-[4px] transition-[width,opacity] duration-500"
                              style={{
                                width: `${(p.share / max) * 100}%`,
                                background: TIER_COLOR[p.tier],
                                opacity: hover && hover.p.key !== p.key ? 0.45 : 1,
                              }}
                            />
                          </span>
                          <span className="tabular text-right text-sm font-semibold text-ink">{p.share.toFixed(1)}%</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-muted">Long tail: business enquiries, 0.1%.</p>

                  {hover ? (
                    <div
                      className="pointer-events-none absolute z-10 w-64 rounded-2xl bg-forest p-4 text-white shadow-xl"
                      style={{ left: Math.max(0, Math.min(hover.x + 16, hover.w - 270)), top: hover.y + 14 }}
                    >
                      <p className="font-display text-base font-semibold">{hover.p.label}</p>
                      <p className="mt-1 text-xs text-white/70">{TIER_NAME[hover.p.tier]}</p>
                      <dl className="tabular mt-3 grid grid-cols-2 gap-y-1 text-sm">
                        <dt className="text-white/70">Share</dt>
                        <dd className="text-right font-semibold">{hover.p.share.toFixed(1)}%</dd>
                        <dt className="text-white/70">Calls</dt>
                        <dd className="text-right font-semibold">{hover.p.calls.toLocaleString("en-IE")}</dd>
                        <dt className="text-white/70">Median turns</dt>
                        <dd className="text-right font-semibold">{hover.p.turns}</dd>
                        <dt className="text-white/70">Passed on today</dt>
                        <dd className="text-right font-semibold">{hover.p.handoffPct}%</dd>
                      </dl>
                      <p className="mt-3 border-t border-white/15 pt-3 text-xs italic leading-relaxed text-white/80">
                        &ldquo;{hover.p.example}&rdquo;
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-white/45">Typical opening, paraphrased</p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={80}>
              <div className="relative h-full overflow-hidden rounded-3xl bg-forest p-7 text-white">
                <span className="paw-dot -right-10 -top-10 h-40 w-40 opacity-20" aria-hidden />
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-panda">Group the routes</p>
                <p className="mt-4 font-display text-6xl font-semibold">{read.priceConversationsPct}%</p>
                <p className="mt-2 font-display text-xl font-semibold">Price conversations, all routes combined</p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {read.priceConversations.toLocaleString("en-IE")} plan and price reviews and price-driven cancellations.{" "}
                  {read.priceStartedElsewherePct}% started as a different question, and {read.priceHandedOffPct}% were passed to a second
                  agent.
                </p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="h-full rounded-3xl bg-white p-7 ring-1 ring-line">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-panda-deep">Concentration</p>
                <p className="mt-4 font-display text-6xl font-semibold text-forest">{read.topFivePct}%</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">
                  of calls sit in five processes.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
