import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const { q } = req.query;

  if (!q) return res.status(400).json({ message: "Query parameter 'q' is required" });

  const viewbox = "68.0,6.0,97.5,37.0";

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&bounded=1&viewbox=${viewbox}&q=${encodeURIComponent(q)}`,
      {
        headers: {
          "User-Agent": "RideApp/1.0 devanshNegi12345@gmail.com" // no trailing spaces
        }
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Nominatim error:", response.status, text);
      return res.status(500).json({ message: "Geocoding failed" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Geocode error:", err.message);
    res.status(500).json({ message: "Geocoding failed" });
  }
});

export default router;
