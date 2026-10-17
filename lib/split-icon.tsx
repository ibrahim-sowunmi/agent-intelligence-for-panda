import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* eslint-disable @next/next/no-img-element -- ImageResponse needs plain img */
// Favicon: Panda paw on the left half, Decagon mark on the right half.
export async function SplitIcon({ size }: { size: number }) {
  const [paw, mark] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/panda-paw.png")),
    readFile(join(process.cwd(), "public/brand/decagon-mark-white.png")),
  ]);
  const src = (b: Buffer) => `data:image/png;base64,${b.toString("base64")}`;
  const half = size / 2;
  const pawW = size * 0.78;
  const markW = size * 0.7;
  return (
    <div style={{ width: size, height: size, display: "flex", borderRadius: size * 0.22, overflow: "hidden" }}>
      <div style={{ width: half, height: size, display: "flex", overflow: "hidden", background: "#eaf6ee", position: "relative" }}>
        <img src={src(paw)} width={pawW} height={(pawW * 433) / 470} alt="" style={{ position: "absolute", left: (size - pawW) / 2, top: (size - (pawW * 433) / 470) / 2 }} />
      </div>
      <div style={{ width: half, height: size, display: "flex", overflow: "hidden", background: "#1e3129", position: "relative" }}>
        <img src={src(mark)} width={markW} height={(markW * 312) / 412} alt="" style={{ position: "absolute", left: (size - markW) / 2 - half, top: (size - (markW * 312) / 412) / 2 }} />
      </div>
    </div>
  );
}
