import { useState } from "react";

export default function CreateRide() {
  const [form, setForm] = useState({
    startLocation: "",
    destination: "",
    date: "",
    time: "",
    seats: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ride Created:", form);
  };

  return (
    <div className="fixed right-0 p-6 w-full md:w-3/4 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Ride</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ---------------------- FORM CARD ---------------------- */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg"
          style={{
            background: "white",
            borderRadius: ".75rem",
            boxShadow: "0 6px 18px rgba(10,10,10,0.06)",
          }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Ride Details</h2>

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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-1 font-medium text-gray-700">Available Seats</label>
                <input
                  type="number"
                  name="seats"
                  value={form.seats}
                  onChange={handleChange}
                  min="1"
                  max="6"
                  placeholder="1-6"
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
                  onChange={handleChange}
                  min="0"
                  placeholder="₹"
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

        {/* ---------------------- ROUTE PREVIEW CARD ---------------------- */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg"
          style={{
            background: "white",
            borderRadius: ".75rem",
            boxShadow: "0 6px 18px rgba(10,10,10,0.06)",
          }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Route Preview</h2>

          <div className="border rounded-lg h-64 flex items-center justify-center text-gray-500">
            {/* Placeholder: Replace with Map / Steps / Polyline Renderer later */}
            <div className="text-center">
              <div className="text-lg font-semibold">Route will appear here</div>
              <p className="text-sm mt-1">Map or step-by-step route preview</p>
            </div>
          </div>

          {/* Live route text preview */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-2">Selected Route</h3>

            <div className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-700">
              <p><span className="font-medium">From:</span> {form.startLocation || "—"}</p>
              <p><span className="font-medium">To:</span> {form.destination || "—"}</p>
              <p><span className="font-medium">Date:</span> {form.date || "—"}</p>
              <p><span className="font-medium">Time:</span> {form.time || "—"}</p>
              <p><span className="font-medium">Seats:</span> {form.seats || "—"}</p>
              <p><span className="font-medium">Price per seat:</span> {form.price ? `₹${form.price}` : "—"}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
