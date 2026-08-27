import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function ProductDetails() {
  const { barcode } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/products/${barcode}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Unable to load product details"
          );
        }

        setProduct(data.product || data);
      } catch (err) {
        console.error("Product details error:", err);
        setError(err.message);
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
      <main className="loading-page">
        <p>Loading product details...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="error-page">
        <h1>Unable to load product</h1>
        <p>{error}</p>

        <Link to="/products">
          Back to Products
        </Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="error-page">
        <h1>Product not found</h1>

        <Link to="/products">
          Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-details-card">
        {product.image_front_url && (
          <img
            src={product.image_front_url}
            alt={product.product_name || "Food product"}
            className="product-details-image"
          />
        )}

        <div className="product-details-content">
          <p className="eyebrow">PRODUCT DETAILS</p>

          <h1>
            {product.product_name || "Unnamed Product"}
          </h1>

          {product.brands && (
            <p className="product-brand">
              {product.brands}
            </p>
          )}

          <div className="product-scores">
            <div className="score-card">
              <span>Nutri-Score</span>
              <strong>
                {product.nutriscore_grade?.toUpperCase() || "N/A"}
              </strong>
            </div>

            <div className="score-card">
              <span>Eco-Score</span>
              <strong>
                {product.ecoscore_grade?.toUpperCase() || "N/A"}
              </strong>
            </div>
          </div>

          {product.ingredients_text && (
            <div className="product-section">
              <h2>Ingredients</h2>
              <p>{product.ingredients_text}</p>
            </div>
          )}

          <div className="product-section">
            <h2>Barcode</h2>
            <p>{product.code || barcode}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;