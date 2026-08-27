cat > src/pages/FoodLogs.jsx <<'EOF'
import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:5000";

function FoodLogs() {
  const [foodLogs, setFoodLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    product_name: "",
    barcode: "",
    notes: "",
    rating: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchFoodLogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/food-logs?page=1&per_page=10`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please log in to view your food logs.");
        }

        throw new Error("Failed to load food logs.");
      }

      const data = await response.json();

      setFoodLogs(data.food_logs || []);
    } catch (err) {
      console.error("Food logs error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodLogs();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      product_name: "",
      barcode: "",
      notes: "",
      rating: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");

      const payload = {
        product_name: form.product_name,
        barcode: form.barcode,
        notes: form.notes,
        rating: form.rating ? Number(form.rating) : null,
      };

      const url = editingId
        ? `${API_URL}/food-logs/${editingId}`
        : `${API_URL}/food-logs`;

      const method = editingId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to save food log.");
      }

      if (editingId) {
        setFoodLogs((currentLogs) =>
          currentLogs.map((log) =>
            log.id === editingId ? data.food_log : log
          )
        );
      } else {
        setFoodLogs((currentLogs) => [
          data.food_log,
          ...currentLogs,
        ]);
      }

      resetForm();
    } catch (err) {
      console.error("Save food log error:", err);
      setError(err.message);
    }
  };

  const handleEdit = (log) => {
    setEditingId(log.id);

    setForm({
      product_name: log.product_name || "",
      barcode: log.barcode || "",
      notes: log.notes || "",
      rating: log.rating || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this food log?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${API_URL}/food-logs/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to delete food log.");
      }

      setFoodLogs((currentLogs) =>
        currentLogs.filter((log) => log.id !== id)
      );
    } catch (err) {
      console.error("Delete food log error:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <main className="products-page">
        <section className="products-header">
          <p className="eyebrow">MY FOOD LOGS</p>
          <h1>Your Food Logs 📋</h1>
          <p>Loading your food logs...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="products-page">
      <section className="products-header">
        <p className="eyebrow">MY FOOD LOGS</p>

        <h1>
          {editingId ? "Edit Food Log ✏️" : "Track Your Food 🌱"}
        </h1>

        <p>
          Record foods you have reviewed, add your notes, and keep
          track of your personal ratings.
        </p>
      </section>

      {error && (
        <section className="products-header">
          <p>{error}</p>
        </section>
      )}

      <section className="details-card">
        <div className="details-content">
          <h2>
            {editingId ? "Update Food Log" : "Add Food Log"}
          </h2>

          <form onSubmit={handleSubmit}>
            <p>
              <label htmlFor="product_name">
                Product Name
              </label>
              <input
                id="product_name"
                name="product_name"
                type="text"
                value={form.product_name}
                onChange={handleChange}
                placeholder="e.g. Pain De Mie Bio"
                required
              />
            </p>

            <p>
              <label htmlFor="barcode">
                Barcode
              </label>
              <input
                id="barcode"
                name="barcode"
                type="text"
                value={form.barcode}
                onChange={handleChange}
                placeholder="Product barcode"
              />
            </p>

            <p>
              <label htmlFor="rating">
                Rating
              </label>
              <select
                id="rating"
                name="rating"
                value={form.rating}
                onChange={handleChange}
              >
                <option value="">Select rating</option>
                <option value="1">1 / 5</option>
                <option value="2">2 / 5</option>
                <option value="3">3 / 5</option>
                <option value="4">4 / 5</option>
                <option value="5">5 / 5</option>
              </select>
            </p>

            <p>
              <label htmlFor="notes">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Add your thoughts about this product..."
                rows="4"
              />
            </p>

            <button type="submit">
              {editingId ? "Update Food Log" : "Add Food Log"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>
      </section>

      <section className="products-header">
        <h2>Saved Food Logs</h2>
      </section>

      {foodLogs.length === 0 ? (
        <section className="products-header">
          <p>You don't have any food logs yet.</p>
        </section>
      ) : (
        <section className="products-grid">
          {foodLogs.map((log) => (
            <article
              className="product-card"
              key={log.id}
            >
              <div className="product-info">
                <p className="eyebrow">FOOD LOG</p>

                <h2>{log.product_name}</h2>

                <p>
                  <strong>Rating:</strong>{" "}
                  {log.rating
                    ? `${log.rating}/5`
                    : "Not rated"}
                </p>

                <p>
                  <strong>Barcode:</strong>{" "}
                  {log.barcode || "Not available"}
                </p>

                <p>
                  <strong>Notes:</strong>{" "}
                  {log.notes || "No notes added"}
                </p>

                <div className="product-actions">
                  <button
                    type="button"
                    onClick={() => handleEdit(log)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(log.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default FoodLogs;
EOF