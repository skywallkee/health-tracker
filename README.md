# Health Tracker Frontend

This repository contains a Vite React application configured with Tailwind CSS and React Router DOM. The app provides a mobile-first layout with bottom tab navigation and routes for dashboard, meals, fasting, workouts and settings.

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start development server
   ```bash
   npm run dev
   ```

Build for production with `npm run build`.

## Features

### Workouts

Use the Workouts tab to log training sessions. Select a workout type, enter the
duration and optional notes, then add any exercises performed with sets, reps
and weight. Logged workouts are stored in LocalStorage and listed below the
form.

### Meals
- Log meals with name, calories and time.
- Entries are stored per day in LocalStorage and can be deleted.
- The page shows today's meal list and total calories.

### Fasting
- Choose a fasting preset (16:8, 18:6 or 20:4).
- Start or stop a fasting session which is saved in LocalStorage.
- When active, a countdown displays time remaining until the preset duration is met.
- After stopping, the last fast duration is shown.
