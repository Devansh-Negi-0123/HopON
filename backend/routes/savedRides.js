import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Save a ride
router.post("/", (req, res) => {
  const { user_id, ride_id } = req.body;
  const query = "INSERT INTO saved_rides (user_id, ride_id) VALUES (?, ?)";
  db.query(query, [user_id, ride_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Ride saved successfully" });
  });
});

// Unsave a ride
router.delete("/:rideId", (req, res) => {
  const rideId = req.params.rideId;
  const { user_id } = req.body; // send user_id in body for DELETE
  const query = "DELETE FROM saved_rides WHERE ride_id = ? AND user_id = ?";
  db.query(query, [rideId, user_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Ride unsaved successfully" });
  });
});

// Correct GET /saved_rides/:userId
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT sr.ride_id, r.startLocation, r.destination, r.date, r.time, r.seats, r.price, u.username AS driver_name
    FROM saved_rides sr
    JOIN rides r ON sr.ride_id = r.id
    JOIN users u ON r.user_id = u.id
    WHERE sr.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

export default router;
