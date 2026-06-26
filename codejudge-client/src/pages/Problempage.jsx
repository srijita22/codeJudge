import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <div className="problem-page" style={{ padding: "20px",
      
     }}>
      {problem ? (
        <div className="problem-page-container">
        <div className="column-1">
          <div className="question">
          <h2>{problem.title}</h2>
          <p>{problem.description}</p>
          </div>
           <div className="ver">
            <h3>Verdict:</h3>
            <p>{verdict}</p>
          </div>
        </div>
        <div className="column-2">
          <select id="sel" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="cpp">C++</option>
            <option value="python">Python 3</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
          </select>


          <h3>Code:</h3>
          <textarea
            className="input-section"
            rows="15"
            cols="80"
            placeholder="// Write your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <br />

          <h3>Custom Input (for Run only):</h3>
          <textarea
            className="input-section"
            rows="4"
            cols="80"
            placeholder="Enter custom input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <br />

          <button onClick={handleRun}>Run</button>
          <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
            Submit
          </button>
          <button
            onClick={() => navigate("/my-submissions")}
            style={{ marginLeft: "10px" }}
          >
  My Submissions
</button>

          <div className="out">
            <h3>Output:</h3>
            <pre>{output}</pre>
          </div>
        </div>
         
        </div>
      ) : (
        <p>Loading problem...</p>
      )}
    </div>
  );
}
