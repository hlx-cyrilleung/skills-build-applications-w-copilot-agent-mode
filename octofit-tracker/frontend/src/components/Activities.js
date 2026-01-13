import React, { useEffect, useState } from 'react';

export default function Activities() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const base = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://127.0.0.1:8000';
    const endpoint = `${base}/api/activities/`;
    console.log('Activities endpoint:', endpoint);

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Activities fetched raw data:', data);
        const list = data && data.results ? data.results : Array.isArray(data) ? data : [];
        setItems(list);
      })
      .catch((err) => console.error('Activities fetch error:', err));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <ul className="list-group">
        {items.map((a, idx) => (
          <li className="list-group-item" key={a.id || idx}>
            {a.type || JSON.stringify(a)} - {a.duration ? `${a.duration} min` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
