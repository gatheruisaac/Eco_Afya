import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">SMARTER • HEALTHIER • SUSTAINABLE</p>

          <h1>
            Eat Better.
            <br />
            <span>Live Better.</span>
          </h1>

          <p className="hero-text">
            Discover what's really inside your food and make choices that
            are better for your health, your lifestyle, and our planet.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="hero-button">
              Explore Foods →
            </Link>

            <Link to="/about" className="hero-secondary-button">
              Discover Eco Afya
            </Link>
          </div>

          <div className="hero-highlights">
            <div>
              <span>🥗</span>
              <strong>Nutrition</strong>
            </div>

            <div>
              <span>🌍</span>
              <strong>Planet</strong>
            </div>

            <div>
              <span>❤️</span>
              <strong>Wellness</strong>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle">
            <span className="fruit fruit-one">🍊</span>
            <span className="fruit fruit-two">🥑</span>
            <span className="fruit fruit-three">🍓</span>
            <span className="fruit fruit-four">🍋</span>
            <span className="hero-emoji">🥗</span>
          </div>

          <div className="floating-card nutrition-card">
            <span>🥗</span>
            <div>
              <strong>Nutrition</strong>
              <small>Make informed choices</small>
            </div>
          </div>

          <div className="floating-card planet-card">
            <span>🌍</span>
            <div>
              <strong>Eco Friendly</strong>
              <small>Good for the planet</small>
            </div>
          </div>
        </div>
      </section>

      <section className="home-intro">
        <p className="eyebrow">WHY ECO AFYA?</p>

        <h2>
          Your food choices
          <br />
          <span>matter.</span>
        </h2>

        <p>
          Food is more than just what's on your plate. Eco Afya brings
          together nutrition and environmental information to help you
          understand the products you choose every day.
        </p>
      </section>

      <section className="home-features">
        <div className="feature-card feature-green">
          <div className="feature-icon">🥗</div>
          <p className="feature-number">01</p>
          <h2>Understand Nutrition</h2>
          <p>
            Explore Nutri-Score information and understand what you're
            putting into your body.
          </p>
        </div>

        <div className="feature-card feature-orange">
          <div className="feature-icon">🌍</div>
          <p className="feature-number">02</p>
          <h2>Think About Earth</h2>
          <p>
            Discover Eco-Score information and make choices that consider
            environmental impact.
          </p>
        </div>

        <div className="feature-card feature-purple">
          <div className="feature-icon">❤️</div>
          <p className="feature-number">03</p>
          <h2>Build Your Collection</h2>
          <p>
            Save your favorite foods and keep track of products that fit
            your lifestyle.
          </p>
        </div>
      </section>

      <section className="home-cta">
        <div>
          <p className="eyebrow">READY TO EXPLORE?</p>

          <h2>
            Better choices
            <br />
            start here. 🌱
          </h2>

          <p>
            Explore food products and discover a smarter way to shop,
            eat, and live.
          </p>

          <Link to="/products" className="hero-button">
            Start Exploring →
          </Link>
        </div>

        <div className="cta-fruits">
          🍎 🍊 🥑 🍓 🍌
        </div>
      </section>
    </main>
  );
}

export default Home;