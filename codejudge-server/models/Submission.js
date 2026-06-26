const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  code: { type: String, required: true },
  language: {type:String, required: true},
  failedInput: String,
  expectedOutput: String,
  actualOutput:String,
  verdict: { type: String, default: "Pending" }, // Placeholder for future result (Accepted/Failed)
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
