import { ALLOWED_DOMAINS, LINK_TTL_S, normaliseEmail, safeNext, sign } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = normaliseEmail(body.email);
  if (!email) {
    return Response.json(
      { error: `Use your ${ALLOWED_DOMAINS.map((d) => `@${d}`).join(" or ")} email address.` },
      { status: 400 },
    );
  }

  const origin = process.env.APP_URL ?? new URL(request.url).origin;
  const link = new URL("/api/auth/verify", origin);
  link.searchParams.set("token", await sign(email, "link", LINK_TTL_S));
  const next = safeNext(body.next);
  if (next !== "/") link.searchParams.set("next", next);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.log(`\n[magic link] ${email}\n${link}\n`);
      return Response.json({ ok: true, dev: true });
    }
    return Response.json({ error: "Email sending isn't configured." }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "Decagon <onboarding@resend.dev>",
      to: email,
      subject: "Your sign-in link: Agent Intelligence for Panda",
      text: `Sign in to Agent Intelligence for Panda:\n\n${link}\n\nThis link expires in 15 minutes. If you didn't ask for it, you can ignore this email.`,
      html: emailHtml(link.toString()),
    }),
  });
  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return Response.json({ error: "We couldn't send the email. Try again in a minute." }, { status: 502 });
  }
  return Response.json({ ok: true });
}

function emailHtml(link: string) {
  return `<!doctype html><html><body style="margin:0;background:#F6F8F5;font-family:Inter,Arial,sans-serif;color:#1E3129">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">
<table role="presentation" width="100%" style="max-width:480px;background:#ffffff;border-radius:20px;padding:36px">
<tr><td>
<p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#3BB25F">Panda · Decagon</p>
<h1 style="margin:14px 0 0;font-size:24px;line-height:1.25">Agent Intelligence for Panda</h1>
<p style="margin:14px 0 0;font-size:15px;line-height:1.6;color:#41524A">Click the button below to sign in. The link works for 15 minutes.</p>
<p style="margin:28px 0 0"><a href="${link}" style="display:inline-block;background:#1E3129;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 26px;border-radius:999px">Open the report</a></p>
<p style="margin:28px 0 0;font-size:12px;line-height:1.6;color:#7A8A82">If you didn't ask for this, you can ignore this email.</p>
</td></tr></table></td></tr></table></body></html>`;
}
