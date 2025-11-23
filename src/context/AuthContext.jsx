import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true); // to handle loading state

  // Load user from localStorage and fetch latest info from backend
  useEffect(() => {
    const initializeUser = async () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
        setIsRegistered(true);

        try {
          // Fetch latest user data from backend
          const token = localStorage.getItem("token"); // assuming you store JWT or session token
          if (token) {
            const res = await fetch("/api/user/me", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            if (res.ok) {
              const data = await res.json();
              setUser(data); // update context with fresh user data
              localStorage.setItem("user", JSON.stringify(data));
            } else {
              // Token invalid or user not found
              logout();
            }
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          logout();
        }
      }
      setLoading(false);
    };

    initializeUser();
  }, []);

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      setIsRegistered(false);
    }
  }, [user]);

  // Login function
  const login = (userData, token) => {
    // Ensure avatar and createdAt are included
    const updatedUser = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      avatar: userData.avatar || null,
      createdAt: userData.createdAt || null,
    };

    setUser(updatedUser);
    setIsLoggedIn(true);
    setIsRegistered(true);
    if (token) localStorage.setItem("token", token); // save token if provided
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setIsRegistered(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isRegistered,
        setIsRegistered,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
