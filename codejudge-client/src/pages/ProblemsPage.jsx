// ProblemsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProblemsPage() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/problems")
      .then((res) => setProblems(res.data))
      .catch(() => alert("Failed to fetch problems"));
  }, []);

  return (
    <div className="problems-page">
      <h2>📘 Problem List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p) => (
            <tr key={p._id}>
              <td>
                <Link to={`/problems/${p._id}`}>{p.title}</Link>
              </td>
              <td>{p.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
