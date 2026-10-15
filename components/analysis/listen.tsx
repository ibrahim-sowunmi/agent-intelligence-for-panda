"use client";

import { useRef, useState } from "react";
import { Reveal, SectionHeading } from "@/components/ui";
import { chelseaCall } from "@/lib/data";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function Listen() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(chelseaCall.durationS);
  const [showTranscript, setShowTranscript] = useState(false);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) void a.play();
    else a.pause();
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audio.current;
    if (!a) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * duration;
  };

  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="A peek into the future of Panda"
          title="Hear Chelsea talk to an AI agent"
          lead="A real conversation between Chelsea and a Panda AI agent: what goes in which bin, what doesn't, and booking a collection, recorded on-site in Ireland."
        />

        <Reveal className="mt-10">
          <div className="max-w-3xl rounded-3xl bg-white p-5 ring-1 ring-line sm:p-7">
            <audio
              ref={audio}
              src={chelseaCall.src}
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || chelseaCall.durationS)}
            />
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-forest text-white transition hover:bg-forest/90"
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden>
                    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z" />
                  </svg>
                )}
              </button>
              <div className="min-w-0 flex-1">
                <div
                  className="h-2 cursor-pointer rounded-full bg-mint"
                  onClick={seek}
                  role="slider"
                  aria-label="Playback position"
                  aria-valuemin={0}
                  aria-valuemax={Math.round(duration)}
                  aria-valuenow={Math.round(time)}
                >
                  <div className="h-full rounded-full bg-panda" style={{ width: `${(time / duration) * 100}%` }} />
                </div>
                <p className="tabular mt-2 text-sm text-muted">
                  {fmt(time)} / {fmt(duration)}
                </p>
              </div>
            </div>

            {chelseaCall.transcript.length ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowTranscript((v) => !v)}
                  aria-expanded={showTranscript}
                  className="mt-5 text-sm font-semibold text-panda-deep hover:text-forest"
                >
                  {showTranscript ? "Hide transcript" : "Show transcript"}
                </button>
                {showTranscript ? (
                  <dl className="mt-4 space-y-3 border-t border-line pt-4 text-sm leading-relaxed">
                    {chelseaCall.transcript.map((l, i) => (
                      <div key={i} className="grid grid-cols-[72px_1fr] gap-3">
                        <dt className={`font-semibold ${l.speaker === "Agent" ? "text-panda-deep" : "text-forest"}`}>{l.speaker}</dt>
                        <dd className="text-ink-2">{l.text}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
