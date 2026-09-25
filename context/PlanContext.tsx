"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import toast from "react-hot-toast";
import { Workout } from "@/lib/types";

interface PlanContextType {
  todaysPlan: Workout[];
  saved: Workout[];
  doneIds: number[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [todaysPlan, setTodaysPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);

  const addToPlan = (workout: Workout) => {
    const alreadyInPlan = todaysPlan.some((w) => w.id === workout.id);
    if (alreadyInPlan) {
      toast(`${workout.name} is already in today's plan`);
      return;
    }
    setTodaysPlan((prev) => [...prev, workout]);
    toast.success("Added to today's plan");
  };

  const saveForLater = (workout: Workout) => {
    const alreadySaved = saved.some((w) => w.id === workout.id);
    if (alreadySaved) {
      toast(`${workout.name} is already saved`);
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: number) => {
    setTodaysPlan((prev) => prev.filter((w) => w.id !== id));
    setDoneIds((prev) => prev.filter((doneId) => doneId !== id));
    toast("Removed from today's plan");
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    toast("Removed from saved");
  };

  const markAsDone = (id: number) => {
    setDoneIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    toast.success("Marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        todaysPlan,
        saved,
        doneIds,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}