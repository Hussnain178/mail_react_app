import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function CompanyDataform() {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [categories3, setCategories3] = useState([]);
  const [categories4, setCategories4] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptions2, setSubscriptions2] = useState([]);
  const [FreeAddson, setFreeAddson] = useState([]);
  const [Addson, setAddson] = useState([]);

  // add category
  const [selectedCompany, setSelectedCompany] = useState("");
  // add subscription
  const [selectedCompany1, setSelectedCompany1] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // add addson
  const [selectedCompany2, setSelectedCompany2] = useState("");
  const [selectedCategory2, setSelectedCategory2] = useState("");
  // add free addson
  const [selectedCompany3, setSelectedCompany3] = useState("");
  const [selectedCategory3, setSelectedCategory3] = useState("");
  const [selectedAddson3, setSelectedAddson3] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState("");
  // add package
  const [selectedCompany4, setSelectedCompany4] = useState("");
  const [selectedCategory4, setSelectedCategory4] = useState("");
  const [selectedSubscription4, setSelectedSubscription4] = useState("");
  
  
 
  const [newCategory, setNewCategory] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newSubscription, setNewSubscription] = useState("");
  const [newAddson, setNewAddson] = useState("");
  const [AddsonPrice, setAddsonPrice] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageType, setPackageType] = useState("");


 
  
  const [Mail, setMail] = useState([]);
  

  const csrf_token = localStorage.getItem("csrf_token");
  const hasFetchedCompanies = useRef(false);
  const hasFetchedCategory = useRef(false);
  const hasFetchedSubscription = useRef(false);

  // 📦 Backend se users fetch karne ka function
  const fetchcompanies = async () => {
    // if (hasFetchedCompanies.current) return; // prevent duplicate call
    // hasFetchedCompanies.current = true;
    try {
      const response = await axios.get(
        "http://104.236.100.170/api/get_companies",
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
    // if (hasFetchedCategory.current) return; // prevent duplicate call
    // hasFetchedCategory.current = true;
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_categories",
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
  const fetchcategories2 = async () => {
    // if (hasFetchedCategory.current) return; // prevent duplicate call
    // hasFetchedCategory.current = true;
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_categories",
        {
          company_name: selectedCompany2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
      );
      // console.log("Selected Company:", response);
      const categoriesList = response.data.List;

      setCategories2(categoriesList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchcategories3 = async () => {
    // if (hasFetchedCategory.current) return; // prevent duplicate call
    // hasFetchedCategory.current = true;
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_categories",
        {
          company_name: selectedCompany3,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
      );
      // console.log("Selected Company:", response);
      const categoriesList = response.data.List;

      setCategories3(categoriesList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchcategories4 = async () => {
    // if (hasFetchedCategory.current) return; // prevent duplicate call
    // hasFetchedCategory.current = true;
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_categories",
        {
          company_name: selectedCompany4,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
      );
      // console.log("Selected Company:", response);
      const categoriesList = response.data.List;

      setCategories4(categoriesList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchsubscription = async () => {
    // if (hasFetchedSubscription.current) return; // prevent duplicate call
    // hasFetchedSubscription.current = true;
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_subscriptions",
        {
          company_name: selectedCompany3,
          category: selectedCategory3,
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
  const fetchsubscription2 = async () => {
    // if (hasFetchedSubscription.current) return; // prevent duplicate call
    // hasFetchedSubscription.current = true;
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_subscriptions",
        {
          company_name: selectedCompany4,
          category: selectedCategory4,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
      );
      const subscriptionList = response.data.List;

      setSubscriptions2(subscriptionList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchaddson = async () => {
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_adds_on",
        {
          company_name: selectedCompany3,
          category: selectedCategory3,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
      );
      const AddsonList = response.data.List;

      setAddson(AddsonList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // useEffect(() => {
  //   fetchcompanies();
  // }, []);
  

  useEffect(() => {
    if (selectedCompany3) {
      fetchcategories3();
    }
  }, [selectedCompany3]);
 

  useEffect(() => {
    if (selectedCompany3 && selectedCategory3) {
      fetchsubscription();
    }
  }, [selectedCompany3, selectedCategory3]);
  useEffect(() => {
    if (selectedCompany3 && selectedCategory3) {
      fetchaddson();
    }
  }, [selectedCompany3, selectedCategory3]);



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
    if (newCompany && Mail ) {
      await postData("http://104.236.100.170/api/add_company", {
        company_name: newCompany,
        mail: Mail,
        // sender_name: SenderName ,
      });
      
      setCompanies([]);
      setNewCompany("");
      setMail("");
      // setSenderName("");
      
    }
  };

 


  const handleAddCategory = async () => {
    if (selectedCompany && newCategory) {
      await postData("http://104.236.100.170/api/add_category", {
        company_name: selectedCompany,
        category: newCategory,
      });

      setNewCategory("");
      setSelectedCompany("");
    }
  };

  const handleAddSubscription = async () => {
    if (selectedCompany1 && selectedCategory && newSubscription) {
      await postData("http://104.236.100.170/api/add_subscription", {
        company_name: selectedCompany1,
        category: selectedCategory,
        subscription: newSubscription,
      });
      setNewSubscription("");
      setCategories([]);
      setSelectedCompany1("");
      setSelectedCategory("");
    }
  };
  const handleAddAddson = async () => {
    if (selectedCompany2 && selectedCategory2 && newAddson && AddsonPrice) {
      {
        await postData("http://104.236.100.170/api/add_adds_on", {
          company_name: selectedCompany2,
          category: selectedCategory2,
          adds_on: newAddson,
          price: AddsonPrice,
        });
        setNewAddson("");
        setSelectedCategory2("");
      setSelectedCompany2("");
        setAddsonPrice("");
        setCategories([]);

        
      }
    }};
  const handleAddFreeAddson = async () => {
    if (selectedCompany3 && selectedCategory3 && selectedAddson3 && selectedSubscription) {
      {
        await postData("http://104.236.100.170/api/add_free_adds_on", {
          company_name: selectedCompany3,
          category: selectedCategory3,
          adds_on: selectedAddson3,
          subscription: selectedSubscription,
        });
        setFreeAddson("");
        setSelectedCategory3("");
        setSelectedCompany3("");
        setSelectedAddson3("");
        setSelectedSubscription("");
        setCategories([]);
        setAddson([]);
      }
    }};

    const handleUpdatePackage = async () => {
      if (
        !selectedCompany4 ||
        !selectedCategory4 ||
        !selectedSubscription4 ||
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
        company_name: selectedCompany4,
        category: selectedCategory4,
        subscription: selectedSubscription4,
        type: packageType,
        price: String(packagePrice),
      };

      await postData("http://104.236.100.170/api/add_price", payload);
      setPackagePrice("");
      setPackageType("");
      setSelectedCompany4("");
      setSelectedCategory4("");
      setSelectedSubscription4("");
      setCategories([]);
      setSubscriptions([]);
      setCompanies([]);
    };

    return (
      <div className=" bg-blue-50 min-h-screen">
        <Navbar />
      <div className="max-w-3xl mx-auto p-4 mt-10 space-y-8">
      
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
             <input
              type="email"
              placeholder="Enter Sender Mail"
              value={Mail}
              onChange={(e) => setMail(e.target.value)}
              className="border p-2 rounded w-full "
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
              onClick={() => {
                if (selectedCompany1) {
                  fetchcategories();  // Only fetch if company selected
                } else {
                  setCategories([]);  // 👈 clear list if no company
                }
              }}
            
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
              value={selectedCompany2}
              onClick={() => fetchcompanies()}
              onChange={(e) => {
                setSelectedCompany2(e.target.value);
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
              value={selectedCategory2}
              onChange={(e) => setSelectedCategory2(e.target.value)}
              onClick={() => fetchcategories2()}
              className="border p-2 rounded w-full sm:w-1/3"
            >
              <option value="">Select Category</option>
              {categories2.map((cat, idx) => {
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
  onChange={(e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAddsonPrice(value);
    }
  }}
  className="border p-2 rounded w-full sm:w-1/3"
/>

            {/* <input
              type="text"
              placeholder="Enter Adds On Price"
              value={AddsonPrice}
              onChange={(e) => setAddsonPrice(e.target.value)}
              className="border p-2 rounded w-full sm:w-1/3"
            /> */}

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
              value={selectedCompany3}
              onClick={() => fetchcompanies()}
              onChange={(e) => {
                setSelectedCompany3(e.target.value);
                // setSelectedCategory("");
                // setSelectedSubscription("");
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
              value={selectedCategory3}
              onChange={(e) => {
                setSelectedCategory3(e.target.value);
                // setSelectedSubscription("");
              }}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Category</option>
              {categories3.map((cat, idx) => {
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
              value={selectedAddson3}
              onChange={(e) => setSelectedAddson3(e.target.value)}
              // onClick={() => fetchsubscription()}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Adds On</option>
              {Addson.map((adds_on, idx) => {
                return (
                  <option key={idx} value={adds_on}>
                    {adds_on}
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
              value={selectedCompany4}
              onClick={() => fetchcompanies()}
              onChange={(e) => {
                setSelectedCompany4(e.target.value);
                // setSelectedCategory("");
                // setSelectedSubscription("");
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
              value={selectedCategory4}
              onClick={() => fetchcategories4()}
              onChange={(e) => {
                setSelectedCategory4(e.target.value);
                // setSelectedSubscription("");
              }}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Category</option>
              {categories4.map((cat, idx) => {
                return (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>

            <select
              value={selectedSubscription4}
              onClick={() => fetchsubscription2()}
              onChange={(e) => setSelectedSubscription4(e.target.value)}
              // onClick={() => fetchsubscription()}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Subscription</option>
              {subscriptions2.map((sub, idx) => {
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
      </div>
    );
  };