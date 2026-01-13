import React, { useEffect, useState } from 'react';

export default function Teams() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const base = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://127.0.0.1:8000';
    const endpoint = `${base}/api/teams/`;
    console.log('Teams endpoint:', endpoint);

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Teams fetched raw data:', data);
        const list = data && data.results ? data.results : Array.isArray(data) ? data : [];
        setItems(list);
      })
      .catch((err) => console.error('Teams fetch error:', err));
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      <ul className="list-group">
        {items.map((t, idx) => (
          <li className="list-group-item" key={t.id || idx}>{t.name || JSON.stringify(t)}</li>
        ))}
      </ul>
    </div>
  );
}
