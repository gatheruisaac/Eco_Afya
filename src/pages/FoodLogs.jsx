cat > src/pages/FoodLogs.jsx <<'EOF'
import { useEffect, useState } from "react";

function FoodLogs() {
  const [foodLogs, setFoodLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFoodLogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://127.0.0.1:5000/food-logs",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch food logs");
      }

      const data = await response.json();

      setFoodLogs(data.food_logs || []);
    } catch (err) {
      console.error("Food logs error:", err);
      setError("Unable to load your food logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodLogs();
  }, []);

  if (loading) {
    return (
      <main className="products-page">
        <section className="products-header">
          <p className="eyebrow">MY FOOD LOGS</p>
          <h1>Your Food Logs 📋</h1>
          <p>Loading your saved food logs...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="products-page">
        <section className="products-header">
          <p className="eyebrow">MY FOOD LOGS</p>
          <h1>Your Food Logs 📋</h1>
          <p>{error}</p>

          <button onClick={fetchFoodLogs}>
            Try Again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="products-page">
      <section className="products-header">
        <p className="eyebrow">MY FOOD LOGS</p>

        <h1>Your Food Logs 📋</h1>

        <p>
          Keep track of the foods you have reviewed and your personal
          ratings and notes.
        </p>
      </section>

      {foodLogs.length === 0 ? (
        <section className="products-header">
          <h2>No food logs yet</h2>
          <p>
            Start exploring products and save foods to your personal log.
          </p>
        </section>
      ) : (
        <section className="products-grid">
          {foodLogs.map((log) => (
            <article className="product-card" key={log.id}>
              <div className="product-info">
                <p className="eyebrow">FOOD LOG</p>

                <h2>{log.product_name}</h2>

                <p>
                  <strong>Rating:</strong>{" "}
                  {log.rating ? `${log.rating}/5` : "Not rated"}
                </p>

                <p>
                  <strong>Barcode:</strong>{" "}
                  {log.barcode || "Not available"}
                </p>

                <p>
                  <strong>Notes:</strong>{" "}
                  {log.notes || "No notes added"}
                </p>

                <p>
                  <strong>Logged:</strong>{" "}
                  {new Date(log.created_at).toLocaleDateString()}
                </p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default FoodLogs;
EOF