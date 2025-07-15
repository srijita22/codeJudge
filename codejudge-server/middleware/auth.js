const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;

  // If there's no token, reject the request
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Extract the token part from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    // Verify token using the secret key
    const decoded = jwt.verify(token, "yourSecretKey"); // replace with process.env.JWT_SECRET in production

    // Attach user data to request for further use
    req.user = decoded;

    // Move to the next middleware/route handler
    next();
  } catch (err) {
    // If token is invalid or expired
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
