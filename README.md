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

- **Meals**: Log meals with name, calories and time. Meals are stored per day in LocalStorage. You can delete meals from today's list and the total calories update automatically.
- **Fasting**: Start and stop fasting sessions. The active fast shows elapsed time. When ended, the start and end times along with total duration are saved in LocalStorage and displayed as the most recent fast.


## Meals Page

Navigate to `/meals` to log what you eat. Enter the meal name, calorie count and
the time of the meal. Each entry is stored in your browser's LocalStorage under
today's date. You can remove a meal from the list and the total calories will
update automatically.
