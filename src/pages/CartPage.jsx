import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { supabase } from "../supabaseClient";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  const [phoneError, setPhoneError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountActive, setDiscountActive] = useState(false);



  // Fetch discount from database
  useEffect(() => {
    async function loadDiscount() {
      const { data, error } = await supabase
        .from("discounts")
        .select("*")
        .limit(1)
        .single();

      if (!error && data) {
        if (data.active) {
          setDiscount(data.value || 0);
          setDiscountActive(true);
        }
      } else {
        console.error("Discount fetch error:", error);
      }
    }

    loadDiscount();
  }, []);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = discountActive ? subtotal - (subtotal * discount) / 100 : subtotal;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleCheckout(e) {
    e.preventDefault();

    const digitsOnly = form.phone.replace(/\D/g, "");
    if (digitsOnly.length !== 12) {
      setPhoneError("Phone number must be exactly 11 digits.");
      return;
    }
    setPhoneError("");

    const productsList = cart
      .map(item => `${item.name} (x${item.qty}) - EGP ${(item.price).toFixed(2)}`)
      .join('\n');

    const formData = new FormData();
    formData.append('entry.2085586848', form.name);
    formData.append('entry.998094062', form.address);
    formData.append('entry.1066422412', form.phone);
    formData.append('entry.11534703', productsList);
    formData.append('entry.858511331', total.toFixed(2));

    try {
      await fetch("https://docs.google.com/forms/d/e/1FAIpQLSfNPMVJYuD8FljDKixlXgZvAKjvUasBNkiFe_sUkywEcTSocA/formResponse", {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      clearCart();
      setForm({ name: '', address: '', phone: '' });
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Error submitting order:", err);
    }
  }

  return (
    <div>
      <h2 className="mb-3">Your Cart</h2>

      {/* Discount announcement */}
      {discountActive && (
        <div className="alert alert-success">
          🎉 Discount applied! Prices are {discount}% off. Total after discount: EGP {total.toFixed(2)}
        </div>
      )}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>EGP {Number(item.price).toFixed(2)}</td>
                  <td>EGP {(item.price * item.qty).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <h5>Subtotal: EGP {subtotal.toFixed(2)}</h5> */}
          {discountActive && (
            <h5 className="text-success">Discount: {discount}% off</h5>
          )}
          <h4>Total: EGP {total.toFixed(2)}</h4>

          <h3 className="mt-4">Checkout</h3>
          <form onSubmit={handleCheckout} className="mt-3">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                className="form-control"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone (WhatsApp)</label>
              <PhoneInput
                country={"eg"}
                value={form.phone}
                onChange={(phone) => setForm({ ...form, phone })}
                inputClass={`form-control ${phoneError ? "is-invalid" : ""}`}
                inputStyle={{ width: "100%" }}
                specialLabel=""
              />
              {phoneError && <div className="invalid-feedback d-block">{phoneError}</div>}
            </div>

            <button className="btn btn-dark" type="submit">Place Order</button>
          </form>
        </>
      )}
    </div>
  );
}
