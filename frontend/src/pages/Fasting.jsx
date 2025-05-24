import { useState, useEffect } from 'react';

const presets = [
  { label: '16:8', hours: 16 },
  { label: '18:6', hours: 18 },
  { label: '20:4', hours: 20 },
];

export default function Fasting() {
  const [selected, setSelected] = useState(presets[0].hours);
  const [session, setSession] = useState(null);
  const [lastFast, setLastFast] = useState(null);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('fastingSession');
    if (stored) {
      setSession(JSON.parse(stored));
    }
    const last = localStorage.getItem('lastFast');
    if (last) {
      setLastFast(JSON.parse(last));
    }
  }, []);

  useEffect(() => {
    if (!session) return;
    const id = setInterval(() => forceUpdate(v => v + 1), 1000);
    return () => clearInterval(id);
  }, [session]);

  const startFast = () => {
    const data = { start: Date.now(), hours: selected };
    localStorage.setItem('fastingSession', JSON.stringify(data));
    setSession(data);
  };

  const stopFast = () => {
    const end = Date.now();
    const data = { start: session.start, end, hours: session.hours };
    localStorage.setItem('lastFast', JSON.stringify(data));
    localStorage.removeItem('fastingSession');
    setLastFast(data);
    setSession(null);
  };

  const formatDuration = ms => {
    const total = Math.floor(ms / 1000);
    const hrs = Math.floor(total / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  let content;
  if (session) {
    const elapsed = Date.now() - session.start;
    const remainingMs = session.hours * 3600 * 1000 - elapsed;
    const remaining = remainingMs > 0 ? formatDuration(remainingMs) : '00:00:00';
    content = (
      <div className="space-y-2">
        <p>Fasting for: {formatDuration(elapsed)}</p>
        <p>Time remaining: {remaining}</p>
        <button
          onClick={stopFast}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Stop Fast
        </button>
      </div>
    );
  } else {
    content = (
      <div className="space-y-2">
        <div>
          <label className="mr-2">Preset:</label>
          <select
            value={selected}
            onChange={e => setSelected(Number(e.target.value))}
            className="border p-1 rounded"
          >
            {presets.map(p => (
              <option key={p.hours} value={p.hours}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={startFast}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Start Fast
        </button>
        {lastFast && (
          <div className="text-sm text-gray-700">
            <p>Last fast: {formatDuration(lastFast.end - lastFast.start)}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Fasting</h1>
      {content}
    </div>
  );
}
