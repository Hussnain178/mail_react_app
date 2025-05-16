import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "./Navbar";

const SuperAdminPassword = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); // ✅ Error state added
    const [showNewPassword, setShowNewPassword] = useState(false);

  const csrf_token = localStorage.getItem("csrf_token");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        'http://104.236.100.170/api/show_users',
        {
          headers: {
            'Content-Type': 'application/json',
            'csrf-token': csrf_token,
          },
        }
      );

      const userList = response.data.users || [];
      const filteredUsers = userList.filter(
        (userObj) => Object.keys(userObj)[0]?.trim() !== ''
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      alert('User list load nahi ho saki');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    console.log("🚀 Button clicked - handler triggered");

    setMessage('');
    setError('');

    try {
      const bodyData = {
        user_name: selectedUser,
        new_password: newPassword.trim(),
      };

      console.log("Sending to API:", bodyData); // ✅ Debug

      const response = await fetch('http://104.236.100.170/api/change_password_super', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'csrf-token': csrf_token,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      console.log("API Response:", data); // ✅ Debug

      if (response.ok && data.Response === "Success") {
        setMessage(data.Message || 'Password changed successfully');
        setSelectedUser('');
        setNewPassword('');
      } else {
        setError(data.Message || 'Failed to change password');
      }

    } catch (err) {
      console.error("Error occurred:", err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="  bg-blue-50 min-h-screen">
          <Navbar/>
    <div className="p-6 max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-md space-y-6 mt-10">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="select-user">
        Select User
      </label>
      <select
        className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white"
        id="select-user"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">-- Select User --</option>
        {users.map((userObj, index) => {
          const username = Object.keys(userObj)[0];
          return (
            <option key={index} value={username}>
              {username}
            </option>
          );
        })}
      </select>
    </div>
  
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="new-password">
        New Password
      </label>
      <input
        minLength={8}
        id="new-password"
        type={showNewPassword ? "text" : "password"}
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="button"
        className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
        onClick={() => setShowNewPassword(!showNewPassword)}
      >
        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  
    <button
      className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition duration-150"
      onClick={handleChangePassword}
    >
      Update Password
    </button>
  
    {message && <p className="text-sm text-green-600 text-center">{message}</p>}
    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
  </div>
  </div>
  );
};

export default SuperAdminPassword;
