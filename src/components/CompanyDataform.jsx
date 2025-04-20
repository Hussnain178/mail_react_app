import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CompanyDataform() {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [FreeAddson, setFreeAddson] = useState([]);
  // const [Addson, setAddson] = useState([]);

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCompany1, setSelectedCompany1] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAddson, setSelectedAddson] = useState("");

  const [newCategory, setNewCategory] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newSubscription, setNewSubscription] = useState("");
  const [newAddson, setNewAddson] = useState("");
  const [AddsonPrice, setAddsonPrice] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageType, setPackageType] = useState("");

  const csrf_token = localStorage.getItem("csrf_token");

  // 📦 Backend se users fetch karne ka function
  const fetchcompanies = async () => {
    try {
      const response = await axios.get(
        "http://104.236.100.170:8000/get_companies",
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
      );
      const companiesList = response.data.List;

      setCompanies(companiesList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchcategories = async () => {
    try {
      const response = await axios.post(
        "http://104.236.100.170:8000/get_categories",
        {
          company_name: selectedCompany1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
      );
      console.log("Selected Company:", response);
      const categoriesList = response.data.List;

      setCategories(categoriesList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchsubscription = async () => {
    try {
      const response = await axios.post(
        "http://104.236.100.170:8000/get_subcriptions",
        {
          company_name: selectedCompany1,
          category: selectedCategory,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
      );
      const subscriptionList = response.data.List;

      setSubscriptions(subscriptionList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    if (selectedCompany1) {
      fetchcategories();
    }
  }, [selectedCompany1]);

  useEffect(() => {
    if (selectedCompany1 && selectedCategory) {
      fetchsubscription();
    }
  }, [selectedCompany1, selectedCategory]);

  const postData = async (url, data) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "csrf-token": csrf_token,
        },
      });
      alert(response.data.message || "Successfully added");
    } catch (error) {
      console.error("API Error:", error);
      alert("Error: Failed to process the request.");
    }
  };

  const handleAddCompany = async () => {
    if (newCompany && !companies.includes(newCompany)) {
      await postData("http://104.236.100.170:8000/add_company", {
        company_name: newCompany,
      });
      setCompanies([...companies, newCompany]);
      setNewCompany("");
    }
  };

  const handleAddCategory = async () => {
    if (selectedCompany && newCategory) {
      await postData("http://104.236.100.170:8000/add_category", {
        company_name: selectedCompany,
        category: newCategory,
      });

      setNewCategory("");
      setCompanies([]);
    }
  };

  const handleAddSubscription = async () => {
    if (selectedCompany1 && selectedCategory && newSubscription) {
      await postData("http://104.236.100.170:8000/add_subcription", {
        company_name: selectedCompany1,
        category: selectedCategory,
        subscription: newSubscription,
      });
      setNewSubscription("");
      setNewCategory("");
      setCompanies([]);
    }
  };
  const handleAddAddson = async () => {
    if (selectedCompany1 && selectedCategory && newAddson && AddsonPrice) {
      {
        await postData("http://104.236.100.170:8000/add_adds_on", {
          company_name: selectedCompany1,
          category: selectedCategory,
          adds_on: newAddson,
          price: AddsonPrice,
        });
        setNewAddson("");
        setNewCategory("");
      setCompanies([]);
      }
    }};
  const handleAddFreeAddson = async () => {
    if (selectedCompany1 && selectedCategory && newAddson && AddsonPrice) {
      {
        await postData("http://104.236.100.170:8000/add_free_adds_on", {
          company_name: selectedCompany1,
          category: selectedCategory,
          adds_on: newAddson,
          subscription: selectedSubscription,
        });
        setFreeAddson("");
      }
    }};

    const handleUpdatePackage = async () => {
      if (
        !selectedCompany1 ||
        !selectedCategory ||
        !selectedSubscription ||
        !packageType
      ) {
        alert("Please fill out all fields.");
        return;
      }

      if (!/^\d+(\.\d{1,2})?$/.test(packagePrice)) {
        alert("Please enter a valid numeric price (numbers or decimals only).");
        return;
      }

      const payload = {
        company_name: selectedCompany,
        category: selectedCategory,
        subscription: selectedSubscription,
        type: packageType,
        price: String(packagePrice),
      };

      await postData("http://104.236.100.170:8000/add_price", payload);
      setPackagePrice("");
    };

    return (
      <div className="max-w-3xl mx-auto p-4 space-y-8">
        {/* -------------------------- Add Company -------------------------- */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Add Company</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter company name"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleAddCompany}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>

        {/* -------------------------- Add Category -------------------------- */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Add Category</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              onClick={() => fetchcompanies()}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Company</option>
              {companies.map((company, idx) => {
                return (
                  <option key={idx} value={company}>
                    {company}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <button
              onClick={handleAddCategory}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>

        {/* -------------------------- Add Subscription -------------------------- */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Add Subscription</h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <select
              value={selectedCompany1}
              onClick={() => fetchcompanies()}
              onChange={(e) => {
                setSelectedCompany1(e.target.value);
              }}
              className="border p-2 rounded w-full sm:w-1/3"
            >
              <option value="">Select Company</option>
              {companies.map((company, idx) => (
                <option key={idx} value={company}>
                  {company}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border p-2 rounded w-full sm:w-1/3"
            >
              <option value="">Select Category</option>
              {categories.map((cat, idx) => {
                return (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder="Enter subscription name"
              value={newSubscription}
              onChange={(e) => setNewSubscription(e.target.value)}
              className="border p-2 rounded w-full sm:w-1/3"
            />

            <button
              onClick={handleAddSubscription}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full sm:w-auto"
            >
              Save
            </button>
          </div>
        </div>

        {/* -------------------------- Add addson -------------------------- */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Add Adds On</h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <select
              value={selectedCompany1}
              onClick={() => fetchcompanies()}
              onChange={(e) => {
                setSelectedCompany1(e.target.value);
                // setSelectedCategory("");
              }}
              className="border p-2 rounded w-full sm:w-1/3"
            >
              <option value="">Select Company</option>
              {companies.map((company, idx) => (
                <option key={idx} value={company}>
                  {company}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border p-2 rounded w-full sm:w-1/3"
            >
              <option value="">Select Category</option>
              {categories.map((cat, idx) => {
                return (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder="Enter Adds On name"
              value={newAddson}
              onChange={(e) => setNewAddson(e.target.value)}
              className="border p-2 rounded w-full sm:w-1/3"
            />
            <input
              type="text"
              placeholder="Enter Adds On Price"
              value={AddsonPrice}
              onChange={(e) => setAddsonPrice(e.target.value)}
              className="border p-2 rounded w-full sm:w-1/3"
            />

            <button
              onClick={handleAddAddson}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 w-full sm:w-auto"
            >
              Save
            </button>
          </div>
        </div>


              {/* -------------------------- Add Free Adds On -------------------------- */}
              <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Add Free Adds On</h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <select
              value={selectedCompany1}
              onClick={() => fetchcompanies()}
              onChange={(e) => {
                setSelectedCompany1(e.target.value);
                setSelectedCategory("");
                setSelectedSubscription("");
              }}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Company</option>
              {companies.map((company, idx) => {
                return (
                  <option key={idx} value={company}>
                    {company}
                  </option>
                );
              })}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubscription("");
              }}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Category</option>
              {categories.map((cat, idx) => {
                return (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>

            <select
              value={selectedSubscription}
              onChange={(e) => setSelectedSubscription(e.target.value)}
              onClick={() => fetchsubscription()}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Subscription</option>
              {subscriptions.map((sub, idx) => {
                return (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                );
              })}
            </select>
            <select
              value={selectedAddson}
              onChange={(e) => setSelectedAddson(e.target.value)}
              // onClick={() => fetchsubscription()}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Adds On</option>
              {subscriptions.map((sub, idx) => {
                return (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                );
              })}
            </select>

           

          
          </div>

          <button
            onClick={handleAddFreeAddson}
            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full sm:w-auto"
          >
            Add Free Adds On
          </button>
        </div>

        {/* -------------------------- Update Package -------------------------- */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Update Package</h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <select
              value={selectedCompany1}
              onClick={() => fetchcompanies()}
              onChange={(e) => {
                setSelectedCompany1(e.target.value);
                setSelectedCategory("");
                setSelectedSubscription("");
              }}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Company</option>
              {companies.map((company, idx) => {
                return (
                  <option key={idx} value={company}>
                    {company}
                  </option>
                );
              })}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubscription("");
              }}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Category</option>
              {categories.map((cat, idx) => {
                return (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>

            <select
              value={selectedSubscription}
              onChange={(e) => setSelectedSubscription(e.target.value)}
              onClick={() => fetchsubscription()}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Subscription</option>
              {subscriptions.map((sub, idx) => {
                return (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                );
              })}
            </select>

            <select
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
            </select>

            <input
              type="text"
              placeholder="Enter price"
              value={packagePrice}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
                  setPackagePrice(val);
                }
              }}
              className={`border p-2 rounded w-full sm:w-1/5 ${
                packagePrice && !/^\d+(\.\d{1,2})?$/.test(packagePrice)
                  ? "border-red-500"
                  : ""
              }`}
            />
          </div>

          <button
            onClick={handleUpdatePackage}
            className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 w-full sm:w-auto"
          >
            Update
          </button>
        </div>
      </div>
    );
  };

