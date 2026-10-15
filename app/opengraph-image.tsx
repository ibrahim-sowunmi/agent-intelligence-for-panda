import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Agent Intelligence for Panda: a private report prepared by Decagon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const png = (buf: Buffer) => `data:image/png;base64,${buf.toString("base64")}`;

const FOREST = "#1E3129";
const PANDA = "#3BB25F";
const TIERS = [
  { pct: 40, color: "#2E9E52" },
  { pct: 21, color: "#5B8FE0" },
  { pct: 39, color: "#D9683F" },
];

export default async function Image() {
  const [outfit, interRegular, interSemi, pandaLogo, decagonLogo] = await Promise.all([
    readFile(join(process.cwd(), "assets/Outfit-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/Inter-Regular.ttf")),
    readFile(join(process.cwd(), "assets/Inter-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/brand/panda-logo-white.png")).then(png),
    readFile(join(process.cwd(), "public/brand/decagon-logo-white.png")).then(png),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: FOREST,
          color: "white",
          fontFamily: "Inter",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Paw-print dots, echoing the site hero */}
        <div style={{ position: "absolute", right: -60, top: -70, width: 300, height: 300, borderRadius: 999, background: PANDA, opacity: 0.14 }} />
        <div style={{ position: "absolute", right: 230, top: 40, width: 120, height: 120, borderRadius: 999, background: PANDA, opacity: 0.12 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <img src={pandaLogo} width={185} height={40} alt="" />
          <div style={{ width: 2, height: 34, background: "rgba(255,255,255,0.35)" }} />
          <img src={decagonLogo} width={137} height={30} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: 4, color: PANDA, textTransform: "uppercase" }}>
            Private report · October 2026
          </div>
          <div style={{ display: "flex", marginTop: 18, fontFamily: "Outfit", fontSize: 80, lineHeight: 1.02, letterSpacing: -1.5 }}>
            Agent Intelligence for&nbsp;<span style={{ color: PANDA }}>Panda</span>
          </div>
          <div style={{ marginTop: 22, maxWidth: 900, fontSize: 30, lineHeight: 1.4, color: "rgba(255,255,255,0.72)" }}>
            What your customers ring about, read call by call, and how much of it an AI agent could handle.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", gap: 4, height: 14, borderRadius: 999, overflow: "hidden" }}>
            {TIERS.map((t) => (
              <div key={t.color} style={{ width: `${t.pct}%`, background: t.color }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21, color: "rgba(255,255,255,0.55)" }}>
            <span>Built from Panda&apos;s Talkdesk transcripts</span>
            <span>Prepared by Decagon</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Outfit", data: outfit, weight: 600, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interSemi, weight: 600, style: "normal" },
      ],
    },
  );
}
