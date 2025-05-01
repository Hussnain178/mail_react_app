import React from 'react';

import UserNavbar from './UserNavbar';
// Assuming this is the correct path to your AgentFormData component
import SentInfoTable from './SentInfoTable';



export default function UserPanel() {
  return (
    <div className="min-h-screen">
      <UserNavbar />
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <SentInfoTable/>
      
      </main>
    </div>
  );
}
