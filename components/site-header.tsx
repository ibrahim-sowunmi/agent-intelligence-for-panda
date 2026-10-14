"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Your calls" },
  { href: "/platform", label: "Decagon platform" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Panda × Decagon home">
          <Image src="/brand/panda-logo.png" alt="Panda" width={2000} height={433} className="h-7 w-auto" priority />
          <span className="text-lg font-light text-line" aria-hidden>|</span>
          <Image
            src="/brand/decagon-logo-dark.png"
            alt="Decagon"
            width={1424}
            height={312}
            className="h-5 w-auto"
            priority
          />
        </Link>

        {pathname === "/login" ? null : (
        <nav aria-label="Sections" className="order-3 w-full sm:order-none sm:w-auto">
          <div className="flex rounded-full bg-paper p-1 ring-1 ring-line">
            {TABS.map((t) => {
              const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex-1 rounded-full px-5 py-2 text-center text-sm font-semibold transition sm:flex-none ${
                    active ? "bg-forest text-white shadow-sm" : "text-ink-2 hover:text-forest"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>
        </nav>
        )}

      </div>
    </header>
  );
}
