import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function FloatingCart() {
  const { cart } = useCart();

  // total items count
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  // Hide button if cart empty
  if (totalQty === 0) return null;

  return (
    <Link
      to="/cart"
      className="btn btn-dark rounded-circle shadow-lg d-md-none position-fixed"
      style={{
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <FaShoppingCart size={24} />

      {/* Badge */}
      <span
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style={{ fontSize: "12px" }}
      >
        {totalQty}
      </span>
    </Link>
  );
}
