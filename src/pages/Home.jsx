import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <p className="eyebrow">SMARTER • HEALTHIER • SUSTAINABLE</p>

        <h1>
          Make Better Food Choices for Your Health and the Planet 🌱
        </h1>

        <p>
          Eco Afya helps you discover nutritional and environmental
          information about everyday food products so you can make
          healthier and more sustainable choices.
        </p>

        <Link to="/products" className="hero-button">
          Explore Products →
        </Link>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <div className="feature-icon">🥗</div>
          <h2>Nutrition</h2>
          <p>
            Understand Nutri-Score information and make more informed
            nutritional choices.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🌍</div>
          <h2>Environment</h2>
          <p>
            Explore Eco-Score information and discover products with a
            lower environmental impact.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">❤️</div>
          <h2>Your Favorites</h2>
          <p>
            Save products you like and easily return to them whenever
            you want.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;