import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MySubmissions() {

  const navigate = useNavigate();  
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {

  const fetchSubmissions = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/submissions/my-submissions",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSubmissions(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  fetchSubmissions();

}, []);


if (submissions.length === 0) {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primaryText">
          No Submissions Yet
        </h2>
        <p className="mt-3 text-secondaryText">
          Solve a problem and submit your solution to see it here.
        </p>
      </div>
    </div>
  );
}

return (
  <div className="fixed inset-0 bg-background px-8 py-6 overflow-auto">
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primaryText">
            My Submissions
          </h1>

          <p className="mt-2 text-secondaryText">
            View all of your previous submissions.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card px-4 py-2 text-secondaryText">
          Total :{" "}
          <span className="font-semibold text-primaryText">
            {submissions.length}
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full">
          <thead className="bg-surface border-b border-border">
            <tr className="text-left">
              <th className="px-6 py-4 text-secondaryText font-semibold">
                Problem
              </th>

              <th className="px-6 py-4 text-secondaryText font-semibold">
                Language
              </th>

              <th className="px-6 py-4 text-secondaryText font-semibold">
                Verdict
              </th>

              <th className="px-6 py-4 text-secondaryText font-semibold">
                Submitted
              </th>

              <th className="px-6 py-4 text-secondaryText font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((submission) => {
              const verdictClass =
                submission.verdict === "Accepted"
                  ? "bg-success/20 text-success"
                  : submission.verdict === "Wrong Answer"
                    ? "bg-error/20 text-error"
                    : "bg-warning/20 text-warning";

              return (
                <tr
                  key={submission._id}
                  className="border-b border-border transition hover:bg-surface"
                >
                  <td className="px-6 py-5 font-medium text-primaryText">
                    {submission.problemId.title || "Unknown Problem"}
                  </td>

                  <td className="px-6 py-5 text-secondaryText">
                    {submission.language}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${verdictClass}`}
                    >
                      {submission.verdict}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-secondaryText">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </td>

                  <td className="px-6 py-5">
                    <button
                      onClick={() => navigate(`/submissions/${submission._id}`)}
                      className="rounded-lg border border-border bg-background px-4 py-2 font-medium text-primaryText transition hover:border-accent hover:text-accent"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}

export default MySubmissions;