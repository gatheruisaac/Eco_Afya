import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

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

  useEffect(() => {
    fetchFoodLogs();
  }, []);

  async function fetchFoodLogs() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/food-logs?page=1&per_page=10`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to load food logs.");
      }

      setFoodLogs(data.food_logs || []);
    } catch (err) {
      console.error("Food logs error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm({
      product_name: "",
      barcode: "",
      notes: "",
      rating: "",
    });

    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");

      const payload = {
        product_name: form.product_name.trim(),
        barcode: form.barcode.trim(),
        notes: form.notes.trim(),
        rating: form.rating ? Number(form.rating) : null,
      };

      const response = await fetch(
        editingId
          ? `${API_URL}/food-logs/${editingId}`
          : `${API_URL}/food-logs`,
        {
          method: editingId ? "PATCH" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

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
  }

  function handleEdit(log) {
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
  }

  async function handleDelete(id) {
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
  }

  if (loading) {
    return (
      <main className="loading-page">
        <p>Loading your food logs...</p>
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
          Record foods you have reviewed and keep track of
          your personal ratings and notes.
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
            <div>
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
            </div>

            <div>
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
            </div>

            <div>
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
            </div>

            <div>
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
            </div>

            <div className="product-actions">
              <button type="submit">
                {editingId ? "Update Food Log" : "Add Food Log"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
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

                <p>
                  <strong>Logged:</strong>{" "}
                  {new Date(
                    log.created_at
                  ).toLocaleDateString()}
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