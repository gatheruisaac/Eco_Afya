import { Link } from "react-router-dom";

function ProductCard({ product, onFavorite, isFavorite }) {
  return (
    <article className="product-card">
      <div className="product-image-container">
        <img
          src={product.image_front_small_url}
          alt={product.product_name || "Food product"}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h2>{product.product_name || "Unknown product"}</h2>

        <div className="product-scores">
          <span className="score nutrition">
            Nutri-Score:{" "}
            {product.nutriscore_grade?.toUpperCase() || "N/A"}
          </span>

          <span className="score environment">
            Eco-Score:{" "}
            {product.ecoscore_grade?.toUpperCase() || "N/A"}
          </span>
        </div>

        <div className="product-actions">
          <Link
            to={`/products/${product.code}`}
            className="details-button"
          >
            View Details →
          </Link>

          <button
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
      </div>
    </article>
  );
}

export default ProductCard;