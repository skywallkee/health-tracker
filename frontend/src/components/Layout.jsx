import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/meals', label: 'Meals' },
  { to: '/fasting', label: 'Fasting' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/settings', label: 'Settings' },
];

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4">{children}</main>
      <nav className="bg-white border-t shadow-inner">
        <ul className="flex justify-around">
          {tabs.map((tab) => (
            <li key={tab.to} className="flex-1 text-center">
              <NavLink
                to={tab.to}
                className={({ isActive }) =>
                  `block py-2 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`
                }
              >
                {tab.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
