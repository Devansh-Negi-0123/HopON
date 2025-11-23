// routes/users.js
import express from "express";
import { db } from "../db.js"; // Adjust the path to your db connection

const router = express.Router();
console.log("User routes loaded!");

// Get user info + ride statistics
router.get("/:id", (req, res) => {
  const userId = req.params.id;

  // Query user info (updated column names)
  const userQuery = `
    SELECT id, username, email, phone, location, image_url, usersince 
    FROM users 
    WHERE id = ?
  `;
  
  db.query(userQuery, [userId], (err, userResult) => {
    if (err) {
      console.error("USER INFO ERROR:", err.sqlMessage || err.message);
      return res.status(500).json({ message: "Database error" });
    }

    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult[0];

    // Query ride statistics
    const statsQuery = `
      SELECT 
        COUNT(*) AS totalRides,
        SUM(CASE WHEN user_id = ? THEN 1 ELSE 0 END) AS ridesAsDriver
      FROM rides
      WHERE user_id = ?
    `;

    db.query(statsQuery, [userId, userId], (err, statsResult) => {
      if (err) {
        console.error("RIDE STATS ERROR:", err.sqlMessage || err.message);
        return res.status(500).json({ message: "Database error" });
      }

      const stats = statsResult[0];

      // Count rides as passenger
      const passengerQuery = `
        SELECT COUNT(*) AS ridesAsPassenger
        FROM ride_passengers
        WHERE user_id = ?
      `;
      db.query(passengerQuery, [userId], (err, passengerResult) => {
        if (err) {
          console.error("PASSENGER STATS ERROR:", err.sqlMessage || err.message);
          return res.status(500).json({ message: "Database error" });
        }

        const ridesAsPassenger = passengerResult[0]?.ridesAsPassenger || 0;

        // Count saved rides
        const savedQuery = `
          SELECT COUNT(*) AS savedRides
          FROM saved_rides
          WHERE user_id = ?
        `;
        db.query(savedQuery, [userId], (err, savedResult) => {
          if (err) {
            console.error("SAVED RIDES ERROR:", err.sqlMessage || err.message);
            return res.status(500).json({ message: "Database error" });
          }

          const savedRides = savedResult[0]?.savedRides || 0;

          // Send combined response
          res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            location: user.location,
            image: user.image_url, // updated
            usersince: user.usersince,
            totalRides: stats.totalRides,
            ridesAsDriver: stats.ridesAsDriver,
            ridesAsPassenger,
            savedRides,
          });
        });
      });
    });
  });
});

// Update user info
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const { username, email, phone, location, image_url } = req.body;

  const updateQuery = `
    UPDATE users
    SET username = ?, email = ?, phone = ?, location = ?, image_url = ?
    WHERE id = ?
  `;

  db.query(updateQuery, [username, email, phone, location, image_url, userId], (err) => {
    if (err) {
      console.error("UPDATE USER ERROR:", err.sqlMessage || err.message);
      return res.status(500).json({ message: "Database error" });
    }

    // Return updated user info
    const userQuery = `
      SELECT id, username, email, phone, location, image_url, usersince
      FROM users
      WHERE id = ?
    `;
    db.query(userQuery, [userId], (err, result) => {
      if (err) {
        console.error("USER INFO ERROR:", err.sqlMessage || err.message);
        return res.status(500).json({ message: "Database error" });
      }
      res.json(result[0]);
    });
  });
});

export default router;
