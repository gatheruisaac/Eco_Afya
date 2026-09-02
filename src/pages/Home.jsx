import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen bg-[#071E17] text-white selection:bg-[#CCFF00] selection:text-[#0A2E23]">
      
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-[#CCFF00] text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse"></span>
              Smarter • Healthier • Sustainable
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-bold leading-tight tracking-tight">
              Eat Better. <br />
              <span className="text-[#CCFF00] italic font-normal">Live Better.</span>
            </h1>

            <p className="text-emerald-100/80 text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
              Discover what's really inside your food and make choices that
              are better for your health, your lifestyle, and our planet.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="bg-[#CCFF00] hover:bg-[#b8e600] text-[#0A2E23] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#CCFF00]/20 hover:scale-105 flex items-center gap-2 text-base"
              >
                Explore Foods <span className="text-lg">→</span>
              </Link>

              <Link
                to="/about"
                className="bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-100 border border-emerald-700/50 font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base"
              >
                Discover Eco Afya
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 border-t border-emerald-800/40 grid grid-cols-3 gap-4 max-w-lg">
              <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-800/30 flex items-center gap-3">
                <span className="text-2xl">🥗</span>
                <div>
                  <strong className="block text-sm font-bold text-white">Nutrition</strong>
                  <span className="text-xs text-emerald-300/70">Verified</span>
                </div>
              </div>

              <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-800/30 flex items-center gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <strong className="block text-sm font-bold text-white">Planet</strong>
                  <span className="text-xs text-emerald-300/70">Eco-Scored</span>
                </div>
              </div>

              <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-800/30 flex items-center gap-3">
                <span className="text-2xl">❤️</span>
                <div>
                  <strong className="block text-sm font-bold text-white">Wellness</strong>
                  <span className="text-xs text-emerald-300/70">Community</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Column with Human Photo Hero Stack */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Community Photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-700/40 aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000"
                  alt="People working together on sustainable environment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071E17] via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0A2E23]/80 backdrop-blur-md border border-emerald-600/40">
                  <p className="text-xs text-[#CCFF00] font-semibold tracking-wider uppercase mb-1">Impact Community</p>
                  <p className="text-sm text-white font-medium">Empowering thousands to choose conscious, healthy nutrition daily.</p>
                </div>
              </div>

              {/* Floating Card 1 - Nutrition */}
              <div className="absolute -top-6 -left-6 bg-[#0A2E23]/90 backdrop-blur-md p-4 rounded-2xl border border-emerald-600/40 shadow-xl flex items-center gap-3 animate-bounce-slow hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-[#CCFF00] text-[#0A2E23] flex items-center justify-center text-xl font-bold">
                  🥗
                </div>
                <div>
                  <strong className="block text-sm text-white">Smart Nutrition</strong>
                  <small className="text-xs text-emerald-300/80">Nutri-Score analysis</small>
                </div>
              </div>

              {/* Floating Card 2 - Human Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#0A2E23]/90 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-600/40 shadow-xl flex items-center gap-3 hidden sm:flex">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
                  alt="Verified User"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#CCFF00]"
                />
                <div>
                  <strong className="block text-xs text-white">Verified Healthy Choice</strong>
                  <span className="text-[10px] text-[#CCFF00]">Eco-Certified</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* INTRO & HUMAN BENTO GRID */}
      <section className="bg-[#0A2E23] py-20 border-y border-emerald-800/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-widest text-[#CCFF00] uppercase">
              WHY ECO AFYA?
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Your food choices <span className="text-[#CCFF00] italic font-normal">matter.</span>
            </h2>
            <p className="text-emerald-100/80 text-base sm:text-lg">
              Food is more than just what's on your plate. Eco Afya brings together nutrition 
              and environmental impact insights so you can make informed choices every single day.
            </p>
          </div>

          {/* Feature Grid with Human Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-[#071E17] rounded-3xl overflow-hidden border border-emerald-800/50 hover:border-emerald-600 transition-all duration-300 group flex flex-col justify-between">
              <div className="h-48 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600"
                  alt="Healthy fresh ingredients"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-[#0A2E23]/80 backdrop-blur-md text-[#CCFF00] text-xs font-bold px-3 py-1 rounded-full border border-emerald-600/40">
                  01
                </span>
              </div>
              <div className="p-8 space-y-3 flex-1">
                <div className="text-2xl">🥗</div>
                <h3 className="text-xl font-bold text-white">Understand Nutrition</h3>
                <p className="text-sm text-emerald-200/70 leading-relaxed">
                  Explore Nutri-Score ratings and gain total clarity over the macros and nutrients going into your body.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#071E17] rounded-3xl overflow-hidden border border-emerald-800/50 hover:border-emerald-600 transition-all duration-300 group flex flex-col justify-between">
              <div className="h-48 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1511497584788-876761011935?auto=format&fit=crop&q=80&w=600"
                  alt="Sustainable nature and planet"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-[#0A2E23]/80 backdrop-blur-md text-[#CCFF00] text-xs font-bold px-3 py-1 rounded-full border border-emerald-600/40">
                  02
                </span>
              </div>
              <div className="p-8 space-y-3 flex-1">
                <div className="text-2xl">🌍</div>
                <h3 className="text-xl font-bold text-white">Think About Earth</h3>
                <p className="text-sm text-emerald-200/70 leading-relaxed">
                  Discover Eco-Score ratings and actively reduce your environmental footprint with sustainable products.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#071E17] rounded-3xl overflow-hidden border border-emerald-800/50 hover:border-emerald-600 transition-all duration-300 group flex flex-col justify-between">
              <div className="h-48 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600"
                  alt="People collaborating and sharing health goals"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-[#0A2E23]/80 backdrop-blur-md text-[#CCFF00] text-xs font-bold px-3 py-1 rounded-full border border-emerald-600/40">
                  03
                </span>
              </div>
              <div className="p-8 space-y-3 flex-1">
                <div className="text-2xl">❤️</div>
                <h3 className="text-xl font-bold text-white">Build Your Collection</h3>
                <p className="text-sm text-emerald-200/70 leading-relaxed">
                  Save your favorite foods, keep personal logs, and align your diet directly with your personal wellness goals.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-900 via-[#0A2E23] to-emerald-950 p-8 sm:p-14 border border-emerald-700/50 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl z-10 text-center md:text-left">
            <span className="text-xs font-semibold tracking-widest text-[#CCFF00] uppercase">
              READY TO EXPLORE?
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Better choices start here. 🌱
            </h2>
            <p className="text-emerald-100/80 text-base">
              Explore eco-friendly food products and discover a smarter, healthier way to shop, eat, and live.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-[#CCFF00] hover:bg-[#b8e600] text-[#0A2E23] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:scale-105"
              >
                Start Exploring Now →
              </Link>
            </div>
          </div>

          {/* Visual Avatar Community Stack */}
          <div className="z-10 bg-emerald-950/80 backdrop-blur-md p-6 rounded-2xl border border-emerald-700/50 flex flex-col items-center text-center space-y-3 max-w-xs">
            <div className="flex -space-x-3 overflow-hidden">
              <img
                className="inline-block h-12 w-12 rounded-full ring-2 ring-[#CCFF00] object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                alt="User"
              />
              <img
                className="inline-block h-12 w-12 rounded-full ring-2 ring-[#CCFF00] object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                alt="User"
              />
              <img
                className="inline-block h-12 w-12 rounded-full ring-2 ring-[#CCFF00] object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                alt="User"
              />
            </div>
            <p className="text-xs text-emerald-100 font-medium">
              Join thousands making sustainable food choices daily.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}

export default Home;