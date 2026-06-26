import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div className="home">
            <div className="hero-section">
          
                <div>
                    <h2>Dive into the World of Problem-Solving</h2>
                    <Link className="lin" to="/login">Start Solving</Link>
                </div>

            </div>
        </div>
    );
}