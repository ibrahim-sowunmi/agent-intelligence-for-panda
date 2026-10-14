"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

type State = { kind: "idle" | "sending" } | { kind: "sent"; email: string; dev?: boolean } | { kind: "error"; message: string };

export function LoginForm() {
  const params = useSearchParams();
  const [state, setState] = useState<State>(
    params.get("error") === "expired"
      ? { kind: "error", message: "That link has expired or isn't valid. Request a new one." }
      : { kind: "idle" },
  );

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    setState({ kind: "sending" });
    const res = await fetch("/api/auth/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, next: params.get("next") }),
    }).catch(() => null);
    const data = await res?.json().catch(() => ({}));
    if (res?.ok) setState({ kind: "sent", email, dev: data?.dev });
    else setState({ kind: "error", message: data?.error ?? "Something went wrong. Try again." });
  }

  if (state.kind === "sent") {
    return (
      <div className="mt-8 rounded-2xl bg-mint p-5" role="status">
        <p className="font-semibold text-forest">Check your inbox</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-2">
          We sent a sign-in link to <span className="font-semibold text-ink">{state.email}</span>. It works for 15 minutes.
          {state.dev ? " (Local dev: the link is printed in the server log.)" : ""}
        </p>
        <button onClick={() => setState({ kind: "idle" })} className="mt-4 text-sm font-semibold text-panda-deep hover:text-forest">
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8">
      <label htmlFor="email" className="text-sm font-semibold text-ink">
        Work email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@pandarecycling.co.uk"
        className="mt-2 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-ink outline-none transition placeholder:text-muted focus:border-panda focus:ring-2 focus:ring-panda/30"
      />
      {state.kind === "error" ? (
        <p className="mt-3 text-sm text-tier-c" role="alert">
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={state.kind === "sending"}
        className="mt-5 w-full rounded-full bg-forest px-6 py-3 font-semibold text-white transition hover:bg-forest/90 disabled:opacity-60"
      >
        {state.kind === "sending" ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
