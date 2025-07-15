const express = require("express");
const axios   = require("axios");
const mongoose = require("mongoose");
const router  = express.Router();
const Problem = require("../models/Problem");   // ← NEW

// POST /api/submit
router.post("/", async (req, res) => {
  const { code, language_id, problemId } = req.body;
  console.log("✅ /api/submit HIT. problemId:", problemId);

  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    return res.status(400).json({ verdict: "❌ Invalid problemId" });
  }

  // 1️⃣ Fetch problem by _id from MongoDB
  const problem = await Problem.findById(problemId).lean();
  if (!problem) {
    return res.status(404).json({ verdict: "❌ Problem not found" });
  }

  // 2️⃣ Loop through test cases
  for (let i = 0; i < problem.testCases.length; i++) {
  const test = problem.testCases[i];
  const input = test.input || "";
  const expectedOutput = (test.output || "").trim();
console.log(code);
console.log("📥 stdin sent to Judge0:", input);

  try {
    const judgeRes = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true",
      {
        source_code: Buffer.from(code).toString('base64'),

        stdin: Buffer.from(input).toString('base64'),
        language_id,
        
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key":"413ead16cdmsh0fc7a4edac69d85p11e8f9jsn76315801ca7f",
        },
      }

    );
    console.log("🧾 Judge0 Response:", judgeRes.data);
if (judgeRes.data.compile_output) {
  const error = Buffer.from(judgeRes.data.compile_output, 'base64').toString('utf-8');
  console.error("🔍 Compile error:\n", error);
}

    const stdout = Buffer.from(judgeRes.data.stdout || "", 'base64').toString('utf-8').trim();
const actualOutput = stdout;

 console.log(`🧪 Test ${i + 1}`);
console.log("🔹 Expected:", JSON.stringify(expectedOutput));
console.log("🔸 Actual:", JSON.stringify(actualOutput));

    if (actualOutput !== expectedOutput) {
      return res.json({ verdict: `❌ Wrong Answer on Test ${i + 1}` });
    }
   

  } catch (err) {
    console.error("⚠️ Judge0 error:", err.response?.data || err.message);
    return res.status(500).json({ verdict: "⚠️ Judge0 error", error: err.message });
  }
}


  // 3️⃣ All test cases passed
  res.json({ verdict: "✅ Accepted" });
});

module.exports = router;


