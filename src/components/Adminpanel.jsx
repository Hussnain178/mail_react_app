import React from "react";
import Navbar from "./Navbar";
import SentInfoTable from "./SentInfoTable";







export default function Adminpanel() {
  return (
    <div className="min-h-screen bg-blue-50">
    <Navbar />
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 ">
        <SentInfoTable />
       
       
       
      </main>
    </div>
  );
}
