import React, { useState, useEffect } from "react";
import axios from "axios";

function ServicesPlan({ onChange }) {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [categoryData, setCategoryData] = useState({});
  const [companies, setCompanies] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedAddons, setSelectedAddons] = useState({});

  const csrf_token = localStorage.getItem("csrf_token");

  useEffect(() => {
    axios
      .get("http://104.236.100.170/api/get_companies", {
        headers: {
          "csrf-token": csrf_token,
        },
      })
      .then((res) => {
        setCompanies(res.data.List);
      });
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      axios
        .post(
          "http://104.236.100.170/api/get_company_info",
          { company_name: selectedCompany },
          {
            headers: {
              "csrf-token": csrf_token,
            },
          }
        )
        .then((res) => {
          if (res.data.Response === "Success") {
            console.log(res.data.info);
            setCategoryData(res.data.info);
          }
        });
    }
  }, [selectedCompany]);

  const extractOptions = (category) => {
    const subcategories = categoryData[category];
    let options = [];
    for (let subcategory in subcategories) {
      if (subcategory === "adds_on" || subcategory === "free_adds_on") continue;
      const addons = subcategories[subcategory];
      if (typeof addons === "object") {
        for (let addon in addons) {
          if (addon !== "adds_on" && addon !== "free_adds_on") {
            options.push({
              label: `${subcategory} - ${addon}: ${addons[addon]}`,
              value: `${category}_${subcategory}_${addon}`,
              category,
              subcategory,
              addon,
              price: addons[addon],
            });
          }
        }
      }
    }
    return options;
  };

  const updateAddons = (category, type, value, checked) => {
    setSelectedAddons((prev) => {
      const prevCategoryAddons = prev[category] || { free_addons: [], paid_addons: [] };
      const updated = {
        ...prev,
        [category]: {
          ...prevCategoryAddons,
          [type]: checked
            ? [...prevCategoryAddons[type], value]
            : prevCategoryAddons[type].filter((v) => v !== value),
        },
      };
      return updated;
    });
  };

  const handleFreeAddonChange = (e, category) => {
    const { value, checked } = e.target;
    updateAddons(category, "free_addons", value, checked);
  };

  const handlePaidAddonChange = (e, category) => {
    const { value, checked } = e.target;
    updateAddons(category, "paid_addons", value, checked);
  };

  const handleSubscriptionChange = (category, value) => {
    const newSelection = { ...selectedOptions, [category]: value };
    setSelectedOptions(newSelection);

    const productDict = Object.entries(newSelection).map(([type, subscription]) => {
      const addons = selectedAddons[type] || { free_addons: [], paid_addons: [] };
      return {
        company_name: selectedCompany,
        type,
        subscription,
        free_addons: addons.free_addons,
        paid_addons: addons.paid_addons,
      };
    });

    onChange(productDict);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <label className="text-center h-12 pt-2 font-bold rounded-md text-black text-[20px] mt-10">Select Company</label>
        <select
          className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          value={selectedCompany}
          onChange={(e) => {
            setSelectedCompany(e.target.value);
            setSelectedOptions({});
            setSelectedAddons({});
            onChange([]);
          }}
        >
          <option value="">-- Select Company --</option>
          {companies.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <h1 className="text-center h-12 pt-2 font-bold rounded-md text-black text-[20px] mb-6">Categories & Subscriptions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(categoryData).map((category) => (
          <div key={category} className="p-4 bg-white rounded-xl shadow border border-gray-200">
            <label className="block mb-2 text-md font-medium text-gray-700">{category}</label>
            <select
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              value={selectedOptions[category] || ""}
              onChange={(e) => handleSubscriptionChange(category, e.target.value)}
            >
              <option value="">-- Select Subscription --</option>
              {extractOptions(category).slice(0, 5).map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {selectedCompany && (
        <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-inner">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Add-ons</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* ✅ Free Add-ons */}
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-2">Free Add-ons</h3>
              {Object.entries(categoryData).map(([category, subcategories]) => {
                let entries = [];

                for (const subcat in subcategories) {
                  const subcatData = subcategories[subcat];
                  if (subcatData?.free_adds_on) {
                    const addonNames = Object.keys(subcatData.free_adds_on);
                    if (addonNames.length > 0) {
                      entries.push({
                        subscription: subcat,
                        addons: addonNames,
                      });
                    }
                  }
                }

                return entries.length > 0 ? (
                  <div key={category} className="mb-4">
                    <p className="text-sm font-bold text-gray-700 mb-1">{category}</p>
                    {entries.map((entry, idx) => (
                      <div key={idx} className="mb-2">
                        <p className="text-xs text-gray-500 italic mb-1">Subscription: {entry.subscription}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {entry.addons.map((addon) => (
                            <label key={addon} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                value={addon}
                                checked={selectedAddons[category]?.free_addons?.includes(addon) || false}
                                onChange={(e) => handleFreeAddonChange(e, category)}
                                className="h-4 w-4 text-green-600 border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-800">{addon}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null;
              })}
            </div>

            {/* Paid Add-ons */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Paid Add-ons</h3>
              {Object.entries(categoryData).map(([category, data]) => (
                data?.adds_on ? (
                  <div key={category} className="mb-4">
                    <p className="text-sm font-bold text-gray-700 mb-1">{category}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {Object.entries(data.adds_on).map(([name, price]) => (
                        <label key={name} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={name}
                            checked={selectedAddons[category]?.paid_addons?.includes(name) || false}
                            onChange={(e) => handlePaidAddonChange(e, category)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-800">{name} ({price})</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesPlan;
