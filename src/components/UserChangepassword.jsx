import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserNavbar from './UserNavbar'; // Importing the UserNavbar component

const ChangePassword = () => {
  const csrf_token = localStorage.getItem("csrf_token"); // Retrieve the CSRF token from local storage
  const navigate = useNavigate(); // Hook for navigation
  const [user_name, setUsername] = useState('');
  const [user_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async (e) => {
   
    e.preventDefault();

    if (!user_name || !user_password || !new_password) {
      setError('Please fill all fields');
      return;
    }

    try {
      setError('');
      setMessage('');

      const bodyData = {
       
        csrf_token: csrf_token,
        user_password: user_password.trim(),
        new_password: new_password.trim(),
      };

      console.log("Sending request to backend:", bodyData);

      const response = await fetch('http://104.236.100.170/api/change_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // "X-CSRFToken": csrf_token,
        },
        body: JSON.stringify(bodyData),

      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (response.ok && data.Response === "Success") {
        setMessage(data.Message || 'Password changed successfully');
        setTimeout(() => {
          setUsername('');
          setOldPassword('');
          setNewPassword('');
        }, 1000);
      } else {
        setError(data.Message || 'Failed to change password');
      }
      

    } catch (err) {
      console.error("Error occurred:", err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <UserNavbar />
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      
      <form
        onSubmit={handleChangePassword}
        className="relative bg-white p-4 rounded-2xl shadow-xl w-full max-w-2xl mx-auto "
      >
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
            onClick={() => navigate("/userpanel")}
          >
            &times;
          </button>
        <h1 className="text-center p-2 text-black h-12 pt-2 font-bold rounded-md text-[30px] mt-2">
          Change Password
        </h1>

        <div className="w-full mx-auto p-6 space-y-5">
          {/* Username */}
          <div className="space-y-1">
            <label className="block text-sm font-medium mb-1" htmlFor="user_name">
              Username
            </label>
            <input
              id="user_name"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="user_name"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Old Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium mb-1" htmlFor="old-password">
              Old Password
            </label>
            <input
              id="old-password"
              name="current-password"
              type="password"
              autoComplete="current-password"
              placeholder="old password"
              value={user_password}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium mb-1" htmlFor="new-password">
              New Password
            </label>
            <input
              id="new-password"
              name="new-password"
              type="password"
              autoComplete="new-password"
              placeholder="new password"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error / Success messages */}
          {error && <p className="text-red-600 font-semibold">{error}</p>}
          {message && <p className="text-green-600 font-semibold">{message}</p>}

          <div className="buttons w-full">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 mx-auto mt-6"
            >
              Set Password
            </button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ChangePassword;
