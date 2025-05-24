import { useState, useEffect } from 'react';

export default function Fasting() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const storedStart = localStorage.getItem('fastStart');
    const storedEnd = localStorage.getItem('fastEnd');
    if (storedStart) setStart(new Date(storedStart));
    if (storedEnd) setEnd(new Date(storedEnd));
  }, []);

  useEffect(() => {
    let timer;
    if (start && (!end || end < start)) {
      timer = setInterval(() => {
        setElapsed(Date.now() - start.getTime());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [start, end]);

  function startFast() {
    const now = new Date();
    localStorage.setItem('fastStart', now.toISOString());
    localStorage.removeItem('fastEnd');
    setStart(now);
    setEnd(null);
  }

  function stopFast() {
    const now = new Date();
    localStorage.setItem('fastEnd', now.toISOString());
    setEnd(now);
  }

  const isActive = start && (!end || end < start);

  let content;
  if (isActive) {
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    content = (
      <div className="space-y-2">
        <p>Fasting since {start.toLocaleString()}</p>
        <p>
          Elapsed: {hours}h {minutes}m {seconds}s
        </p>
        <button onClick={stopFast} className="bg-red-600 text-white px-4 py-2 rounded">
          Stop Fast
        </button>
      </div>
    );
  } else if (start && end) {
    const duration = end - start;
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    content = (
      <div className="space-y-2">
        <p>Last fast started at {start.toLocaleString()}</p>
        <p>Ended at {end.toLocaleString()}</p>
        <p>
          Duration: {hours}h {minutes}m
        </p>
        <button onClick={startFast} className="bg-blue-600 text-white px-4 py-2 rounded">
          Start New Fast
        </button>
      </div>
    );
  } else {
    content = (
      <button onClick={startFast} className="bg-blue-600 text-white px-4 py-2 rounded">
        Start Fast
      </button>
    );
  }

  return (
    <div>
      <h1 className="text-xl mb-4">Fasting</h1>
      {content}
    </div>
  );
}
