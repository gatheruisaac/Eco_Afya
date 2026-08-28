import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-decoration auth-decoration-one">🍓</div>
      <div className="auth-decoration auth-decoration-two">🥭</div>

      <section className="auth-card">
        <div className="auth-icon">🌱</div>

        <p className="eyebrow">GET STARTED</p>

        <h1>Join the Eco Afya community</h1>

        <p className="auth-description">
          Create your account and start making smarter choices for your
          health and the planet.
        </p>

        {error && <p className="error-message">{error}</p>}

        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Your name</label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="email">Email address</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="password">Create password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create My Account →"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Signup;