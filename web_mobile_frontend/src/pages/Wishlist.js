import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import useApi from '../hooks/useApi';
import ProductCard from '../components/ProductCard';

// PUBLIC_INTERFACE
export default function Wishlist() {
  /** User wishlist with items and quick actions. */
  const { request, loading } = useApi();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await request({ method: 'GET', url: '/wishlist' });
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        // ignore
      }
    };
    run();
  }, [request]);

  const removeItem = async (id) => {
    await request({ method: 'DELETE', url: `/wishlist/${id}` });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <Layout>
      <div className="grid">
        {loading && <div>Loading wishlist…</div>}
        {!loading && items.length === 0 && (
          <div className="card">Your wishlist is empty. Search products and add them here.</div>
        )}
        {items.map((p) => (
          <div key={p.id} className="card">
            <ProductCard
              product={p}
              onView={() => window.location.assign(`/products/${p.id}`)}
            />
            <div style={{ height: 8 }} />
            <button className="btn" onClick={() => removeItem(p.id)}>Remove</button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
