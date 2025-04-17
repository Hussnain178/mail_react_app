import React, { useEffect, useState } from 'react';
import UserNavbar from './UserNavbar';
import { useNavigate } from "react-router-dom";

const AccountInfo = () => {
  const csrf_token = localStorage.getItem("csrf_token");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem('user_name');

    if (!storedUserName) {
      console.warn("No user found. Redirecting to login...");
      navigate('/login');
      return;
    }

    fetch('http://104.236.100.170:8000/show_user_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ csrf_token })
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
    <div className="bg-black min-h-screen py-10 px-4">
      <UserNavbar />
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10 text-center">
        <div className="relative">
          <h2 className="text-center p-2 text-black h-12 pt-2 font-bold rounded-md text-[30px] mb-4">
            User Info
            <button
              type="button"
              className="absolute right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
              onClick={() => navigate("/userpanel")}
            >
              &times;
            </button>
          </h2>
        </div>
        <ul className="space-y-4 text-left">
          <li className="text-black-800 font-medium">
            Username: 
            <p className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none" >
              {user_name}
            </p>
          </li>
          <li className="text-black-800 font-medium">
            Agent Name:
            <p className="w-full mt-1 h-12 px-3 py-2 text-gray-800 rounded-lg border border-gray-500 font-medium bg-gray-100">
              {agent_name}
            </p>
          </li>
          <li className="text-black-800 font-medium">
            Calling Name:
            <p className="w-full mt-1 h-12 px-3 py-2 text-gray-800 rounded-lg border border-gray-500 font-medium bg-gray-100">
              {calling_name}
            </p>
          </li>
        </ul>
       {/* Edit Button */}
       <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-6 width-[10px] rounded-lg shadow-md transition duration-300"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
