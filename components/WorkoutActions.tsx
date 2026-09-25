"use client";

import { Plus, Bookmark } from "lucide-react";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater } = usePlan();

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        onClick={() => addToPlan(workout)}
        className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-background transition-opacity hover:opacity-90"
      >
        <Plus size={18} />
        Add to today&apos;s plan
      </button>
      <button
        onClick={() => saveForLater(workout)}
        className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-accent"
      >
        <Bookmark size={18} />
        Save for later
      </button>
    </div>
  );
}
