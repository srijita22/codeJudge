const express= require("express");
const router= express.Router();


const Submission = require("../models/Submission");
const verifyToken=require("../middleware/auth");

router.get("/my-submissions", verifyToken, async(req, res) =>{
    const submissions= await Submission.find({
        userId:req.user.id
    }).populate("problemId", "title")
    .sort({submittedAt:-1});

    res.json(submissions);
});

router.get(
  "/:submissionId",
  verifyToken,
  async (req, res) => {
    try {

      const submission =
        await Submission.findById(
          req.params.submissionId
        )
        .populate(
            "problemId",
            "title difficulty"

        );

      if (!submission) {
        return res.status(404).json({
          message: "Submission not found"
        });
      }
      if(submission.userId.toString()!=req.user.id){
        return res.status(403).json({
            message:"Unauthorized"
        });
      }

      res.json(submission);

    } catch (err) {

      res.status(500).json({
        message: err.message
      });

    }
  }
);

module.exports=router;
