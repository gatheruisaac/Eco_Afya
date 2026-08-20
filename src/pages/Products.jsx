import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Eco Afya Products</h1>
        <p>Loading products...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Eco Afya Products</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Eco Afya Products</h1>

      <p>
        Explore food products and learn more about their nutritional and
        environmental information.
      </p>

      <section>
        {products.map((product) => (
          <article key={product.code}>
            <img
              src={product.image_front_small_url}
              alt={product.product_name || "Food product"}
            />

            <h2>{product.product_name || "Unknown product"}</h2>

            <p>
              Nutri-Score:{" "}
              {product.nutriscore_grade?.toUpperCase() || "Not available"}
            </p>

            <p>
              Eco-Score:{" "}
              {product.ecoscore_grade?.toUpperCase() || "Not available"}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Products;