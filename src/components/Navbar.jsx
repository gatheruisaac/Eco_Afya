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
          🌱 Eco Afya
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/products">
            Products
          </NavLink>

          <NavLink to="/favorites">
            Favorites
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>

          {user && (
            <NavLink to="/food-logs">
              My Food Logs
            </NavLink>
          )}

          {!user && (
            <>
              <NavLink to="/login">
                Login
              </NavLink>

              <NavLink to="/signup">
                Sign Up
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