import { Link, NavLink } from "react-router";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Shop
      </NavLink>
      <Link to="/">Home</Link>
      <Link to="products">Products</Link>
      <Link to="/cart">Cart</Link>
      {/* wishlist */}
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle
      </button>
    </nav>
  );
};

export default Navbar;
