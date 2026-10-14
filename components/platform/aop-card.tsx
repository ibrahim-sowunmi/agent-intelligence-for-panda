"use client";

import { useEffect, useState } from "react";

// An illustrative AOP, written from the closure rules agents applied in Panda's own calls.
const STEPS = [
  "Verify the caller with the account number, or the mobile and Eircode on the account.",
  "Confirm the move-out date. If the new address is one we collect from, offer to move the service instead.",
  "Check the final collection. If bins are still full, schedule the closure for the day after the last lift.",
  "Apply the €30 closure fee. Waive it if they're moving into a home that already has Panda.",
  "Read back the final balance and take payment through PCI Pal.",
  "Close the account, book bin removal if needed, and send confirmation by email.",
];

export function AopCard() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setStep(STEPS.length));
      return () => cancelAnimationFrame(raf);
    }
    const id = setInterval(() => setStep((s) => (s >= STEPS.length + 2 ? 0 : s + 1)), 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-panda/20 blur-2xl" aria-hidden />
      <div className="relative overflow-hidden rounded-3xl bg-forest text-white shadow-2xl shadow-forest/30 ring-1 ring-white/10">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-panda">Agent Operating Procedure</p>
            <p className="mt-1 font-display text-lg font-semibold">Close an account when moving out</p>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">Tier A · 78%</span>
        </div>
        <ol className="space-y-1 px-4 py-4">
          {STEPS.map((s, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li
                key={s}
                className={`flex gap-3 rounded-2xl px-3 py-2.5 text-sm leading-relaxed transition duration-500 ${
                  current ? "bg-white/10 text-white" : done ? "text-white/85" : "text-white/40"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-[10px] font-bold transition ${
                    done ? "bg-panda text-forest" : current ? "bg-white text-forest" : "bg-white/10 text-white/60"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                {s}
              </li>
            );
          })}
        </ol>
        <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-6 py-4 text-xs">
          <span className="text-white/50">Tools</span>
          {["Billing", "PCI Pal", "Collections calendar", "Bin orders"].map((t) => (
            <span key={t} className="rounded-full bg-white/10 px-2.5 py-1 text-white/80">
              {t}
            </span>
          ))}
          <span className="ml-auto text-white/50">Escalate to Loyalty if price or a complaint comes up</span>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted">Illustrative AOP, written from the closure rules in Panda&apos;s own calls</p>
    </div>
  );
}
