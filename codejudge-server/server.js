const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",  // React frontend
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const executeRoute = require("./routes/execute");
const submitRoute = require("./routes/submit");
const problemRoutes = require("./routes/problems");
const submissionRoutes=require("./routes/submissions");
const verifyToken = require("./middleware/auth");

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/execute", executeRoute);
app.use("/api/submit", submitRoute);
app.use("/api/submissions", submissionRoutes);
app.use("/api/problems", verifyToken, problemRoutes);  // Protected

// DB + Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });


