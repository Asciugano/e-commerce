import { Link } from "react-router-dom";
import { User, Package, ShoppingCart } from "lucide-react";

export function Navbar() {
  return (
    <nav className="mx-4 my-4 rounded-xl bg-neutral-900 shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        {/* SINISTRA: Logo */}
        <div>
          <Link
            to="/"
            className="text-xl font-bold tracking-wide text-amber-400 hover:text-amber-300 transition"
          >
            E
          </Link>
        </div>

        {/* DESTRA: Links + Login/Logout */}
        <div className="flex items-center space-x-6">
          {/* Links */}
          <Link
            to="/user"
            className="flex items-center gap-1 hover:text-amber-400 transition"
          >
            <User size={18} />
            <span>Profilo</span>
          </Link>

          <Link
            to="/orders"
            className="flex items-center gap-1 hover:text-amber-400 transition"
          >
            <ShoppingCart size={18} />
            <span>Orders</span>
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-1 hover:text-amber-400 transition"
          >
            <Package size={18} />
            <span>Products</span>
          </Link>

          {/* Login o Logout */}
          {/* {!logged ? ( */}
          {/*   <Link */}
          {/*     to="/auth/login" */}
          {/*     className="flex items-center gap-1 px-4 py-2 text-white rounded-lg bg-amber-400 hover:bg-amber-300 transition" */}
          {/*   > */}
          {/*     <LogIn size={18} /> */}
          {/*     <span>Login</span> */}
          {/*   </Link> */}
          {/* ) : ( */}
          {/*   <button */}
          {/*     onClick={handleLogout} */}
          {/*     className="flex items-center gap-1 px-4 py-2 text-white rounded-lg bg-red-600 hover:bg-red-500 transition" */}
          {/*   > */}
          {/*     <LogOut size={18} /> */}
          {/*     <span>Logout</span> */}
          {/*   </button> */}
          {/* )} */}
        </div>
      </div>
    </nav>
  );
}
