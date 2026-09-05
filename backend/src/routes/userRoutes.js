
const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

// Create User
router.post("/", createUser);

// Login User
router.post("/login", loginUser);

// Get All Users - Protected
router.get("/", authenticateToken, getUsers);

// Get User by ID
router.get("/:id", getUserById);

// Update User
router.put("/:id", authenticateToken, updateUser);
// Delete User
router.delete("/:id", authenticateToken, deleteUser);

module.exports = router;