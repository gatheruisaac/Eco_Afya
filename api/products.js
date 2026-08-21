export default async function handler(req, res) {
  try {
    const url =
      "https://world.openfoodfacts.org/api/v2/search?categories_tags_en=plant-based-foods&page=1&page_size=20&fields=code,product_name,brands,image_front_small_url,image_front_url,nutriscore_grade,ecoscore_grade";

    const response = await fetch(url, {
      headers: {
        "User-Agent": "EcoAfya/1.0 (Eco Afya educational project)",
        Accept: "application/json",
      },
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("Open Food Facts status:", response.status);
      console.error("Open Food Facts response:", text);

      return res.status(502).json({
        error: "Open Food Facts request failed",
        status: response.status,
      });
    }

    let data;

    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("Open Food Facts returned non-JSON:", text);

      return res.status(502).json({
        error: "Open Food Facts returned an invalid response",
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