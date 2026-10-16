"use client";

import { useState } from "react";
import { Reveal, SectionHeading } from "@/components/ui";
import { read, scenarios, type ScenarioName } from "@/lib/data";

const NAMES: ScenarioName[] = ["Conservative", "Base", "Optimistic"];

export function Scenarios() {
  const [name, setName] = useState<ScenarioName>("Base");
  const s = scenarios[name];
  return (
    <section className="relative overflow-hidden bg-forest py-24 text-white">
      <div className="grain absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          dark
          eyebrow="Projections"
          title="How much a voice agent takes off the floor."
          lead={`Of the ${read.withRequest.toLocaleString(
            "en-IE",
          )} inbound calls with a real request, across both samples. Tier shares come from reading every call; the containment rates behind each scenario are our stated assumptions.`}
        />

        <Reveal className="mt-10">
          <div className="inline-flex rounded-full bg-white/10 p-1 ring-1 ring-white/15" role="tablist" aria-label="Scenario">
            {NAMES.map((n) => (
              <button
                key={n}
                role="tab"
                aria-selected={name === n}
                onClick={() => setName(n)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${name === n ? "bg-panda text-forest" : "text-white/80 hover:text-white"}`}
              >
                {n}
                {n === "Base" ? <span className="ml-1.5 text-[10px] uppercase tracking-wider opacity-70">planning case</span> : null}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            { label: "Contained · no agent needed", pct: s.contained, calls: s.containedCalls, color: "var(--color-panda)" },
            { label: "AI-handled or assisted", pct: s.assisted, calls: s.assistedCalls, color: "#9fe0b4" },
          ].map((m) => (
            <Reveal key={m.label}>
              <div className="rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">{m.label}</p>
                <p className="mt-4 font-display text-7xl font-semibold" aria-live="polite">
                  {m.pct}%
                </p>
                <p className="tabular mt-2 text-white/70">
                  ≈ {m.calls.toLocaleString("en-IE")} of {read.withRequest.toLocaleString("en-IE")} calls
                </p>
                <div className="mt-6 h-3 rounded-full bg-white/10" aria-hidden>
                  <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${m.pct}%`, background: m.color }} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-white/70">{s.note}</p>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-white/45">
          Coefficients. Contained: Tier A 60 / 80 / 95%, Tier B 17.5 / 35 / 54%, Tier C none. AI-handled or assisted: all of Tier A; Tier B 73%
          conservative, all otherwise; Tier C 3.5% base, 45% optimistic.
        </p>
      </div>
    </section>
  );
}
