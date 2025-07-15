const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5001",  // React frontend
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const executeRoute = require("./routes/execute");
const submitRoute = require("./routes/submit");
const problemRoutes = require("./routes/problems");
const verifyToken = require("./middleware/auth");

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/execute", executeRoute);
app.use("/api/submit", submitRoute);
app.use("/api/problems", verifyToken, problemRoutes);  // Protected

// DB + Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

