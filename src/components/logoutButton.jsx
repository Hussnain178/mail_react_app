import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const csrf_token = localStorage.getItem('csrf_token');

  const handleLogout = async () => {
    // console.log("CSRF Token: ", csrf_token); // ✅ Debug

    try {
      const response = await fetch('http://104.236.100.170:8000/logout', {
        method: 'GET',
        headers: {
          'csrf-token': csrf_token, // ✅ Try using this instead of 'csrf-token'
        }
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.status}`);
      }

      // ✅ Clear tokens and redirect
      localStorage.removeItem('csrf_token');
      localStorage.removeItem('user_name');
      navigate('/login');

    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed!');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
