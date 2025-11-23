import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // reset error so the red message disappears
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Response status:", res.status);
      console.log("Response OK:", res.ok);
      console.log("Response JSON:", data);      

      // ❌ Backend sends success even without tokens → use res.status instead
      if (res.status !== 200) {
        setError(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // ✅ Clear error (important)
      setError("");

      // ✅ Set auth context
      setIsLoggedIn(true);
      setUser(data.user);

      // ❌ DO NOT CHECK for tokens because backend doesn't send any

      // ✅ Redirect now that login is successful
      navigate("/dashboard");

    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
      <div className="flex flex-col items-center w-full sm:max-w-md">

        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </Link>

        <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>

          {error && (
            <p className="mt-3 text-red-600 text-sm font-medium">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 mt-6">

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 
                focus:ring-4 focus:outline-none focus:ring-blue-300 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link to="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                Sign up
              </Link>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
}
