// src/pages/BrandPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import ProductList from "../components/ProductList";
import "./images.css";

export default function BrandPage() {
  const { brand } = useParams(); // get brand name from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("brand", brand)     // 👈 filter by brand
        .eq("found", true);     // 👈 only available products

      if (error) {
        console.error(error);
        setProducts([]);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    load();
  }, [brand]);

  return (
    <div>
      <h2 className="mb-3">{brand}</h2>
      {loading ? <p>Loading products...</p> : <ProductList products={products} />}
    </div>
  );
}
