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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://world.openfoodfacts.org/api/v2/search?categories_tags=en:plant-based-foods&page_size=20"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products || []);
      } catch (err) {
        console.error("Product fetch error:", err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

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
          <p className="eyebrow">SMART FOOD CHOICES</p>
          <h1>Explore Better Food Choices 🌱</h1>
          <p>Loading products...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="products-page">
        <section className="products-header">
          <p className="eyebrow">SMART FOOD CHOICES</p>
          <h1>Explore Better Food Choices 🌱</h1>
          <p>{error}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="products-page">
      <section className="products-header">
        <p className="eyebrow">SMART FOOD CHOICES</p>

        <h1>Explore Better Food Choices 🌱</h1>

        <p>
          Discover nutritional and environmental information to help you
          make healthier, more sustainable food choices.
        </p>
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