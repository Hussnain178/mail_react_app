import React from 'react'

const AccountInfo = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <form className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto mt-20">
        <h1 className="max-w-full bg-blue-500 h-12  font-bold rounded-md text-white text-[25px] pb-10 mt-2 pl-10">
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
  )
}

export default AccountInfo