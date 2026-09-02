import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetails() {
  const { code } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v2/product/${code}`
        );
        const data = await response.json();

        if (data.status !== 1) {
          throw new Error("Product details not found.");
        }

        setProduct(data.product);
      } catch (err) {
        console.error("Product detail fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [code]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#071E17] text-white flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <span className="text-5xl animate-spin inline-block">🥗</span>
          <p className="text-emerald-200 text-sm">Fetching detailed breakdown...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#071E17] text-white flex items-center justify-center p-6">
        <div className="bg-[#0A2E23] border border-emerald-800/50 p-8 rounded-3xl max-w-md text-center space-y-4">
          <span className="text-4xl">⚠️</span>
          <h1 className="text-xl font-bold">Product Not Found</h1>
          <p className="text-xs text-emerald-300/70">{error || "Unable to retrieve details."}</p>
          <Link
            to="/products"
            className="inline-block bg-[#CCFF00] text-[#0A2E23] font-bold px-6 py-2.5 rounded-full text-xs"
          >
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const productName = product.product_name || "Unknown Product";
  const nutriscore = product.nutriscore_grade?.toUpperCase() || "N/A";
  const ecoscore = product.ecoscore_grade?.toUpperCase() || "N/A";

  return (
    <main className="min-h-screen bg-[#071E17] text-white pb-20 selection:bg-[#CCFF00] selection:text-[#0A2E23]">
      <div className="max-w-5xl mx-auto px-6 pt-10 space-y-8">
        
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#CCFF00] hover:underline"
        >
          ← Back to Catalog
        </Link>

        {/* DETAILS CARD */}
        <div className="bg-[#0A2E23] border border-emerald-800/50 rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-10 shadow-2xl">
          
          {/* Image */}
          <div className="md:col-span-5 bg-[#071E17] rounded-2xl p-6 border border-emerald-800/40 flex items-center justify-center min-h-[280px]">
            {product.image_front_url || product.image_front_small_url ? (
              <img
                src={product.image_front_url || product.image_front_small_url}
                alt={productName}
                className="max-h-72 object-contain"
              />
            ) : (
              <span className="text-6xl">🥗</span>
            )}
          </div>

          {/* Info */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <p className="text-xs font-bold tracking-widest text-[#CCFF00] uppercase mb-1">
                {product.brands || "Food Product"}
              </p>
              <h1 className="text-3xl font-serif font-bold text-white">{productName}</h1>
              <p className="text-xs text-emerald-400 font-mono mt-1">Barcode: {code}</p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#071E17] p-4 rounded-2xl border border-emerald-800/40">
                <span className="text-xs text-emerald-300 block mb-1">Nutri-Score</span>
                <span className="text-2xl font-bold text-[#CCFF00]">{nutriscore}</span>
              </div>
              <div className="bg-[#071E17] p-4 rounded-2xl border border-emerald-800/40">
                <span className="text-xs text-emerald-300 block mb-1">Eco-Score</span>
                <span className="text-2xl font-bold text-[#CCFF00]">{ecoscore}</span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase text-emerald-200">Ingredients</h3>
              <p className="text-xs text-emerald-100/70 leading-relaxed bg-[#071E17] p-4 rounded-2xl border border-emerald-800/40">
                {product.ingredients_text || "Ingredient breakdown not available for this item."}
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

export default ProductDetails;