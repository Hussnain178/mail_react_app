import React, { useState } from "react";
import axios from "axios";

// Main functional component
export default function CompanyDataform() {
  // States to store dynamic form data
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  // Form input states
  const [newCompany, setNewCompany] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newSubscription, setNewSubscription] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageType, setPackageType] = useState("");

  // Get CSRF token from meta tag
  const csrf_token = localStorage.getItem("csrf_token");

  // Generic function to send POST data with CSRF token
  const postData = async (url, data) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "csrf-token": csrf_token, // Include CSRF token in headers
        },
      });
      alert(response.data.message || "Successfully added");
    } catch (error) {
      console.error("API Error:", error);
      alert("Error: Failed to process the request.");
    }
  };

  // Add new company to backend and update state
  const handleAddCompany = async () => {
    if (newCompany && !companies.includes(newCompany)) {
      await postData("http://104.236.100.170:8000/add_company", { company_name: newCompany });
      setCompanies([...companies, newCompany]); // Update local state
      setNewCompany(""); // Clear input
    }
  };

  // Add new category linked to selected company
  const handleAddCategory = async () => {
    if (selectedCompany && newCategory) {
      await postData("/api/http://104.236.100.170:8000/add_category", {
        company_name: selectedCompany,
        category: newCategory,
      });
      setCategories([...categories, { company_name: selectedCompany, category: newCategory }]);
      setNewCategory("");
    }
  };

  // Add new subscription linked to selected company and category
  const handleAddSubscription = async () => {
    if (selectedCompany && selectedCategory && newSubscription) {
      await postData("http://104.236.100.170:8000/add_category", {
        company_name: selectedCompany,
        category: selectedCategory,
        subscription: newSubscription,
      });
      setSubscriptions([
        ...subscriptions,
        {
          company_name: selectedCompany,
          category: selectedCategory,
          subscription: newSubscription,
        },
      ]);
      setNewSubscription("");
    }
  };

  // Send package price update to backend with type (Single, Double, Triple)
  const handleUpdatePackage = async () => {
    // Validation
    if (!selectedCompany || !selectedCategory || !selectedSubscription || !packageType) {
      alert("Please fill out all fields.");
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(packagePrice)) {
      alert("Please enter a valid numeric price (numbers or decimals only).");
      return;
    }

    // Prepare data
    const payload = {
      company_name: selectedCompany,
      category: selectedCategory,
      subscription: selectedSubscription,
      type: packageType,
      price: String(packagePrice),
    };

    await postData("http://104.236.100.170:8000/add_price", payload); // API call
    setPackagePrice(""); // Clear price input
  };

  // Utility: get all categories for selected company
  const getCategoriesForCompany = (company) =>
    categories.filter((cat) => cat.company === company);

  // Utility: get all subscriptions for selected company and category
  const getSubscriptionsForCompanyCategory = (company, category) =>
    subscriptions.filter(
      (sub) => sub.company === company && sub.category === category
    );

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      {/* -------------------------- Add Company Form -------------------------- */}
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

      {/* -------------------------- Add Category Form -------------------------- */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Add Category</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Company dropdown */}
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Company</option>
            {companies.map((company, idx) => (
              <option key={idx} value={company}>
                {company}
              </option>
            ))}
          </select>

          {/* Category input */}
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

      {/* -------------------------- Add Subscription Form -------------------------- */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Add Subscription</h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          {/* Company dropdown */}
          <select
            value={selectedCompany}
            onChange={(e) => {
              setSelectedCompany(e.target.value);
              setSelectedCategory("");
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

          {/* Category dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded w-full sm:w-1/3"
          >
            <option value="">Select Category</option>
            {getCategoriesForCompany(selectedCompany).map((cat, idx) => (
              <option key={idx} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Subscription input */}
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

      {/* -------------------------- Update Package Section -------------------------- */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Update Package</h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          {/* Company dropdown */}
          <select
            value={selectedCompany}
            onChange={(e) => {
              setSelectedCompany(e.target.value);
              setSelectedCategory("");
              setSelectedSubscription("");
            }}
            className="border p-2 rounded w-full sm:w-1/5"
          >
            <option value="">Select Company</option>
            {companies.map((company, idx) => (
              <option key={idx} value={company}>
                {company}
              </option>
            ))}
          </select>

          {/* Category dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubscription("");
            }}
            className="border p-2 rounded w-full sm:w-1/5"
          >
            <option value="">Select Category</option>
            {getCategoriesForCompany(selectedCompany).map((cat, idx) => (
              <option key={idx} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Subscription dropdown */}
          <select
            value={selectedSubscription}
            onChange={(e) => setSelectedSubscription(e.target.value)}
            className="border p-2 rounded w-full sm:w-1/5"
          >
            <option value="">Select Subscription</option>
            {getSubscriptionsForCompanyCategory(
              selectedCompany,
              selectedCategory
            ).map((sub, idx) => (
              <option key={idx} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>

          {/* Package type dropdown */}
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

          {/* Price input */}
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
}
