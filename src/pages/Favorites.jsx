import { Link } from "react-router-dom";

function Favorites() {
  const favorites = JSON.parse(
    localStorage.getItem("ecoAfyaFavorites") || "[]"
  );

  return (
    <main className="products-page">
      <section className="products-header">
        <p className="eyebrow">YOUR COLLECTION</p>

        <h1>Favorite Foods ❤️</h1>

        <p>
          Keep track of products you want to compare or explore later.
        </p>
      </section>

      {favorites.length === 0 ? (
        <section className="empty-favorites">
          <h2>No favorites yet</h2>

          <p>
            Browse our products and click the ♡ button to save your
            favorites.
          </p>

          <Link to="/products" className="details-button">
            Explore Products
          </Link>
        </section>
      ) : (
        <section className="products-grid">
          {favorites.map((product) => (
            <article className="product-card" key={product.code}>
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

                <Link
                  to={`/products/${product.code}`}
                  className="details-button"
                >
                  View Details →
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Favorites;