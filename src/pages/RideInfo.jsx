import { useLocation, useNavigate } from "react-router-dom";

export default function RideInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const ride = location.state;

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

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ride Details</h1>

      <div className="space-y-2">
        <p><strong>From:</strong> {ride.from}</p>
        <p><strong>To:</strong> {ride.to}</p>
        <p><strong>Driver:</strong> {ride.driver}</p>
        <p><strong>Price:</strong> ₹{ride.price}</p>
        <p><strong>Seats Left:</strong> {ride.seats}</p>
        <p><strong>Car:</strong> {ride.carModel}</p>
        <p><strong>Rating:</strong> ⭐ {ride.rating}</p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-gray-700 text-white rounded-lg"
      >
        Back to Search
      </button>
    </div>
  );
}
