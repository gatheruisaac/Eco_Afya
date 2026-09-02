import { Link } from "react-router-dom";

function ProductCard({ product, onFavorite, isFavorite }) {
  const productName = product.product_name || "Unknown product";
  const nutritionScore = product.nutriscore_grade?.toUpperCase() || "N/A";
  const ecoScore = product.ecoscore_grade?.toUpperCase() || "N/A";

  // Helper color logic for Nutri-Score & Eco-Score badges
  const getScoreBadgeColor = (score) => {
    switch (score) {
      case "A":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "B":
        return "bg-lime-500/20 text-lime-400 border-lime-500/40";
      case "C":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
      case "D":
        return "bg-orange-500/20 text-orange-400 border-orange-500/40";
      case "E":
        return "bg-red-500/20 text-red-400 border-red-500/40";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  return (
    <article className="group bg-[#0A2E23] rounded-3xl overflow-hidden border border-emerald-800/50 hover:border-[#CCFF00]/60 transition-all duration-300 shadow-xl hover:-translate-y-1.5 flex flex-col justify-between">
      
      {/* Image Container */}
      <div className="relative h-52 bg-emerald-950/60 p-4 flex items-center justify-center overflow-hidden border-b border-emerald-800/40">
        {product.image_front_small_url ? (
          <img
            src={product.image_front_small_url}
            alt={productName}
            className="h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-emerald-300/60 space-y-2">
            <span className="text-4xl">🥗</span>
            <p className="text-xs font-medium">No image available</p>
          </div>
        )}

        {/* Favorite Button */}
        <button
          type="button"
          className={`absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center text-lg transition-all duration-300 shadow-md ${
            isFavorite
              ? "bg-red-500/20 text-red-400 border border-red-500/50 scale-110"
              : "bg-[#071E17]/80 text-emerald-200 hover:text-white border border-emerald-700/50 hover:scale-110"
          }`}
          onClick={() => onFavorite(product)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      {/* Product Information */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-widest text-[#CCFF00] uppercase">
            FOOD PRODUCT
          </p>

          <h2 className="text-lg font-bold text-white line-clamp-1 group-hover:text-[#CCFF00] transition-colors">
            {productName}
          </h2>

          {product.brands && (
            <p className="text-xs text-emerald-300/70 truncate">
              {product.brands}
            </p>
          )}
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {/* Nutrition Score */}
          <div className="bg-[#071E17] p-2.5 rounded-2xl border border-emerald-800/40 flex items-center justify-between">
            <span className="text-xs text-emerald-200/80 font-medium">Nutrition</span>
            <span
              className={`px-2 py-0.5 rounded-lg text-xs font-bold border ${getScoreBadgeColor(
                nutritionScore
              )}`}
            >
              {nutritionScore}
            </span>
          </div>

          {/* Eco Score */}
          <div className="bg-[#071E17] p-2.5 rounded-2xl border border-emerald-800/40 flex items-center justify-between">
            <span className="text-xs text-emerald-200/80 font-medium">Planet</span>
            <span
              className={`px-2 py-0.5 rounded-lg text-xs font-bold border ${getScoreBadgeColor(
                ecoScore
              )}`}
            >
              {ecoScore}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            to={`/products/${product.code}`}
            className="w-full bg-emerald-900/40 hover:bg-[#CCFF00] text-emerald-100 hover:text-[#0A2E23] border border-emerald-700/50 hover:border-[#CCFF00] text-xs font-bold py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-1 group-hover:shadow-md"
          >
            View Details <span>→</span>
          </Link>
        </div>
      </div>

    </article>
  );
}

export default ProductCard;