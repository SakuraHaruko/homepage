import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Prefetch from "@/components/Prefetch";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.min.css";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sakura 🌸",
  description: "Sakura's personal homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);else if(window.matchMedia('(prefers-color-scheme:dark)').matches)document.documentElement.setAttribute('data-theme','dark')})()`,
          }}
        />
      </head>
      <body className={`${notoSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col lg:flex-row">
          {/* Content */}
          <div className="flex-1 overflow-y-auto lg:h-screen">
            <div className="max-w-xl mx-auto px-6 py-14 md:py-20 lg:px-12">
              {children}
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>

        <MobileNav />
        <Prefetch />
      </body>
    </html>
  );
}
