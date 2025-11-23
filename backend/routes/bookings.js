// backend/routes/bookings.js
import express from "express";
import { db } from "../db.js"; // import your MySQL connection

const router = express.Router();

// POST /bookings
router.post("/", (req, res) => {
  const { user_id, ride_id } = req.body;

  if (!user_id || !ride_id) {
    return res.status(400).json({ message: "user_id and ride_id are required" });
  }

  // Check if ride exists and has seats available
  db.query("SELECT * FROM rides WHERE id = ?", [ride_id], (err, rideResults) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (rideResults.length === 0) return res.status(404).json({ message: "Ride not found" });

    const ride = rideResults[0];
    if (ride.seats <= 0) return res.status(400).json({ message: "No seats available" });

    // Check if user already booked this ride
    db.query(
      "SELECT * FROM bookings WHERE user_id = ? AND ride_id = ?",
      [user_id, ride_id],
      (err, bookingResults) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        if (bookingResults.length > 0)
          return res.status(400).json({ message: "You already booked this ride" });

        // Insert booking
        db.query(
          "INSERT INTO bookings (user_id, ride_id) VALUES (?, ?)",
          [user_id, ride_id],
          (err, insertResult) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });

            // Decrement ride seats
            db.query(
              "UPDATE rides SET seats = seats - 1 WHERE id = ?",
              [ride_id],
              (err) => {
                if (err) console.error("Failed to decrement seats:", err);
                res.status(201).json({ message: "Ride booked successfully", bookingId: insertResult.insertId });
              }
            );
          }
        );
      }
    );
  });
});

// GET /bookings/:userId - get all rides booked by a user with driver name
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  if (!userId) return res.status(400).json({ message: "User ID required" });

  const query = `
    SELECT 
      b.id AS bookingId, 
      r.id AS rideId,
      r.startLocation,
      r.destination,
      r.date,
      r.time,
      r.seats,
      r.price,
      u.username AS driverName
    FROM bookings b
    JOIN rides r ON b.ride_id = r.id
    JOIN users u ON r.user_id = u.id
    WHERE b.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (results.length === 0) return res.status(404).json({ message: "No bookings found" });

    res.json(results);
  });
});

export default router;
