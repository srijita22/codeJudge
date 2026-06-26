export default function Homepage(){
    return(
        <div className="home">
            <div className="hero-section">
                <img src="./assets/logo.png" alt="" />
                <div>
                    <h2>Dive into the World of Problem-Solving</h2>
                    <Link to="/login" >Start Solving</Link>
                </div>

            </div>
        </div>
    );
}