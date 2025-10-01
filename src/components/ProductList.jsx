import { useCart } from '../context/CartContext';
import './body.css';

export default function ProductList({ products = [] }){
  const { addToCart } = useCart();

  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="row">
      {products.map(p => (
        <div key={p.id} className="col-6 col-md-4 mb-3">
          <div className="card h-100 shadow border-0">
            <div style={{height: 290, overflow: 'hidden'}}>
              <img src={p.image_url} alt={p.name} className="card-img-center product-image"
                // style={{objectFit:'cover' , width: '100%', height: '100%'}} 
              />
            </div>
            <div className="card-body d-flex flex-column">
              <h6 className="card-title mb-1">{p.name}</h6>
              <p className="card-text text-muted mb-2">EGP {Number(p.price).toFixed(2)}</p>
              <button className="btn btn-dark mt-auto" onClick={()=>addToCart(p)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
