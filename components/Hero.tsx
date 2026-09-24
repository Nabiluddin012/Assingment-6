import Link from "next/link";
import Image from "next/image";
import { Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Workout Library
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight text-white sm:text-5xl">
            Train With Intent. Log Every Set.
          </h1>
          <p className="mt-5 max-w-md text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-background transition-opacity hover:opacity-90"
          >
            <Dumbbell size={18} />
            Browse Workouts
          </Link>
        </div>

        <div className="mx-auto w-full max-w-sm lg:max-w-none">
          <Image
            src="/banner.png"
            alt="Gym workout illustration"
            width={520}
            height={520}
            priority
            className="mx-auto h-auto w-full max-w-sm"
          />
        </div>
      </div>
    </section>
  );
}
