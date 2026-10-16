import { Reveal, SectionHeading } from "@/components/ui";
import { measured } from "@/lib/data";
import { october } from "@/lib/october";

const fmt = (n: number) => n.toLocaleString("en-IE");

function SplitBar({ label, total, inbound, note }: { label: string; total: number; inbound: number; note: string }) {
  const inPct = (inbound / total) * 100;
  const outPct = 100 - inPct;
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-ink-2">{label}</p>
        <p className="tabular text-sm text-muted">{fmt(total)} calls</p>
      </div>
      <div className="mt-3 flex h-12 gap-[2px] overflow-hidden rounded-xl" role="img" aria-label={`Inbound ${inPct.toFixed(1)}%, outbound ${outPct.toFixed(1)}%`}>
        <div className="flex items-center rounded-l-xl bg-forest px-4 text-white" style={{ width: `${inPct}%` }}>
          <span className="font-display text-lg font-semibold">{inPct.toFixed(1)}%</span>
          <span className="ml-2 truncate text-sm text-white/70">Inbound · {fmt(inbound)}</span>
        </div>
        <div className="flex items-center justify-center rounded-r-xl bg-panda text-forest" style={{ width: `${outPct}%` }}>
          <span className="font-display text-base font-semibold">{outPct.toFixed(1)}%</span>
        </div>
      </div>
      <p className="mt-2 text-sm text-ink-2">{note}</p>
    </div>
  );
}

export function Coverage() {
  const c = october.counts;
  const h = october.handoff;
  const octFirst = Object.fromEntries(h.hops[0].mix.map((m) => [m.team, m.pct])) as Record<string, number>;
  const tiles = [
    {
      value: `${measured.medianTurns}`,
      unit: "turns",
      label: "Median call length",
      note: `p90 ${measured.p90Turns} turns*`,
      oct: `${c.medianMin} min · p90 ${c.p90Min} min`,
      footnote: "*A turn is one uninterrupted stretch of speech by either the caller or the agent, as split by the Talkdesk transcript.",
    },
    {
      value: `${measured.passedToSecondAgentPct}%`,
      label: "Passed to a second agent",
      note: `of ${fmt(measured.inbound)} inbound calls`,
      oct: `${Math.round(h.reach["2"])}% reach a different person**`,
      footnote: `**${Math.round(october.multiPartPct)}% of recordings have a second part, but ${Math.round(h.extraPartsSameAgentPct)}% of those are the same agent after a hold or card payment.`,
    },
    {
      value: `${measured.handoffsToLoyaltyPct}%`,
      label: "Of those hand-offs go to Loyalty",
      note: "the team that owns plans and closures",
      oct: `${Math.round(c.handoffTeamShare.loyalty ?? 0)}% to Loyalty`,
    },
    {
      value: `${measured.callsPerDay}`,
      label: "Transcribed calls a day",
      note: `median · ${measured.agents} agents · ${measured.workingDays} working days`,
      oct: `${fmt(october.calls)} recordings · ${october.hours} hours of audio`,
    },
  ];
  const queues = [
    { name: "Customer service", jan: measured.queues[0].pct, oct: octFirst.customer_service ?? 0 },
    { name: "Sales", jan: measured.queues[1].pct, oct: octFirst.sales ?? 0 },
    { name: "Loyalty", jan: measured.queues[2].pct, oct: octFirst.loyalty ?? 0 },
    { name: "Credit control", jan: measured.queues[3].pct, oct: octFirst.credit_control ?? 0 },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Two samples · Talkdesk transcripts and call recordings"
          title="What the calls cover"
          lead="Five weeks of Talkdesk transcripts from four residential queues, around 300 calls a day, and three days of Panda's own call recordings from October."
        />

        <Reveal className="mt-12">
          <div className="grid gap-8 rounded-3xl bg-paper p-6 ring-1 ring-line sm:p-8 lg:grid-cols-2">
            <SplitBar
              label="Jan–Feb · Talkdesk transcript export"
              total={measured.totalCalls}
              inbound={measured.inbound}
              note={`Outbound · ${measured.outboundAnswered + measured.outboundVoicemail} calls: ${measured.outboundAnswered} answered, ${measured.outboundVoicemail} reached voicemail`}
            />
            <SplitBar
              label="13–15 Oct · call recordings"
              total={october.calls}
              inbound={c.inboundAll}
              note={`Outbound · ${fmt(c.outboundAll)} calls: ${Math.round(october.outboundNoContactPct)}% reached voicemail or no one`}
            />
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2 lg:col-span-2">
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-[3px] bg-forest" aria-hidden /> Inbound
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-[3px] bg-panda" aria-hidden /> Outbound
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t, i) => (
            <Reveal key={t.label} delay={i * 60}>
              <div className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-line">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">Jan–Feb</p>
                <p className="mt-1 font-display text-4xl font-semibold text-forest">
                  {t.value}
                  {t.unit ? <span className="ml-1 text-xl text-panda-deep">{t.unit}</span> : null}
                </p>
                <p className="mt-3 font-semibold text-ink">{t.label}</p>
                <p className="mt-1 text-sm text-muted">{t.note}</p>
                <p className="mt-4 rounded-xl bg-mint px-3 py-2 text-sm text-ink-2">
                  <span className="font-semibold text-forest">October:</span> {t.oct}
                </p>
                {t.footnote ? <p className="mt-3 border-t border-line pt-2 text-[11px] leading-snug text-muted">{t.footnote}</p> : null}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <div className="grid items-center gap-6 rounded-3xl bg-mint p-6 sm:p-8 lg:grid-cols-[220px_1fr]">
            <div>
              <p className="font-semibold text-forest">Which team answered first</p>
              <p className="mt-1 text-sm text-ink-2">From the first agent&apos;s greeting</p>
              <ul className="mt-4 flex gap-4 text-xs text-ink-2">
                <li className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-[3px] bg-forest/85" aria-hidden /> Jan–Feb
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-[3px] bg-panda" aria-hidden /> October
                </li>
              </ul>
            </div>
            <ul className="space-y-4">
              {queues.map((q) => (
                <li key={q.name} className="grid grid-cols-[130px_1fr] items-center gap-3 text-sm">
                  <span className="text-ink-2">{q.name}</span>
                  <span className="space-y-1">
                    {[
                      { v: q.jan, cls: "bg-forest/85" },
                      { v: q.oct, cls: "bg-panda" },
                    ].map((b, i) => (
                      <span key={i} className="flex items-center gap-2">
                        <span className={`h-2.5 rounded-r-[4px] ${b.cls}`} style={{ width: `${(b.v / 90) * 85}%` }} aria-hidden />
                        <span className="tabular text-xs font-semibold text-ink">{b.v.toFixed(1)}%</span>
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
