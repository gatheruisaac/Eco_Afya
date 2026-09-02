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
      <main className="min-h-screen bg-[#071E17] text-white flex items-center justify-center p-6">
        <section className="bg-[#0A2E23] border border-emerald-800/50 p-8 sm:p-12 rounded-3xl max-w-md w-full text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 bg-emerald-900/60 border border-emerald-700/50 rounded-2xl flex items-center justify-center text-3xl mx-auto">
            🔐
          </div>
          <p className="text-xs font-bold tracking-widest text-[#CCFF00] uppercase">
            PERSONAL FOOD TRACKER
          </p>
          <h1 className="text-2xl font-serif font-bold text-white">
            Authentication Required
          </h1>
          <p className="text-sm text-emerald-200/70">
            Please sign in to manage your personal food logs and keep track of your daily nutrition.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071E17] text-white pb-20 selection:bg-[#CCFF00] selection:text-[#0A2E23]">
      <div className="max-w-7xl mx-auto px-6 pt-10 space-y-10">
        
        {/* HERO SECTION */}
        <section className="relative rounded-3xl bg-gradient-to-r from-[#0A2E23] via-emerald-950 to-[#071E17] p-8 sm:p-12 border border-emerald-800/50 shadow-2xl flex items-center justify-between overflow-hidden">
          <div className="space-y-3 max-w-xl z-10">
            <p className="text-xs font-bold tracking-widest text-[#CCFF00] uppercase">
              YOUR FOOD JOURNEY 🌱
            </p>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Track Your Food
            </h1>
            <p className="text-emerald-100/80 text-base">
              Keep a personal record of the foods you discover, rate, and review.
            </p>
          </div>
          <div className="hidden md:flex w-24 h-24 rounded-3xl bg-[#CCFF00]/10 border border-[#CCFF00]/30 items-center justify-center text-5xl shadow-lg">
            🥗
          </div>
        </section>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-2xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* ADD FOOD LOG FORM */}
        <section className="bg-[#0A2E23] border border-emerald-800/50 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="flex items-center gap-4 border-b border-emerald-800/40 pb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#CCFF00] text-[#0A2E23] font-bold flex items-center justify-center text-xl shadow-md">
              ✍️
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-[#CCFF00] uppercase">
                NEW ENTRY
              </p>
              <h2 className="text-2xl font-serif font-bold text-white">
                Add Food Log
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Product Selector with Dropdown */}
              <div className="relative space-y-2">
                <label htmlFor="product-name" className="block text-xs font-bold uppercase tracking-wider text-emerald-200">
                  Product Name *
                </label>
                <input
                  id="product-name"
                  type="text"
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                  onFocus={handleProductInputFocus}
                  placeholder="Start typing a product..."
                  autoComplete="off"
                  required
                  className="w-full bg-[#071E17] border border-emerald-700/50 rounded-2xl px-4 py-3 text-white placeholder-emerald-600 focus:outline-none focus:border-[#CCFF00] transition-colors text-sm"
                />
                <p className="text-[11px] text-emerald-300/60">
                  Start typing to choose a product automatically.
                </p>

                {/* Autocomplete Dropdown */}
                {showProducts && (
                  <div className="absolute top-full left-0 right-0 z-30 mt-2 bg-[#071E17] border border-emerald-700/60 rounded-2xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto">
                    {productLoading ? (
                      <div className="p-4 text-xs text-emerald-300/80 flex items-center gap-2">
                        <span>🔎</span> Searching products...
                      </div>
                    ) : products.length > 0 ? (
                      products.map((product) => (
                        <button
                          type="button"
                          key={product.code}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => handleProductSelect(product)}
                          className="w-full text-left p-3 border-b border-emerald-900/50 hover:bg-emerald-900/40 transition-colors flex items-center gap-3"
                        >
                          {product.image_front_small_url ? (
                            <img
                              src={product.image_front_small_url}
                              alt=""
                              className="w-10 h-10 object-contain rounded-lg bg-emerald-950 p-1"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-emerald-950 flex items-center justify-center text-lg">
                              🥗
                            </div>
                          )}
                          <div className="overflow-hidden">
                            <strong className="block text-xs text-white truncate">
                              {product.product_name}
                            </strong>
                            {product.brands && (
                              <span className="block text-[10px] text-emerald-300/70 truncate">
                                {product.brands}
                              </span>
                            )}
                            <small className="text-[10px] text-emerald-500">
                              Barcode: {product.code}
                            </small>
                          </div>
                        </button>
                      ))
                    ) : productName.length >= 2 ? (
                      <div className="p-4 text-xs text-emerald-300/80">
                        No products found. You can enter the product manually.
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Barcode Field */}
              <div className="space-y-2">
                <label htmlFor="barcode" className="block text-xs font-bold uppercase tracking-wider text-emerald-200">
                  Barcode
                </label>
                <input
                  id="barcode"
                  type="text"
                  value={barcode}
                  onChange={(event) => setBarcode(event.target.value)}
                  placeholder="Product barcode"
                  className="w-full bg-[#071E17] border border-emerald-700/50 rounded-2xl px-4 py-3 text-white placeholder-emerald-600 focus:outline-none focus:border-[#CCFF00] transition-colors text-sm"
                />
                <p className="text-[11px] text-emerald-300/60">
                  Automatically filled when you select a product.
                </p>
              </div>

            </div>

            {/* Rating Selector */}
            <div className="space-y-2">
              <label htmlFor="rating" className="block text-xs font-bold uppercase tracking-wider text-emerald-200">
                Your Rating
              </label>
              <select
                id="rating"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                className="w-full bg-[#071E17] border border-emerald-700/50 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-[#CCFF00] transition-colors text-sm"
              >
                <option value="1">⭐ 1 / 5</option>
                <option value="2">⭐⭐ 2 / 5</option>
                <option value="3">⭐⭐⭐ 3 / 5</option>
                <option value="4">⭐⭐⭐⭐ 4 / 5</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 / 5</option>
              </select>
            </div>

            {/* Notes Textarea */}
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-emerald-200">
                Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="What did you think about this product?"
                rows="3"
                className="w-full bg-[#071E17] border border-emerald-700/50 rounded-2xl px-4 py-3 text-white placeholder-emerald-600 focus:outline-none focus:border-[#CCFF00] transition-colors text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#CCFF00] hover:bg-[#b8e600] text-[#0A2E23] font-bold py-4 rounded-full transition-all duration-300 shadow-md shadow-[#CCFF00]/20 hover:scale-[1.01] disabled:opacity-50 text-sm"
            >
              {saving ? "Saving..." : "Save Food Log →"}
            </button>
          </form>
        </section>

        {/* SAVED FOOD LOGS LIST */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-widest text-[#CCFF00] uppercase">
                YOUR COLLECTION
              </p>
              <h2 className="text-2xl font-serif font-bold text-white">
                Saved Food Logs
              </h2>
            </div>

            <button
              type="button"
              onClick={loadFoodLogs}
              disabled={loading}
              className="bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-100 border border-emerald-700/50 px-4 py-2 rounded-full text-xs font-semibold transition-colors flex items-center gap-2"
            >
              {loading ? "Loading..." : "↻ Refresh"}
            </button>
          </div>

          {loading ? (
            <div className="bg-[#0A2E23] border border-emerald-800/40 rounded-3xl p-12 text-center space-y-3">
              <span className="text-4xl animate-bounce inline-block">🥕</span>
              <p className="text-sm text-emerald-200">Loading your food logs...</p>
            </div>
          ) : foodLogs.length === 0 ? (
            <div className="bg-[#0A2E23] border border-emerald-800/40 rounded-3xl p-12 text-center space-y-3">
              <span className="text-4xl">🍎</span>
              <h3 className="text-lg font-bold text-white">Your food journey starts here.</h3>
              <p className="text-xs text-emerald-300/70 max-w-sm mx-auto">
                Add your first food log above to start building your personal collection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foodLogs.map((log) => (
                <article
                  key={log.id}
                  className="bg-[#0A2E23] border border-emerald-800/50 rounded-3xl p-6 flex items-start justify-between gap-4 shadow-lg hover:border-emerald-600 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#071E17] border border-emerald-800/50 flex items-center justify-center text-2xl shrink-0">
                      {log.rating >= 4 ? "🥑" : log.rating >= 3 ? "🍎" : "🥕"}
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-white text-base leading-snug">
                        {log.product_name}
                      </h3>

                      {log.barcode && (
                        <p className="text-[11px] text-emerald-400 font-mono">
                          Barcode: {log.barcode}
                        </p>
                      )}

                      <p className="text-xs text-yellow-400 font-medium flex items-center gap-1.5 pt-1">
                        {"⭐".repeat(Math.max(0, Math.min(5, log.rating || 0)))}
                        <span className="text-emerald-200/80 font-bold text-[11px]">
                          ({log.rating} / 5)
                        </span>
                      </p>

                      {log.notes && (
                        <p className="text-xs text-emerald-200/70 pt-2 line-clamp-2">
                          "{log.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(log.id)}
                    className="text-xs text-emerald-400 hover:text-red-400 font-semibold transition-colors bg-emerald-950/50 hover:bg-red-500/10 px-3 py-1.5 rounded-xl border border-emerald-800/40 hover:border-red-500/30 shrink-0"
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

export default FoodLogs;