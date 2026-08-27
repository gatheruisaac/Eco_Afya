import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FoodLogs from "./pages/FoodLogs";

const API_URL = import.meta.env.VITE_API_URL;

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`${API_URL}/check-session`, {
          credentials: "include",
        });

        const data = await response.json();

        if (data.authenticated) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Session check error:", error);
        setUser(null);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    setUser(null);
  };

  if (checkingSession) {
    return (
      <main className="loading-page">
        <p>Checking your session...</p>
      </main>
    );
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route
            path="/products/:barcode"
            element={<ProductDetails />}
          />

          <Route path="/favorites" element={<Favorites />} />

          <Route path="/about" element={<About />} />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/food-logs" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/food-logs" replace />
              ) : (
                <Signup />
              )
            }
          />

          <Route
            path="/food-logs"
            element={
              <ProtectedRoute user={user}>
                <FoodLogs user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;