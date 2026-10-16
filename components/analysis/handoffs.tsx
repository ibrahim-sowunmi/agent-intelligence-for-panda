import { Reveal, SectionHeading } from "@/components/ui";
import { TIER_COLOR, type Tier } from "@/lib/data";
import { october } from "@/lib/october";

const TEAM_COLOR: Record<string, string> = {
  customer_service: "#1e3129",
  loyalty: "#8e6bbf",
  sales: "#e0a82e",
  credit_control: "#3e9bb3",
  unknown: "#c5cec8",
};
const TEAM_NAME: Record<string, string> = {
  customer_service: "Customer service",
  loyalty: "Loyalty",
  sales: "Sales",
  credit_control: "Credit control",
  unknown: "Routing desk / not stated",
};

const h = october.handoff;
const pct = (n: number) => `${n < 10 ? n.toFixed(1) : Math.round(n)}%`;

export function Handoffs() {
  const reach = [100, h.reach["2"], h.reach["3"], h.reach["4"]];
  const wrongQueue = h.reasons.find((r) => r.key === "wrong_queue")?.pct ?? 0;
  const loyalty = h.reasons.filter((r) => r.key === "loyalty_decision" || r.key === "cancellation").reduce((s, r) => s + r.pct, 0);
  const payments = h.reasons.find((r) => r.key === "payment_credit")?.pct ?? 0;
  const tierMix = h.transferredTier as Record<Tier, number>;
  const mins = h.medianMinByPeople as Record<string, number>;

  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="handoffs"
          eyebrow={`Agent 1 → agent 2 → agent n · ${october.calls.toLocaleString("en-IE")} recorded calls`}
          title="Who ends up handling the call."
          lead={`Every recorded part of every call, tagged by the agent who spoke and why the call moved. ${Math.round(october.multiPartPct)}% of recordings have more than one part, but ${Math.round(h.extraPartsSameAgentPct)}% of those extra parts are the same agent picking the call back up after a hold or a card payment. Counted by person, ${pct(h.reach["2"])} of calls reach a second agent.`}
        />

        <Reveal className="mt-12">
          <div className="rounded-3xl bg-white p-5 ring-1 ring-line sm:p-8">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2" aria-label="Team legend">
              {Object.entries(TEAM_NAME).map(([k, v]) => (
                <li key={k} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-[3px]" style={{ background: TEAM_COLOR[k] }} aria-hidden />
                  {v}
                </li>
              ))}
            </ul>
            <ol className="mt-8 grid gap-4 md:grid-cols-4">
              {h.hops.map((hop, i) => (
                <li key={hop.agent} className="relative">
                  {i > 0 ? (
                    <span className="absolute -left-4 top-10 hidden -translate-x-1/2 text-xl text-muted md:block" aria-hidden>
                      →
                    </span>
                  ) : null}
                  <div className="h-full rounded-2xl bg-paper p-5 ring-1 ring-line">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Agent {hop.agent === 4 ? "4+" : hop.agent}</p>
                    <p className="mt-3 font-display text-4xl font-semibold text-forest">{pct(reach[i])}</p>
                    <p className="text-sm text-muted">of calls · {hop.calls.toLocaleString("en-IE")}</p>
                    <div className="mt-4 flex h-3 gap-[2px] overflow-hidden rounded-full" role="img" aria-label={hop.mix.map((m) => `${TEAM_NAME[m.team]} ${m.pct}%`).join(", ")}>
                      {hop.mix.map((m) => (
                        <span key={m.team} style={{ width: `${m.pct}%`, background: TEAM_COLOR[m.team] }} />
                      ))}
                    </div>
                    <ul className="mt-3 space-y-1 text-xs text-ink-2">
                      {hop.mix.slice(0, 3).map((m) => (
                        <li key={m.team} className="flex justify-between gap-2">
                          <span>{TEAM_NAME[m.team]}</span>
                          <span className="tabular font-semibold text-ink">{Math.round(m.pct)}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="h-full rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
              <p className="font-semibold text-forest">Why the call moved</p>
              <p className="mt-1 text-sm text-muted">Every hand-off to a different person, by reason</p>
              <ul className="mt-6 space-y-3">
                {h.reasons
                  .filter((r) => r.key !== "other")
                  .map((r) => (
                    <li key={r.key} className="grid grid-cols-[1fr_52px] items-center gap-3 text-sm">
                      <span>
                        <span className="text-ink-2">{r.label}</span>
                        <span className="mt-1 block h-2 rounded-r-[3px] bg-forest/80" style={{ width: `${(r.pct / h.reasons[0].pct) * 100}%` }} aria-hidden />
                      </span>
                      <span className="tabular text-right font-semibold text-ink">{Math.round(r.pct)}%</span>
                    </li>
                  ))}
              </ul>
              <div className="mt-8 border-t border-line pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Most common paths</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {h.paths.slice(0, 5).map((p) => (
                    <li key={p.path} className="flex justify-between gap-3">
                      <span className="text-ink-2">{p.path}</span>
                      <span className="tabular font-semibold text-ink">{p.calls}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={80}>
              <div className="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
                <p className="font-semibold text-forest">Every extra person adds minutes</p>
                <p className="mt-1 text-sm text-muted">Median handle time, by people on the call</p>
                <ul className="mt-6 grid grid-cols-3 gap-3">
                  {(["1", "2", "3"] as const).map((n) => (
                    <li key={n} className="rounded-2xl bg-paper p-4 text-center ring-1 ring-line">
                      <p className="font-display text-3xl font-semibold text-forest">{mins[n]}</p>
                      <p className="text-xs text-muted">min · {n === "3" ? "3+" : n} {n === "1" ? "agent" : "agents"}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-ink-2">
                  Calls that reach a second person are {pct(h.transferredPct)} of calls but{" "}
                  <strong className="font-semibold text-forest">{Math.round(h.minutesSharePct)}% of the minutes</strong> on the phone.
                </p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
                <p className="font-semibold text-forest">Transferred calls, by tier</p>
                <div className="mt-4 flex h-9 gap-[2px] overflow-hidden rounded-xl" role="img" aria-label={`A ${tierMix.A}%, B ${tierMix.B}%, C ${tierMix.C}%`}>
                  {(["A", "B", "C"] as Tier[]).map((t) => (
                    <span key={t} className="flex items-center justify-center text-xs font-semibold text-white" style={{ width: `${tierMix[t]}%`, background: TIER_COLOR[t] }}>
                      {t} · {Math.round(tierMix[t])}%
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-2">
                  {Math.round(tierMix.A)}% of transfers happen on calls an AI agent could have finished alone. They move because of who is
                  allowed to do what, not because the call needed judgement.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-6">
          <div className="relative overflow-hidden rounded-3xl bg-forest p-7 text-white sm:p-10">
            <span className="paw-dot -right-12 -top-12 h-48 w-48 opacity-15" aria-hidden />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-panda">With an AI agent answering first</p>
            <ul className="relative mt-6 grid gap-6 md:grid-cols-3">
              <li>
                <p className="font-display text-4xl font-semibold">{Math.round(wrongQueue)}%</p>
                <p className="mt-2 font-semibold">of hand-offs are the wrong team</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Business line, sales or care. An agent that asks what the caller needs routes on intent, so the first person is the right one.
                </p>
              </li>
              <li>
                <p className="font-display text-4xl font-semibold">{Math.round(payments)}%</p>
                <p className="mt-2 font-semibold">move to take a payment</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Card payments, arrears and keeping an account active. The agent takes the payment through the secure keypad itself.
                </p>
              </li>
              <li>
                <p className="font-display text-4xl font-semibold">{Math.round(loyalty)}%</p>
                <p className="mt-2 font-semibold">go to Loyalty for a decision</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  These stay with a person. The agent verifies the caller and passes over the account, usage and contract end date, so nobody
                  repeats themselves.
                </p>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
