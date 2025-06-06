import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import LogoutButton from './logoutButton';

export default function Navbar() {
  // const [isOpen, setIsOpen] = useState(false);
  const userName = localStorage.getItem("user_name");
// console.log("Navbar username:", userName); // ✅ Debug here too



  return (
    <nav className="border-b bg-black">
      <div className="mx-auto flex flex-nowrap h-16 max-w-7xl sticky-top items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand name */}
        <div className="flex items-center">
          <Link to="/home">
         <h1 className="text-white text-xl font-bold">Admin Panel</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex space-x-6">
            <li>
              <Link to="/show-company" className="text-white hover:text-gray-300">
                Show Company
              </Link>
            </li>
            <li>
              <Link to="/add-package" className="text-white hover:text-gray-300">
                Add/Update Packages
              </Link>
            </li>
            <li>
              <Link to="/delete-package" className="text-white hover:text-gray-300">
                Delete Package
              </Link>
            </li>
            <li>
              <Link to="/staff-directory" className="text-white hover:text-gray-300">
                Staff Directory
              </Link>
            </li>
            <li>
              <Link to="/staff-changepassword" className="text-white hover:text-gray-300">
              Change Staff Password
              </Link>
            </li>
           
            </ul>
          </div>

        

        {/* Buttons + Dropdown */}
        <div className="flex items-center space-x-4">
          {/* Button 1 */}
          <Link to="/create-user">
         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"> 
               Create User
          </button>
          </Link>


          {/* Button 2 */}
          <Link to="/delete-user">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            Delete User
          </button>
          </Link>

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
              <Link to="/Account-Info">
                <DropdownMenuItem>Account Info</DropdownMenuItem>
                </Link>
                 <Link to="/change-password">
                 <DropdownMenuItem>Change Password</DropdownMenuItem>
                 </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {/* <Link to="/logout"> */}
              <DropdownMenuItem><LogoutButton/></DropdownMenuItem>
              {/* </Link> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
