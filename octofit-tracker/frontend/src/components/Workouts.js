import React, { useEffect, useState } from 'react';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespace ? `https://${codespace}-8000.app.github.dev/api/workouts/` : 'http://127.0.0.1:8000/api/workouts/';
    console.log('Workouts endpoint:', endpoint);

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Workouts fetched raw data:', data);
        const list = data && data.results ? data.results : Array.isArray(data) ? data : [];
        setItems(list);
      })
      .catch((err) => console.error('Workouts fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card card-table">
      <div className="card-body">
        <h3 className="card-title">Workouts</h3>
        {loading ? (
          <div className="loading">Loading workouts…</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-fixed">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {items.map((w, idx) => (
                  <tr key={w.id || idx}>
                    <td>{w.id || idx + 1}</td>
                    <td>{w.name || ''}</td>
                    <td>{w.description || ''}</td>
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
