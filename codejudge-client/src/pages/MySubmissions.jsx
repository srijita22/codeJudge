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


if(submissions.length==0){
  return(
    <h2>No Submissions yet</h2>
  );
}
  return (
  <div>

    <h1>My Submissions</h1>

    <table>

      <thead>
        <tr>
          <th>Problem</th>
          <th>Language</th>
          <th>Verdict</th>
          <th>Submitted</th>
          <th>View</th>
        </tr>
      </thead>

      <tbody>

        {submissions.map((submission) => (

          <tr key={submission._id}>

            <td>
              {submission.problemId.title || "Unknown Problem"}
            </td>

            <td>
              {submission.language}
            </td>

            <td>
              {submission.verdict}
            </td>

            <td>
              {new Date(
                submission.submittedAt
              ).toLocaleString()}
            </td>

            <td>
               <button
                    onClick={() =>
                        navigate(`/submissions/${submission._id}`)
                    }>View
                    
                </button> 
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>
);
}

export default MySubmissions;