import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import UserNavbar from "./UserNavbar"

const CompanyTable = () => {
    const csrf_token = localStorage.getItem("csrf_token");
  
    // const hasFetchedCompanies = useRef(false);

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyInfo, setCompanyInfo] = useState("");
   const [senderMail, setSenderMail] = useState("");


  const Message = localStorage.getItem("Message");
  
    let content;
  
    if (Message === "admin") {
      content = <Navbar />;
    }
     else {
      content = <UserNavbar />;
    }

  // Fetch all companies for dropdown
  const fetchCompanies = async () => {
    // if (hasFetchedCompanies.current) return; // prevent duplicate call
    // hasFetchedCompanies.current = true;
    try {
      const res = await axios.get("http://104.236.100.170/api/get_companies",   {
        headers: {
          "Content-Type": "application/json",
          "csrf-token": csrf_token,
        },
      });
      // console.log(res.data);

      
      setCompanies(res.data.List);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  };

  // Fetch selected company info
  const fetchCompanyInfo = async () => {
    try {
      const res = await axios.post("http://104.236.100.170/api/get_company_info",  {
        company_name: selectedCompany,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "csrf-token": csrf_token,
        },
      });
      
      setCompanyInfo(res.data.info.packages_info);
      setSenderMail(res.data.info.sender_mail || "");

    } catch (err) {
      console.error("Error fetching company info:", err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      fetchCompanyInfo();
    }
  }, [selectedCompany]);

  // const { adds_on = {}, ...packages } = companyInfo || {};
  
  return (
    <div className=" bg-blue-50 min-h-screen">
       {content}
    <div className="mt-10 p-4 max-w-4xl bg-white mx-auto">
      <h2 className="text-xl font-bold mb-4">Company Packages Viewer</h2>

      {/* Company Dropdown */}
      <select
        className="border p-2 rounded mb-6 w-full"
        value={selectedCompany}
        onClick={() => fetchCompanies()}
        onChange={(e) => setSelectedCompany(e.target.value)}
      >
        <option value="">Select a company</option>
        {companies.map((company , idx) => { return (
          <option key={idx} value={company}>
            {company}
          </option>)}
        )}
      </select>
      {senderMail && (
        <div className=" p-4  bg-blue-50 rounded shadow text-center text-gray-700">
          <strong>Sender Email:</strong> {senderMail}
        </div>
      )}

      {/* Show nothing if no company selected */}
      {!selectedCompany && <p className="text-gray-500">Please select a company to view info.</p>}
      <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">Subscriptions with Free Add-ons</h3>
<table className="table-auto w-full border">
  <thead>
    <tr className="bg-gray-100">
      <th className="border px-4 py-2">Category</th>
      <th className="border px-4 py-2">Subscription</th>
      <th className="border px-4 py-2">Single</th>
      <th className="border px-4 py-2">Double</th>
      <th className="border px-4 py-2">Triple</th>
      <th className="border px-4 py-2">Free Add-ons</th>
    </tr>
  </thead>
  <tbody>
    {Object.entries(companyInfo).map(([category, content]) => {
      const subscriptions = Object.entries(content).filter(([key]) => key !== 'adds_on');
      
      return subscriptions.map(([subscriptionName, subscriptionData], index) => {
        const single = subscriptionData?.Single || "-";
        const double = subscriptionData?.Double || "-";
        const triple = subscriptionData?.Triple || "-";
        const freeAddons = subscriptionData?.free_adds_on
          ? Object.keys(subscriptionData.free_adds_on).filter(key => subscriptionData.free_adds_on[key] === "0")
          : [];

        return (
          <tr key={`${category}-${subscriptionName}`}>
            <td className="border px-4 py-2">
              {index === 0 ? category : ""}
            </td>
            <td className="border px-4 py-2">{subscriptionName}</td>
            <td className="border px-4 py-2">{single}</td>
            <td className="border px-4 py-2">{double}</td>
            <td className="border px-4 py-2">{triple}</td>
            <td className="border px-4 py-2">
              {freeAddons.length > 0 ? freeAddons.join(", ") : "-"}
            </td>
          </tr>
        );
      });
    })}
  </tbody>
</table>


<h3 className="font-semibold text-lg mb-2">All Add-ons</h3>
<table className="table-auto w-full border">
  <thead>
    <tr className="bg-gray-100">
      <th className="border px-4 py-2">Category</th>
      <th className="border px-4 py-2">Add-On Name</th>
      <th className="border px-4 py-2">Price</th>
    </tr>
  </thead>
  <tbody>
    {Object.entries(companyInfo).map(([category, content]) => {
      const addsOn = content.adds_on || {};
      const addOnEntries = Object.entries(addsOn);

      return addOnEntries.map(([addOnName, price], index) => (
        <tr key={`${category}-${addOnName}`}>
          <td className="border px-4 py-2">{index === 0 ? category : ""}</td>
          <td className="border px-4 py-2">{addOnName}</td>
          <td className="border px-4 py-2">{price}</td>
        </tr>
      ));
    })}
  </tbody>
</table>

    </div>
    </div>
    </div>
   ); 
}

export default CompanyTable;
