import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { GiRamProfile } from "react-icons/gi";
import { IoCartOutline } from "react-icons/io5";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";
import { useMenuSelectionStore } from "../store/useMenuSelectionStore";

const Navbar = () => {
  const { authUser, userLogout } = useAuthStore();
  const {cartItems, clearCart} = useMenuSelectionStore();
  const [open, setOpen] = useState(false)

  let cartCount = cartItems?.items?.length || 0;  

  const handleLogout = async() => {
    await clearCart();
    await userLogout();
  }

  return (
    <nav className="navbar bg-base-100 shadow-md px-4 md:px-6">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          Patel Foods
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center">
        {!authUser.isVerify && <Link to='myorder' className="btn btn-ghost">My Orders</Link>}
        
        {/* Cart */}
        <div className="dropdown dropdown-end">
          <Link to='/cart' className="btn btn-ghost btn-circle">
            <div className="indicator">
              <IoCartOutline className="h-5 w-5" />
              <span className="badge badge-sm indicator-item">{cartCount}</span>
            </div>
          </Link>
        </div>

        {/* Profile Dropdown */}
        {authUser ? (
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-base-300">
                <GiRamProfile className="w-full h-full p-[5px]" />
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to='/profile' className="justify-between">
                  Profile <span className="badge">New</span>
                </Link>
              </li>
              {authUser?.isVerify && <li><Link  to='/dashboard'>Dashboard</Link></li>}
              <li><Link to='/settings'>Settings</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-ghost">Login</Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden btn btn-ghost btn-circle" 
        onClick={() => setOpen(!open)}
      >
        {open ? <IoClose size={24} /> : <IoMenu size={24} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-base-100 shadow-md flex flex-col items-center p-5 z-10">
          {!authUser?.isVerify && <Link to='/myorder' className="btn btn-ghost w-full text-center">My Orders</Link>}
          <Link to='/cart' className="btn btn-primary w-full text-center">View Cart</Link>

          {/* Profile Dropdown for Mobile */}
          {authUser ? (
            <div className="mt-3 w-full flex flex-col items-center">
              <div className="flex items-center gap-2">
                <GiRamProfile className="h-8 w-8 bg-base-300 p-1 rounded-full" />
                <span className="font-bold">{authUser?.name || "User"}</span>
              </div>
              <ul className="menu bg-base-200 rounded-box w-full mt-2">
                <li><Link>Profile</Link></li>
                {authUser?.isVerify && <li><Link to='/dashboard'>Dashboard</Link></li>}
                <li><Link to='/settings'>Settings</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-ghost w-full text-center mt-3">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
