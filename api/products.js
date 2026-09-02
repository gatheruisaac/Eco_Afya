const API_URLS = [
  "https://au.openfoodfacts.org/api/v2/search?categories_tags=en:plant-based-foods&page=1&page_size=20&fields=code,product_name,brands,image_front_small_url,image_front_url,nutriscore_grade,ecoscore_grade",
  "https://world.openfoodfacts.org/api/v2/search?categories_tags=en:plant-based-foods&page=1&page_size=20&fields=code,product_name,brands,image_front_small_url,image_front_url,nutriscore_grade,ecoscore_grade",
];

export default async function handler(req, res) {
  for (const url of API_URLS) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
            "User-Agent": "EcoAfya/1.0 (student project)",
          },
        });

        console.log("Open Food Facts status:", response.status, url);

        if (!response.ok) {
          continue;
        }

        const data = await response.json();
        const products = (data.products || []).filter(
          (product) => product.code && product.product_name
        );

        return res.status(200).json({ products });
      } catch (error) {
        console.error("Products API attempt failed:", error);
      }
    }
  }

  return res.status(502).json({
    error: "Food product data is temporarily unavailable",
  });
}