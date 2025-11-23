import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import HopON from "../../assets/HopON.jpeg";

export default function Register() {
  const { setIsRegistered } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log(res.data);

      // UPDATE CONTEXT FIRST
      setIsRegistered(true);

      // THEN REDIRECT
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
      <div className="flex flex-col items-center w-full sm:max-w-md">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src={HopON}
            alt="logo"
          />
          HopON
        </a>

        <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>

          <form className="space-y-4 md:space-y-6 mt-6" onSubmit={handleSubmit}>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                onChange={handleChange}
                value={formData.username}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your username"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                value={formData.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                value={formData.password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.terms}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 
                  focus:ring-2 focus:ring-blue-500 
                  dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
                  required
                />
              </div>

              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                  I accept the{" "}
                  <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 
              focus:ring-4 focus:outline-none focus:ring-blue-300 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create an account
            </button>

            {/* Already have account */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
