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

## Meals Page

Navigate to `/meals` to log what you eat. Enter the meal name, calorie count and
the time of the meal. Each entry is stored in your browser's LocalStorage under
today's date. You can remove a meal from the list and the total calories will
update automatically.
