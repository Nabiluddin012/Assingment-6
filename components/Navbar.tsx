"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const navLinks = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { todaysPlan, saved } = usePlan();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={22} height={22} />
          <span className="font-display text-lg font-semibold uppercase tracking-wide text-white">
            FitLog
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                isActive(link.href)
                  ? "text-accent"
                  : "text-muted hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-background transition-opacity hover:opacity-90"
          >
            Plan <span>{todaysPlan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-semibold text-white transition-colors hover:border-accent"
          >
            Saved <span>{saved.length}</span>
          </Link>
        </div>
      </div>

      {/* mobile nav links */}
      <nav className="flex items-center justify-center gap-6 border-t border-border py-2 sm:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-xs font-medium uppercase tracking-wide ${
              isActive(link.href) ? "text-accent" : "text-muted"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
