import { Reveal, SectionHeading } from "@/components/ui";
import { measured } from "@/lib/data";

const STEPS = [
  {
    n: "01",
    title: "Authenticate",
    body: `Account number, the phone on the account, or the Eircode. ${measured.idCheckPct}% of inbound calls open here, and ${measured.noAccountNumberPct}% of callers don't have their account number to hand.`,
  },
  {
    n: "02",
    title: "Look up",
    body: "Balance, collection schedule, order or delivery status, invoice history.",
  },
  {
    n: "03",
    title: "Transact",
    body: "Take the payment, set up the account, close it with the final bill, book bins in or out, place the callback.",
  },
  {
    n: "04",
    title: "Confirm",
    body: "Read back the outcome and the reference.",
  },
];

export function Journey() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Structure"
          title="Every automatable call is the same four steps."
          lead="Payments, closures, sign-ups, card updates and callbacks all follow one shape. The intent changes; the process doesn't, which is why one agent design covers most of the log."
        />

        <div className="relative mt-14 grid gap-4 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-line md:block" aria-hidden />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="relative">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-panda font-display text-lg font-bold text-forest ring-8 ring-white">
                  {s.n}
                </span>
                <h3 className="mt-6 text-2xl font-bold text-forest">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-2">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-paper p-7 ring-1 ring-line">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Where the pattern differs</p>
              <p className="mt-4 text-lg leading-relaxed text-ink">
                <strong className="font-semibold text-forest">Tier C gets a warm hand-off, not a bot.</strong> Three in ten calls are price
                conversations only Loyalty can have, and callers repeat their details after the transfer today. Gather the account, usage and
                contract end date first.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-3xl bg-forest p-7 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-panda">Currently underserved</p>
              <p className="mt-4 text-lg leading-relaxed text-white/90">
                <strong className="font-semibold text-white">Take over the callbacks, 24/7.</strong> 12% of transcribed calls are agents ringing
                customers back, and one in five of those reaches voicemail. Closures and reactivations that wait on a callback today can simply be
                scheduled.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
