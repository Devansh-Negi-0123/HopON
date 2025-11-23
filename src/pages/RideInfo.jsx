import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../leafletFix";
import { AuthContext } from "../context/AuthContext"; // ⬅️ Import AuthContext for user ID

function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 1) {
      map.fitBounds(coords);
    }
  }, [coords, map]);
  return null;
}

export default function RideInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ⬅️ get current user
  const ride = location.state;

  console.log("RideInfo mounted");
  console.log("Current user:", user);
  console.log("Ride from state:", ride);

  if (!ride) {
    return (
      <div className="p-4">
        <p>No ride data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    from,
    to,
    price,
    seats,
    carModel,
    rating,
    driver,
    time,
    date,
    routeCoords: routeCoordsFromState,
    id: rideId,
  } = ride;

  const [routeCoords, setRouteCoords] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState("");
  const [bookingStatus, setBookingStatus] = useState(""); // ⬅️ booking feedback

  async function geocodePlace(place) {
    const q = encodeURIComponent(place);
    const res = await fetch(`/geocode?q=${q}`);
    if (!res.ok) throw new Error("Geocode failed");
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error("No geocode result");
    return { lat: Number(data[0].lat), lon: Number(data[0].lon) };
  }

  async function fetchRouteFromBackend(startLat, startLon, endLat, endLon) {
    const startParam = `${startLat},${startLon}`;
    const endParam = `${endLat},${endLon}`;
    const url = `/route?start=${encodeURIComponent(startParam)}&end=${encodeURIComponent(endParam)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Route proxy failed: ${res.status}`);
    const json = await res.json();
    if (!json || !Array.isArray(json.coords)) throw new Error("No route coords returned");
    return json;
  }

  useEffect(() => {
    let mounted = true;

    const loadRoute = async () => {
      if (Array.isArray(routeCoordsFromState) && routeCoordsFromState.length >= 2) {
        setRouteCoords(routeCoordsFromState.map(pt => [Number(pt[0]), Number(pt[1])]));
        return;
      }

      if (!from || !to) {
        setRouteError("Missing from/to to compute route");
        return;
      }

      setLoadingRoute(true);
      setRouteError("");

      try {
        const start = await geocodePlace(from);
        const end = await geocodePlace(to);

        const routeJson = await fetchRouteFromBackend(start.lat, start.lon, end.lat, end.lon);

        if (mounted) {
          const normalized = routeJson.coords.map(c => [Number(c[0]), Number(c[1])]);
          setRouteCoords(normalized);
        }
      } catch (err) {
        console.error("Route load failed:", err);
        try {
          const start = await geocodePlace(from);
          const end = await geocodePlace(to);

          if (mounted) {
            setRouteCoords([[start.lat, start.lon], [end.lat, end.lon]]);
            setRouteError("Using straight-line fallback.");
          }
        } catch (e) {
          if (mounted) setRouteError("Could not compute route.");
        }
      } finally {
        if (mounted) setLoadingRoute(false);
      }
    };

    loadRoute();
    return () => (mounted = false);
  }, [from, to, routeCoordsFromState]);

  const defaultCenter = routeCoords && routeCoords.length ? routeCoords[0] : [20.5937, 78.9629];

  const distance = 12;
  const duration = Math.round((distance / 40) * 60);
  const arrivalTime = (() => {
    if (!time) return "N/A";
    const [h, m] = time.split(":").map(Number);
    const d = new Date();
    d.setHours(h);
    d.setMinutes(m + duration);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  })();
  const costPerKm = (Number(price || 0) / distance).toFixed(2);

  // ✅ New: handle ride booking
  const handleBookRide = async () => {
    console.log("Attempting to book ride...");
    console.log("Ride ID:", rideId);
    console.log("User ID:", user?.id);

    if (!user?.id) {
      setBookingStatus("You must be logged in to book a ride.");
      return;
    }

    try {
      setBookingStatus("Booking ride...");
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          ride_id: rideId,
        }),
      });

      const data = await res.json();
      console.log("Booking response:", data);

      if (!res.ok) throw new Error(data.message || `Booking failed: ${res.status}`);
      setBookingStatus("Ride booked successfully!");
    } catch (err) {
      console.error(err);
      setBookingStatus("Booking failed. Please try again.");
    }
  };

  return (
    <div className="fixed right-0 p-6 w-full md:w-3/4 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Ride Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Ride Information</h2>

          <div className="flex-1 overflow-auto space-y-3 text-gray-700">
            <p><strong>From:</strong> {from}</p>
            <p><strong>To:</strong> {to}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Departure Time:</strong> {time}</p>
            <p><strong>Estimated Arrival:</strong> {arrivalTime}</p>
            <p><strong>Driver:</strong> {driver}</p>
            <p><strong>Car Model:</strong> {carModel}</p>
            <p><strong>Driver Rating:</strong> ⭐ {rating}</p>
            <p><strong>Seats Available:</strong> {seats}</p>
            <p><strong>Price per Seat:</strong> ₹{price}</p>
            <hr className="my-2" />
            <p><strong>Estimated Distance:</strong> {distance} km</p>
            <p><strong>Estimated Travel Time:</strong> {duration} mins</p>
            <p><strong>Cost per km:</strong> ₹{costPerKm}</p>
            {routeError && <p className="text-red-600">{routeError}</p>}
            {bookingStatus && <p className="mt-2 text-green-700">{bookingStatus}</p>}
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleBookRide}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Book Ride
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Back to Search
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Route Preview</h2>

          <div className="border rounded-lg flex-1 overflow-hidden">
            <MapContainer center={defaultCenter} zoom={7} className="h-full w-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              {routeCoords?.length >= 2 && (
                <>
                  <Marker position={routeCoords[0]} />
                  <Marker position={routeCoords[routeCoords.length - 1]} />
                  <Polyline positions={routeCoords} pathOptions={{ color: "green", weight: 4 }} />
                  <RecenterMap coords={routeCoords} />
                </>
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
