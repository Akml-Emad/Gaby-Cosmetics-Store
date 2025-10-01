import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import BrandPage from './pages/BrandPage';   // 👈 new import
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import SiteNavbar from './components/SiteNavbar';
import SiteFooter from './components/SiteFooter';
import FloatingCart from './components/FloatingCart'; // ✅ import floating cart

export default function App() {
  return (
    <>
      <SiteNavbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/brand/:brand" element={<BrandPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
      <FloatingCart />
      <SiteFooter />
    </>
  );
}
