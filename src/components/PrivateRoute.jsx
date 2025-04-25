// src/components/ProtectedRoute.js
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const debounceTimer = useRef(null);

  const verifyToken = async () => {
    const token = localStorage.getItem("csrf_token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://104.236.100.170/api/verify_token", {
        headers: {
          "csrf-token": token,
        },
      });

      if (response.status === 200) {
        setIsVerified(true);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("csrf_token");
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        console.error("Token check failed:", error.message);
      }
    }
  };

  useEffect(() => {
    // First time token check on mount
    verifyToken();

    const handleUserActivity = () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // Debounce the token verification to run only after 5000ms of no activity
      debounceTimer.current = setTimeout(() => {
        verifyToken();
      }, 5000); // 5000ms debounce delay
    };

    // Add event listeners for user interactions (click, keydown, mousemove, focus)
    window.addEventListener("click", handleUserActivity);
    

    return () => {
      // Cleanup event listeners and debounce timer
      window.removeEventListener("click", handleUserActivity);
  
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [navigate]);

  return isVerified ? children : null;
};

export default ProtectedRoute;
