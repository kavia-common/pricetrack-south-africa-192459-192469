import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function Settings() {
  /** User settings page for profile and preferences. */
  const { user } = useContext(AuthContext);
  const [currency, setCurrency] = useState('ZAR');
  const [alerts, setAlerts] = useState(true);

  return (
    <Layout>
      <div className="grid">
        <div className="card">
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Profile</div>
          <div>Name: {user?.name || '-'}</div>
          <div>Email: {user?.email || '-'}</div>
        </div>
        <div className="card">
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Preferences</div>
          <div>
            <label>Currency</label>
            <select className="select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option>ZAR</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
          <div style={{ height: 10 }} />
          <div>
            <label>
              <input type="checkbox" checked={alerts} onChange={(e) => setAlerts(e.target.checked)} />
              {' '}Enable price alerts
            </label>
          </div>
        </div>
      </div>
    </Layout>
  );
}
