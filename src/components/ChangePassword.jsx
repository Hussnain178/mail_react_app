import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Navbar from './Navbar';
import UserNavbar from "./UserNavbar";

const ChangePassword = () => {
  const navigate = useNavigate();
  const csrf_token = localStorage.getItem("csrf_token");
  const [user_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const Message = localStorage.getItem("Message");
    
      let content;
    
      if (Message === "admin") {
        content = <Navbar />;
      }
       else {
        content = <UserNavbar />;
      }

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!user_password || !new_password || !confirm_password) {
      setError('Please fill all fields');
      return;
    }

    if (new_password !== confirm_password) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      setError('');
      setMessage('');

      const bodyData = {
        user_password: user_password.trim(),
        new_password: new_password.trim(),
      };

      const response = await fetch('http://104.236.100.170/api/change_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "csrf-token": csrf_token,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok && data.Response === "Success") {
        setMessage(data.Message || 'Password changed successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.Message || 'Failed to change password');
      }

    } catch (err) {
      console.error("Error occurred:", err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      {content}
      <div className="flex items-center justify-center   px-4">
        <form
          onSubmit={handleChangePassword}
          className="bg-white relative p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto mt-20"
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
            onClick={() => navigate("/home")}
          >
            &times;
          </button>
          <h1 className="text-center p-2 text-black h-12 pt-2 font-bold rounded-md text-[30px] mt-2">
            Change Password
          </h1>

          <div className="w-full mx-auto p-6 space-y-5">
            {/* Old Password with toggle */}
            <div className="space-y-1 relative">
              <label className="block text-sm font-medium mb-1" htmlFor="old-password">
                Old Password
              </label>
              <input
                id="old-password"
                type={showOldPassword ? "text" : "password"}
                placeholder="old password"
                value={user_password}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute top-9 right-3 text-gray-500"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* New Password with toggle */}
            <div className="space-y-1 relative">
              <label className="block text-sm font-medium mb-1" htmlFor="new-password">
                New Password
              </label>
              <input
                minLength={8}
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="new password"
                value={new_password}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute top-9 right-3 text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1 relative">
              <label className="block text-sm font-medium mb-1" htmlFor="confirm-password">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="confirm new password"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute top-9 right-3 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-600 font-semibold">{error}</p>}
            {message && <p className="text-green-600 font-semibold">{message}</p>}

            <div className="buttons w-full">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 mx-auto mt-6"
              >
                Update Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
