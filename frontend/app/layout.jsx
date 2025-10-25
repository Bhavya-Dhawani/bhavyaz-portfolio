import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/helpers/UserContext";


const url = process.env.SERVER_URL;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bhavyaz Portfolio",
  description: "This is my portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="dark blue" lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div id="transition">
          <span id="transition-text"></span>
        </div>
        <UserProvider url={url}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
