import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../leafletFix"; // keep your existing marker fix

// Fit map dynamically to two coordinates (calls invalidateSize first)
function FitBounds({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (!coords || coords.length !== 2) return;
    try {
      // ensure map dimensions are correct before fitting
      if (typeof map.invalidateSize === "function") map.invalidateSize();
      map.fitBounds(coords, { padding: [50, 50], maxZoom: 14 });
    } catch (e) {
      // ignore errors
    }
  }, [coords, map]);
  return null;
}

// Normalize coordinates to [lat, lon] (handles [lon,lat] sources like OSRM)
function normalizeCoordsArray(coords) {
  // coords: array of [a,b]
  if (!Array.isArray(coords) || coords.length === 0) return [];
  // heuristic: if first coordinate has |first| > 90, it's probably lon
  const first = coords[0];
  if (!Array.isArray(first) || first.length < 2) return [];
  const a = Number(first[0]);
  const b = Number(first[1]);
  if (Number.isNaN(a) || Number.isNaN(b)) return [];

  // If absolute value of first > 90, assume it's longitude -> swap each pair
  const needsSwap = Math.abs(a) > 90;
  if (!needsSwap) return coords.map((c) => [Number(c[0]), Number(c[1])]);

  return coords.map((c) => [Number(c[1]), Number(c[0])]);
}

export default function CreateRide() {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    startLocation: "",
    destination: "",
    date: "",
    time: "",
    seats: "",
    price: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [routeCoords, setRouteCoords] = useState([]); // final coords in [lat,lon] format
  const [isRouting, setIsRouting] = useState(false);

  const debounceRef = useRef(null);

  // India bounding box
  const INDIA_BBOX = {
    minLat: 6.0,
    maxLat: 37.0,
    minLon: 68.0,
    maxLon: 97.5,
  };

  const isInsideIndia = (lat, lon) =>
    lat >= INDIA_BBOX.minLat &&
    lat <= INDIA_BBOX.maxLat &&
    lon >= INDIA_BBOX.minLon &&
    lon <= INDIA_BBOX.maxLon;

  // Handle input + debounce geocode calls
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      triggerGeocodeAndRoute(updatedForm.startLocation, updatedForm.destination);
    }, 700);
  };

  // Fetch geocode + routing (uses your backend proxies /geocode and /route)
  const triggerGeocodeAndRoute = async (startStr, destStr) => {
    startStr = (startStr || "").trim();
    destStr = (destStr || "").trim();

    if (!startStr || !destStr) {
      setRouteCoords([]);
      return;
    }

    setIsRouting(true);
    setError("");

    try {
      // 1) geocode both (your backend endpoint)
      const startRes = await fetch(`/geocode?q=${encodeURIComponent(startStr)}`);
      const destRes = await fetch(`/geocode?q=${encodeURIComponent(destStr)}`);

      if (!startRes.ok || !destRes.ok) throw new Error("Geocode request failed");

      const startData = await startRes.json();
      const destData = await destRes.json();

      if (!Array.isArray(startData) || startData.length === 0) {
        setError("Couldn't find starting location (in India). Try a more specific name.");
        setRouteCoords([]);
        setIsRouting(false);
        return;
      }
      if (!Array.isArray(destData) || destData.length === 0) {
        setError("Couldn't find destination (in India). Try a more specific name.");
        setRouteCoords([]);
        setIsRouting(false);
        return;
      }

      const startLat = parseFloat(startData[0].lat);
      const startLon = parseFloat(startData[0].lon);
      const destLat = parseFloat(destData[0].lat);
      const destLon = parseFloat(destData[0].lon);

      // 2) inside India check
      if (!isInsideIndia(startLat, startLon) || !isInsideIndia(destLat, destLon)) {
        setError("One or both locations are outside India. Please choose locations inside India.");
        setRouteCoords([]);
        setIsRouting(false);
        return;
      }

      // 3) ask your backend route proxy for path geometry
      // backend expects start and end as "lat,lon"
      const routeRes = await fetch(
        `/route?start=${encodeURIComponent(`${startLat},${startLon}`)}&end=${encodeURIComponent(
          `${destLat},${destLon}`
        )}`
      );

      if (routeRes.ok) {
        const routeJson = await routeRes.json();
        if (routeJson && Array.isArray(routeJson.coords) && routeJson.coords.length > 0) {
          // normalize coords to [lat, lon] for Leaflet
          const normalized = normalizeCoordsArray(routeJson.coords);
          setRouteCoords(normalized);
          setIsRouting(false);
          setError("");
          return;
        }
      }

      // fallback to straight pair (lat,lon)
      setRouteCoords([
        [startLat, startLon],
        [destLat, destLon],
      ]);
      setError("Routing unavailable — showing straight line fallback.");
      setIsRouting(false);
    } catch (err) {
      console.error("Routing error:", err);
      setError("Could not compute route — try again later.");
      setRouteCoords([]);
      setIsRouting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/rides/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId: user?.id }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to create ride");
        return;
      }

      setSuccess("Ride created successfully!");
      setForm({
        startLocation: "",
        destination: "",
        date: "",
        time: "",
        seats: "",
        price: "",
      });
      setRouteCoords([]);
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  const defaultCenter = [20.5937, 78.9629];

  return (
    <div className="fixed right-0 p-6 w-full md:w-3/4 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Ride</h1>

      {/* grid with items-stretch so both columns have equal height */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* LEFT — FORM (flex column so height is stretchable) */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Ride Details</h2>

          {error && <p className="text-red-600 mb-2">{error}</p>}
          {success && <p className="text-green-600 mb-2">{success}</p>}

          {/* make the form scroll inside the left card if it grows */}
          <div className="flex-1 overflow-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Starting Location</label>
                <input
                  type="text"
                  name="startLocation"
                  value={form.startLocation}
                  onChange={handleChange}
                  placeholder="Enter pickup point"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="Enter drop-off point"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block mb-1 font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div className="w-1/2">
                  <label className="block mb-1 font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block mb-1 font-medium text-gray-700">Seats</label>
                  <input
                    type="number"
                    name="seats"
                    value={form.seats}
                    onChange={(e) => setForm({ ...form, seats: e.target.value })}
                    min="1"
                    max="6"
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div className="w-1/2">
                  <label className="block mb-1 font-medium text-gray-700">Price per Seat</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    min="0"
                    required
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Create Ride
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT — MAP ONLY (flex column so map can take remaining height) */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Route Preview</h2>

          {/* make the map fill remaining vertical space; this keeps it inside the card */}
          <div className="border rounded-lg flex-1 overflow-hidden">
            <MapContainer center={defaultCenter} zoom={5} className="h-full w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

              {routeCoords && routeCoords.length >= 2 && (
                <>
                  {/* Fit to first & last points */}
                  <FitBounds coords={[routeCoords[0], routeCoords[routeCoords.length - 1]]} />
                  <Marker position={routeCoords[0]} />
                  <Marker position={routeCoords[routeCoords.length - 1]} />
                  <Polyline positions={routeCoords} pathOptions={{ color: "green", weight: 4 }} />
                </>
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
