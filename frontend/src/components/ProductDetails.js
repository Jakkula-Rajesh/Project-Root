import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import EnquiryForm from './EnquiryForm';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data.product))
      .catch(err => {
        console.error(err);
        setError('Failed to load product');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="info">Loading product...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="info">Product not found.</div>;

  const img = product.image_url || 'https://via.placeholder.com/800x500?text=No+Image';

  return (
    <div className="detail">
      <img src={img} alt={product.name} />
      <div className="detail-body">
        <h2>{product.name}</h2>
        <p className="price">₹{Number(product.price).toFixed(2)}</p>
        <p>{product.long_desc || product.short_desc}</p>
        <button className="btn" onClick={() => setShowForm(true)} aria-haspopup="dialog">Enquire</button>
      </div>

      {showForm && (
        <EnquiryForm
          productId={product.id}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
