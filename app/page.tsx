import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            The Library
          </h2>
          <p className="mt-2 text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Step 4 will add the fetched workout grid here */}
      </section>
    </>
  );
}
