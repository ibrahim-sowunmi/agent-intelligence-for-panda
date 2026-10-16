import Link from "next/link";
import { CountUp, PawDots, Reveal } from "@/components/ui";
import { measured, passedToSecondAgentPct, read, scenarios } from "@/lib/data";
import { october } from "@/lib/october";

const STATS = [
  { value: measured.inbound + october.calls, suffix: "", label: "calls read in full", decimals: 0 },
  { value: passedToSecondAgentPct, suffix: "%", label: "of inbound calls passed to a second agent", decimals: 0 },
  { value: read.priceConversationsPct, suffix: "%", label: "are price conversations", decimals: 0 },
  { value: scenarios.Base.contained, suffix: "%", prefix: "≈", label: "could be contained by an AI agent (estimate)", decimals: 0 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest text-white">
      <div className="grain absolute inset-0 opacity-70" aria-hidden />
      <PawDots className="-right-24 -top-10 hidden md:block" opacity={0.16} />
      <PawDots className="-bottom-56 -left-40 scale-75" opacity={0.07} />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pt-28">
        <Reveal delay={80}>
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] sm:text-7xl">
            Agent Intelligence for <span className="text-panda">Panda</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            Built from your own Talkdesk transcripts, 2 January to 4 February 2026, and 2,991 call recordings from 13 to 15 October 2026.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#tiers"
              className="rounded-full bg-panda px-6 py-3 text-sm font-semibold text-forest transition hover:bg-white"
            >
              See the three tiers
            </Link>
            <Link
              href="/platform"
              className="rounded-full px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10"
            >
              How Decagon would run it
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={280 + i * 70}>
              <div className="h-full rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm">
                <p className="font-display text-4xl font-semibold text-white sm:text-5xl">
                  {"prefix" in s ? s.prefix : null}
                  <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </p>
                <p className="mt-2 text-sm text-white/65">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
