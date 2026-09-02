import { Link } from "react-router-dom";

function About() {
  return (
    <main className="min-h-screen bg-[#071E17] text-white pb-20 selection:bg-[#CCFF00] selection:text-[#0A2E23]">
      <div className="w-full max-w-7xl mx-auto px-6 pt-10 space-y-16">
        
        {/* HERO HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#CCFF00] uppercase">
            OUR MISSION 🌱
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold">
            Bridging Health & <span className="text-[#CCFF00] italic font-normal">Sustainability</span>
          </h1>
          <p className="text-emerald-100/80 text-base sm:text-lg leading-relaxed">
            Eco Afya was built to empower everyday consumers with transparent nutrition and environmental metrics, turning conscious eating into a daily lifestyle.
          </p>
        </section>

        {/* STORY BENTO GRID WITH HUMAN PHOTOS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-3xl overflow-hidden border border-emerald-800/50 aspect-[4/3]">
            <img
              src="https://c.pxhere.com/photos/87/79/nutmeg_spice_zanzibar_farming_africa_color_colorful_canon-130131.jpg!d"
              alt="Nutmeg spices from farming in Zanzibar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071E17] via-transparent to-transparent opacity-60" />
          </div>

          <div className="bg-[#0A2E23] p-8 sm:p-12 rounded-3xl border border-emerald-800/50 space-y-6">
            <span className="text-2xl">🌍</span>
            <h2 className="text-2xl font-serif font-bold">Driven by Open Data</h2>
            <p className="text-sm text-emerald-200/80 leading-relaxed">
              By combining Open Food Facts data with Nutri-Score and Eco-Score algorithms, Eco Afya gives instant clarity on what you put inside your body—and the footprint it leaves behind.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-[#CCFF00] text-[#0A2E23] font-bold px-6 py-3 rounded-full text-xs shadow-md"
              >
                Explore Products Now →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

export default About;