import express from "express";
import { db } from "../db.js";

const router = express.Router();

/* ---------------------- REGISTER ---------------------- */
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error saving user" });
    }
    res.status(201).json({
      message: "User registered",
      userId: result.insertId,
    });
  });
});

/* ---------------------- LOGIN ---------------------- */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("📩 Login request received:", req.body);

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

    // Plain comparison because your database stores plain passwords
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.image_url || null,           // optional avatar
        createdAt: user.usersince || null,        // timestamp
      }
    });
  });
});

export default router;
