function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="eyebrow">ABOUT ECO AFYA</p>

        <h1>Better Choices for People and the Planet 🌱</h1>

        <p>
          Eco Afya is a food information platform designed to help people
          understand the nutritional and environmental impact of the
          products they buy.
        </p>
      </section>

      <section className="about-grid">
        <article className="about-card">
          <div className="about-icon">🥗</div>

          <h2>Nutrition Matters</h2>

          <p>
            Eco Afya provides Nutri-Score information to help users
            understand the nutritional quality of food products.
          </p>
        </article>

        <article className="about-card">
          <div className="about-icon">🌍</div>

          <h2>Protect Our Planet</h2>

          <p>
            Environmental information helps users consider the impact
            their food choices can have on the planet.
          </p>
        </article>

        <article className="about-card">
          <div className="about-icon">💡</div>

          <h2>Informed Decisions</h2>

          <p>
            Our goal is to make food information easier to understand so
            users can make informed everyday decisions.
          </p>
        </article>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>

        <p>
          Eco Afya combines nutritional and environmental information
          from Open Food Facts into a simple and accessible experience.
          We believe that better information can lead to better choices.
        </p>
      </section>
    </main>
  );
}

export default About;