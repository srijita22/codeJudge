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


    return(
        <div>

            <h1>
                Submission Details
            </h1>


            <h2>
                {submission.problemId.title}
            </h2>


            <p>
                Language:
                {submission.language}
            </p>


            <p>
                Verdict:
                {submission.verdict}
            </p>


            <p>
                Submitted At:
                {
                new Date(
                    submission.submittedAt
                ).toLocaleString()
                }
            </p>


            <h3>
                Code
            </h3>

            <pre>
                {submission.code}
            </pre>


        </div>
    )

}