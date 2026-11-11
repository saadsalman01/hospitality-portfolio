import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hospitality-portfolio-flame.vercel.app"),
  title: {
    default: "Direct booking websites for hotels and guesthouses",
    template: "%s",
  },
  description:
    "Fast, mobile first websites that help hotels, hostels and guesthouses take bookings directly.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <noscript>
          <style>{`.reveal,.tagline-word{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
