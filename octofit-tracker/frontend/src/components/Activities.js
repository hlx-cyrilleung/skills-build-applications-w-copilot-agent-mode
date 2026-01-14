import React, { useEffect, useState } from 'react';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespace ? `https://${codespace}-8000.app.github.dev/api/activities/` : 'http://127.0.0.1:8000/api/activities/';
    console.log('Activities endpoint:', endpoint);

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Activities fetched raw data:', data);
        const list = data && data.results ? data.results : Array.isArray(data) ? data : [];
        setItems(list);
      })
      .catch((err) => console.error('Activities fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card card-table">
      <div className="card-body">
        <h3 className="card-title">Activities</h3>
        {loading ? (
          <div className="loading">Loading activities…</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-fixed">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {items.map((a, idx) => (
                  <tr key={a.id || idx}>
                    <td>{a.id || idx + 1}</td>
                    <td>{a.type || a.activity_type || ''}</td>
                    <td>{a.duration ? `${a.duration} min` : ''}</td>
                    <td>{a.date || a.created || ''}</td>
                    <td>{a.user ? (a.user.name || a.user.email || JSON.stringify(a.user)) : (a.user_id || '')}</td>
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
