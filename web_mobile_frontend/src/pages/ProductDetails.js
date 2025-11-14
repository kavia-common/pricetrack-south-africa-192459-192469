import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import useApi from '../hooks/useApi';
import Chart from '../components/Chart';

// PUBLIC_INTERFACE
export default function ProductDetails() {
  /** Product details and price history. */
  const { id } = useParams();
  const { request, loading } = useApi();
  const [product, setProduct] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const run = async () => {
      const p = await request({ method: 'GET', url: `/products/${id}` });
      setProduct(p);
      const h = await request({ method: 'GET', url: `/products/${id}/history` });
      setHistory(Array.isArray(h) ? h : []);
    };
    run();
  }, [id, request]);

  return (
    <Layout>
      {!product && loading && <div>Loading…</div>}
      {product && (
        <div className="grid">
          <div className="card">
            <div style={{ fontSize: 22, fontWeight: 800 }}>{product.name}</div>
            <div style={{ color: '#6B7280' }}>{product.retailer} • {product.category}</div>
            <div style={{ height: 8 }} />
            <div style={{ fontWeight: 800, fontSize: 20 }}>R{product.price?.toFixed(2)}</div>
          </div>
          <Chart title="Price History" data={history.map((v, i) => ({ label: i, value: v.price }))} />
        </div>
      )}
    </Layout>
  );
}
