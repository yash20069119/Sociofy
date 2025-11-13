import { useState } from "react";
import axios from "axios";
import { Link, redirect, useNavigate } from "react-router-dom";

const Login = ({setUser}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.message === "Login successful") {
          setMessage("Login successful!");
          setUser(res.data.user);
          console.log("User:", res.data.user);
          navigate("/home")
        } else {
          setMessage(res.data.message || "Invalid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Login failed. Try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 pr-16 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 bg-green-500 text-white px-2 py-1 rounded"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </form>
        {message && (
          <p className="text-center text-sm text-green-700 mt-4">{message}</p>
        )}
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account? 
          <Link className="text-green-600 cursor-pointer" to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
