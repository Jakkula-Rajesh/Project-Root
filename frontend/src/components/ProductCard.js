import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const img = product.image_url || 'https://via.placeholder.com/600x400?text=No+Image';
  return (
    <article className="card" aria-labelledby={`p-${product.id}`}>
      <img src={img} alt={product.name} />
      <div className="card-body">
        <h3 id={`p-${product.id}`}>{product.name}</h3>
        <p className="short">{product.short_desc}</p>
        <div className="card-footer">
          <strong>₹{Number(product.price).toFixed(2)}</strong>
          <Link to={`/products/${product.id}`} className="btn" aria-label={`View ${product.name}`}>View</Link>
        </div>
      </div>
    </article>
  );
}
