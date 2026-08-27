let cachedProducts = null;
let cacheTime = 0;

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export default async function handler(req, res) {
  try {
    const now = Date.now();

    // Use cached products for 30 minutes
    if (cachedProducts && now - cacheTime < CACHE_DURATION) {
      console.log("Returning cached products");

      return res.status(200).json({
        products: cachedProducts,
      });
    }

    const apiUrl =
      "https://world.openfoodfacts.org/api/v2/search?categories_tags=en:plant-based-foods&page=1&page_size=20&fields=code,product_name,brands,image_front_small_url,image_front_url,nutriscore_grade,ecoscore_grade";

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "EcoAfya/1.0 (student project)",
      },
    });

    console.log("Open Food Facts status:", response.status);

    if (!response.ok) {
      console.error(
        "Open Food Facts error:",
        response.status
      );

      // If we have old data, use it instead of showing an error
      if (cachedProducts) {
        console.log("Returning stale cached products");

        return res.status(200).json({
          products: cachedProducts,
        });
      }

      return res.status(502).json({
        error: "Open Food Facts is temporarily unavailable",
      });
    }

    const data = await response.json();

    const products = data.products || [];

    if (products.length === 0) {
      if (cachedProducts) {
        return res.status(200).json({
          products: cachedProducts,
        });
      }

      return res.status(200).json({
        products: [],
      });
    }

    // Store successful results
    cachedProducts = products;
    cacheTime = now;

    console.log(`Cached ${products.length} products`);

    return res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("API error:", error);

    if (cachedProducts) {
      console.log("Returning cached products after error");

      return res.status(200).json({
        products: cachedProducts,
      });
    }

    return res.status(500).json({
      error: "Unable to fetch products",
    });
  }
}