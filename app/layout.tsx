import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "Browse gym workouts, build today's plan, and track weekly calories with FitLog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${inter.variable} flex min-h-screen flex-col font-sans`}
      >
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "#141414",
                color: "#f5f5f5",
                border: "1px solid #2a2a2a",
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
