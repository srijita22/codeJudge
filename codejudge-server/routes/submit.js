const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const router = express.Router();
const Problem = require("../models/Problem");
const languages = require("../config/languages");
const mapStatus = require("../utils/mapStatus");
const Submission = require("../models/Submission");
const verifyToken = require("../middleware/auth");

// POST /api/submit
router.post("/",verifyToken, async (req, res) => {
  const { code, language, problemId } = req.body;

  if (!languages[language.toLowerCase()]) {
    return res.status(400).json({ verdict: "❌ Unsupported language" });
  }

  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    return res.status(400).json({ verdict: "❌ Invalid problemId" });
  }

  const problem = await Problem.findById(problemId).lean();
  if (!problem) {
    return res.status(404).json({ verdict: "❌ Problem not found" });
  }

  const languageInfo = languages[language.toLowerCase()];
  const language_id = languageInfo.id;

  for (let i = 0; i < problem.testCases.length; i++) {
    const test = problem.testCases[i];
    const input = test.input || "";
    const expectedOutput = (test.output || "").trim();

    try {
      const judgeRes = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true",
        {
          source_code: Buffer.from(code).toString("base64"),
          stdin: Buffer.from(input).toString("base64"),
          language_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": "413ead16cdmsh0fc7a4edac69d85p11e8f9jsn76315801ca7f",
          },
        }
      );

      const compileOutput = judgeRes.data.compile_output
        ? Buffer.from(judgeRes.data.compile_output, "base64").toString("utf-8")
        : null;

      if (compileOutput) {
        await Submission.create({
          userId:req.user.id,
          problemId,
          code,
          language,
          verdict:"Compile Error"
        });
        return res.json({
          verdict: "❌ Compile Error",
          testCase: i + 1,
          error: compileOutput,
        });
      }

      const stdout = Buffer.from(judgeRes.data.stdout || "", "base64").toString("utf-8").trim();
      const stderr = Buffer.from(judgeRes.data.stderr || "", "base64").toString("utf-8").trim();
      const status = mapStatus(judgeRes.data.status.id);

      if (status !== "Accepted") {
        await Submission.create({
          userId:req.user.id,
          problemId,
          code,
          language,
          verdict:status
          });
        return res.json({
          verdict: status === "Time Limit Exceeded" ? "⏱️ TLE" : `❌ ${status}`,
          testCase: i + 1,
          stdout,
          stderr,
        });
      }

      if (stdout !== expectedOutput) {
        await Submission.create({
            userid:req.user.id,
            problemId,
            code,
            language,
            verdict:"Wrong Answer",
            failedInput:input,
            expectedOutput,
            actualOutput:stdout
        });
          return res.json({
              verdict:`❌ Wrong Answer on Test ${i+1}`
           });
      }

    } catch (err) {
      return res.status(500).json({
        verdict: "⚠️ Judge0 error",
        error: err.response?.data || err.message,
      });
    }
  }

  // All test cases passed
  await Submission.create({
    userId:req.user.id,
    problemId,
    code,
    language,
    verdict:"Accepted"
});
  res.json({ verdict: "✅ Accepted" });
});

module.exports = router;
