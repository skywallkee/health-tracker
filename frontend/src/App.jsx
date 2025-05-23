import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Meals from './pages/Meals';
import Fasting from './pages/Fasting';
import Workouts from './pages/Workouts';
import Settings from './pages/Settings';
import Layout from './components/Layout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/fasting" element={<Fasting />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}
