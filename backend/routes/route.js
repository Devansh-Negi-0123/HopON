// routes/route.js
import express from "express";

const router = express.Router();

/*
  GET /route?start=lat,lon&end=lat,lon
  Example: /route?start=30.9,75.85&end=28.7041,77.1025
*/
router.get("/", async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ message: "start and end query params required in 'lat,lon' form" });
  }

  // parse lat,lon strings
  const parseLatLon = (s) => {
    const parts = s.split(",").map((p) => p.trim());
    if (parts.length !== 2) return null;
    const lat = Number(parts[0]);
    const lon = Number(parts[1]);
    if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
    return { lat, lon };
  };

  const s = parseLatLon(start);
  const e = parseLatLon(end);

  if (!s || !e) {
    return res.status(400).json({ message: "Invalid start/end coordinates" });
  }

  try {
    // OSRM expects lon,lat order in the path segments
    const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${s.lon},${s.lat};${e.lon},${e.lat}?overview=full&geometries=geojson`;

    const r = await fetch(osrmUrl, {
      headers: {
        "User-Agent": "HopON-Routing/1.0 devanshNegi12345@gmail.com",
      },
    });

    if (!r.ok) {
      // If OSRM fails, fallback to straight line coords
      const fallback = [
        [s.lat, s.lon],
        [e.lat, e.lon],
      ];
      return res.status(200).json({ coords: fallback, fallback: true });
    }

    const json = await r.json();

    if (!json.routes || json.routes.length === 0 || !json.routes[0].geometry) {
      const fallback = [
        [s.lat, s.lon],
        [e.lat, e.lon],
      ];
      return res.status(200).json({ coords: fallback, fallback: true });
    }

    // OSRM returns geojson coordinates as [lon, lat], convert to [lat, lon]
    const osrmCoords = json.routes[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);

    return res.json({ coords: osrmCoords, fallback: false });
  } catch (err) {
    console.error("Route proxy error:", err);
    // fallback to straight line
    const fallback = [
      [s.lat, s.lon],
      [e.lat, e.lon],
    ];
    return res.status(200).json({ coords: fallback, fallback: true });
  }
});

export default router;
