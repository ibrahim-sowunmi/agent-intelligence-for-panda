import { Reveal, SectionHeading, TierLegend } from "@/components/ui";
import { processesJan, tiersJan, TIER_COLOR, type Tier } from "@/lib/data";
import { october } from "@/lib/october";

const LABEL: Record<string, string> = {
  price_review: "Plan & price review",
  quote: "Price quote & coverage",
  cancel_move: "Close account",
  signup: "New household sign-up",
  pay: "Card payment & arrears",
  billing_dispute: "Dispute, refund, complaint",
  tenancy: "House move / new holder",
  cancel_switch: "Cancel to switch provider",
  admin: "Balance, bill & direct debit",
  delivery: "New-customer bin delivery",
  missed: "Missed collection",
  returned_call: "Returned missed call",
  bereavement: "Bereavement",
  binchange: "Bin repair, swap or removal",
};

const fmt = (n: number) => n.toLocaleString("en-IE");

export function October() {
  const jan = Object.fromEntries(processesJan.map((p) => [p.key, p.share]));
  const oct = october.processShare as Record<string, number>;
  const rows = Object.keys(LABEL)
    .map((k) => ({ key: k, label: LABEL[k], jan: jan[k] ?? 0, oct: oct[k] ?? 0 }))
    .sort((a, b) => Math.max(b.jan, b.oct) - Math.max(a.jan, a.oct));
  const max = Math.max(...rows.flatMap((r) => [r.jan, r.oct]));
  const janTier = Object.fromEntries(tiersJan.map((t) => [t.tier, t.pct])) as Record<Tier, number>;
  const octTier = october.tier as Record<Tier, number>;

  const tiles = [
    { value: fmt(october.calls), label: "Recorded calls", note: `${october.hours} hours of audio, read in full` },
    { value: `${Math.round(october.outboundPct)}%`, label: "Are Panda Outbound calls", note: `${Math.round(october.outboundNoContactPct)}% of those reach no one` },
    { value: `${Math.round(october.repeatPct)}%`, label: "Are repeat contacts", note: "the caller has already rung or emailed about it" },
    { value: `${Math.round(october.resolved.Y)}%`, label: "Resolved on the call", note: `${Math.round(october.resolved.partial)}% end with a booking or a callback` },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="october"
          eyebrow="Second sample · 13–15 October 2026 · call recordings"
          title="A second read, from the recordings."
          lead={`We transcribed ${october.hours} hours of Panda's own call audio and read every call the same way. The share an AI agent could finish end to end held steady.`}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t, i) => (
            <Reveal key={t.label} delay={i * 60}>
              <div className="h-full rounded-3xl bg-paper p-6 ring-1 ring-line">
                <p className="font-display text-4xl font-semibold text-forest">{t.value}</p>
                <p className="mt-3 font-semibold text-ink">{t.label}</p>
                <p className="mt-1 text-sm text-muted">{t.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          <Reveal>
            <div className="h-full rounded-3xl bg-paper p-5 ring-1 ring-line sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-forest">What callers needed, January against October</p>
                <ul className="flex gap-4 text-sm text-ink-2">
                  <li className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-[3px] bg-forest/30" aria-hidden /> Jan–Feb transcripts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-[3px] bg-panda" aria-hidden /> Oct recordings
                  </li>
                </ul>
              </div>
              <p className="mt-1 text-sm text-muted">Share of inbound calls with a real request</p>
              <ul className="mt-6 space-y-3">
                {rows.map((r) => (
                  <li key={r.key} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 sm:grid-cols-[200px_1fr]">
                    <span className="col-span-2 text-sm text-ink-2 sm:col-span-1">{r.label}</span>
                    <span className="col-span-2 space-y-1 sm:col-span-1" aria-label={`${r.label}: January ${r.jan}%, October ${r.oct}%`}>
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 rounded-r-[3px] bg-forest/30" style={{ width: `${(r.jan / max) * 85}%` }} />
                        <span className="tabular text-xs text-muted">{r.jan.toFixed(1)}%</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 rounded-r-[3px] bg-panda" style={{ width: `${(r.oct / max) * 85}%` }} />
                        <span className="tabular text-xs font-semibold text-ink">{r.oct.toFixed(1)}%</span>
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={80}>
              <div className="rounded-3xl bg-paper p-6 ring-1 ring-line sm:p-7">
                <p className="font-semibold text-forest">Tier split, both samples</p>
                <TierLegend className="mt-4 text-xs" />
                {[
                  { label: "Jan–Feb", mix: janTier },
                  { label: "October", mix: octTier },
                ].map((s) => (
                  <div key={s.label} className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">{s.label}</p>
                    <div className="mt-2 flex h-9 gap-[2px] overflow-hidden rounded-xl" role="img" aria-label={`${s.label}: A ${s.mix.A}%, B ${s.mix.B}%, C ${s.mix.C}%`}>
                      {(["A", "B", "C"] as Tier[]).map((t) => (
                        <span
                          key={t}
                          className="flex items-center justify-center text-xs font-semibold text-white"
                          style={{ width: `${s.mix[t]}%`, background: TIER_COLOR[t] }}
                        >
                          {Math.round(s.mix[t])}%
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="rounded-3xl bg-forest p-6 text-white sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-panda">Panda Outbound</p>
                <p className="mt-3 font-display text-5xl font-semibold">{fmt(october.outboundAll)}</p>
                <p className="mt-1 text-sm text-white/70">
                  outbound recordings in three days, and {Math.round(october.outboundNoContactPct)}% reached voicemail or no one
                </p>
                <ul className="mt-5 space-y-2 border-t border-white/15 pt-4 text-sm">
                  {october.outboundTop.slice(0, 4).map((o) => (
                    <li key={o.label} className="flex justify-between gap-3">
                      <span className="text-white/80">{o.label}</span>
                      <span className="tabular font-semibold">{o.calls}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-6">
          <div className="rounded-3xl bg-mint p-6 sm:p-8">
            <p className="font-semibold text-forest">When a person was needed, the reason</p>
            <ul className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2">
              {october.blockers.map((b) => (
                <li key={b.key} className="grid grid-cols-[1fr_56px] items-center gap-3 text-sm">
                  <span>
                    <span className="text-ink-2">{b.label}</span>
                    <span className="mt-1 block h-2 rounded-r-[3px] bg-forest/80" style={{ width: `${(b.pct / october.blockers[0].pct) * 100}%` }} aria-hidden />
                  </span>
                  <span className="tabular text-right font-semibold text-ink">{b.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
