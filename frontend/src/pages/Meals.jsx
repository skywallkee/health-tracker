import { useState, useEffect } from 'react';

export default function Meals() {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [time, setTime] = useState('');
  const [meals, setMeals] = useState([]);

  const todayKey = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const stored = localStorage.getItem(`meals-${todayKey}`);
    if (stored) {
      setMeals(JSON.parse(stored));
    }
  }, [todayKey]);

  function save(updated) {
    setMeals(updated);
    localStorage.setItem(`meals-${todayKey}`, JSON.stringify(updated));
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!name || !calories || !time) return;
    const newMeal = { name, calories: Number(calories), time };
    const updated = [...meals, newMeal];
    save(updated);
    setName('');
    setCalories('');
    setTime('');
  }

  function handleDelete(index) {
    const updated = meals.filter((_, i) => i !== index);
    save(updated);
  }

  const totalCalories = meals.reduce((sum, m) => sum + Number(m.calories), 0);

  return (
    <div>
      <h1 className="text-xl mb-4">Meals</h1>
      <form onSubmit={handleAdd} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
      </form>
      <h2 className="text-lg font-semibold mb-2">Today's Meals</h2>
      <ul className="space-y-2 mb-4">
        {meals.map((meal, idx) => (
          <li key={idx} className="flex justify-between items-center border p-2 rounded">
            <div>
              <div className="font-medium">{meal.name}</div>
              <div className="text-sm text-gray-600">
                {meal.calories} cal at {new Date(meal.time).toLocaleTimeString()}
              </div>
            </div>
            <button
              onClick={() => handleDelete(idx)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="font-semibold">Total Calories: {totalCalories}</div>
    </div>
  );
}
