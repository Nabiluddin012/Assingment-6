"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, ChevronDown, Check, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/lib/types";

type Tab = "plan" | "saved";
type SortKey = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { todaysPlan, saved, doneIds, markAsDone, removeFromPlan, removeFromSaved } =
    usePlan();
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const baseList = activeTab === "plan" ? todaysPlan : saved;

  const list = useMemo(() => {
    const copy = [...baseList];
    copy.sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
      return b.rating - a.rating; // highest rating first
    });
    return copy;
  }, [baseList, sortBy]);

  const totalMinutes = todaysPlan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = todaysPlan.reduce(
    (sum, w) => sum + w.caloriesBurned,
    0
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics summary */}
      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-border bg-surface p-4 text-center">
          <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
            {todaysPlan.length}
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-muted">
            Exercises
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4 text-center">
          <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
            {totalMinutes}
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-muted">
            Minutes
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4 text-center">
          <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
            {totalCalories}
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-muted">
            Calories
          </p>
        </div>
      </div>

      {/* Tabs + Sort */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-0">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("plan")}
            className={`border-b-2 px-4 py-2 text-sm font-semibold uppercase tracking-wide ${
              activeTab === "plan"
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`border-b-2 px-4 py-2 text-sm font-semibold uppercase tracking-wide ${
              activeTab === "saved"
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="relative mb-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="appearance-none rounded-full border border-border bg-surface py-1.5 pl-4 pr-8 text-xs font-semibold uppercase tracking-wide text-white outline-none"
          >
            <option value="duration">Sort By: Duration</option>
            <option value="calories">Sort By: Calories</option>
            <option value="rating">Sort By: Rating</option>
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
      </div>

      {/* List */}
      <div className="mt-6">
        {isLoading ? (
          <p className="py-10 text-center text-muted">Loading workouts…</p>
        ) : list.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <h2 className="font-display text-xl font-bold uppercase text-white">
              Nothing Here Yet
            </h2>
            <p className="max-w-xs text-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-background transition-opacity hover:opacity-90"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {list.map((workout) => (
              <PlanCard
                key={workout.id}
                workout={workout}
                tab={activeTab}
                isDone={doneIds.includes(workout.id)}
                onMarkDone={() => markAsDone(workout.id)}
                onRemove={() =>
                  activeTab === "plan"
                    ? removeFromPlan(workout.id)
                    : removeFromSaved(workout.id)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PlanCard({
  workout,
  tab,
  isDone,
  onMarkDone,
  onRemove,
}: {
  workout: Workout;
  tab: Tab;
  isDone: boolean;
  onMarkDone: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border border-border bg-surface p-3 ${
        isDone ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl bg-surface-2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`truncate font-display text-sm font-semibold uppercase text-white ${
            isDone ? "line-through" : ""
          }`}
        >
          {workout.name}
        </h3>
        <p className="truncate text-xs text-muted">{workout.equipment}</p>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-muted">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={12} /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-none items-center gap-1.5">
        <Link
          href={`/exercise/${workout.id}`}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:border-accent"
        >
          View Details
        </Link>

        {tab === "plan" && (
          <button
            onClick={onMarkDone}
            disabled={isDone}
            title="Mark as Done"
            className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
              isDone
                ? "border-accent bg-accent text-background"
                : "border-border text-white hover:border-accent"
            }`}
          >
            <Check size={14} />
          </button>
        )}

        <button
          onClick={onRemove}
          title="Remove"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-white transition-colors hover:border-red-500 hover:text-red-500"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}