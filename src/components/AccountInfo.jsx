import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'; // Assuming you have a UserNavbar component
import { useNavigate } from "react-router-dom";

const AccountInfo = () => {
  const csrf_token = localStorage.getItem("csrf_token");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem('user_name'); // Get logged-in user

    if (!storedUserName) {
      console.warn("No user found. Redirecting to login...");
      navigate('/login'); // Redirect if not logged in
      return;
    }

    fetch('http://104.236.100.170:8000/show_user_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`, // Add this if needed
      },
      body: JSON.stringify({  csrf_token: csrf_token

      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch user data:', err.message);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-25 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!userData || !userData.user_info) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-25 text-center">
        <p className="text-red-500">Failed to load user data.</p>
      </div>
    );
  }

  const { user_name, agent_name, calling_name } = userData.user_info;

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-25 text-center">
        <div className="relative">
          <h2 className="text-center p-2   text-black h-12 pt-2 font-bold rounded-md text-[30px] mb-4">
            User Info
            <button
              type="button"
              className="absolute right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
              onClick={() => navigate("/home")}
            >
              &times;
            </button>
          </h2>
        </div>
        <ul className="space-y-3 text-left">
          <li className="text-black-800 pt-1 rounded-lg font-medium mb-3">
            Username: <p className="text-gray-800 p-1 rounded-lg border border-gray-500 font-medium"> {user_name}</p> 
          </li>
          <li className="text-black-800 pt-1 rounded-lg font-medium mb-3">
            Agent Name: <p className="text-gray-800 p-1 rounded-lg border border-gray-500 font-medium"> {agent_name}</p>
          </li>
          <li className="text-balck-800 pt-1 font-medium">
            Calling Name:  <p className="text-gray-800 p-1 rounded-lg border border-gray-500 font-medium"> {calling_name}</p>
          </li>
        </ul>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/edit-user")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;