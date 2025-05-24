import { useState, useEffect } from 'react';

export default function Meals() {
  const today = new Date().toISOString().split('T')[0];
  const [meals, setMeals] = useState([]);
  const [form, setForm] = useState({ name: '', calories: '', time: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('meals') || '{}');
    setMeals(saved[today] || []);
  }, [today]);

  function save(updated) {
    const saved = JSON.parse(localStorage.getItem('meals') || '{}');
    saved[today] = updated;
    localStorage.setItem('meals', JSON.stringify(saved));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.calories || !form.time) return;
    const newMeal = {
      id: Date.now(),
      name: form.name,
      calories: parseInt(form.calories, 10),
      time: form.time,
    };
    const updated = [...meals, newMeal];
    setMeals(updated);
    save(updated);
    setForm({ name: '', calories: '', time: '' });
  }

  function handleDelete(id) {
    const updated = meals.filter((m) => m.id !== id);
    setMeals(updated);
    save(updated);
  }

  const total = meals.reduce((sum, m) => sum + (m.calories || 0), 0);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Meals</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="calories"
          type="number"
          placeholder="Calories"
          value={form.calories}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="time"
          type="datetime-local"
          value={form.time}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Meal
        </button>
      </form>

      <div className="space-y-2">
        {meals.length === 0 ? (
          <p>No meals logged today.</p>
        ) : (
          <ul className="space-y-2">
            {meals.map((meal) => (
              <li key={meal.id} className="border p-2 flex justify-between items-center">
                <div>
                  <p>{meal.name}</p>
                  <p className="text-sm text-gray-500">
                    {meal.calories} cal at {new Date(meal.time).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(meal.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="font-semibold">Total: {total} calories</p>
      </div>
    </div>
  );
}
