import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // 👈 Add this line

export default function LoginForm() {
  const [user_name, setUser_name] = useState("");
  const [user_password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 const [showOldPassword, setShowOldPassword] = useState(false); // 👈

  const navigate = useNavigate();
  
  // ✅ Auto-login if already logged in
  // ✅ Auto-login if already logged in
useEffect(() => {
  const token = localStorage.getItem("csrf_token");
  
  if (token) {
    navigate("/home");
  }
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const loginData = { user_name, user_password };

    try {
      const response = await fetch("http://104.236.100.170/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
     

      if (response.ok) {
        localStorage.setItem("csrf_token", data.csrf_token);
        localStorage.setItem("user_name", user_name);
        localStorage.setItem("Message", data.Message); 
       
    

         navigate("/home");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div>
          <label htmlFor="user_name" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            id="user_name"
            type="text"
            required
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label htmlFor="user_password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="user_password"
              type={showOldPassword ? "text" : "password"}
              required
              value={user_password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
           <button
                         type="button"
                         className="absolute top-3 right-3 text-gray-500"
                         onClick={() => setShowOldPassword(!showOldPassword)}
                       >
                         {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                       </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}