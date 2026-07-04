import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ProblemPanel from "../components/ProblemPanel";
import EditorPanel from "../components/EditorPanel";
import BottomPanel from "../components/BottomPanel";

export default function ProblemPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [verdict, setVerdict] = useState("");

  const navigate= useNavigate();
  // Fetch problem data on mount
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/problems/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setProblem(res.data))
      .catch((err) => {
        console.error("❌ Error fetching problem:", err);
        setProblem({ title: "Unauthorized", description: "You need to login." });
      });
  }, [id]);

  // Handle Run with custom input
  
 const handleRun = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/execute",
      {
        code,
        language: language,
        input,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    setOutput(res.data.output || res.data.error || "⚠️ No output returned");
    
  } catch (err) {
    console.error("❌ Error during run:", err);
    setOutput("❌ Run failed");
  }
};

  // Handle Submit (against test cases)
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/submit",
        { code, language, problemId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Set output to show stdout/stderr if available
      const combinedOutput =
        (res.data.stdout ? `Output:\n${res.data.stdout}\n\n` : "") +
        (res.data.stderr ? `Error:\n${res.data.stderr}\n\n` : "") +
        (res.data.error ? `Error:\n${res.data.error}\n\n` : "");

      setOutput(combinedOutput || "");
      setVerdict(res.data.verdict || "✅ Submitted");
      alert(res.data.verdict || "✅ Submitted");
    } catch (err) {
      console.error("❌ Submission failed:", err);
      setOutput("");
      if (err.response) {
        console.log("📦 Response data:", err.response.data);
        console.log("📊 Status code:", err.response.status);
        setVerdict(`❌ Submission failed: ${err.response.status} - ${err.response.data.verdict || "Unknown error"}`);
        alert(`❌ Submission failed: ${err.response.status} - ${err.response.data.verdict || "Unknown error"}`);
      } else {
        setVerdict("❌ Submission failed: No response from server");
        alert("❌ Submission failed: No response from server");
      }
    }
  };

return (
  <div className="fixed inset-x-0 top-0 bottom-0 bg-background p-4">
    {problem ? (
      <div className="grid h-full grid-cols-[40%_60%] gap-4">
        {/* left panel */}
        {/* problme panel in components */}
        <ProblemPanel
          title={problem.title}
          difficulty={problem.difficulty}
          description={problem.description}
          verdict={verdict}
        />
        {/* right panel */}
        <div className="grid h-full grid-rows-[1fr_220px] gap-4">
          {/* has top bar and code editor */}
          <EditorPanel
            language={language}
            setLanguage={setLanguage}
            code={code}
            setCode={setCode}
            handleRun={handleRun}
            handleSubmit={handleSubmit}
            navigate={navigate}
            verdict={verdict}
          />
          {/* has input and output */}
          <BottomPanel input={input} setInput={setInput} output={output} />
        </div>
      </div>
    ) : (
      <div className="flex h-full items-center justify-center">
        <p className="text-secondaryText text-xl">Loading Problem.</p>
      </div>
    )}
  </div>
);
}
