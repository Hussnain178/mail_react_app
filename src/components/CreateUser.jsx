import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const CreateUser = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    user_name: '',
    agent_name: '',
    calling_name: '',
    user_password: '',
    role: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://104.236.100.170:8000/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: 'success', text: 'User created successfully!' });
        console.log(data);

        setFormData({
          user_name: '',
          agent_name: '',
          calling_name: '',
          user_password: '',
          role: ''
        });
      } else {
        setMessage({ type: 'error', text: 'Something went wrong!' });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <form onSubmit={handleSubmit} className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto mt-20">
          
          {/* Cross Button that redirects */}
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
            onClick={() => navigate("/home")}
          >
            &times;
          </button>

          <h1 className="text-center p-2 text-black h-12 pt-2 font-bold rounded-md text-[30px] mt-2">
            Create User
          </h1>

          {/* Success or Error Message */}
          {message.text && (
            <div className={`text-center mt-4 p-2 rounded-md ${message.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              {message.text}
            </div>
          )}

          {/* Form Fields */}
          <div className="w-full mx-auto p-6 space-y-5">
            {/* First row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium mb-1" htmlFor="user_name">
                  User Name
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="User-name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium mb-1" htmlFor="agent_name">
                  Agent Name
                </label>
                <input
                  id="agent_name"
                  name="agent_name"
                  type="text"
                  value={formData.agent_name}
                  onChange={handleChange}
                  placeholder="Agent-name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Second row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium mb-1" htmlFor="calling_name">
                  Calling Name
                </label>
                <input
                  id="calling_name"
                  name="calling_name"
                  type="text"
                  value={formData.calling_name}
                  onChange={handleChange}
                  placeholder="Calling-name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium mb-1" htmlFor="user_password">
                  User Password
                </label>
                <input
                  id="user_password"
                  name="user_password"
                  type="password"
                  value={formData.user_password}
                  onChange={handleChange}
                  placeholder="User-password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Role selection */}
            <div className="space-y-1">
              <label className="text-[15px] font-bold block truncate">Role</label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    id="role-admin"
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 outline-none focus:ring-blue-500"
                  />
                  <label htmlFor="role-admin" className="block text-sm font-medium mb-1 pl-3">
                    Admin
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="role-user"
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === "user"}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 outline-none focus:ring-blue-500"
                  />
                  <label htmlFor="role-user" className="ml-2 text-sm font-medium text-black-700">
                    Agent
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 block mx-auto mt-6 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
