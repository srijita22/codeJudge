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
  <div className="min-h-screen bg-background flex items-center justify-center px-6">
    <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primaryText">Welcome Back</h2>
          <p className="mt-2 text-secondaryText">
          Login to continue solving problems.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-primaryText placeholder:text-secondaryText outline-none transition duration-200 focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-primaryText placeholder:text-secondaryText outline-none transition duration-200 focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-accent py-3 font-semibold text-white transition-all duration-200 hover:bg-accentHover hover:scale-[1.01] active:scale-[0.98]"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-secondaryText">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-accent transition hover:text-accentHover"
        >
          Register
        </Link>
      </p>
    </div>
  </div>
);
}