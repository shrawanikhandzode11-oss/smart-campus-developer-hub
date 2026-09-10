const pool = require("../db");

// ===============================
// CREATE PROJECT
// ===============================

const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      status,
    } = req.body;

    // Get logged-in user ID from JWT middleware
    const userId = req.user.id;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        message: "Project title and description are required",
      });
    }

    // Insert project
    const result = await pool.query(
      `INSERT INTO projects
      (title, description, technologies, status, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        title,
        description,
        technologies || "",
        status || "Active",
        userId,
      ]
    );

    res.status(201).json({
      message: "Project created successfully",
      project: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating project",
    });
  }
};


// ===============================
// GET LOGGED-IN USER PROJECTS
// ===============================

const getMyProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT *
       FROM projects
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching projects",
    });
  }
};


// ===============================
// EXPORT FUNCTIONS
// ===============================

module.exports = {
  createProject,
  getMyProjects,
};