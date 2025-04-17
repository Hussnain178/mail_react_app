import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const csrf_token = localStorage.getItem('csrf_token');

    try {
      const response = await fetch('http://104.236.100.170:8000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ csrf_token })
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.status}`);
      }

      // Clear local storage (optional)
      localStorage.removeItem('csrf_token');
      localStorage.removeItem('user_name'); // Remove user name if stored

     
      navigate('/login'); // ✅ redirect to login page

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
