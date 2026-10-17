import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

const TITLE = "Agent Intelligence for Panda";
const DESCRIPTION =
  "What Panda's customers ring about, read call by call, and how much of it an AI agent could handle. A private report prepared by Decagon.";

export const metadata: Metadata = {
  metadataBase: new URL("https://decagon-for-panda.vercel.app"),
  title: { default: TITLE, template: `%s · ${TITLE}` },
  description: DESCRIPTION,
  applicationName: TITLE,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Decagon for Panda",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    locale: "en_IE",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = { themeColor: "#1E3129" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
