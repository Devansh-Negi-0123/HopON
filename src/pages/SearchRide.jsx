import { useState } from "react";

export default function SearchRides() {
  const [rides] = useState([
    {
      id: 1,
      from: "Chennai",
      to: "Bengaluru",
      date: "2025-09-12",
      time: "09:00",
      price: "₹800",
      seats: 3,
      driver: "Priya R. • ⭐ 4.9",
    },
    {
      id: 2,
      from: "Bengaluru",
      to: "Mysuru",
      date: "2025-09-10",
      time: "08:30",
      price: "₹350",
      seats: 3,
      driver: "Aarav Sharma • ⭐ 4.8",
    },
    {
      id: 3,
      from: "Ahmedabad",
      to: "Vadodara",
      date: "2025-09-10",
      time: "14:00",
      price: "₹250",
      seats: 3,
      driver: "Kunal P. • ⭐ 4.4",
    },
    {
      id: 4,
      from: "Lucknow",
      to: "Kanpur",
      date: "2025-09-11",
      time: "08:00",
      price: "₹200",
      seats: 3,
      driver: "Vikram S. • ⭐ 4.3",
    },
    {
      id: 5,
      from: "Lucknow",
      to: "Kanpur",
      date: "2025-09-11",
      time: "08:00",
      price: "₹200",
      seats: 3,
      driver: "Vikram S. • ⭐ 4.3",
    },
    {
      id: 6,
      from: "Lucknow",
      to: "Kanpur",
      date: "2025-09-11",
      time: "08:00",
      price: "₹200",
      seats: 3,
      driver: "Vikram S. • ⭐ 4.3",
    },
    {
      id: 7,
      from: "Lucknow",
      to: "Kanpur",
      date: "2025-09-11",
      time: "08:00",
      price: "₹200",
      seats: 3,
      driver: "Vikram S. • ⭐ 4.3",
    },
    {
      id: 8,
      from: "Lucknow",
      to: "Kanpur",
      date: "2025-09-11",
      time: "08:00",
      price: "₹200",
      seats: 3,
      driver: "Vikram S. • ⭐ 4.3",
    },
    {
      id: 9,
      from: "Lucknow",
      to: "Kanpur",
      date: "2025-09-11",
      time: "08:00",
      price: "₹200",
      seats: 3,
      driver: "Vikram S. • ⭐ 4.3",
    },
    {
      id: 10,
      from: "Chennai",
      to: "Bengaluru",
      date: "2025-09-12",
      time: "09:00",
      price: "₹800",
      seats: 3,
      driver: "Priya R. • ⭐ 4.9",
    },
    {
      id: 11,
      from: "Bengaluru",
      to: "Mysuru",
      date: "2025-09-10",
      time: "08:30",
      price: "₹350",
      seats: 3,
      driver: "Aarav Sharma • ⭐ 4.8",
    },
    {
      id: 12,
      from: "Ahmedabad",
      to: "Vadodara",
      date: "2025-09-10",
      time: "14:00",
      price: "₹250",
      seats: 3,
      driver: "Kunal P. • ⭐ 4.4",
    },
    {
      id: 13,
      from: "Lucknow",
      to: "Kanpur",
      date: "2025-09-11",
      time: "08:00",
      price: "₹200",
      seats: 3,
      driver: "Vikram S. • ⭐ 4.3",
    },
    {
      id: 14,
      from: "Lucknow",
      to: "Kanpur",
      date: "2025-09-11",
      time: "08:00",
      price: "₹200",
      seats: 3,
      driver: "Vikram S. • ⭐ 4.3",
    },
    {
      id: 15,
      from: "Lucknow",
      to: "Kanpur",
      date: "2025-09-11",
      time: "08:00",
      price: "₹200",
      seats: 3,
      driver: "Vikram S. • ⭐ 4.3",
    },
    {
      id: 16,
      from: "Lucknow",
      to: "Kanpur",
      date: "2025-09-11",
      time: "08:00",
      price: "₹200",
      seats: 3,
      driver: "Vikram S. • ⭐ 4.3",
    },
    {
      id: 17,
      from: "Lucknow",
      to: "Kanpur",
      date: "2025-09-11",
      time: "08:00",
      price: "₹200",
      seats: 3,
      driver: "Vikram S. • ⭐ 4.3",
    },
    {
      id: 18,
      from: "Lucknow",
      to: "Kanpur",
      date: "2025-09-11",
      time: "08:00",
      price: "₹200",
      seats: 3,
      driver: "Vikram S. • ⭐ 4.3",
    }
  ]);

  return (
    <div id="search-rides" className="h-[calc(100vh-4rem)] fixed right-0 w-full md:w-3/4 overflow-y-auto p-6 bg-gray-50 text-gray-800 antialiased">
      {/* Header */}
      <h2 className="text-3xl font-bold">Search Rides</h2>
      <p className="text-gray-600 mt-1">
        Enter your route and date to explore the most suitable rides.
      </p>

      {/* Search Bar */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <input type="text" placeholder="From (City or Area)" className="px-4 py-3 rounded-xl border w-full" />
        <input type="text" placeholder="To (City or Area)" className="px-4 py-3 rounded-xl border w-full" />
        <input type="date" placeholder="dd-mm-yyyy" className="px-4 py-3 rounded-xl border w-full" />
        <input type="number" placeholder="Seats" className="px-4 py-3 rounded-xl border w-full" />
        <button className="px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 w-full">
          Search
        </button>
      </div>

      <div className="mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rides.map((ride) => (
          <div
            key={ride.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
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
                    <div className="text-xl font-bold">{ride.price}</div>
                    <div className="text-xs text-gray-500">{ride.seats} seats</div>
                </div>
            </div>

            <div className="mt-1">
              <div className="text-sm text-gray-700">
                Driver: <span className="font-medium">{ride.driver}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-3">
              <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">
                View
              </button>
              <button className="px-4 py-2 rounded-xl border text-sm font-medium hover:bg-gray-100">
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
