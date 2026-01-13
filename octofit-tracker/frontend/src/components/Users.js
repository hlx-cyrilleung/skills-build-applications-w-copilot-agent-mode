import React, { useEffect, useState } from 'react';

export default function Users() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const base = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://127.0.0.1:8000';
    const endpoint = `${base}/api/users/`;
    console.log('Users endpoint:', endpoint);

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Users fetched raw data:', data);
        const list = data && data.results ? data.results : Array.isArray(data) ? data : [];
        setItems(list);
      })
      .catch((err) => console.error('Users fetch error:', err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul className="list-group">
        {items.map((u, idx) => (
          <li className="list-group-item" key={u.id || idx}>{u.name || u.email || JSON.stringify(u)}</li>
        ))}
      </ul>
    </div>
  );
}
