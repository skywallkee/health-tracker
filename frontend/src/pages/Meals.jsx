import { useState, useEffect } from 'react';

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const data = localStorage.getItem(`meals-${todayKey()}`);
    if (data) setMeals(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(`meals-${todayKey()}`, JSON.stringify(meals));
  }, [meals]);

  const addMeal = e => {
    e.preventDefault();
    if (!name || !calories || !time) return;
    const entry = { id: Date.now(), name, calories: Number(calories), time };
    setMeals([...meals, entry]);
    setName('');
    setCalories('');
    setTime('');
  };

  const deleteMeal = id => {
    setMeals(meals.filter(m => m.id !== id));
  };

  const total = meals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Meals</h1>
      <form onSubmit={addMeal} className="space-y-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={e => setCalories(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="datetime-local"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded w-full">
          Add Meal
        </button>
      </form>

      <div>
        <h2 className="font-medium">Today's Meals</h2>
        <ul className="divide-y">
          {meals.map(m => (
            <li key={m.id} className="py-2 flex justify-between items-center">
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-gray-600">
                  {m.calories} cal at {new Date(m.time).toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={() => deleteMeal(m.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-semibold">Total Calories: {total}</p>
      </div>
    </div>
  );
}
