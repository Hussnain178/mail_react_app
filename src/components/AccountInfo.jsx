import React, { useState, useEffect, useRef } from "react";
import Navbar from './Navbar';
import UserNavbar from "./UserNavbar";
import { useNavigate } from "react-router-dom";

const AccountInfo = () => {
  const csrf_token = localStorage.getItem("csrf_token");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasFetchedaccountinfo = useRef(false);
  const Message = localStorage.getItem("Message");
    
      let content;
    
      if (Message === "admin") {
        content = <Navbar />;
      }
       else {
        content = <UserNavbar />;
      }

  useEffect(() => {
    const storedUserName = localStorage.getItem('user_name');
    if (hasFetchedaccountinfo.current) return; // prevent duplicate call
    hasFetchedaccountinfo.current = true;

    if (!storedUserName) {
      console.warn("No user found. Redirecting to login...");
      navigate('/login');
      return;
    }

    fetch('http://104.236.100.170/api/show_user_info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'csrf-token': csrf_token,
      },
      
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
      <div className="p-6 max-w-md mx-auto bg-black rounded-xl shadow-md mt-25 text-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!userData || !userData.user_info) {
    return (
      <div className="p-6 max-w-md mx-auto bg-black rounded-xl shadow-md mt-25 text-center">
        <p className="text-red-500">Failed to load user data.</p>
      </div>
    );
  }

  const { user_name, agent_name, calling_name , role , extension} = userData.user_info;

  return (
    <div className="bg-blue-50 min-h-screen">
    {content}
      <div className="flex    items-center justify-center px-4">
        <div className="bg-white relative p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto mt-20">
          <button
            type="button"
            className="absolute right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
            onClick={() => navigate("/home")}
          >
            &times;
          </button>

          <h1 className="text-center text-black text-[25px] font-bold pb-10">
            User Info
          </h1>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              User Name
            </label>
            <input
              id="username"
              type="text"
              value={user_name}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="agentname">
              Agent Name
            </label>
            <input
              id="agentname"
              type="text"
              value={agent_name}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="callingname">
              Calling Name
            </label>
            <input
              id="callingname"
              type="text"
              value={calling_name}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="role">
             Role
            </label>
            <input
              id="role"
              type="text"
              value={role}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none bg-gray-100"
            />
          </div>
           {Message === "agent" && (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1" htmlFor="extension">
      Extension
    </label>
    <input
      id="extension"
      type="text"
      
      value={extension}
     disabled
 className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none bg-gray-100"
            />
  </div>
)}

          <div className="flex justify-center mt-6">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
              onClick={() => navigate("/edit-user")}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
