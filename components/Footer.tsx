import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-white">
          <Image src="/logo.png" alt="FitLog logo" width={18} height={18} />
          <span className="font-display font-semibold uppercase tracking-wide">
            FitLog
          </span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
