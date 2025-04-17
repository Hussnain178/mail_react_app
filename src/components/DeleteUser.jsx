import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const DeleteUser = () => {
  const csrf_token = localStorage.getItem("csrf_token"); 
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  // 🛡️ Replace this with your actual token or get from storage
  

  // 🚀 Load users using POST and send csrf_token in body
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post(
          'http://104.236.100.170:8000/show_users',
          { csrf_token: csrf_token }
        );
        setUsers(response.data);
        console.log('Users from API:', response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        alert('User list load nahi ho saki');
      }
    };

    fetchUsers();
  }, []);

  // ❌ Delete user
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedUserId) {
      alert('Please select a user to delete');
      return;
    }

    try {
      await axios.delete(`http://104.236.100.170:8000/delete_user/${selectedUserId}`, {
        headers: {
          'X-CSRF-Token': csrf_token
        }
      });
      alert('User deleted successfully');
      setUsers(users.filter(user => user.user_name !== selectedUserId));
      setSelectedUserId('');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('User delete nahi ho saka');
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="flex mt-30 items-center justify-center bg-black px-4">
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600 text-black"
            id="select-user"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user.user_name} value={user.user_name}>
                {user.user_name}
              </option>
            ))}
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
