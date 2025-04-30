// src/components/ProtectedRoute.js
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
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
    verifyToken();

    const handleUserActivity = () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        verifyToken();
      }, 5000);
    };

    window.addEventListener("click", handleUserActivity);

    return () => {
      window.removeEventListener("click", handleUserActivity);

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [navigate]);

  const userRole = (localStorage.getItem("Message") || "").toLowerCase();
 // example: "admin" or "agent"
 

  if (isVerified && !allowedRoles.includes(userRole)) {
    return (
      <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
        Access Denied: You are not authorized to view this page.
      </div>
    );
  }

  return isVerified ? children : null;
};

export default PrivateRoute;
