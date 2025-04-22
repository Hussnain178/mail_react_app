import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const CompanyTable = () => {
    const csrf_token = localStorage.getItem("csrf_token");
  

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyInfo, setCompanyInfo] = useState("");

  // Fetch all companies for dropdown
  const fetchCompanies = async () => {
    try {
      const res = await axios.post("http://104.236.100.170/api/get_companies",   {
        headers: {
          "Content-Type": "application/json",
          "csrf-token": csrf_token,
        },
      });
        
      
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
      setCompanyInfo(res.data.List);
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

  const { adds_on = {}, ...packages } = companyInfo || {};

  return (
    <div className="bg-white min-h-screen">
        <Navbar />
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Company Packages Viewer</h2>

      {/* Company Dropdown */}
      <select
        className="border p-2 rounded mb-6 w-full"
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
      >
        <option value="">Select a company</option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>

      {/* Show nothing if no company selected */}
      {!selectedCompany && <p className="text-gray-500">Please select a company to view info.</p>}

      {/* Package Table */}
      {selectedCompany && (
        <>
          <h3 className="text-lg font-semibold mb-2">📦 Internet Packages</h3>
          <table className="w-full border mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Package</th>
                <th className="p-2 border">Single</th>
                <th className="p-2 border">Double</th>
                <th className="p-2 border">Addsons</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(packages).map(([packageName, data]) => (
                <tr key={packageName}>
                  <td className="p-2 border">{packageName}</td>
                  <td className="p-2 border">{data?.Single || "-"}</td>
                  <td className="p-2 border">{data?.Double || "-"}</td>
                  <td className="p-2 border">
                    {Object.entries(data)
                      .filter(([key]) => !["Single", "Double"].includes(key))
                      .map(([key, val]) => `${key}: ${val}`)
                      .join(", ") || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Adds On Table */}
          <h3 className="text-lg font-semibold mb-2">🔧 Adds On</h3>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Addson</th>
                <th className="p-2 border">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(adds_on).map(([key, val]) => (
                <tr key={key}>
                  <td className="p-2 border">{key}</td>
                  <td className="p-2 border">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
    </div>
  );
};

export default CompanyTable;
