import type { Metadata } from "next";
import Link from "next/link";
import { PawDots, Reveal, SectionHeading } from "@/components/ui";
import { AopCard } from "@/components/platform/aop-card";
import { tiers, TIER_COLOR } from "@/lib/data";

export const metadata: Metadata = {
  title: "Decagon platform",
};

const ENGINE = [
  {
    title: "Proprietary models",
    body: "Low-latency, high-accuracy conversations from a constellation of frontier and specialised models. Over 80% of traffic runs on models Decagon trained itself for customer service.",
  },
  {
    title: "Memory",
    body: "Customer context carries across sessions and channels, so a caller who rang yesterday about a missed lift doesn't start from zero today.",
  },
  {
    title: "Enterprise security",
    body: "Built-in guardrails, secure access and data management. Configurable PII redaction that works on voice, including when callers spell out details mid-call.",
  },
];

const PILLARS = [
  {
    stage: "Build",
    title: "Build your agent quickly and collaboratively",
    items: [
      ["Agent Operating Procedures", "Agent logic written in natural language, compiled into reliable structured workflows. Duet offers best-practice guidance as you write."],
      ["Seamless integration", "Connects to ticketing, CRMs, knowledge bases, CCaaS providers and custom systems. Your telephony stays where it is."],
      ["Guardrails and guidelines", "Secure, on-brand execution of sensitive steps like identity verification, payments and refunds."],
    ],
  },
  {
    stage: "Optimize",
    title: "Optimize performance at every step",
    items: [
      ["Testing and simulations", "Simulated conversations and unit tests against real customer personas before anything ships."],
      ["Versioning and experiments", "Git-based versioning and live A/B tests of workflow updates against real conversations."],
      ["Transparent observability", "Step-by-step traces of model calls, workflow triggers and the knowledge each answer referenced."],
    ],
  },
  {
    stage: "Scale",
    title: "Scale outcomes with granular insights",
    items: [
      ["Diagnostic tools", "AI-driven recommendations across your knowledge base, workflow design and tooling."],
      ["Voice of Customer", "Every conversation tagged by intent, with the friction points that should shape your roadmap."],
      ["Watchtower", "Always-on QA that reviews 100% of conversations against your own criteria. Nothing is sampled."],
    ],
  },
];

const CHANNELS = [
  {
    name: "Voice",
    line: "No more hold, just help.",
    body: "Fast, natural dialogue with interruption handling, tuned to Panda's tone and Irish place names. Outbound calls for reminders and callbacks, with voicemail detection.",
  },
  {
    name: "Chat",
    line: "Flexible and personal.",
    body: "Runs the same AOPs as voice, so a customer who starts in chat and rings later gets one consistent answer.",
  },
  {
    name: "Email",
    line: "Always on.",
    body: "Quick, accurate replies for the requests that arrive in writing, like tenancy papers and proof of a move.",
  },
];

const PANDA_TIERS = [
  {
    tier: "A" as const,
    title: "Run the call end to end",
    points: [
      "AOPs for payments, quotes, sign-ups and closures, written from your own rules",
      "Card capture handed to PCI Pal, then the agent resumes and confirms",
      "Simulated against your own transcripts before launch",
    ],
  },
  {
    tier: "B" as const,
    title: "Do the intake, hand off warm",
    points: [
      "Operations requests raised with the caller's details and a summary attached",
      "Tenancy and bereavement paperwork collected and logged before a person picks it up",
      "Watchtower flags vulnerable callers for a human on the next turn",
    ],
  },
  {
    tier: "C" as const,
    title: "Set Loyalty up to win",
    points: [
      "Account, usage and contract end date gathered before the transfer",
      "Agent Assist surfaces the offer ladder to the Loyalty agent in real time",
      "Insights tracks why customers ask for a better price, week by week",
    ],
  },
];

