const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Add CORS before any routes
app.use(cors({
  origin: "http://localhost:3000",   // Your React frontend
  credentials: true
}));

app.use(express.json());

// ✅ Your routes
const problemRoutes = require("./routes/problems");
app.use("/api/problems", problemRoutes);

// ✅ MongoDB connection + server listen
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
  });
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

