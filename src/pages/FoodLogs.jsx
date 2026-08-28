import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function FoodLogs({ user }) {
  const [foodLogs, setFoodLogs] = useState([]);
  const [productName, setProductName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [rating, setRating] = useState("5");
  const [notes, setNotes] = useState("");

  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

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

  useEffect(() => {
    if (!productName.trim() || productName.length < 2) {
      setProducts([]);
      setShowProducts(false);
      return;
    }

    const controller = new AbortController();

    const searchProducts = async () => {
      setProductLoading(true);

      try {
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v2/search?search_terms=${encodeURIComponent(
            productName
          )}&page_size=8&fields=code,product_name,brands,image_front_small_url,nutriscore_grade,ecoscore_grade`,
          {
            signal: controller.signal,
          }
        );

        const data = await response.json();

        const validProducts = (data.products || []).filter(
          (product) => product.product_name && product.code
        );

        setProducts(validProducts);
        setShowProducts(true);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Product search error:", err);
        }
      } finally {
        setProductLoading(false);
      }
    };

    const timer = setTimeout(searchProducts, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [productName]);

  const handleProductSelect = (product) => {
    setProductName(product.product_name || "");
    setBarcode(product.code || "");
    setShowProducts(false);
  };

  const handleProductInputFocus = () => {
    if (products.length > 0) {
      setShowProducts(true);
    }
  };

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
      setProducts([]);
      setShowProducts(false);

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
          <div className="auth-icon">🔐</div>

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
      <section className="food-logs-hero">
        <div>
          <p className="eyebrow">YOUR FOOD JOURNEY 🌱</p>

          <h1>Track Your Food</h1>

          <p>
            Keep a personal record of the foods you discover, rate, and
            review.
          </p>
        </div>

        <div className="food-logs-hero-icon">🥗</div>
      </section>

      {error && <p className="error-message">{error}</p>}

      <section className="food-log-form-card">
        <div className="form-heading">
          <div className="form-heading-icon">✍️</div>

          <div>
            <p className="eyebrow">NEW ENTRY</p>
            <h2>Add Food Log</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field product-selector">
              <label htmlFor="product-name">Product Name</label>

              <input
                id="product-name"
                type="text"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                onFocus={handleProductInputFocus}
                placeholder="Start typing a product..."
                autoComplete="off"
                required
              />

              <p className="form-help">
                Start typing to choose a product automatically.
              </p>

              {showProducts && (
                <div className="product-dropdown">
                  {productLoading ? (
                    <div className="product-dropdown-message">
                      🔎 Searching products...
                    </div>
                  ) : products.length > 0 ? (
                    products.map((product) => (
                      <button
                        type="button"
                        className="product-option"
                        key={product.code}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => handleProductSelect(product)}
                      >
                        {product.image_front_small_url ? (
                          <img
                            src={product.image_front_small_url}
                            alt=""
                            className="product-option-image"
                          />
                        ) : (
                          <div className="product-option-image product-option-placeholder">
                            🥗
                          </div>
                        )}

                        <div className="product-option-info">
                          <strong>{product.product_name}</strong>

                          {product.brands && (
                            <span>{product.brands}</span>
                          )}

                          <small>
                            Barcode: {product.code}
                          </small>
                        </div>
                      </button>
                    ))
                  ) : productName.length >= 2 ? (
                    <div className="product-dropdown-message">
                      No products found. You can enter the product manually.
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="barcode">Barcode</label>

              <input
                id="barcode"
                type="text"
                value={barcode}
                onChange={(event) => setBarcode(event.target.value)}
                placeholder="Product barcode"
              />

              <p className="form-help">
                Automatically filled when you select a product.
              </p>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="rating">Your Rating</label>

            <select
              id="rating"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            >
              <option value="1">⭐ 1 / 5</option>
              <option value="2">⭐⭐ 2 / 5</option>
              <option value="3">⭐⭐⭐ 3 / 5</option>
              <option value="4">⭐⭐⭐⭐ 4 / 5</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 / 5</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="notes">Notes</label>

            <textarea
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="What did you think about this product?"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="food-log-submit"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Food Log →"}
          </button>
        </form>
      </section>

      <section className="saved-food-logs">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR COLLECTION</p>
            <h2>Saved Food Logs</h2>
          </div>

          <button
            type="button"
            onClick={loadFoodLogs}
            disabled={loading}
            className="refresh-button"
          >
            {loading ? "Loading..." : "↻ Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="empty-food-logs">
            <span>🥕</span>
            <p>Loading your food logs...</p>
          </div>
        ) : foodLogs.length === 0 ? (
          <div className="empty-food-logs">
            <span>🍎</span>

            <h3>Your food journey starts here.</h3>

            <p>
              Add your first food log above to start building your personal
              collection.
            </p>
          </div>
        ) : (
          <div className="food-log-list">
            {foodLogs.map((log) => (
              <article className="food-log-card" key={log.id}>
                <div className="food-log-icon">
                  {log.rating >= 4
                    ? "🥑"
                    : log.rating >= 3
                    ? "🍎"
                    : "🥕"}
                </div>

                <div className="food-log-content">
                  <h3>{log.product_name}</h3>

                  {log.barcode && (
                    <p className="food-log-barcode">
                      Barcode: {log.barcode}
                    </p>
                  )}

                  <p className="food-log-rating">
                    {"⭐".repeat(
                      Math.max(0, Math.min(5, log.rating || 0))
                    )}
                    <span>{log.rating} / 5</span>
                  </p>

                  {log.notes && (
                    <p className="food-log-notes">
                      {log.notes}
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