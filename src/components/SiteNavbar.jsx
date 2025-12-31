import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import './navbar.css';

export default function SiteNavbar(){
  const { cart } = useCart();
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  function onSearch(e){
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        
        {/* normal logo */}
        {/* <Link className="navbar-brand" to="/">
          <img
            src="../public/gaby logo.png"
            alt="Gaby"
            className="navbar-logo"
          />
        </Link> */}

        {/* chritmas logo */}
        <Link to="/" className="navbar-brand logo-container">
  <div style={{ position: "relative", display: "inline-block", height: "50px" }}>
    <img src="/gaby logo.png" alt="Gaby" style={{ height: "100%" }} />
  </div>
</Link>   
          
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <form className="d-flex ms-auto me-3" onSubmit={onSearch}>
            <input className="form-control me-2" placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} />
            <button className="btn btn-outline-dark">Search</button>
          </form>
          <Link to="/cart" className="btn btn-dark position-relative">
            🛒 Cart
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.reduce((sum, i) => sum + i.qty, 0)}
              </span>
            )}
          </Link>

          
        </div>
      </div>
    </nav>
  );    
}     