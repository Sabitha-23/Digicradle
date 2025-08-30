const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Signup API
app.post("/auth/signup", async (req, res) => {
  const { name, mobile, password } = req.body;

  if (!name || !mobile || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, mobile, password) VALUES (?, ?, ?)",
      [name, mobile, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Mobile already registered" });
          }
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: "User registered successfully" });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Login API
app.post("/auth/login", (req, res) => {
  const { mobile, password } = req.body;

  db.query("SELECT * FROM users WHERE mobile = ?", [mobile], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, mobile: user.mobile }, "secretkey", { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  });
});

// Add update
app.post("/api/updates", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  const query = "INSERT INTO updates (message) VALUES (?)";
  db.query(query, [message], (err, result) => {
    if (err) {
      console.error("Error inserting update:", err);
      return res.status(500).json({ error: "Failed to add update" });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Get all updates
app.get("/api/updates", (req, res) => {
  const query = "SELECT * FROM updates ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching updates:", err);
      return res.status(500).json({ error: "Failed to fetch updates" });
    }
    res.json(results);
  });
});

// Business posts
app.get("/api/business", (req, res) => {
  db.query("SELECT * FROM business_posts ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

app.post("/api/business", (req, res) => {
  const { username, message } = req.body;
  db.query("INSERT INTO business_posts (username, message) VALUES (?, ?)", [username, message], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to post" });
    res.json({ id: result.insertId, username, message, created_at: new Date() });
  });
});

app.delete("/api/business/:id/:username", (req, res) => {
  const { id, username } = req.params;
  db.query("DELETE FROM business_posts WHERE id = ? AND username = ?", [id, username], (err, result) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    if (result.affectedRows === 0) return res.status(403).json({ error: "Not authorized" });
    res.json({ success: true });
  });
});


// API to post an issue
app.post("/issues", (req, res) => {
  const { user, title, description, department } = req.body;
  const sql = "INSERT INTO issues (user, title, description, department) VALUES (?,?,?,?)";
  db.query(sql, [user, title, description, department], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, user, title, description, department, date_time: new Date() });
  });
});

// Delete an issue (only by creator)
app.delete("/issues/:id", (req, res) => {
  const { id } = req.params;
  const { username } = req.body; // we’ll send the logged-in user’s name

  const sql = "DELETE FROM issues WHERE id = ? AND username = ?";
  db.query(sql, [id, username], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting issue" });
    }
    if (result.affectedRows === 0) {
      return res.status(403).json({ error: "Not allowed to delete this issue" });
    }
    res.json({ success: true, message: "Issue deleted successfully" });
  });
});

// ===== Alerts Module =====

// Add new alert
app.post("/alerts/add", (req, res) => {
  const { username, message } = req.body;
  const sql = "INSERT INTO alerts (username, message) VALUES (?, ?)";
  db.query(sql, [username, message], (err, result) => {
    if (err) {
      console.error("Error inserting alert:", err);
      return res.status(500).json({ message: "Failed to post alert" });
    }
    res.json({ message: "Alert posted successfully!" });
  });
});

// Get all alerts
app.get("/alerts/get", (req, res) => {
  const sql = "SELECT * FROM alerts ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching alerts:", err);
      return res.status(500).json({ message: "Failed to fetch alerts" });
    }
    res.json(results);
  });
});



// API to get all issues
app.get("/issues", (req, res) => {
  const sql = "SELECT * FROM issues ORDER BY date_time DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));



// ✅ Test Database Route
app.get("/test-insert", (req, res) => {
  db.query(
    "INSERT INTO users (name, mobile, password) VALUES ('Test','9999999999','1234')",
    (err, result) => {
      if (err) {
        console.error("Test Insert Error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Insert successful", result });
    }
  );
});


app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
