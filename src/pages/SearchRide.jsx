import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom"; // ⬅️ import useNavigate

export default function SearchRides() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // ⬅️ initialize navigate
  const [rides, setRides] = useState([]);
  const [savedRideIds, setSavedRideIds] = useState([]);
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    seats: "",
  });

  const location = useLocation();
  const searchParamsFromURL = new URLSearchParams(location.search);
  const showSavedOnly = searchParamsFromURL.get("saved") === "true";

  const fetchRides = async () => {
    try {
      const query = new URLSearchParams();
      if (searchParams.from) query.append("startLocation", searchParams.from);
      if (searchParams.to) query.append("destination", searchParams.to);
      if (searchParams.date) query.append("date", searchParams.date);
      if (searchParams.seats) query.append("seats", searchParams.seats);

      const url = query.toString()
        ? `http://localhost:5000/rides/search?${query.toString()}`
        : "http://localhost:5000/rides";

      const response = await fetch(url);
      const data = await response.json();
      setRides(
        data.map((ride) => ({
          id: ride.id,
          from: ride.startLocation || ride.start_location,
          to: ride.destination,
          date: ride.date ? ride.date.split("T")[0] : "",
          time: ride.time,
          price: ride.price, // store as number, append ₹ later
          seats: ride.seats,
          driver: ride.driver_name || `Driver ID: ${ride.user_id} • ⭐ 4.9`,
          carModel: ride.carModel || "N/A",  // optional fields for RideInfo
          rating: ride.rating || 4.9,
        }))
      );
    } catch (err) {
      console.error("Error fetching rides:", err);
    }
  };

  const fetchSavedRides = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`http://localhost:5000/saved_rides/${user.id}`);
      const data = await res.json();

      if (!data.length) {
        setRides([]);
        setSavedRideIds([]);
        return;
      }

      const formattedRides = data.map((ride) => ({
        id: ride.ride_id,
        from: ride.startLocation,
        to: ride.destination,
        date: ride.date ? ride.date.split("T")[0] : "",
        time: ride.time,
        price: ride.price,
        seats: ride.seats,
        driver: ride.driver_name,
        carModel: ride.carModel || "N/A",
        rating: ride.rating || 4.9,
      }));

      setRides(formattedRides);
      setSavedRideIds(data.map((ride) => ride.ride_id));
    } catch (err) {
      console.error("Error fetching saved rides:", err);
    }
  };

  useEffect(() => {
    if (showSavedOnly) fetchSavedRides();
    else fetchRides();
  }, [user, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRides();
  };

  const handleSaveToggle = async (rideId) => {
    if (!user?.id) return;
    try {
      if (savedRideIds.includes(rideId)) {
        await fetch(`http://localhost:5000/saved_rides/${rideId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.id }),
        });
        setSavedRideIds((prev) => prev.filter((id) => id !== rideId));
        if (showSavedOnly) setRides((prev) => prev.filter((r) => r.id !== rideId));
      } else {
        await fetch(`http://localhost:5000/saved_rides`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.id, ride_id: rideId }),
        });
        setSavedRideIds((prev) => [...prev, rideId]);
      }
    } catch (err) {
      console.error("Error saving/unsaving ride:", err);
    }
  };

  return (
    <div
      id="search-rides"
      className="h-[calc(100vh-4rem)] fixed right-0 w-full md:w-3/4 overflow-y-auto p-6 bg-gray-50 text-gray-800 antialiased"
    >
      <h2 className="text-3xl font-bold">Search Rides</h2>
      <p className="text-gray-600 mt-1">
        Enter your route and date to explore the most suitable rides.
      </p>

      {!showSavedOnly && (
        <form className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4" onSubmit={handleSearch}>
          <input
            type="text"
            name="from"
            value={searchParams.from}
            onChange={handleChange}
            placeholder="From (City or Area)"
            className="px-4 py-3 rounded-xl border w-full"
          />
          <input
            type="text"
            name="to"
            value={searchParams.to}
            onChange={handleChange}
            placeholder="To (City or Area)"
            className="px-4 py-3 rounded-xl border w-full"
          />
          <input
            type="date"
            name="date"
            value={searchParams.date}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl border w-full"
          />
          <input
            type="number"
            name="seats"
            value={searchParams.seats}
            onChange={handleChange}
            placeholder="Seats"
            className="px-4 py-3 rounded-xl border w-full"
          />
          <button
            type="submit"
            className="px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 w-full"
          >
            Search
          </button>
        </form>
      )}

      <div className="mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rides.map((ride) => (
          <div
            key={ride.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mt-3">
              <div>
                <h3 className="text-lg font-semibold">
                  {ride.from} → {ride.to}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {ride.date} • {ride.time}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">₹{ride.price}</div>
                <div className="text-xs text-gray-500">{ride.seats} seats</div>
              </div>
            </div>

            <div className="mt-1 text-sm text-gray-700">
              Driver: <span className="font-medium">{ride.driver}</span>
            </div>

            <div className="flex gap-3 mt-3">
              {/* ⬅️ UPDATED VIEW BUTTON */}
              <button
                onClick={() => navigate("/dashboard/ride-info", { state: ride })}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
              >
                View
              </button>

              <button
                onClick={() => handleSaveToggle(ride.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium ${
                  savedRideIds.includes(ride.id)
                    ? "border bg-gray-100 hover:bg-gray-200"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {savedRideIds.includes(ride.id) ? "Unsave" : "Save"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
