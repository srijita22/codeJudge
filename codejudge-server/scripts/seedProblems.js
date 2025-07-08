const mongoose = require("mongoose");
const Problem = require("../models/Problem");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const problems = [
  {
    title: "Two Sum",
    description: "Given an array of integers and a target sum, return the indices of the two numbers that add up to it.",
    difficulty: "Easy",
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" }
    ]
  }
  // Add more problems if you like
];

Problem.insertMany(problems)
  .then(() => {
    console.log("✅ Problems inserted");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Failed to insert problems", err);
    mongoose.disconnect();
  });
