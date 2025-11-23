import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "@shuNegi01",
  database: "hopon",
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
  } else {
    console.log("✅ MySQL Connected!");
  }
});
