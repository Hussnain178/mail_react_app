import React from 'react'
import AdminSentDetailPage from './AdminSentDetailPage';
import UserAdminDetailPage from './UserAdminDetailPage';


export default function SentDetailPage() {

    const Message = localStorage.getItem("Message");
    console.log("Message", Message);
    
      let content;
    
      if (Message === "admin") {
        content = <AdminSentDetailPage/>;
      } else if ( Message === "agent")
       {
        content = <UserAdminDetailPage />;
      } else {
        content = <div className="p-6 text-center text-red-500">Invalid user type</div>;
      }

  return (
    <div>
         {content}
    </div>
  )
}
