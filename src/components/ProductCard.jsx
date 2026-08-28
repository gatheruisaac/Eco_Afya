import { Link } from "react-router-dom";

function ProductCard({ product, onFavorite, isFavorite }) {
  const productName = product.product_name || "Unknown product";

  const nutritionScore =
    product.nutriscore_grade?.toUpperCase() || "N/A";

  const ecoScore =
    product.ecoscore_grade?.toUpperCase() || "N/A";

  return (
    <article className="product-card">
      <div className="product-image-container">
        {product.image_front_small_url ? (
          <img
            src={product.image_front_small_url}
            alt={productName}
            className="product-image"
          />
        ) : (
          <div className="product-placeholder">
            <span>🥗</span>
            <p>No image available</p>
          </div>
        )}

        <button
          type="button"
          className={`favorite-button ${
            isFavorite ? "favorite-active" : ""
          }`}
          onClick={() => onFavorite(product)}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">FOOD PRODUCT</p>

        <h2>{productName}</h2>

        {product.brands && (
          <p className="product-brand">{product.brands}</p>
        )}

        <div className="product-scores">
          <div className="score nutrition">
            <span>Nutrition</span>
            <strong>{nutritionScore}</strong>
          </div>

          <div className="score environment">
            <span>Planet</span>
            <strong>{ecoScore}</strong>
          </div>
        </div>

        <div className="product-actions">
          <Link
            to={`/products/${product.code}`}
            className="details-button"
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;