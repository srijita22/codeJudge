// ProblemsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search, FileCode2, ArrowRight } from "lucide-react";
export default function ProblemsPage() {
  const [problems, setProblems] = useState([]);
useEffect(() => {
  const fetchProblems = async () => {
    try {
      const token = localStorage.getItem("token"); // 🔐 Retrieve token from localStorage

      const res = await axios.get("http://localhost:5000/api/problems", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Attach token here
        },
      });

      setProblems(res.data);
    } catch (err) {
     // alert("Failed to fetch problems");
      console.error(err);
    }
  };

  fetchProblems();
}, []);


return (
  <div className="min-h-screen bg-background px-6 py-10">
    <div className="mx-auto max-w-5xl">
      {/* header saying problem list */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primaryText">Problem List</h1>
          <p className="mt-2 text-secondaryText">
            {problems.length} Problems Available
          </p>
        </div>
      </div>
      {/* problems */}
      <div className="space-y-4">
        {problems.map((p) => (
          // every problem ka card
          <Link
            key={p._id}
            to={`/problems/${p._id}`}
            className="flex items-center justify-between rounded-xl border border-border bg-card px-6 py-5 transition-all duration-200 hover:border-accent hover:bg-surface hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-surface p-2">
                <FileCode2 className="text-accent" size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-primaryText">{p.title}</h3>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  p.difficulty.toLowerCase() === "easy"
                    ? "bg-success/20 text-success"
                    : p.difficulty.toLowerCase() === "medium"
                      ? "bg-warning/20 text-warning"
                      : "bg-error/20 text-error"
                }`}
              >
                {p.difficulty}
              </span>
              <ArrowRight size={18} className="text-secondaryText" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);
}
