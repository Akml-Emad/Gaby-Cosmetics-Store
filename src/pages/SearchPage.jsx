import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import ProductList from '../components/ProductList';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage(){
  const q = useQuery().get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function load() {
      setLoading(true);
      if (!q) {
        setProducts([]);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${q}%`);
      if (error) {
        console.error(error);
        setProducts([]);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    load();
  }, [q]);

  return (
    <div>
      <h2 className="mb-3">Search results for "{q}"</h2>
      {loading ? <p>Searching...</p> : <ProductList products={products} />}
    </div>
  );
}
