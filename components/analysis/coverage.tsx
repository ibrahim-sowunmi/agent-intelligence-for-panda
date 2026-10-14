import { Reveal, SectionHeading } from "@/components/ui";
import { measured } from "@/lib/data";

export function Coverage() {
  const outbound = measured.outboundAnswered + measured.outboundVoicemail;
  const inPct = (measured.inbound / measured.totalCalls) * 100;
  const outPct = 100 - inPct;
  const tiles = [
    { value: `${measured.medianTurns}`, unit: "turns", label: "Median call length", note: `p90 ${measured.p90Turns} turns*`, footnote: "*A turn is one uninterrupted stretch of speech by either the caller or the agent, as split by the Talkdesk transcript." },
    { value: `${measured.passedToSecondAgentPct}%`, label: "Passed to a second agent", note: `of ${measured.inbound.toLocaleString("en-IE")} inbound calls` },
    { value: `${measured.handoffsToLoyaltyPct}%`, label: "Of those hand-offs go to Loyalty", note: "the team that owns plans and closures" },
    { value: `${measured.callsPerDay}`, label: "Transcribed calls a day", note: `median · ${measured.agents} agents · ${measured.workingDays} working days` },
  ];
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="2 Jan – 4 Feb 2026 · Talkdesk transcript export"
          title="What the transcripts cover"
          lead="Four residential queues, around 300 calls a day."
        />

        <Reveal className="mt-12">
          <div className="rounded-3xl bg-paper p-6 ring-1 ring-line sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-ink-2">Every call in the export</p>
              <p className="tabular text-sm text-muted">{measured.totalCalls.toLocaleString("en-IE")} calls</p>
            </div>
            <div className="mt-4 flex h-14 gap-[2px] overflow-hidden rounded-xl" role="img" aria-label={`Inbound ${inPct.toFixed(1)}%, outbound ${outPct.toFixed(1)}%`}>
              <div className="flex items-center rounded-l-xl bg-forest px-4 text-white" style={{ width: `${inPct}%` }}>
                <span className="font-display text-xl font-semibold">{inPct.toFixed(1)}%</span>
                <span className="ml-2 text-sm text-white/70">Inbound · {measured.inbound.toLocaleString("en-IE")}</span>
              </div>
              <div className="flex items-center justify-center rounded-r-xl bg-panda text-forest" style={{ width: `${outPct}%` }}>
                <span className="font-display text-base font-semibold">{outPct.toFixed(1)}%</span>
              </div>
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-[3px] bg-forest" aria-hidden /> Inbound
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-[3px] bg-panda" aria-hidden /> Outbound · {outbound} calls: {measured.outboundAnswered} answered,{" "}
                {measured.outboundVoicemail} reached voicemail
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t, i) => (
            <Reveal key={t.label} delay={i * 60}>
              <div className="h-full rounded-3xl bg-white p-6 ring-1 ring-line">
                <p className="font-display text-4xl font-semibold text-forest">
                  {t.value}
                  {t.unit ? <span className="ml-1 text-xl text-panda-deep">{t.unit}</span> : null}
                </p>
                <p className="mt-3 font-semibold text-ink">{t.label}</p>
                <p className="mt-1 text-sm text-muted">{t.note}</p>
                {"footnote" in t ? <p className="mt-3 border-t border-line pt-2 text-[11px] leading-snug text-muted">{t.footnote}</p> : null}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <div className="grid items-center gap-6 rounded-3xl bg-mint p-6 sm:p-8 lg:grid-cols-[220px_1fr]">
            <div>
              <p className="font-semibold text-forest">Which queue answered first</p>
              <p className="mt-1 text-sm text-ink-2">From the first agent&apos;s greeting</p>
            </div>
            <ul className="space-y-3">
              {measured.queues.map((q) => (
                <li key={q.name} className="grid grid-cols-[130px_1fr_56px] items-center gap-3 text-sm">
                  <span className="text-ink-2">{q.name}</span>
                  <span className="h-3 rounded-r-[4px] bg-forest/85" style={{ width: `${(q.pct / 60) * 100}%` }} aria-hidden />
                  <span className="tabular text-right font-semibold text-ink">{q.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
