function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="eyebrow">ABOUT ECO AFYA</p>

          <h1>
            Better choices start with better
            <span> information.</span>
          </h1>

          <p>
            Eco Afya brings nutrition, sustainability, and food discovery
            together in one simple experience.
          </p>
        </div>

        <div className="about-hero-visual">
          <div className="about-circle">
            <span>🌍</span>
          </div>

          <div className="about-fruit fruit-a">🍊</div>
          <div className="about-fruit fruit-b">🍓</div>
          <div className="about-fruit fruit-c">🥑</div>
          <div className="about-fruit fruit-d">🍋</div>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story-card">
          <p className="eyebrow">OUR MISSION</p>

          <h2>
            Making food information easier to understand.
          </h2>

          <p>
            Choosing what to eat can be complicated. Eco Afya helps simplify
            that decision by bringing important food information into one
            place.
          </p>

          <p>
            From nutritional scores to environmental impact, our goal is to
            help people understand the products they consume and make choices
            that are better for themselves and the planet.
          </p>
        </div>

        <div className="about-values">
          <div className="value-card value-green">
            <span>🥗</span>
            <h3>Health</h3>
            <p>
              Understand nutritional information and make informed food
              decisions.
            </p>
          </div>

          <div className="value-card value-orange">
            <span>🌎</span>
            <h3>Sustainability</h3>
            <p>
              Discover environmental information and consider the impact of
              your food choices.
            </p>
          </div>

          <div className="value-card value-purple">
            <span>💡</span>
            <h3>Awareness</h3>
            <p>
              Turn complex product information into simple, useful insights.
            </p>
          </div>

          <div className="value-card value-pink">
            <span>❤️</span>
            <h3>Personal Choice</h3>
            <p>
              Save products, track your food journey, and build your own
              collection.
            </p>
          </div>
        </div>
      </section>

      <section className="about-data">
        <div className="data-icon">🌱</div>

        <div>
          <p className="eyebrow">POWERED BY OPEN FOOD FACTS</p>

          <h2>
            Food information from a global open database.
          </h2>

          <p>
            Eco Afya uses data from Open Food Facts to provide product,
            nutrition, ingredient, and environmental information.
          </p>
        </div>
      </section>

      <section className="about-final">
        <p className="eyebrow">THE ECO AFYA IDEA</p>

        <h2>
          Small food decisions can make a
          <span> big difference.</span>
        </h2>

        <p>
          Eat with awareness. Choose with confidence. Think about tomorrow.
        </p>

        <div className="about-final-icons">
          <span>🥑</span>
          <span>🍎</span>
          <span>🥕</span>
          <span>🍓</span>
          <span>🌍</span>
        </div>
      </section>
    </main>
  );
}

export default About;