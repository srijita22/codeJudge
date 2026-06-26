
const express = require("express");
const axios = require("axios");
const router = express.Router();
const languages=require("../config/languages");

// POST /api/execute
router.post("/", async (req, res) => {
  const { code, language, input } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Missing code or language" });
  }

  // Language ID mapping
const languageInfo=languages[language.toLowerCase()];
if(!languageInfo) return res.status(400).json({error:"Unsupported language"});
const language_id=languageInfo.id;

  try {
    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: code,
        stdin: input || "",
        language_id: language_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": "413ead16cdmsh0fc7a4edac69d85p11e8f9jsn76315801ca7f",
        },
      }
    );

    const { stdout, stderr, compile_output, status } = response.data;

    // Handle possible errors from Judge0
    if (status && status.description !== "Accepted") {
      return res.json({
        output: `❌ ${status.description}\n${stderr || compile_output || ""}`,
      });
    }

    res.json({
      output: stdout || "✅ No output",
    });
  } catch (error) {
    console.error("❌ Error calling Judge0:", error.message);
    res.status(500).json({ error: "Judge0 execution error" });
  }
});

module.exports = router;
