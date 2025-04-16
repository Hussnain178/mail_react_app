import React from 'react';

import UserNavbar from './UserNavbar';



export default function UserPanel() {
  return (
    <div className="min-h-screen">
      <UserNavbar />
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold">Welcome to our User application</h1>
        <p className="mt-4">This is a sample page with our navbar component.</p>
      </main>
    </div>
  );
}