const PROOF = [
  { name: "Hertz", stat: "10% → 70%+", body: "resolution rate, live in six weeks across chat and voice" },
  { name: "Chime", stat: "70%+", body: "resolution rate, up from 40%, with a 60% cost decrease" },
  { name: "Oura", stat: "3×", body: "increase in CSAT and $15M of spend avoided" },
  { name: "ClassPass", stat: "95%", body: "reduction in support cost" },
];

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <PawDots className="-left-44 -top-24" opacity={0.08} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:py-28">
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-panda-deep">The Decagon platform</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-5xl font-bold leading-[1.03] text-forest sm:text-6xl">
                The conversational AI platform for concierge customer experiences.
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 text-xl text-ink-2">Rapidly build, optimize, and scale AI agents.</p>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">
                No complex SDK, no black box, no vendor ticket for every change. Your CX team writes and improves the agent in plain language
                with AOPs and Duet, while your technical team keeps control of guardrails, integrations and versioning.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#for-panda" className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-panda-deep">
                  What it means for Panda
                </Link>
                <a
                  href="https://decagon.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-forest ring-1 ring-line transition hover:ring-forest"
                >
                  decagon.ai ↗
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <AopCard />
          </Reveal>
        </div>
      </section>

      {/* Agent engine */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Agent engine"
            title="A unified platform for concierge experiences across every channel."
            lead="Platform intelligence tailored to your business, with one brain behind voice, chat and email."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {ENGINE.map((e, i) => (
              <Reveal key={e.title} delay={i * 70}>
                <div className="group h-full rounded-3xl bg-paper p-7 ring-1 ring-line transition hover:-translate-y-1 hover:bg-mint">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-panda/15 text-panda-deep">
                    <span className="h-3 w-3 rounded-full bg-panda-deep transition group-hover:scale-125" />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold text-forest">{e.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-2">{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Build / Optimize / Scale */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Build · Optimize · Scale" title="Everything a CX team needs to run an AI agent well." />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.stage} delay={i * 80}>
                <div className="flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-line">
                  <span className="w-fit rounded-full bg-forest px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">{p.stage}</span>
                  <h3 className="mt-5 text-2xl font-bold leading-tight text-forest">{p.title}</h3>
                  <ul className="mt-6 space-y-5">
                    {p.items.map(([t, b]) => (
                      <li key={t} className="border-t border-line pt-5">
                        <p className="font-semibold text-ink">{t}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{b}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Duet */}
      <section className="relative overflow-hidden bg-forest py-24 text-white">
        <div className="grain absolute inset-0 opacity-60" aria-hidden />
        <PawDots className="-right-32 -top-24" opacity={0.12} />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <SectionHeading
            dark
            eyebrow="Duet · your AI partner"
            title="Getting an agent to 80% is the easy part. Duet handles the last 20%, where most of the time goes."
            lead="Duet reads your conversations, finds the gaps in a workflow, and writes, tests and refines the AOPs that close them. Weeks of iteration become days."
          />
          <div className="space-y-4">
            {[
              ["Automated agent improvement", "Duet Autopilot spots what matters most in production, such as a closure that escalates for no reason, traces it to the root cause and proposes a fix."],
              ["Self-validation", "Every proposed change is tested against the conversation that surfaced it and a golden set of real customer personas before anyone reviews it."],
              ["Enterprise governance", "Nothing reaches production without human approval. Each update arrives with the issue, the diff and the test results."],
            ].map(([t, b], i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10">
                  <p className="font-display text-lg font-semibold">{t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Omnichannel */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Omnichannel" title="Build once. Deploy everywhere." lead="A single intelligence layer unifies voice, chat and email." />
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.3fr_1fr_1fr]">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.name} delay={i * 70}>
                <div className={`h-full rounded-3xl p-7 ${i === 0 ? "bg-panda text-forest" : "bg-paper ring-1 ring-line"}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-75">{c.name}</p>
                  <p className={`mt-4 font-display font-bold leading-tight ${i === 0 ? "text-4xl" : "text-2xl text-forest"}`}>{c.line}</p>
                  <p className={`mt-4 leading-relaxed ${i === 0 ? "text-forest/85" : "text-ink-2"}`}>{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* For Panda */}
      <section className="bg-mint py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            id="for-panda"
            eyebrow="Mapped to Panda's calls"
            title="What Decagon does in each tier."
            lead="The three tiers come from reading every inbound call in your transcripts."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PANDA_TIERS.map((t, i) => {
              const info = tiers.find((x) => x.tier === t.tier)!;
              return (
                <Reveal key={t.tier} delay={i * 80}>
                  <div className="h-full rounded-3xl bg-white p-7 shadow-sm ring-1 ring-mint-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-ink-2">
                        <span className="h-3 w-3 rounded-full" style={{ background: TIER_COLOR[t.tier] }} aria-hidden />
                        Tier {t.tier}
                      </span>
                      <span className="font-display text-3xl font-semibold text-forest">{info.pct}%</span>
                    </div>
                    <h3 className="mt-5 text-2xl font-bold text-forest">{t.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {t.points.map((p) => (
                        <li key={p} className="flex gap-3 text-ink-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-panda-deep" aria-hidden />
                          <span className="leading-relaxed">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-10">
            <Link href="/#tiers" className="text-sm font-semibold text-forest underline decoration-panda decoration-2 underline-offset-4">
              See how the tiers were measured
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Proof */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Customer results" title="Resolution, not deflection." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROOF.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <div className="h-full rounded-3xl bg-paper p-7 ring-1 ring-line">
                  <p className="text-sm font-semibold text-muted">{p.name}</p>
                  <p className="mt-4 font-display text-4xl font-semibold text-forest">{p.stat}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <div className="grid gap-6 rounded-3xl bg-forest p-8 text-white md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-panda">Enterprise ready</p>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/85">
                  Headless, so it works within the telephony you already run. Typical go-live in six to seven weeks.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {["GDPR", "SOC 2 Type 2", "HIPAA", "CCPA"].map((c) => (
                  <li key={c} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden bg-panda py-24 text-forest">
        <PawDots className="-right-24 -top-20" opacity={0.25} />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="max-w-3xl text-5xl font-bold leading-[1.02] sm:text-6xl">The AI concierge for every customer.</h2>
          <p className="mt-5 max-w-xl text-lg text-forest/80">
            Starting with the calls Panda&apos;s customers make every day: paying a bill, closing an account, asking what&apos;s owed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest-2">
              Back to your calls
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
