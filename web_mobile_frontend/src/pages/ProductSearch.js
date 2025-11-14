import React, { useState } from 'react';
import Layout from '../components/Layout';
import useApi from '../hooks/useApi';
import ProductCard from '../components/ProductCard';

// PUBLIC_INTERFACE
export default function ProductSearch() {
  /** Search products across retailers and add to wishlist. */
  const { request, loading } = useApi();
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);

  const onSearch = async (e) => {
    e.preventDefault();
    const data = await request({ method: 'GET', url: `/products/search?q=${encodeURIComponent(q)}` });
    setResults(Array.isArray(data) ? data : []);
  };

  const addToWishlist = async (product) => {
    await request({ method: 'POST', url: '/wishlist', data: { productId: product.id } });
    alert('Added to wishlist');
  };

  return (
    <Layout>
      <form onSubmit={onSearch} className="card" style={{ display: 'flex', gap: 8 }}>
        <input
          className="input"
          placeholder="Search products (e.g., TV, Coffee, Laptop)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>
      <div style={{ height: 12 }} />
      <div className="grid">
        {results.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToWishlist={addToWishlist}
            onView={() => window.location.assign(`/products/${p.id}`)}
          />
        ))}
      </div>
    </Layout>
  );
}
