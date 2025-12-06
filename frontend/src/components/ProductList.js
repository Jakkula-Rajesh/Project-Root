import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, limit: 8 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [search, category, page]);

  function fetchProducts() {
    setLoading(true);
    setError(null);
    api.get('/products', { params: { search, category, page, limit: meta.limit } })
      .then(res => {
        setProducts(res.data.products || []);
        setMeta(res.data.meta || { total: 0, limit: meta.limit });
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load products');
      })
      .finally(() => setLoading(false));
  }

  const totalPages = Math.max(1, Math.ceil((meta.total || 0) / (meta.limit || 8)));

  return (
    <div>
      <div className="filters" role="search" aria-label="product filters">
        <input
          aria-label="Search products"
          placeholder="Search products by name"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select
          aria-label="Filter by category"
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
        >
          <option value="">All categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Furniture">Furniture</option>
          <option value="Home Decor">Home Decor</option>
        </select>
      </div>

      {loading && <div className="info">Loading products...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && products.length === 0 && <div className="info">No products found.</div>}

      <div className="grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage(s => Math.max(1, s - 1))}
          disabled={page <= 1}
          aria-label="Previous page"
        >Prev</button>

        <span>Page {page} / {totalPages}</span>

        <button
          onClick={() => setPage(s => Math.min(totalPages, s + 1))}
          disabled={page >= totalPages}
          aria-label="Next page"
        >Next</button>
      </div>
    </div>
  );
}
