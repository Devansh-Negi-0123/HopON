import profileImage from "../assets/image.png";

export default function Profile() {
  const user = {
    name: "Devansh Negi",
    email: "devansh@example.com",
    phone: "+91 9876543210",
    location: "Bengaluru, India",
    image: profileImage, // replace with actual image
    totalRides: 24,
    ridesAsDriver: 10,
    ridesAsPassenger: 14,
    rating: 4.7,
    savedRides: 5,
  };

  return (
    <div className="h-[calc(100vh-4rem)] fixed right-0 w-full md:w-3/4 overflow-y-auto p-6 bg-gray-50 text-gray-800 antialiased">
      {/* Title */}
      <h2 className="text-3xl font-bold">My Profile</h2>
      <p className="text-gray-600 mt-1">Manage your personal information, preferences, and ride activity.</p>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* Left Column — Profile Card */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <img
            src={user.image}
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto border"
          />

          <h3 className="text-xl font-semibold mt-4">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.location}</p>

          <div className="mt-4 space-y-2 text-sm">
            <p className="font-medium">{user.email}</p>
            <p className="text-gray-700">{user.phone}</p>
          </div>

          <button className="mt-5 w-full px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700">
            Edit Profile
          </button>
        </div>

        {/* Right Column — Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h4 className="text-lg font-semibold">Ride Statistics</h4>

            <div className="grid sm:grid-cols-3 gap-4 mt-4 text-center">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Total Rides</p>
                <p className="text-xl font-semibold">{user.totalRides}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">As Driver</p>
                <p className="text-xl font-semibold">{user.ridesAsDriver}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">As Passenger</p>
                <p className="text-xl font-semibold">{user.ridesAsPassenger}</p>
              </div>
            </div>
          </div>

          {/* Saved Rides */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h4 className="text-lg font-semibold">Saved Rides</h4>
            <p className="text-gray-600 text-sm mt-1">
              You have saved <span className="font-medium">{user.savedRides}</span> rides for later.
            </p>

            <button className="mt-4 px-4 py-2 rounded-xl border text-sm font-medium hover:bg-gray-100">
              View Saved Rides
            </button>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h4 className="text-lg font-semibold">Preferences</h4>

            <div className="space-y-3 mt-3">
              <div>
                <p className="text-sm text-gray-600">Notification Settings</p>
                <select className="mt-1 w-full px-4 py-2 border rounded-xl">
                  <option>Email Only</option>
                  <option>SMS Only</option>
                  <option>Email + SMS</option>
                  <option>None</option>
                </select>
              </div>

              <div>
                <p className="text-sm text-gray-600">Default Ride Role</p>
                <select className="mt-1 w-full px-4 py-2 border rounded-xl">
                  <option>Passenger</option>
                  <option>Driver</option>
                </select>
              </div>
            </div>

            <button className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
