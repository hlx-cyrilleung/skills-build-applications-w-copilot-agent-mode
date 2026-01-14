import React, { useEffect, useState } from 'react';

export default function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
      .catch((err) => console.error('Users fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card card-table">
      <div className="card-body">
        <h3 className="card-title">Users</h3>
        {loading ? (
          <div className="loading">Loading users…</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-fixed">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {items.map((u, idx) => (
                  <tr key={u.id || idx}>
                    <td>{u.id || idx + 1}</td>
                    <td>{u.name || ''}</td>
                    <td>{u.email || ''}</td>
                    <td>{u.team ? (u.team.name || JSON.stringify(u.team)) : (u.team_id || '')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
