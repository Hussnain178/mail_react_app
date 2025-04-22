import React, { useState, useEffect } from "react";


import Navbar from "./components/Navbar";


export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold">Welcome to our application</h1>
        <p className="mt-4">This is a sample page with our navbar component.</p>
       
      </main>
    </div>
  );
}
