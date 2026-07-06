import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function SubmissionDetails(){
    const { submissionId } = useParams();
    const [submission,setSubmission] = useState(null);

    useEffect(()=>{
        const fetchSubmission = async()=>{
            try{
                const res = await axios.get(
                    `http://localhost:5000/api/submissions/${submissionId}`,
                    {
                        headers:{
                            Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                setSubmission(res.data);

            }
            catch(err){
                console.error(
                    "Error fetching submission:",
                    err
                );
            }
        };
        fetchSubmission();
    },[submissionId]);


    if(!submission){
        return <h2>Loading...</h2>
    }


if (!submission) {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <p className="text-xl text-secondaryText">Loading Submission...</p>
    </div>
  );
}

const verdictClass =
  submission.verdict === "Accepted"
    ? "bg-success/20 text-success"
    : submission.verdict === "Wrong Answer"
      ? "bg-error/20 text-error"
      : "bg-warning/20 text-warning";

return (
  <div className="fixed inset-0 overflow-auto bg-background px-8 py-8">
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-8 text-4xl font-bold text-primaryText">
        Submission Details
      </h1>

      {/* info Card which has details*/}

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-secondaryText">Problem</p>

            <h2 className="mt-2 text-2xl font-semibold text-primaryText">
              {submission.problemId.title}
            </h2>
          </div>

          <div>
            <p className="text-secondaryText">Language</p>

            <h2 className="mt-2 text-xl text-primaryText">
              {submission.language}
            </h2>
          </div>

          <div>
            <p className="text-secondaryText">Verdict</p>

            <span
              className={`mt-2 inline-flex rounded-full px-4 py-2 font-semibold ${verdictClass}`}
            >
              {submission.verdict}
            </span>
          </div>

          <div>
            <p className="text-secondaryText">Submitted At</p>

            <h2 className="mt-2 text-primaryText">
              {new Date(submission.submittedAt).toLocaleString()}
            </h2>
          </div>
        </div>
      </div>

      {/*submitted code wala section */}

      <div className="mt-8 rounded-2xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border bg-surface px-6 py-4">
          <h2 className="text-xl font-semibold text-primaryText">
            Source Code
          </h2>
        </div>

        <pre
          className="
          overflow-auto
          whitespace-pre-wrap
          break-words
          bg-background
          p-6
          font-mono
          text-sm
          text-primaryText
          "
        >
          {submission.code}
        </pre>
      </div>
    </div>
  </div>
);

}