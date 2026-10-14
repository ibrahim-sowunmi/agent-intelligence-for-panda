"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Fades content in when it scrolls into view. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/** Counts up to a number once visible. */
export function CountUp({ value, decimals = 0, suffix = "", duration = 1200 }: { value: number; decimals?: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    if (reduce) {
      raf = requestAnimationFrame(() => setShown(value));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setShown(value * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);
  const text = shown.toLocaleString("en-IE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="max-w-3xl">
      <p id={id} className={`scroll-mt-28 text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-panda" : "text-panda-deep"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-4xl font-bold leading-[1.05] sm:text-5xl ${dark ? "text-white" : "text-forest"}`}>{title}</h2>
      {lead ? <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/75" : "text-ink-2"}`}>{lead}</p> : null}
    </Reveal>
  );
}

export function TierLegend({ className = "" }: { className?: string }) {
  const items: { t: "A" | "B" | "C"; label: string }[] = [
    { t: "A", label: "Tier A · AI finishes it" },
    { t: "B", label: "Tier B · AI plus a hand-off" },
    { t: "C", label: "Tier C · Agent intake, then human-led" },
  ];
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2 ${className}`} aria-label="Legend">
      {items.map((i) => (
        <li key={i.t} className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-[3px]" style={{ background: `var(--color-tier-${i.t.toLowerCase()})` }} aria-hidden />
          {i.label}
        </li>
      ))}
    </ul>
  );
}

/** The four circles from the Panda mark, used as a decorative motif. */
export function PawDots({ className = "", opacity = 0.18 }: { className?: string; opacity?: number }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden style={{ opacity }}>
      <div className="relative h-[420px] w-[460px]">
        <span className="paw-dot" style={{ left: 0, top: 120, width: 170, height: 170 }} />
        <span className="paw-dot" style={{ left: 190, top: 0, width: 140, height: 140 }} />
        <span className="paw-dot" style={{ left: 360, top: 60, width: 100, height: 100 }} />
        <span className="paw-dot" style={{ left: 190, top: 170, width: 240, height: 240 }} />
      </div>
    </div>
  );
}
