import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function FoodLogs({ user }) {
  const [foodLogs, setFoodLogs] = useState([]);
  const [productName, setProductName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [rating, setRating] = useState("5");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadFoodLogs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/food-logs?page=1&per_page=50`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to load food logs");
      }

      setFoodLogs(data.food_logs || data.logs || []);
    } catch (err) {
      console.error("Food logs error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadFoodLogs();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/food-logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          product_name: productName,
          barcode,
          rating: Number(rating),
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to save food log");
      }

      setProductName("");
      setBarcode("");
      setRating("5");
      setNotes("");

      await loadFoodLogs();
    } catch (err) {
      console.error("Save food log error:", err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this food log?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/food-logs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Unable to delete food log");
      }

      setFoodLogs((currentLogs) =>
        currentLogs.filter((log) => log.id !== id)
      );
    } catch (err) {
      console.error("Delete food log error:", err);
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <p className="eyebrow">PERSONAL FOOD TRACKER</p>

          <h1>Authentication required</h1>

          <p className="auth-description">
            Please sign in to manage your personal food logs.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="food-logs-page">
      <section className="food-logs-header">
        <p className="eyebrow">YOUR FOOD JOURNEY</p>

        <h1>Track Your Food 🌱</h1>

        <p>
          Record foods you have reviewed and keep track of your personal
          ratings and notes.
        </p>
      </section>

      {error && <p className="error-message">{error}</p>}

      <section className="food-log-form-card">
        <h2>Add Food Log</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="product-name">Product Name</label>

          <input
            id="product-name"
            type="text"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            placeholder="e.g. Organic Oats"
            required
          />

          <label htmlFor="barcode">Barcode</label>

          <input
            id="barcode"
            type="text"
            value={barcode}
            onChange={(event) => setBarcode(event.target.value)}
            placeholder="Product barcode"
          />

          <label htmlFor="rating">Rating</label>

          <select
            id="rating"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          >
            <option value="1">1 / 5</option>
            <option value="2">2 / 5</option>
            <option value="3">3 / 5</option>
            <option value="4">4 / 5</option>
            <option value="5">5 / 5</option>
          </select>

          <label htmlFor="notes">Notes</label>

          <textarea
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="What did you think about this product?"
            rows="4"
          />

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add Food Log"}
          </button>
        </form>
      </section>

      <section className="saved-food-logs">
        <div className="section-heading">
          <h2>Saved Food Logs</h2>

          <button
            type="button"
            onClick={loadFoodLogs}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <p>Loading your food logs...</p>
        ) : foodLogs.length === 0 ? (
          <p>You don't have any food logs yet.</p>
        ) : (
          <div className="food-log-list">
            {foodLogs.map((log) => (
              <article className="food-log-card" key={log.id}>
                <div>
                  <h3>{log.product_name}</h3>

                  {log.barcode && (
                    <p>
                      <strong>Barcode:</strong> {log.barcode}
                    </p>
                  )}

                  <p>
                    <strong>Rating:</strong> {log.rating} / 5
                  </p>

                  {log.notes && (
                    <p>
                      <strong>Notes:</strong> {log.notes}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(log.id)}
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default FoodLogs;