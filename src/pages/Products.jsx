import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL;

function Products({ favorites, onFavorite }) {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async (searchTerm = "") => {
    setLoading(true);
    setError("");

    try {
      const endpoint = searchTerm.trim()
        ? `https://world.openfoodfacts.org/api/v2/search?search_terms=${encodeURIComponent(
            searchTerm
          )}&page_size=20&fields=code,product_name,brands,image_front_small_url,nutriscore_grade,ecoscore_grade`
        : `${API_URL}/products?page=1&per_page=20`;

      const response = await fetch(endpoint);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      setProducts(data.products || []);
    } catch (err) {
      console.error("Fetch products error:", err);
      setError("Unable to load products. Please try again.");
    } flex {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(query);
  };

  return (
    <main className="min-h-screen bg-[#071E17] text-white pb-20 selection:bg-[#CCFF00] selection:text-[#0A2E23]">
      <div className="max-w-7xl mx-auto px-6 pt-10 space-y-10">
        
        {/* HERO HEADER */}
        <section className="relative rounded-3xl bg-gradient-to-r from-[#0A2E23] via-emerald-950 to-[#071E17] p-8 sm:p-12 border border-emerald-800/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <p className="text-xs font-bold tracking-widest text-[#CCFF00] uppercase">
              EXPLORE FOOD DATABASE 🥗
            </p>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Discover Conscious Foods
            </h1>
            <p className="text-emerald-100/80 text-base">
              Analyze Nutri-Scores, Eco-Scores, and ingredient details across thousands of products.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full md:w-auto flex items-center gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-[#071E17] border border-emerald-700/50 rounded-full px-5 py-3 text-[#CCFF00] placeholder-emerald-600 focus:outline-none focus:border-[#CCFF00] text-sm w-full md:w-64"
            />
            <button
              type="submit"
              className="bg-[#CCFF00] hover:bg-[#b8e600] text-[#0A2E23] font-bold px-6 py-3 rounded-full text-sm transition-all shadow-md shrink-0"
            >
              Search
            </button>
          </form>
        </section>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-2xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* PRODUCTS GRID */}
        {loading ? (
          <div className="bg-[#0A2E23] border border-emerald-800/40 rounded-3xl p-16 text-center space-y-3">
            <span className="text-5xl animate-bounce inline-block">🥑</span>
            <p className="text-sm text-emerald-200 font-medium">Loading food products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-[#0A2E23] border border-emerald-800/40 rounded-3xl p-16 text-center space-y-3">
            <span className="text-5xl">🔍</span>
            <h3 className="text-xl font-bold text-white">No products found</h3>
            <p className="text-xs text-emerald-300/70 max-w-sm mx-auto">
              Try searching for something else like "Oats", "Yogurt", or "Juice".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const isFav = favorites?.some((f) => f.code === product.code);
              return (
                <ProductCard
                  key={product.code}
                  product={product}
                  onFavorite={onFavorite}
                  isFavorite={isFav}
                />
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}

export default Products;