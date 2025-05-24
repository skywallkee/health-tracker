import { useState, useEffect } from 'react';

export default function Meals() {
  const todayKey = new Date().toISOString().slice(0, 10);
  const [meals, setMeals] = useState([]);
  const [form, setForm] = useState({ name: '', calories: '', time: '' });

  useEffect(() => {
    const saved = localStorage.getItem(`meals-${todayKey}`);
    if (saved) {
      setMeals(JSON.parse(saved));
    }
  }, [todayKey]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.calories || !form.time) return;
    const newMeal = {
      name: form.name,
      calories: Number(form.calories),
      time: form.time,
    };
    const updated = [...meals, newMeal];
    setMeals(updated);
    localStorage.setItem(`meals-${todayKey}`, JSON.stringify(updated));
    setForm({ name: '', calories: '', time: '' });
  };

  const totalCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Meals</h1>
      <form onSubmit={handleSubmit} className="space-y-2 mb-4">
        <input
          className="w-full border rounded px-2 py-1"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          className="w-full border rounded px-2 py-1"
          placeholder="Calories"
          name="calories"
          value={form.calories}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          className="w-full border rounded px-2 py-1"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Add Meal
        </button>
      </form>
      <ul className="space-y-2">
        {meals.map((meal, idx) => (
          <li key={idx} className="border rounded p-2">
            <div className="font-medium">{meal.name}</div>
            <div className="text-sm text-gray-600">
              {meal.calories} cal at {meal.time}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-semibold">Total Calories: {totalCalories}</p>
    </div>
  );
}
