import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await onLogout();
    navigate("/");
  };

  const linkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
      isActive
        ? "bg-[#CCFF00] text-[#0A2E23] font-semibold shadow-md shadow-[#CCFF00]/20 scale-105"
        : "text-emerald-100/80 hover:text-white hover:bg-emerald-900/40"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0A2E23]/85 border-b border-emerald-800/40 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CCFF00] to-emerald-400 flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
            🌱
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-serif">
            Eco <span className="text-[#CCFF00]">Afya</span>
          </span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 bg-emerald-950/60 p-1.5 rounded-full border border-emerald-800/50">
          <NavLink to="/" end className={linkStyle}>
            🏠 Home
          </NavLink>

          <NavLink to="/products" className={linkStyle}>
            🥗 Explore
          </NavLink>

          <NavLink to="/favorites" className={linkStyle}>
            ❤️ Favorites
          </NavLink>

          {user && (
            <NavLink to="/food-logs" className={linkStyle}>
              📋 Food Log
            </NavLink>
          )}

          <NavLink to="/about" className={linkStyle}>
            🌍 About
          </NavLink>
        </nav>

        {/* User Profile / Auth Actions */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="text-sm font-medium text-emerald-100 hover:text-white px-4 py-2 transition-colors"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="bg-[#CCFF00] hover:bg-[#b8e600] text-[#0A2E23] text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-[#CCFF00]/20 hover:scale-105"
              >
                Get Started
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-3 bg-emerald-900/30 p-1.5 pr-4 rounded-full border border-emerald-700/40">
              {/* Human Avatar Image */}
              <img
                src={
                  user.avatar ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                }
                alt="User Profile"
                className="w-8 h-8 rounded-full object-cover border border-[#CCFF00]"
              />
              <span className="text-xs font-medium text-emerald-100 hidden sm:inline">
                {user.name || "Member"}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="ml-2 text-xs text-emerald-300 hover:text-red-400 font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Navbar;