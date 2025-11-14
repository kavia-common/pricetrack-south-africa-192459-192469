import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import useApi from '../hooks/useApi';
import Chart from '../components/Chart';

// PUBLIC_INTERFACE
export default function BlackFridayInsights() {
  /** Analytics view focusing on Black Friday behavior across retailers. */
  const { request } = useApi();
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await request({ method: 'GET', url: '/analytics/black-friday' });
        setInsights(data);
      } catch (e) {
        setInsights({
          avgDiscount: 18,
          categories: ['Electronics', 'Home', 'Grocery'],
          trend: [{ label: '2019', value: 12 }, { label: '2020', value: 16 }, { label: '2021', value: 19 }, { label: '2022', value: 17 }, { label: '2023', value: 20 }],
        });
      }
    };
    run();
  }, [request]);

  return (
    <Layout>
      {!insights ? (
        <div>Loading insights…</div>
      ) : (
        <div className="grid">
          <div className="card">
            <div style={{ color: '#6B7280' }}>Avg. Black Friday Discount</div>
            <div style={{ fontWeight: 800, fontSize: 28 }}>{insights.avgDiscount}%</div>
          </div>
          <Chart title="Discount Trend" data={insights.trend || []} />
        </div>
      )}
    </Layout>
  );
}
