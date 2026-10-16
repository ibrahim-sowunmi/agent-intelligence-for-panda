import { Reveal } from "@/components/ui";
import { measured } from "@/lib/data";
import { october } from "@/lib/october";

const ROWS = [
  {
    tag: "Measured",
    color: "bg-forest text-white",
    source: "From the transcripts and the recordings",
    body: `Every one of the ${measured.totalCalls.toLocaleString("en-IE")} Jan–Feb transcripts and the ${october.calls.toLocaleString("en-IE")} October recordings: counts, inbound and outbound split, call length, recorded parts per call, which queue answered.`,
  },
  {
    tag: "Inferred",
    color: "bg-white text-forest ring-1 ring-line",
    source: "Read from the conversations",
    body: "What each call was about, whether an AI agent could have finished it, and who handled each part of it. Every call read in full by an AI reviewer, with a sample read again by a stronger model.",
  },
  {
    tag: "Assumed",
    color: "bg-white text-forest ring-1 ring-[#f3d3c4]",
    source: "Our judgement, based on experience",
    body: "The containment rates behind each scenario, and the largest of them all: whether four residential queues over five weeks speak for the whole contact centre.",
  },
];

export function Method() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-panda-deep">The basis</p>
          <h2 className="mt-3 text-3xl font-bold text-forest sm:text-4xl">Every number here is one of three things.</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {ROWS.map((r, i) => (
            <Reveal key={r.tag} delay={i * 70}>
              <div className={`h-full rounded-3xl p-7 ${r.color}`}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-80">{r.tag}</p>
                <p className="mt-2 font-display text-lg font-semibold">{r.source}</p>
                <p className="mt-3 text-sm leading-relaxed opacity-80">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
