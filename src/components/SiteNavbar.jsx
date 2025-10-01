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
        <div className="d-flex">
          <a href="https://www.instagram.com/candy_makeup_store_2011?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="nav-link">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61567518557452" target="_blank" rel="noopener noreferrer" className="nav-link">
            <FontAwesomeIcon icon={faFacebookF} size="lg" />
          </a>
        </div>
        <Link className="navbar-brand fw-bold" to="/">Gaby</Link>
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