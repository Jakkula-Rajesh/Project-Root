import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="brand">GVCC Product Showcase</Link>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      <footer className="footer">Made for GVCC Candidate Assignment</footer>
    </div>
  );
}
