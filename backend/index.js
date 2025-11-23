import express from "express";
import cors from "cors";

// Import routes (make sure .js extension is included)
import authRoutes from "./routes/auth.js";
import rideRoutes from "./routes/rideRoutes.js";
import userRoutes from "./routes/users.js";
import savedRidesRouter from "./routes/savedRides.js";
import geocodeRoute from "./routes/geocode.js";
import routeRouter from "./routes/route.js";
import bookingsRouter from "./routes/bookings.js"; // ✅ use same name here

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing JSON bodies

// Routes
app.use("/auth", authRoutes);
app.use("/rides", rideRoutes);
app.use("/users", userRoutes);
app.use("/saved_rides", savedRidesRouter);
app.use("/geocode", geocodeRoute);
app.use("/route", routeRouter);
app.use("/bookings", bookingsRouter); // ✅ now matches import

// Optional test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
