import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ReactNode } from "react";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PantryPilot Beta",
  description: "Household meal planning with review and grocery planning.",
};

const navButton = {
  color: "#183c2b",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "10px 14px",
  background: "#e7efe5",
  fontWeight: 600,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#f6f1e7",
          color: "#183c2b",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <Providers>
          <header
            style={{
              padding: "18px 28px",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              alignItems: "center",
              background: "#e7efe5",
              borderBottom: "1px solid #d5d1c4",
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}
          >
            <div style={{ fontWeight: 700, letterSpacing: "0.12em" }}>
              PANTRYPILOT BETA
            </div>
            <nav
              style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginLeft: "auto" }}
            >
              <Link href="/" style={navButton}>
                Home
              </Link>
              <Link href="/household" style={navButton}>
                Household
              </Link>
              <Link href="/dinner-plan" style={navButton}>
                Plan
              </Link>
              <Link href="/review" style={navButton}>
                Review
              </Link>
              <Link href="/grocery-list" style={navButton}>
                Grocery
              </Link>
            </nav>
          </header>

          {children}

          <footer
            style={{
              padding: "24px 28px",
              textAlign: "center",
              background: "#f6f1e7",
              color: "#5f7d68",
              fontSize: "0.9rem",
            }}
          >
            MadeThis
          </footer>
        </Providers>
      </body>
    </html>
  );
}
