import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespace ? `https://${codespace}-8000.app.github.dev/api/leaderboard/` : 'http://127.0.0.1:8000/api/leaderboard/';
    console.log('Leaderboard endpoint:', endpoint);

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Leaderboard fetched raw data:', data);
        const list = data && data.results ? data.results : Array.isArray(data) ? data : [];
        setItems(list);
      })
      .catch((err) => console.error('Leaderboard fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card card-table">
      <div className="card-body">
        <h3 className="card-title">Leaderboard</h3>
        {loading ? (
          <div className="loading">Loading leaderboard…</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-fixed">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {items.map((t, idx) => (
                  <tr key={t.id || idx}>
                    <td>{t.id || idx + 1}</td>
                    <td>{t.team ? (t.team.name || JSON.stringify(t.team)) : (t.team_name || '')}</td>
                    <td>{t.points}</td>
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
