const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. Token not provided.",
      });
    }

    // Token format: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied. Invalid token format.",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store user information
    req.user = decoded;

    // Continue to next function
    next();

  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authenticateToken;