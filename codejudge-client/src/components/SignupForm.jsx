import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
      });
      alert("Signup successful");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="inp-container">
      <div className="inp-form">
        <h2>SIGNUP</h2>
    <form className="form" onSubmit={handleSignup}>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Signup</button>
    </form>
    <p>Login to your account! <Link to="/login">click here</Link></p>
    </div>
    </div>
  );
}
