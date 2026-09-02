import { Link } from "react-router-dom";

function Favorites({ favorites, onFavorite }) {

  return (
    <main className="favorites-page">
      <section className="favorites-header">
        <p className="eyebrow">YOUR FOOD COLLECTION</p>

        <h1>
          Your Favorites <span>❤️</span>
        </h1>

        <p>
          Keep the products you love close and come back to them whenever
          you need inspiration.
        </p>
      </section>

      {favorites.length === 0 ? (
        <section className="favorites-empty">
          <div className="favorites-empty-icon">🍓</div>

          <p className="card-label">NOTHING SAVED YET</p>

          <h2>Your favorite foods will appear here.</h2>

          <p>
            Explore our products and tap the heart on anything you want to
            remember.
          </p>

          <Link to="/products" className="hero-button">
            Explore Products →
          </Link>
        </section>
      ) : (
        <section className="favorites-content">
          <div className="favorites-summary">
            <div>
              <p className="card-label">YOUR COLLECTION</p>
              <h2>{favorites.length} Saved Product{favorites.length !== 1 ? "s" : ""}</h2>
            </div>

            <span className="favorites-count">
              ❤️ {favorites.length}
            </span>
          </div>

          <div className="favorites-grid">
            {favorites.map((product) => (
              <article className="favorite-card" key={product.code}>
                <div className="favorite-image">
                  {product.image_front_small_url ? (
                    <img
                      src={product.image_front_small_url}
                      alt={product.product_name || "Food product"}
                    />
                  ) : (
                    <span>🥗</span>
                  )}
                </div>

                <div className="favorite-info">
                  <p className="product-category">SAVED FOOD</p>

                  <h2>
                    {product.product_name || "Unknown product"}
                  </h2>

                  <p className="favorite-brand">
                    {product.brands || "Food product"}
                  </p>

                  <div className="favorite-scores">
                    <div className="favorite-score nutrition">
                      <small>Nutri-Score</small>
                      <strong>
                        {product.nutriscore_grade?.toUpperCase() || "N/A"}
                      </strong>
                    </div>

                    <div className="favorite-score environment">
                      <small>Eco-Score</small>
                      <strong>
                        {product.ecoscore_grade?.toUpperCase() || "N/A"}
                      </strong>
                    </div>
                  </div>

                  <Link
                    to={`/products/${product.code}`}
                    className="details-button"
                  >
                    View Details →
                  </Link>
                  <button
                    type="button"
                    onClick={() => onFavorite(product)}
                    className="details-button"
                  >
                    Remove Favorite
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Favorites;