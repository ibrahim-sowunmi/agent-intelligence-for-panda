import Link from "next/link";
import { PawDots, Reveal, SectionHeading } from "@/components/ui";
import { read } from "@/lib/data";

const SCOPE = [
  { label: "Card payment & arrears", pct: 9.1, calls: 515 },
  { label: "Balance, bill & direct debit", pct: 5.5, calls: 309 },
  { label: "Close account", pct: 9.9, calls: 559 },
];

const NEXT = [
  {
    n: "01",
    title: "Agree the pilot scope",
    body: "Card payments, arrears, balances, direct debit and closures on the residential line, or tell us what you would rather start with.",
  },
  {
    n: "02",
    title: "Scope the tech and rules for the use case",
    body: "System access for billing, payments and closures, plus the rules written down: rate card by Eircode, coverage list, the €30 fee rule, Loyalty's offer ladder.",
  },
  {
    n: "03",
    title: "Book the POV",
    body: "We build an agent for the use case you select, and agree the success criteria and how both the agent and the platform will be evaluated.",
  },
];

export function Start() {
  // Use call counts, not the rounded shares, so the total isn't rounded twice.
  const total = (SCOPE.reduce((a, b) => a + b.calls, 0) / read.withRequest) * 100;
  return (
    <>
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="The recommendation" title="Start with payments and account closures." />
          <div className="mt-12 max-w-xl">
            <Reveal>
              <div className="rounded-3xl bg-forest p-8 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-panda">What the pilot scope covers</p>
                <p className="mt-4 font-display text-7xl font-semibold">{Math.round(total)}%</p>
                <p className="mt-1 text-white/75">of inbound calls, in a single scope</p>
                <ul className="mt-8 space-y-4 border-t border-white/15 pt-6">
                  {SCOPE.map((s) => (
                    <li key={s.label}>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/85">{s.label}</span>
                        <span className="tabular font-semibold">{s.pct}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-white/10" aria-hidden>
                        <div className="h-full rounded-full bg-panda" style={{ width: `${(s.pct / 10) * 100}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-sm leading-relaxed text-white/60">
                  Underneath sit the steps an agent would own: verify by account number, mobile or Eircode; read the balance; take the card through
                  PCI Pal; reactivate collections; check the final collection date; apply the €30 fee rule; take the final bill.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest py-24 text-white">
        <div className="grain absolute inset-0 opacity-60" aria-hidden />
        <PawDots className="-right-28 bottom-[-120px]" opacity={0.14} />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-panda">Next steps</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {NEXT.map((n, i) => (
              <Reveal key={n.n} delay={i * 80}>
                <div className={`h-full rounded-3xl p-7 ${i === 2 ? "bg-white text-forest" : "bg-white/[0.07] ring-1 ring-white/15"}`}>
                  <span className={`font-display text-sm font-bold ${i === 2 ? "text-panda-deep" : "text-panda"}`}>{n.n}</span>
                  <h3 className="mt-3 text-2xl font-bold">{n.title}</h3>
                  <p className={`mt-3 leading-relaxed ${i === 2 ? "text-ink-2" : "text-white/75"}`}>{n.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <Link href="/platform" className="inline-flex rounded-full bg-panda px-6 py-3 text-sm font-semibold text-forest transition hover:bg-white">
              See the Decagon platform
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
