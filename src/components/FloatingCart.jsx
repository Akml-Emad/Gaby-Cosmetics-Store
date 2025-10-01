import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function FloatingCart() {
  return (
    <Link
      to="/cart"
      className="btn btn-dark rounded-circle shadow-lg"
      style={{
        position: "fixed",
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
    </Link>
  );
}
