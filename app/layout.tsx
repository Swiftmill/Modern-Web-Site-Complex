import type { Metadata } from "next";
import "./styles/globals.css";
import "./styles/tokens.css";
import { inter, spaceGrotesk } from "./styles/fonts";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://a-website.example"),
  title: {
    default: "A Website",
    template: "%s · A Website"
  },
  description:
    "A Website est une odyssée cosmique : une vitrine immersive mêlant design néon et galaxie 3D interactive.",
  openGraph: {
    title: "A Website",
    description:
      "A Website est une odyssée cosmique : une vitrine immersive mêlant design néon et galaxie 3D interactive.",
    url: "https://a-website.example",
    siteName: "A Website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    creator: "@awebsite",
    title: "A Website",
    description:
      "A Website est une odyssée cosmique : une vitrine immersive mêlant design néon et galaxie 3D interactive.",
    images: ["/opengraph-image"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-bg text-text antialiased`}>
        <a href="#main" className="skip-link">
          Passer au contenu
        </a>
        <SmoothScrollProvider>
          <div id="__galaxy-root" className="relative min-h-screen overflow-x-hidden">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
