import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const DeleteUser = () => {
  const csrf_token = localStorage.getItem("csrf_token");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  // 📦 Backend se users fetch karne ka function
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        'http://104.236.100.170/api/show_users',
        { headers: {
          'Content-Type': 'application/json',
          'csrf-token': csrf_token, // Include CSRF token in headers
        }, }
      );
      const userList = response.data.users || [];

      // ❌ Empty usernames hatao
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

  // ❌ User delete karne ka function
  const handleDelete = async (e) => {
    e.preventDefault();
  
    if (!selectedUserId) {
      alert('Please select a user to delete');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://104.236.100.170/api/delete_user',
        {
          target_user_name: selectedUserId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'csrf-token': csrf_token,
          },
        }
      );
  
      alert('User deleted successfully');
      setSelectedUserId('');
      fetchUsers(); // Refresh list
  
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
  
        if (status === 400) {
          alert(data.Message || 'Failed to delete user'); // Show message from backend
        } else {
          alert('Failed to delete user. Please try again.');
        }
  
        console.error('Error deleting user:', data);
      } else {
        alert('Something went wrong. Please check your network.');
        console.error('Unexpected error:', error);
      }
    }
  };
  

  return (
    <div className="bg-blue-50 min-h-screen">
      <Navbar />
      <div className="flex mt-30 items-center justify-center  px-4">
        <form
          onSubmit={handleDelete}
          className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto mt-2"
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
            onClick={() => navigate("/home")}
          >
            &times;
          </button>

          <h1 className="text-center p-2 text-black h-12 pt-2 font-bold rounded-md text-[30px] mt-2">
            Delete User
          </h1>

          <label className="block text-sm font-medium mb-1 mt-5" htmlFor="select-user">
            Select User:
          </label>

          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600 text-black"
            id="select-user"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
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

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 block mx-auto mt-6"
          >
            Delete User
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteUser;
