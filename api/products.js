export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://world.openfoodfacts.org/api/v2/search?page=1&page_size=20&fields=code,product_name,image_front_small_url,image_front_url,nutriscore_grade,ecoscore_grade,brands",
      {
        headers: {
          "User-Agent": "EcoAfya/1.0 (Eco Afya educational project)",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Open Food Facts error:", data);

      return res.status(response.status).json({
        error: "Open Food Facts request failed",
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("API error:", error);

    return res.status(500).json({
      error: "Unable to fetch products",
    });
  }
}