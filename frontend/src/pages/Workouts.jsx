import { useState, useEffect } from 'react';

export default function Workouts() {
  const [type, setType] = useState('cardio');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  const [exerciseForm, setExerciseForm] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
  });
  const [exercises, setExercises] = useState([]);

  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('workouts');
    if (stored) {
      try {
        setWorkouts(JSON.parse(stored));
      } catch {
        // ignore malformed data
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  const addExercise = () => {
    if (!exerciseForm.name) return;
    setExercises((prev) => [...prev, exerciseForm]);
    setExerciseForm({ name: '', sets: '', reps: '', weight: '' });
  };

  const saveWorkout = (e) => {
    e.preventDefault();
    if (!duration) return;
    const workout = {
      id: Date.now(),
      date: new Date().toISOString(),
      type,
      duration: Number(duration),
      notes,
      exercises,
    };
    setWorkouts((prev) => [workout, ...prev]);
    setType('cardio');
    setDuration('');
    setNotes('');
    setExercises([]);
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Workouts</h1>
      <form onSubmit={saveWorkout} className="space-y-4">
        <div>
          <label className="block mb-1">Type</label>
          <select
            className="border rounded w-full p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Duration (minutes)</label>
          <input
            type="number"
            className="border rounded w-full p-2"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Notes</label>
          <textarea
            className="border rounded w-full p-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="border p-2 rounded">
          <h2 className="font-semibold mb-2">Exercises</h2>
          {exercises.map((ex, idx) => (
            <div key={idx} className="text-sm mb-1">
              {ex.name} - {ex.sets} x {ex.reps} @ {ex.weight}
            </div>
          ))}
          <div className="flex space-x-2 mt-2">
            <input
              type="text"
              placeholder="Name"
              className="border rounded p-1 flex-1"
              value={exerciseForm.name}
              onChange={(e) =>
                setExerciseForm({ ...exerciseForm, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Sets"
              className="border rounded p-1 w-16"
              value={exerciseForm.sets}
              onChange={(e) =>
                setExerciseForm({ ...exerciseForm, sets: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Reps"
              className="border rounded p-1 w-16"
              value={exerciseForm.reps}
              onChange={(e) =>
                setExerciseForm({ ...exerciseForm, reps: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Weight"
              className="border rounded p-1 w-20"
              value={exerciseForm.weight}
              onChange={(e) =>
                setExerciseForm({ ...exerciseForm, weight: e.target.value })
              }
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-2 rounded"
              onClick={addExercise}
            >
              Add
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Save Workout
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Recent Workouts</h2>
        {workouts.length === 0 && <p>No workouts logged yet.</p>}
        {workouts.map((w) => (
          <div key={w.id} className="border-b py-2 text-sm">
            <div className="font-medium">
              {new Date(w.date).toLocaleString()} - {w.type} ({w.duration} min)
            </div>
            {w.notes && <div className="italic">{w.notes}</div>}
            {w.exercises.length > 0 && (
              <ul className="list-disc ml-5">
                {w.exercises.map((ex, i) => (
                  <li key={i}>
                    {ex.name} - {ex.sets} x {ex.reps} @ {ex.weight}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

