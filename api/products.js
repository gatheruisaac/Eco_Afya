export default async function handler(req, res) {
  try {
    const apiUrl =
      "https://world.openfoodfacts.org/api/v2/search?page=1&page_size=20&fields=code,product_name,brands,image_front_small_url,image_front_url,nutriscore_grade,ecoscore_grade";

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "EcoAfya/1.0",
      },
    });

    const responseText = await response.text();

    console.log("Open Food Facts status:", response.status);

    if (!response.ok) {
      console.error("Open Food Facts response:", responseText);

      return res.status(502).json({
        error: "Open Food Facts request failed",
        status: response.status,
      });
    }

    let data;

    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error("Invalid JSON from Open Food Facts:", responseText);

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