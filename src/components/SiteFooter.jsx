import React from "react";
import "./body.css";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";

export default function SiteFooter() {
  return (
    <>
      {/* Feature Bar */}
      <div className="bg-light py-4 border-top border-bottom">
        <div className="container">
          <div className="row text-center">
            
            {/* Shipping */}
            <div className="col-12 col-md-3 mb-3 mb-md-0">
              <i className="bi bi-truck mb-2" style={{ fontSize: "2rem", color: "#444" }}></i>
              <h6 className="fw-bold mt-2">SHIPPING</h6>
              <p className="text-muted small mb-0">Fayoum only</p>
            </div>

            {/* WhatsApp Chat */}
            <div className="col-12 col-md-3 mb-3 mb-md-0">
              <i className="bi bi-whatsapp mb-2" style={{ fontSize: "2rem", color: "#25D366" }}></i>
              <h6 className="fw-bold mt-2">WHATSAPP CHAT</h6>
              <p className="text-muted small mb-0">
                <a href="https://wa.me/201015662233" className="text-decoration-none text-dark">
                  +201015662233
                </a>
              </p>
            </div>

            {/* Call Us */}
            <div className="col-12 col-md-3 mb-3 mb-md-0">
              <i className="bi bi-telephone mb-2" style={{ fontSize: "2rem", color: "#444" }}></i>
              <h6 className="fw-bold mt-2">CALL US</h6>
              <p className="text-muted small mb-0">
                <a href="tel:+201015662233" className="text-decoration-none text-dark">
                  +201015662233
                </a>
              </p>
            </div>

            {/* Original Products */}
            <div className="col-12 col-md-3">
              <i className="bi bi-shield-check mb-2" style={{ fontSize: "2rem", color: "#444" }}></i>
              <h6 className="fw-bold mt-2">100% ORIGINAL PRODUCTS</h6>
              <p className="text-muted small mb-0">Authenticity Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-white text-center py-4 mt-4 shadow-sm">

        {/* <div className="d-flex">
          <a href="https://www.instagram.com/candy_makeup_store_2011?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="nav-link">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61567518557452" target="_blank" rel="noopener noreferrer" className="nav-link">
            <FontAwesomeIcon icon={faFacebookF} size="lg" />
          </a>
        </div> */}

        <div className="fw-bold">Follow Us<a href="https://www.facebook.com/profile.php?id=61567518557452" target="_blank" rel="noopener noreferrer" className="nav-link">
            <FontAwesomeIcon icon={faFacebookF} size="lg" />
          </a>
          </div>
        <div className="container">
          </div>
          {/* <div className="fw-bold mb-2">Gaby Cosmetics Store</div> */}
          <small className="text-muted margin-top: 20px;">
            &copy; {new Date().getFullYear()} Gaby Cosmetics Store. All rights reserved.
          </small>
      </footer>
    </>
  );
}
