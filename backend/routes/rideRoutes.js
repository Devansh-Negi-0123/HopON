// rideRoutes.js
import express from "express";
import {db} from "../db.js"; // adjust path to your MySQL connection

const router = express.Router();

console.log("rideRoutes loaded");

router.post("/create", async (req, res) => {
  try {
    const { userId, startLocation, destination, date, time, seats, price } = req.body;

    if (!userId) return res.status(400).json({ message: "User not logged in" });

    const sql = `
      INSERT INTO rides
      (user_id, startLocation, destination, date, time, seats, price)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [userId, startLocation, destination, date, time, seats, price];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("CREATE RIDE ERROR:", err.sqlMessage || err.message);
        return res.status(500).json({ message: "Database error" });
      }

      return res.json({ message: "Ride created successfully", rideId: result.insertId });
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/test", (req, res) => {
  res.send("Ride route is working");
});

// Get all rides
router.get("/", (req, res) => {
  const sql = "SELECT * FROM rides";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("FETCH RIDES ERROR:", err.sqlMessage || err.message);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

// Search rides by startLocation, destination, date, seats
router.get("/search", (req, res) => {
  console.log("Search route hit!", req.query);
  const { startLocation, destination, date, seats } = req.query;

  // Build the base SQL
  let sql = "SELECT * FROM rides WHERE 1=1";
  const values = [];

  if (startLocation) {
    sql += " AND startLocation = ?"; // <-- use camelCase column name
    values.push(startLocation);
  }
  if (destination) {
    sql += " AND destination = ?";
    values.push(destination);
  }
  if (date) {
    sql += " AND date = ?";
    values.push(date);
  }
  if (seats) {
    sql += " AND seats >= ?";
    values.push(seats);
  }

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("SEARCH RIDES ERROR:", err.sqlMessage || err.message);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results); // returns an array
  });
});

// Assuming you are using Express and a MySQL connection `db`
router.post("/byIds", async (req, res) => {
  try {
    const { ids } = req.body; // expects { ids: [1,2,3] }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid ride IDs" });
    }

    // Create placeholders for parameterized query
    const placeholders = ids.map(() => "?").join(",");
    const query = `SELECT * FROM rides WHERE id IN (${placeholders})`;

    db.query(query, ids, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }
      res.json(results);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
