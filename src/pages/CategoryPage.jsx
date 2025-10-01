import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import ProductList from '../components/ProductList';
import "./images.css";

export default function CategoryPage(){
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .eq('found', true);
      if (error) {
        console.error(error);
        setProducts([]);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    load();
  }, [category]);

  return (
    <div>
      <h2 className="mb-3">{category}</h2>
      {loading ? <p>Loading products...</p> : <ProductList products={products} />}
    </div>
  );
}
