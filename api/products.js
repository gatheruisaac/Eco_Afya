export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://world.openfoodfacts.org/api/v2/search?categories_tags=en:plant-based-foods&page_size=20"
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Open Food Facts request failed",
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