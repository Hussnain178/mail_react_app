import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const AccountInfo = () => {
  const navigate = useNavigate(); // Hook for navigation
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
    
      <form  className="relative bg-white p-4 rounded-2xl shadow-xl w-full max-w-2xl mx-auto ">
      <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
            onClick={() => navigate("/home")}
          >
            &times;
          </button>
        <h1 className="text-center p-2 text-black h-12  font-bold rounded-md text-[30px] mt-2">
          Account Info
        </h1>

        <div className="w-full mx-auto p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium mb-1" htmlFor="user-name">
                User Name
              </label>
              <input
                id="user-name"
                type="text"
                placeholder="User-name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="w-full mx-auto p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium mb-1" htmlFor="user-name">
                Agent Name
              </label>
              <input
                id="agent-name"
                type="text"
                placeholder="agent-name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>



        <div className="w-full mx-auto p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium mb-1" htmlFor="user-name">
                Calling Name
              </label>
              <input
                id="calling-name"
                type="text"
                placeholder="calling-name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

    <div className='buttons grid grid-cols-2 md:grid-cols-2 gap-10 w-[100px] ' > 
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300  mx-auto mt-6">
  Edit
</button>
<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 mx-auto mt-6">
  Save
</button>
    </div>

      </form>
    </div>
    </div>
  )
}

export default AccountInfo