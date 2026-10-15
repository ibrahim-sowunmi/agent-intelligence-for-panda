"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const params = useSearchParams();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    setSending(true);
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, next: params.get("next") }),
    }).catch(() => null);
    const data = await res?.json().catch(() => ({}));
    if (res?.ok) {
      window.location.assign(data.next ?? "/");
      return;
    }
    setSending(false);
    setError(data?.error ?? "Something went wrong. Try again.");
  }

  return (
    <form onSubmit={submit} className="mt-8">
      <label htmlFor="password" className="text-sm font-semibold text-ink">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        autoFocus
        className="mt-2 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-ink outline-none transition placeholder:text-muted focus:border-panda focus:ring-2 focus:ring-panda/30"
      />
      {error ? (
        <p className="mt-3 text-sm text-tier-c" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={sending}
        className="mt-5 w-full rounded-full bg-forest px-6 py-3 font-semibold text-white transition hover:bg-forest/90 disabled:opacity-60"
      >
        {sending ? "Checking…" : "Open the report"}
      </button>
    </form>
  );
}
