import React, { useState } from "react";
import axios from "axios";

export default function ServicesPlan() {
  const csrf_token = localStorage.getItem("csrf_token");
  const [companies, setCompanies] = useState([]);
  const [subscriptions, setSubscriptions] = useState({
    internet: [],
    landline: [],
    tv: [],
  });

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedSubscriptions, setSelectedSubscriptions] = useState({
    internet: "",
    landline: "",
    tv: "",
  });

  const fetchCompanies = async () => {
    try {
      const res = await axios.post("http://104.236.100.170:8000/get_companies" , { csrf_token: csrf_token });
      setCompanies(res.data || []);
    } catch (err) {
      console.error("Error fetching companies", err);
    }
  };

  const fetchSubscriptions = async (company) => {
    const categories = ["internet", "landline", "tv"];
    try {
      const allSubs = {};

      for (const category of categories) {
        const res = await axios.post("/get_subscriptions", {
          company_name: company,
          category,
          csrf_token: csrf_token,
        });
        allSubs[category] = res.data || [];
      }

      setSubscriptions(allSubs);
    } catch (err) {
      console.error("Error fetching subscriptions", err);
    }
  };

  const handleCompanyChange = (value) => {
    setSelectedCompany(value);
    fetchSubscriptions(value);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-6">
      <button
        onClick={fetchCompanies}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Load Companies
      </button>

      <div>
        <label className="block mb-2 font-medium">Select Company</label>
        <select
  value={selectedCompany}
  onChange={(e) => handleCompanyChange(e.target.value)}
  className="w-full border border-gray-300 rounded p-2"
>
  <option value="">-- Choose Company --</option>
  {companies.map((company, idx) => (
    <option key={idx} value={company.company_name}>
      {company.company_name}
    </option>
  ))}
</select>


      </div>

      <div>
        <div className="grid grid-cols-3 gap-4">
          {["internet", "landline", "tv"].map((type) => (
            <div key={type}>
              <label className="block mb-2 font-medium capitalize">{type}</label>
              <select
                value={selectedSubscriptions[type]}
                onChange={(e) =>
                  setSelectedSubscriptions({
                    ...selectedSubscriptions,
                    [type]: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">-- Choose Subscription --</option>
                {subscriptions[type]?.map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}