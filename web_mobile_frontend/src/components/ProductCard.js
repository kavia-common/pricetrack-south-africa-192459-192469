import React from 'react';

// PUBLIC_INTERFACE
export default function ProductCard({ product, onAddToWishlist, onView }) {
  /** Displays product summary with actions. */
  return (
    <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700 }}>{product.name}</div>
        <div style={{ color: '#6B7280', fontSize: 14 }}>{product.retailer} • {product.category}</div>
      </div>
      <div style={{ minWidth: 100, textAlign: 'right' }}>
        <div style={{ fontWeight: 800, color: '#111827' }}>R{product.price?.toFixed(2)}</div>
        <div style={{ fontSize: 12, color: '#6B7280' }}>{product.currency || 'ZAR'}</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {onAddToWishlist && <button className="btn btn-secondary" onClick={() => onAddToWishlist(product)}>Wishlist</button>}
        {onView && <button className="btn btn-primary" onClick={() => onView(product)}>View</button>}
      </div>
    </div>
  );
}
