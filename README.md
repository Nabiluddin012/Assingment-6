# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of workouts, drill into details for each lift, and build out today's training plan — all backed by a live API.



##  Technologies Used

- **Next.js (App Router)** — routing, dynamic routes, server/client components
- **TypeScript** — type-safe components and data models
- **Tailwind CSS v4** — utility-first styling and theming (`@theme`)
- **React Context API** — global state for Today's Plan / Saved lists
- **react-hot-toast** — toast notifications
- **lucide-react** — icon set

## Features

1. **Workout Library** — fetches all workouts from the FitLog API and displays them in a responsive grid, with a loading skeleton while data is fetching.
2. **Dynamic Exercise Details** — each workout has its own `/exercise/[id]` page with a key-specs panel and step-by-step instructions, fetched dynamically from the API.
3. **Plan & Save workflow** — "Add to today's plan" and "Save for later" update a global state (React Context) shared across the whole app, with instant toast feedback.
4. **My Plan dashboard** — live metrics (exercises, minutes, calories), tabbed Today's Plan / Saved views, and an empty state guiding users back to the library.
5. **Sort, Mark as Done & Remove** — reorder the plan by duration, calories, or rating; mark lifts complete or remove them, all reflected instantly in the Navbar badge counts.
6. **Fully responsive design** — mobile, tablet, and desktop layouts, with a custom dark theme (`#0a0a0a` background, `#ccff00` accent).
7. **Custom 404 page** — friendly not-found page for any unknown route.

##  Getting Started

npm install
npm run dev



