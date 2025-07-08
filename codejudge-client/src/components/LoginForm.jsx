import { useState } from "react";
import axios from "axios";
export default function LoginForm(){
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Logged in successfully");
      // Redirect to homepage
    } catch (err) {
      alert("Login failed");
    }

    };
     return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}