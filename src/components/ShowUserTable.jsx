import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const ShowUserTable = () => {
  const [users, setUsers] = useState([]);

  const csrf_token = localStorage.getItem("csrf_token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
            "http://104.236.100.170/api/show_users",
            {
              headers: {
                "csrf-token": csrf_token, // 👈 your token goes here
              },
            }
          );
          

        const rawUsers = response.data.users || [];

        const formattedUsers = rawUsers
          .filter((user) => Object.keys(user).length > 0)
          .map((user) => {
            const username = Object.keys(user)[0];
            const role = user[username];
            return { username, role };
          });

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
      <div className="bg-blue-50 min-h-screen">
          <Navbar />
    <div className="p-6 max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md mt-10">
    <h1 className="text-2xl font-bold mb-4">Users List</h1>
  
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-black text-sm uppercase tracking-wider">
          <tr>
            <th className="text-left px-6 py-3">Username</th>
            <th className="text-left px-6 py-3">Role</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  </div>
  
  );
};

export default ShowUserTable;
