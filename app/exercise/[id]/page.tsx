import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
  import WorkoutActions from "@/components/WorkoutActions";

export default async function ExerciseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-surface">
          <Image
            src={workout.image}
            alt={`${workout.name} demonstration`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-muted">{workout.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-3">
            {specs.map((spec) => (
              <div key={spec.label}>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                  {spec.label}
                </p>
                <p className="mt-0.5 font-display text-lg text-white">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-white">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-surface-2 text-xs font-semibold text-accent">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <WorkoutActions workout={workout} />
        </div>
      </div>
    </div>
  );
}
