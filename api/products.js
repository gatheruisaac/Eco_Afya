export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://world.openfoodfacts.org/api/v2/search?categories_tags_en=plant-based-foods&page_size=20&fields=code,product_name,image_front_small_url,image_front_url,nutriscore_grade,ecoscore_grade,brands",
      {
        headers: {
          "User-Agent": "EcoAfya/1.0 (igatheru7@gmail.com)",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "Open Food Facts error:",
        response.status,
        errorText
      );

      return res.status(response.status).json({
        error: "Open Food Facts request failed",
        status: response.status,
      });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("API error:", error);

    return res.status(500).json({
      error: "Unable to fetch products",
    });
  }
}