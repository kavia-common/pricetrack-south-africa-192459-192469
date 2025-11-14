import React from 'react';
import Layout from '../components/Layout';
import Chart from '../components/Chart';

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Main dashboard with quick stats and price trend chart. */
  const sampleTrend = [
    { label: 'W1', value: 100 },
    { label: 'W2', value: 95 },
    { label: 'W3', value: 110 },
    { label: 'W4', value: 90 },
    { label: 'W5', value: 92 },
  ];

  return (
    <Layout>
      <div className="grid grid-3">
        <div className="card">
          <div style={{ color: '#6B7280', fontSize: 13 }}>Tracked items</div>
          <div style={{ fontWeight: 800, fontSize: 24 }}>12</div>
        </div>
        <div className="card">
          <div style={{ color: '#6B7280', fontSize: 13 }}>Avg. savings</div>
          <div style={{ fontWeight: 800, fontSize: 24 }}>R235</div>
        </div>
        <div className="card">
          <div style={{ color: '#6B7280', fontSize: 13 }}>Price alerts</div>
          <div style={{ fontWeight: 800, fontSize: 24 }}>3</div>
        </div>
      </div>
      <div style={{ height: 16 }} />
      <Chart title="Sample Price Trend" data={sampleTrend} />
    </Layout>
  );
}
