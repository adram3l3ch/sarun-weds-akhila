import { MotionPreferences } from "@/components/shared/MotionPreferences";
import { wedding } from "@/data/wedding";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
   variable: "--font-cormorant",
   subsets: ["latin"],
   weight: ["300", "400", "500", "600"],
   style: ["normal", "italic"],
   display: "swap",
});

const sans = DM_Sans({
   variable: "--font-dm-sans",
   subsets: ["latin"],
   weight: ["300", "400", "500"],
   display: "swap",
});

export const metadata: Metadata = {
   metadataBase: new URL(wedding.website.url),
   title: wedding.website.title,
   description: wedding.website.description,
   alternates: {
      canonical: wedding.website.url,
   },
   icons: ["/favicon.ico"],
   openGraph: {
      type: "website",
      locale: "en_IN",
      url: wedding.website.url,
      siteName: wedding.website.title,
      title: wedding.website.title,
      description: wedding.website.description,
      images: [
         {
            url: wedding.website.ogImage,
            width: 1200,
            height: 630,
            type: "image/png",
            alt: wedding.website.ogImageAlt ?? wedding.website.title,
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: wedding.website.title,
      description: wedding.website.description,
      images: [wedding.website.ogImage],
   },
   robots: {
      index: true,
      follow: true,
   },
};

export const viewport: Viewport = {
   width: "device-width",
   initialScale: 1,
   viewportFit: "cover",
   themeColor: "#f8f3e9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
   return (
      <html lang="en" className={`${display.variable} ${sans.variable} h-full antialiased`}>
         <meta property="og:image" content="/images/og-cover.png" />
         <body className="min-h-full bg-ivory font-sans text-teak">
            <MotionPreferences>{children}</MotionPreferences>
         </body>
      </html>
   );
}
