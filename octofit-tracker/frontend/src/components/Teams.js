import React, { useEffect, useState } from 'react';

export default function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespace ? `https://${codespace}-8000.app.github.dev/api/teams/` : 'http://127.0.0.1:8000/api/teams/';
    console.log('Teams endpoint:', endpoint);

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Teams fetched raw data:', data);
        const list = data && data.results ? data.results : Array.isArray(data) ? data : [];
        setItems(list);
      })
      .catch((err) => console.error('Teams fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card card-table">
      <div className="card-body">
        <h3 className="card-title">Teams</h3>
        {loading ? (
          <div className="loading">Loading teams…</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-fixed">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {items.map((t, idx) => (
                  <tr key={t.id || idx}>
                    <td>{t.id || idx + 1}</td>
                    <td>{t.name || JSON.stringify(t)}</td>
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
