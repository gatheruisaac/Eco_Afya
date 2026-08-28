import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await onLogout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo">
          <span className="logo-icon">🌱</span>
          <span>Eco Afya</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end>
            🏠 Home
          </NavLink>

          <NavLink to="/products">
            🥗 Explore
          </NavLink>

          <NavLink to="/favorites">
            ❤️ Favorites
          </NavLink>

          {user && (
            <NavLink to="/food-logs">
              📋 Food Log
            </NavLink>
          )}

          <NavLink to="/about">
            🌍 About
          </NavLink>

          {!user && (
            <>
              <NavLink to="/login">
                Login
              </NavLink>

              <NavLink to="/signup" className="signup-link">
                Get Started
              </NavLink>
            </>
          )}

          {user && (
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;