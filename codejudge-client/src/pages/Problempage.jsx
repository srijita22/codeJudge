import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProblemPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // Fetch problem data on mount
  useEffect(() => {
  axios.get(`http://localhost:5000/api/problems/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => setProblem(res.data))
    .catch((err) => {
      console.error("❌ Error fetching problem:", err);
      setProblem({ title: "Unauthorized", statement: "You need to login." });
    });
}, [id]);


 const handleRun = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/execute",
      {
        code,
        language: "cpp",
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



  // Handle submission (against test cases)
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/submit", {
        code,
        language_id: 54, // Judge0 C++ ID
        problemId: id,
      },
      {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }
    });

      setOutput(res.data.verdict || "✅ Submitted");
      alert(res.data.verdict || "✅ Submitted");
    } catch (err) {
  console.error("❌ Submission failed:", err);
  if (err.response) {
    console.log("📦 Response data:", err.response.data);
    console.log("📊 Status code:", err.response.status);
    alert(`❌ Submission failed: ${err.response.status} - ${err.response.data.verdict || "Unknown error"}`);
  } else {
    alert("❌ Submission failed: No response from server");
  }
}

  };

  return (
    <div style={{ padding: "20px" }}>
      {problem ? (
        <>
          <h2>{problem.title}</h2>
          <p>{problem.statement}</p>

          <h3>Code:</h3>
          <textarea
            rows="12"
            cols="80"
            placeholder="// Write your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <br />

          <h3>Custom Input (for Run only):</h3>
          <textarea
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

          <h3>Output:</h3>
          <pre>{output}</pre>
        </>
      ) : (
        <p>Loading problem...</p>
      )}
    </div>
  );
}

