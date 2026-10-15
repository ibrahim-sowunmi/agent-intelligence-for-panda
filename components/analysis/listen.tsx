"use client";

import { useRef, useState } from "react";
import { Reveal, SectionHeading } from "@/components/ui";
import { chelseaCall } from "@/lib/data";

// Loudness of the recording in 48 slices, drawn as the progress bar.
const WAVE = [
  0.25, 0.89, 0.63, 0.62, 0.42, 0.52, 0.96, 0.98, 0.82, 0.87, 0.8, 0.26, 0.62, 0.44, 0.95, 0.94, 0.89, 0.93, 0.52, 0.62, 0.29, 0.98, 0.96, 0.98,
  0.6, 0.65, 0.36, 0.94, 0.89, 1.0, 0.83, 0.38, 0.57, 0.97, 0.94, 0.97, 0.91, 0.91, 0.61, 0.26, 0.71, 0.41, 0.95, 1.0, 0.93, 0.71, 0.33, 0.36,
];

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
          <div className="rounded-3xl bg-forest p-6 text-white sm:p-10">
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
            <div className="flex items-center gap-4 sm:gap-8">
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-panda text-forest transition hover:bg-white sm:h-[84px] sm:w-[84px]"
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
              <div
                className="flex h-5 min-w-0 flex-1 cursor-pointer items-center gap-[3px] py-0.5"
                onClick={seek}
                role="slider"
                aria-label="Playback position"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-valuenow={Math.round(time)}
              >
                {WAVE.map((v, i) => (
                  <span
                    key={i}
                    className={`flex-1 rounded-full transition-colors ${(i + 0.5) / WAVE.length <= time / duration ? "bg-panda" : "bg-white/25"}`}
                    style={{ height: `${Math.round(45 + v * 55)}%` }}
                    aria-hidden
                  />
                ))}
              </div>
              <p className="tabular hidden shrink-0 text-lg text-white/75 sm:block">
                {fmt(time)} / {fmt(duration)}
              </p>
            </div>
            <p className="tabular mt-3 text-sm text-white/75 sm:hidden">
              {fmt(time)} / {fmt(duration)}
            </p>

            <button
              type="button"
              onClick={() => setShowTranscript((v) => !v)}
              aria-expanded={showTranscript}
              className="mt-8 rounded-full px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10"
            >
              {showTranscript ? "Hide transcript" : "Show transcript"}
            </button>
            {showTranscript ? (
              <dl className="mt-8 space-y-5 border-t border-white/10 pt-8 leading-relaxed">
                {chelseaCall.transcript.map((l, i) => (
                  <div key={i} className="grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-6">
                    <dt
                      className={`pt-0.5 text-xs font-bold uppercase tracking-[0.18em] ${l.speaker === "Agent" ? "text-panda" : "text-white/60"}`}
                    >
                      {l.speaker === "Agent" ? "AI agent" : l.speaker}
                    </dt>
                    <dd className="text-white/85">{l.text}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
