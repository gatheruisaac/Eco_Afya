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
          `https://world.openfoodfacts.org/api/v2/product/${barcode}?fields=code,product_name,image_front_url,image_front_small_url,brands,nutriscore_grade,ecoscore_grade,ingredients_text,nutriments,categories`
        );

        if (!response.ok) {
          throw new Error("Unable to load product");
        }

        const data = await response.json();

        if (!data.product) {
          throw new Error("Product not found");
        }

        setProduct(data.product);
      } catch (err) {
        console.error("Product details error:", err);
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    };

    if (barcode) {
      fetchProduct();
    }
  }, [barcode]);

  if (loading) {
    return (
      <main className="product-details-page">
        <section className="details-loading">
          <span>🥑</span>
          <h1>Loading product...</h1>
          <p>Getting the latest food information for you.</p>
        </section>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-details-page">
        <section className="details-error">
          <span>🍎</span>
          <h1>Product not found</h1>
          <p>
            We couldn't find the information for this product. Please try
            another product.
          </p>

          <Link to="/products" className="hero-button">
            Back to Products →
          </Link>
        </section>
      </main>
    );
  }

  const nutriments = product.nutriments || {};

  return (
    <main className="product-details-page">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-details-hero">
        <div className="details-image-card">
          <div className="image-glow"></div>

          {product.image_front_url ? (
            <img
              src={product.image_front_url}
              alt={product.product_name || "Food product"}
            />
          ) : (
            <div className="details-placeholder">
              <span>🥗</span>
              <p>No product image available</p>
            </div>
          )}
        </div>

        <div className="details-main">
          <p className="product-category">FOOD PRODUCT</p>

          <h1>{product.product_name || "Unknown product"}</h1>

          <p className="details-brand">
            {product.brands || "Brand information unavailable"}
          </p>

          <div className="details-score-grid">
            <div className="details-score nutrition">
              <span>🥗</span>

              <div>
                <small>Nutri-Score</small>

                <strong>
                  {product.nutriscore_grade?.toUpperCase() || "N/A"}
                </strong>
              </div>
            </div>

            <div className="details-score environment">
              <span>🌍</span>

              <div>
                <small>Eco-Score</small>

                <strong>
                  {product.ecoscore_grade?.toUpperCase() || "N/A"}
                </strong>
              </div>
            </div>
          </div>

          <div className="details-barcode">
            <span>BARCODE</span>
            <strong>{product.code || barcode}</strong>
          </div>
        </div>
      </section>

      <section className="details-information">
        <div className="details-section">
          <p className="eyebrow">NUTRITION</p>

          <h2>Nutrition Information</h2>

          <p className="section-intro">
            A quick look at the nutritional values found in this product.
          </p>

          <div className="nutrition-grid">
            <div className="nutrition-item nutrition-energy">
              <span>🔥</span>
              <small>Energy</small>
              <strong>
                {nutriments["energy-kcal_100g"] ?? "N/A"} kcal
              </strong>
            </div>

            <div className="nutrition-item nutrition-sugar">
              <span>🍬</span>
              <small>Sugars</small>
              <strong>
                {nutriments.sugars_100g ?? "N/A"} g
              </strong>
            </div>

            <div className="nutrition-item nutrition-fat">
              <span>🥑</span>
              <small>Fat</small>
              <strong>
                {nutriments.fat_100g ?? "N/A"} g
              </strong>
            </div>

            <div className="nutrition-item nutrition-protein">
              <span>💪</span>
              <small>Protein</small>
              <strong>
                {nutriments.proteins_100g ?? "N/A"} g
              </strong>
            </div>

            <div className="nutrition-item nutrition-salt">
              <span>🧂</span>
              <small>Salt</small>
              <strong>
                {nutriments.salt_100g ?? "N/A"} g
              </strong>
            </div>

            <div className="nutrition-item nutrition-carbs">
              <span>🌾</span>
              <small>Carbohydrates</small>
              <strong>
                {nutriments.carbohydrates_100g ?? "N/A"} g
              </strong>
            </div>
          </div>
        </div>

        <div className="details-section ingredients-section">
          <p className="eyebrow">WHAT'S INSIDE</p>

          <h2>Ingredients</h2>

          <p className="section-intro">
            Understand what goes into the food you're choosing.
          </p>

          <div className="ingredients-box">
            <span className="ingredients-icon">🌿</span>

            <p className="ingredients-text">
              {product.ingredients_text ||
                "Ingredient information is not available for this product."}
            </p>
          </div>
        </div>
      </section>

      <section className="details-bottom-cta">
        <div>
          <p className="eyebrow">MAKE A SMARTER CHOICE</p>

          <h2>Want to explore more products?</h2>

          <p>
            Compare different foods and discover options that fit your
            health and sustainability goals.
          </p>
        </div>

        <Link to="/products" className="hero-button">
          Explore More →
        </Link>
      </section>
    </main>
  );
}

export default ProductDetails;