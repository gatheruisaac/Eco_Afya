import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("ecoAfyaFavorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();

      if (!data.products || data.products.length === 0) {
        throw new Error("No products found");
      }

      setProducts(data.products);
    } catch (err) {
      console.error("Product fetch error:", err);
      setError("Unable to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleFavorite = (product) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) => favorite.code === product.code
      );

      const updatedFavorites = alreadyFavorite
        ? currentFavorites.filter(
            (favorite) => favorite.code !== product.code
          )
        : [...currentFavorites, product];

      localStorage.setItem(
        "ecoAfyaFavorites",
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    });
  };

  if (loading) {
    return (
      <main className="products-page">
        <section className="products-header">
          <p className="eyebrow">ECO AFYA • FOOD DISCOVERY</p>

          <h1>Discover Food With More Insight.</h1>

          <p>
            We're bringing together nutritional and environmental information
            to help you make smarter everyday choices.
          </p>
        </section>

        <div className="products-loading">
          <div className="loading-spinner"></div>
          <p>Discovering food products...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="products-page">
        <section className="products-header">
          <p className="eyebrow">ECO AFYA • FOOD DISCOVERY</p>

          <h1>Discover Food With More Insight.</h1>

          <p>{error}</p>

          <button className="retry-button" onClick={fetchProducts}>
            Try Again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="products-page">
      <section className="products-header">
        <p className="eyebrow">ECO AFYA • FOOD DISCOVERY</p>

        <h1>Discover Food With More Insight.</h1>

        <p>
          Explore products from around the world and see the nutritional and
          environmental information behind everyday food choices.
        </p>
      </section>

      <section className="products-toolbar">
        <div>
          <span className="products-count">
            {products.length} products
          </span>

          <span className="products-description">
            Curated food discoveries
          </span>
        </div>

        <div className="products-badge">
          🌍 Global Food Data
        </div>
      </section>

      <section className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.code}
            product={product}
            onFavorite={toggleFavorite}
            isFavorite={favorites.some(
              (favorite) => favorite.code === product.code
            )}
          />
        ))}
      </section>
    </main>
  );
}

export default Products;