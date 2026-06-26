import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function LoginForm(){
    const[email, setEmail]=useState("");
   
    const navigate=useNavigate();
    const[password, setPassword]=useState("");
    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Logged in successfully");
      navigate("/problems")
      // Redirect to homepage
    } catch (err) {
      alert("Login failed");
    }

    };
     return (
      <div className="inp-container">
        
        <div className="inp-form">
          <h2>LOGIN</h2>
    <form className="form" onSubmit={handleLogin}>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <Link to="/signup">Register</Link></p>
    </div>
    </div>
  );
}