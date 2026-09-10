const express = require("express");

const router = express.Router();

const {
  createProject,
  getMyProjects,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

// ===============================
// CREATE PROJECT
// ===============================

router.post(
  "/",
  authMiddleware,
  createProject
);

// ===============================
// GET LOGGED-IN USER PROJECTS
// ===============================

router.get(
  "/",
  authMiddleware,
  getMyProjects
);

module.exports = router;