import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest text-white">
      <div className="grain absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image src="/brand/panda-logo-white.png" alt="Panda" width={2000} height={433} className="h-7 w-auto" />
            <span className="text-lg font-light text-white/40" aria-hidden>|</span>
            <Image src="/brand/decagon-logo-white.png" alt="Decagon" width={1424} height={312} className="h-5 w-auto" />
          </div>
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-white/50">Prepared by Decagon for Panda · October 2026</p>
      </div>
    </footer>
  );
}
