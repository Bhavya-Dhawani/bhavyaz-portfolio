import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/ui/Cursor";
import { LenisProvider } from "@/utils/LenisContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://bhavyaz-portfolio.vercel.app"),

  title: "Bhavya Dhanwani - Portfolio",
  description: "Hey i am Bhavya Dhanwani. I just want you to know that I am the one who can build amazing stuff for you and your businesses helping them grow faster than you imgaine..",
  verification: {
    google: "_oiJ54jEgwZvkUAvDC2-23EfP3dSIdB5776iXVANBiI",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Bhavya Dhanwani - Portfolio",
    description: "Explore Your next move",
    url: "/",
    siteName: "Bhavya Dhanwani",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Bhavya Dhanwani - Portfolio",
    description: "Explore Your next move",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Cursor />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
