import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import profileImage from "../assets/image.png";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${user.id}`);
        const data = await res.json();
        setProfile(data);
        setFormData({
          username: data.username,
          email: data.email,
          phone: data.phone,
          location: data.location,
          image_url: data.image || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const updated = await res.json();
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="h-[calc(100vh-4rem)] fixed right-0 w-full md:w-3/4 overflow-y-auto p-6 bg-gray-50 text-gray-800">
      
      {/* Page Header */}
      <h2 className="text-3xl font-bold">My Profile</h2>
      <p className="text-gray-600 mt-1">Manage your personal information and ride activity.</p>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        
        {/* PROFILE CARD */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 shadow p-6 text-center">
          <img
            src={formData.image_url || profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto border shadow"
          />

          {/* Edit Mode */}
          {editing ? (
            <div className="mt-4 space-y-3 text-left text-sm">
              <input type="text" name="username" value={formData.username} onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg" placeholder="Username" />
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg" placeholder="Email" />
              <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg" placeholder="Phone" />
              <input type="text" name="location" value={formData.location} onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg" placeholder="Location" />
              <input type="text" name="image_url" value={formData.image_url} onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg" placeholder="Image URL" />

              <button onClick={handleSave}
                className="mt-3 w-full px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">Save</button>
              <button onClick={() => setEditing(false)}
                className="mt-1 w-full px-4 py-2 rounded-xl border hover:bg-gray-100">Cancel</button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold mt-4">{profile.username}</h3>
              <p className="text-sm text-gray-600">{profile.location}</p>

              <div className="mt-4 space-y-2 text-sm">
                <p className="font-medium">{profile.email}</p>
                <p className="text-gray-700">{profile.phone}</p>
              </div>

              <button
                className="mt-5 w-full px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* MAIN CARDS */}
        <div className="lg:col-span-2 space-y-6">

          {/* Ride Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow p-6">
            <h4 className="text-lg font-semibold">Ride Statistics</h4>

            <div className="grid sm:grid-cols-3 gap-4 mt-4 text-center">
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500">Total Rides</p>
                <p className="text-2xl font-bold">{profile.totalRides}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500">As Driver</p>
                <p className="text-2xl font-bold">{profile.ridesAsDriver}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500">As Passenger</p>
                <p className="text-2xl font-bold">{profile.ridesAsPassenger}</p>
              </div>
            </div>
          </div>

          {/* Saved Rides */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow p-6">
            <h4 className="text-lg font-semibold">Saved Rides</h4>
            <p className="text-gray-600 text-sm mt-1">
              You have <span className="font-medium">{profile.savedRides}</span> saved rides.
            </p>

            <button onClick={() => navigate("/dashboard/search-ride?saved=true")}
              className="mt-4 px-4 py-2 rounded-xl border text-sm font-medium hover:bg-gray-100">
              View Saved Rides
            </button>
          </div>

          {/* Booked Rides */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow p-6">
            <h4 className="text-lg font-semibold">Booked Rides</h4>

            <p className="text-gray-600 text-sm mt-1">
              You have <span className="font-semibold">{profile.bookedRides || 0}</span> upcoming booked rides.
            </p>

            <button
              onClick={() => navigate("/dashboard/search-ride?booked=true")}
              className="mt-4 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
            >
              View Booked Rides
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
