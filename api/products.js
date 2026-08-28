const API_URL =
  "https://world.openfoodfacts.org/api/v2/search?categories_tags=en:plant-based-foods&page=1&page_size=20&fields=code,product_name,brands,image_front_small_url,image_front_url,nutriscore_grade,ecoscore_grade";

export default async function handler(req, res) {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Accept: "application/json",
        "User-Agent": "EcoAfya/1.0 (student project)",
      },
    });

    console.log("Open Food Facts status:", response.status);

    if (!response.ok) {
      return res.status(502).json({
        error: "Open Food Facts request failed",
      });
    }

    const data = await response.json();

    const products = (data.products || []).filter(
      (product) => product.code && product.product_name
    );

    return res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("Products API error:", error);

    return res.status(500).json({
      error: "Unable to fetch products",
    });
  }
}