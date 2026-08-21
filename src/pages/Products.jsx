import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://world.openfoodfacts.org/api/v2/search?categories_tags=en:plant-based-foods&page_size=20"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((error) => {
        console.error("Product fetch error:", error);
        setError("Unable to load products. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
          Discover nutritional and environmental information to help you make
          healthier, more sustainable food choices.
        </p>
      </section>

      <section className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.code} product={product} />
        ))}
      </section>
    </main>
  );
}

export default Products;