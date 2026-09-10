const express = require("express");
const cors = require("cors");
const pool = require("./db");

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Smart Campus Backend API is running!");
});

// Test project route
app.get("/api/test-project-route", (req, res) => {
  res.json({
    message: "Project routes are connected!",
  });
});

// Test PostgreSQL connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Database connected successfully!",
      time: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});