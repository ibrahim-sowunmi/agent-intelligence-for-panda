import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in · Agent Intelligence for Panda" };

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <span className="paw-dot -right-16 -top-16 h-72 w-72 opacity-10" aria-hidden />
      <div className="relative mx-auto max-w-md px-5">
        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-forest/5 ring-1 ring-line sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-panda-deep">Private report</p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-forest">Agent Intelligence for Panda</h1>
          <p className="mt-3 leading-relaxed text-ink-2">
            Enter your work email and we&apos;ll send you a sign-in link. Open to decagon.ai and pandarecycling.co.uk addresses.
          </p>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
