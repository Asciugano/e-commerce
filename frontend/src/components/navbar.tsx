import { Link } from "react-router-dom";
import { User, Package, ShoppingCart, LogIn, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Navbar() {

  const { isLogged, logout } = useAuth();

  return (
    <nav className="mx-4 my-4 rounded-xl bg-neutral-900 shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        {/* SINISTRA: Logo */}
        <div>
          <Link
            to="/"
            className="inline-block text-xl font-bold tracking-wide text-emerald-400 hover:text-emerald-300 hover:-translate-y-1 hover:shadow-lg transition transform duration-200"
          >
            E-COM
          </Link>
        </div>

        {/* DESTRA: Links + Login/Logout */}
        <div className="flex items-center space-x-6">
          {/* Links */}
          <Link
            to="/products"
            className="flex items-center gap-1 hover:text-emerald-400 transition"
          >
            <Package size={18} />
            <span>Products</span>
          </Link>

          <Link
            to="/orders"
            className="flex items-center gap-1 hover:text-emerald-400 transition"
          >
            <ShoppingCart size={18} />
            <span>Orders</span>
          </Link>

          {isLogged && (
            <Link
              to="/user"
              className="flex items-center gap-1 hover:text-emerald-400 transition"
            >
              <User size={18} />
              <span>Profilo</span>
            </Link>
          )}

          {/* Login o Logout */}
          {!isLogged ? (
            <Link
              to="/login"
              className="flex items-center gap-1 px-4 py-2 text-white rounded-lg bg-emerald-400 hover:bg-emerald-300 hover:-translate-y-1 hover:shadow-lg transition transform duration-200"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          ) : (
            <button
              onClick={logout}
              className="flex items-center gap-1 px-4 py-2 text-white rounded-lg bg-red-600 hover:bg-red-500 transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
