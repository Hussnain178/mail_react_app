import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserNavbar from './UserNavbar';

const UserEditinfo = () => {
  const navigate = useNavigate();
  const csrf_token = localStorage.getItem("csrf_token");
  const UserName = localStorage.getItem("user_name");

  const [formData, setFormData] = useState({
    
    new_agent_name: '',
    new_calling_name: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace empty strings with null
    const payload = {
      ...formData,
      new_agent_name: formData.new_agent_name.trim() === '' ? null : formData.new_agent_name,
      new_calling_name: formData.new_calling_name.trim() === '' ? null : formData.new_calling_name,
    };

    console.log("Submitting this data:", payload); // optional for debugging

    try {
      const response = await fetch('http://104.236.100.170/api/update_information', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "csrf-token": csrf_token,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('User info updated successfully!');
      navigate("/home");

    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update user info');
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <UserNavbar />
      <div className="flex  items-center justify-center bg-black px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white relative p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto mt-20"
        >
          <button
            type="button"
            className="absolute right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
            onClick={() => navigate("/home")}
          >
            &times;
          </button>

          <h1 className="text-center text-black text-[25px] font-bold pb-10">
            Edit User Info
          </h1>

          {/* User Name (readonly) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="user_name">
              User Name
            </label>
            <input
              id="user_name"
              type="text"
              value={UserName}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none bg-gray-100"
            />
          </div>

          {/* Agent Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="new_agent_name">
              Agent Name
            </label>
            <input
              id="new_agent_name"
              type="text"
              placeholder="New Agent Name"
              value={formData.new_agent_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Calling Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="new_calling_name">
              Calling Name
            </label>
            <input
              id="new_calling_name"
              type="text"
              placeholder="New Calling Name"
              value={formData.new_calling_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditinfo;
