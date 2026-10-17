import { ImageResponse } from "next/og";
import { SplitIcon } from "@/lib/split-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(await SplitIcon({ size: 180 }), size);
}
