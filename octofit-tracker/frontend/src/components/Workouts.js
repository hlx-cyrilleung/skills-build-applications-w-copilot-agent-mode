import React, { useEffect, useState } from 'react';

export default function Workouts() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const base = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://127.0.0.1:8000';
    const endpoint = `${base}/api/workouts/`;
    console.log('Workouts endpoint:', endpoint);

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Workouts fetched raw data:', data);
        const list = data && data.results ? data.results : Array.isArray(data) ? data : [];
        setItems(list);
      })
      .catch((err) => console.error('Workouts fetch error:', err));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <ul className="list-group">
        {items.map((w, idx) => (
          <li className="list-group-item" key={w.id || idx}>{w.name || JSON.stringify(w)}</li>
        ))}
      </ul>
    </div>
  );
}
