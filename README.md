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

### Workouts Page

Use the Workouts tab to log training sessions. Select a workout type, enter the
duration and optional notes, then add any exercises performed with sets, reps
and weight. Logged workouts are stored in LocalStorage and listed below the
form.
