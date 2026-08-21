import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
  const { barcode } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();

        if (data.status !== 1 || !data.product) {
          throw new Error("Product not found");
        }

        setProduct(data.product);
      } catch (err) {
        console.error("Product details error:", err);
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode]);

  if (loading) {
    return (
      <main className="product-details">
        <p>Loading product details...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="product-details">
        <h1>Product Details</h1>
        <p>{error}</p>

        <Link to="/products" className="back-link">
          ← Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="product-details">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <section className="details-card">
        <div className="details-image">
          <img
            src={product.image_front_url}
            alt={product.product_name || "Food product"}
          />
        </div>

        <div className="details-content">
          <p className="eyebrow">PRODUCT INFORMATION</p>

          <h1>{product.product_name || "Unknown Product"}</h1>

          <p className="brand">
            Brand: {product.brands || "Not available"}
          </p>

          <div className="details-scores">
            <div className="detail-score">
              <span>Nutri-Score</span>

              <strong>
                {product.nutriscore_grade?.toUpperCase() || "N/A"}
              </strong>
            </div>

            <div className="detail-score">
              <span>Eco-Score</span>

              <strong>
                {product.ecoscore_grade?.toUpperCase() || "N/A"}
              </strong>
            </div>
          </div>

          <div className="details-section">
            <h2>Ingredients</h2>

            <p>
              {product.ingredients_text ||
                "Ingredient information is not available."}
            </p>
          </div>

          <div className="details-section">
            <h2>Nutrition</h2>

            <p>
              Energy:{" "}
              {product.nutriments?.["energy-kcal_100g"] ?? "N/A"} kcal per
              100g
            </p>

            <p>
              Fat: {product.nutriments?.fat_100g ?? "N/A"}g per 100g
            </p>

            <p>
              Sugars: {product.nutriments?.sugars_100g ?? "N/A"}g per 100g
            </p>

            <p>
              Protein: {product.nutriments?.proteins_100g ?? "N/A"}g per 100g
            </p>
          </div>

          <div className="details-section">
            <h2>Why it matters</h2>

            <p>
              Eco Afya combines nutritional and environmental information to
              help you make healthier and more sustainable food choices.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;