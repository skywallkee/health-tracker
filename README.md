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
