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
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primaryText">
            Create Account
          </h2>
          <p className="mt-2 text-secondaryText">
            Join CodeJudge and start solving coding challenges.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSignup}>
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
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-secondaryText">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-accent transition hover:text-accentHover"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
