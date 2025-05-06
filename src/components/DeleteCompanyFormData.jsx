import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function CompanyDataform() {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [categories3, setCategories3] = useState([]);
  const [categories4, setCategories4] = useState([]);
  const [categories5, setCategories5] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptions2, setSubscriptions2] = useState([]);
  const [subscriptions3, setSubscriptions3] = useState([]);
  const [subscriptions4, setSubscriptions4] = useState([]);
  const [packages, setPackages] = useState([]);
  const [FreeAddson, setFreeAddson] = useState([]);
  const [Addson, setAddson] = useState([]);

  // add category
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCompany5, setSelectedCompany5] = useState("");
  // add subscription
  const [selectedCompany1, setSelectedCompany1] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategory1, setSelectedCategory1] = useState("");
  // add addson
  const [selectedCompany2, setSelectedCompany2] = useState("");
  const [selectedCategory2, setSelectedCategory2] = useState("");
  // add free addson
  const [selectedCompany3, setSelectedCompany3] = useState("");
  const [selectedCategory3, setSelectedCategory3] = useState("");
  const [selectedAddson3, setSelectedAddson3] = useState("");
  const [selectedFreeAddson, setSelectedFreeAddson] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState("");
  // add package
  const [selectedCompany4, setSelectedCompany4] = useState("");
  const [selectedCategory4, setSelectedCategory4] = useState("");
  const [selectedSubscription4, setSelectedSubscription4] = useState("");
  
  
 

  const [packageType, setPackageType] = useState("");

  const csrf_token = localStorage.getItem("csrf_token");
  // const hasFetchedCompanies = useRef(false);

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
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_categories",
        {
          company_name: selectedCompany,
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
  const fetchcategories1 = async () => {
   
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
      // console.log("Selected Company:", response);
      const categoriesList = response.data.List;

      setCategories(categoriesList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchcategories2 = async () => {
   
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
  const fetchcategories4 = async () => {
    
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
  const fetchcategories3 = async () => {
   
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
  const fetchcategories5 = async () => {
    
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_categories",
        {
          company_name: selectedCompany5,
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

      setCategories5(categoriesList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchsubscription1 = async () => {
   
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_subscriptions",
        {
          company_name: selectedCompany1,
          category: selectedCategory1,
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
  const fetchsubscription4 = async () => {
   
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

      setSubscriptions4(subscriptionList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchsubscription3 = async () => {

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

      setSubscriptions3(subscriptionList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchaddson = async () => {
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_adds_on",
        {
          company_name: selectedCompany2,
          category: selectedCategory2,
          
        },
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
        
      );
      console.log("addson:", response);
      const AddsonList = response.data.List;

      setAddson(AddsonList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchFreeaddson = async () => {
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_free_adds_on",
        {
          company_name: selectedCompany3,
          category: selectedCategory3,
            subscription: selectedSubscription,
          
        },
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
        
      );
    //   console.log("addson:", response);
      const FreeAddsonList = response.data.List;

      setFreeAddson(FreeAddsonList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const fetchgetpackage = async () => {
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_type",
        {
          company_name: selectedCompany4,
          category: selectedCategory4,
            subscription: selectedSubscription4,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
      );
      console.log("package:", response);
      const packageList = response.data.Price;

      setPackages(packageList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    if (selectedCompany1) {
      fetchcategories1();
    }
  }, [selectedCompany1]);

  useEffect(() => {
    if (selectedCompany2) {
      fetchcategories2();
    }
  }, [selectedCompany2]);

  useEffect(() => {
    if (selectedCompany3) {
      fetchcategories3();
    }
  }, [selectedCompany3]);

  useEffect(() => {
    if (selectedCompany4) {
      fetchcategories4();
    }
  }, [selectedCompany4]);

  


  useEffect(() => {
    if (selectedCompany1 && selectedCategory1) {
      fetchsubscription1();
    }
  }, [selectedCompany1, selectedCategory1]);

  useEffect(() => {
    if (selectedCompany2 && selectedCategory2) {
      fetchaddson();
    }
  }, [selectedCompany2, selectedCategory2]);

  useEffect(() => {
    if (selectedCompany4 && selectedCategory4) {
      fetchsubscription4();
    }
  }, [selectedCompany4, selectedCategory4]);
  useEffect(() => {
    if (selectedCompany3 && selectedCategory3) {
      fetchsubscription3();
    }
  }, [selectedCompany3, selectedCategory3, ]);
  useEffect(() => {
    if (selectedCompany3 && selectedCategory3 && selectedSubscription) {
      fetchFreeaddson();
    }
  }, [selectedCompany3, selectedCategory3, selectedSubscription]);

  useEffect(() => {
    if (selectedCompany4 && selectedCategory4 && selectedSubscription4) {
        fetchgetpackage();
    }
  }, [selectedCompany4, selectedCategory4, selectedSubscription4]);

  const postData = async (url, data) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "csrf-token": csrf_token,
        },
      });
      alert(data.Message || "Successfully deleted!");
     
      
    
    } catch (error) {
      console.error("API Error:", error);
      alert("Error: Failed to process the request.");
    }
  };

  const handledeleteCompany = async () => {
    
      await postData("http://104.236.100.170/api/delete_company", {
        company_name: selectedCompany,
      });

      // setCompanies([...companies, newCompany]);
      setSelectedCompany("");
    
  };

  const handledeleteCategory = async () => {
    if (selectedCompany5 && selectedCategory) {
      await postData("http://104.236.100.170/api/delete_category", {
        company_name: selectedCompany5,
        category: selectedCategory,
      });
        // setCategories([...categories, newCategory]);
        setSelectedCategory("");
        setCategories([]);
        setSelectedCompany5("");
        setCompanies([]);
    }
  };

  const handledeleteSubscription = async () => {
    if (selectedCompany1 && selectedCategory1 && selectedSubscription) {
      await postData("http://104.236.100.170/api/delete_subscription", {
        company_name: selectedCompany1,
        category: selectedCategory1,
        subscription: selectedSubscription,
      });
        // setSubscriptions([...subscriptions, newSubscription]);
        setSelectedSubscription("");
      setSelectedCategory1("");
      setSelectedCompany1("");
      setSubscriptions([]);
      setCategories([]);  
    }
  };
  const handledeleteAddson = async () => {
    if (selectedCompany2 && selectedCategory2 && selectedAddson3) {
      {
        await postData("http://104.236.100.170/api/delete_adds_on", {
          company_name: selectedCompany2,
          category: selectedCategory2,
          adds_on: selectedAddson3,
          
        });
       setSelectedAddson3("");
        setSelectedCategory2("");
      setSelectedCompany2("");
      setAddson([]);
      setCategories([]);
       
        
      }
    }};
  const handledeleteFreeAddson = async () => {
    if (selectedCompany3 && selectedCategory3 && selectedFreeAddson && selectedSubscription) {
      {
        await postData("http://104.236.100.170/api/delete_free_adds_on", {
          company_name: selectedCompany3,
          category: selectedCategory3,
          adds_on: selectedFreeAddson,
          subscription: selectedSubscription,
        });
        
        setSelectedCategory3("");
        setSelectedCompany3("");
        setSelectedFreeAddson("");
        setSelectedSubscription("");
        setFreeAddson([]);
        setCategories([]);
        setSubscriptions([]);
      }
    }};

    const handledeletePackage = async () => {
      if (
        !selectedCompany4 ||
        !selectedCategory4 ||
        !selectedSubscription4 ||
        !packageType
      ) {
        alert("Please fill out all fields.");
        return;
      }

     
      const payload = {
        company_name: selectedCompany4,
        category: selectedCategory4,
        subscription: selectedSubscription4,
        type: packageType,
        
      };

      await postData("http://104.236.100.170/api/delete_type", payload);
    
      setPackageType("");
      setSelectedCompany4("");
      setSelectedCategory4("");
      setSelectedSubscription4("");
    };

    return (
    <div className="bg-white min-h-screen">
        <Navbar />
      <div className="max-w-3xl mx-auto mt-10 bg-blue-50 p-4 space-y-8">
      
        {/* -------------------------- Delete Company -------------------------- */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Delete Company</h2>
          <div className="flex flex-col sm:flex-row gap-4">
          <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              onClick={() => fetchcompanies()}
               className="border p-2 rounded w-full sm:w-1/3"
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
            <button
              onClick={handledeleteCompany}
              c className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 sm:w-auto"
            >
             Delete Company
            </button>
          </div>
        </div>

        {/* -------------------------- Delete Category -------------------------- */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Delete Category</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedCompany5}
              onChange={(e) => setSelectedCompany5(e.target.value)}
              onClick={() => fetchcompanies()}
              className="border p-2 rounded w-full sm:w-1/3"
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
              onChange={(e) => setSelectedCategory(e.target.value)}
                onClick={() => fetchcategories5()}
              className="border p-2 rounded w-full sm:w-1/3"
            >
              <option value="">Select Category</option>
              {categories5.map((cat, idx) => {
                return (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>

            <button
              onClick={handledeleteCategory}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Delete Category
            </button>
          </div>
        </div>

        {/* -------------------------- delete Subscription -------------------------- */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Delete Subscription</h2>
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
              value={selectedCategory1}
              onChange={(e) => setSelectedCategory1(e.target.value)}
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

            <select
              value={selectedSubscription}
              onChange={(e) => setSelectedSubscription(e.target.value)}
              onClick={() => fetchsubscription1()}
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

            <button
              onClick={handledeleteSubscription}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full sm:w-auto"
            >
              Delete Subscription
            </button>
          </div>
        </div>

        {/* -------------------------- delete addson -------------------------- */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Delete Adds On</h2>
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
            <select
              value={selectedAddson3}
              onChange={(e) => setSelectedAddson3(e.target.value)}
              className="border p-2 rounded w-full sm:w-1/3"
            >
              <option value="">Select Addson</option>
              {Addson.map((adds, idx) => {
                return (
                  <option key={idx} value={adds}>
                    {adds}
                  </option>
                );
              })}
            </select>

           
            <button
              onClick={handledeleteAddson}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 w-full sm:w-auto"
            >
              Delete Adds On
            </button>
          </div>
        </div>


              {/* -------------------------- delete Free Adds On -------------------------- */}
              <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Delete Free Adds On</h2>
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
              {categories3.map((cat1, idx) => {
                return (
                  <option key={idx} value={cat1}>
                    {cat1}
                  </option>
                );
              })}
            </select>

            <select
              value={selectedSubscription}
              onChange={(e) => setSelectedSubscription(e.target.value)}
            
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Subscription</option>
              {subscriptions3.map((sub, idx) => {
                return (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                );
              })}
            </select>
            <select
              value={selectedFreeAddson}
              onChange={(e) => setSelectedFreeAddson(e.target.value)}
              // onClick={() => fetchsubscription()}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Free Adds On</option>
              {FreeAddson.map((add_on, idx) => {
                return (
                  <option key={idx} value={add_on}>
                    {add_on}
                  </option>
                );
              })}
            </select>

           

          
          </div>

          <button
            onClick={handledeleteFreeAddson}
            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full sm:w-auto"
          >
            Delete Free Adds On
          </button>
        </div>

        {/* -------------------------- delete Package -------------------------- */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Delete Package</h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <select
              value={selectedCompany4}
              onClick={() => fetchcompanies()}
              onChange={(e) => {
                setSelectedCompany4(e.target.value);
                // setSelectedCategory("");
                // setSelectedSubscription4("");
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
              onChange={(e) => {
                setSelectedCategory4(e.target.value);
                // setSelectedSubscription4("");
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
              onChange={(e) => setSelectedSubscription4(e.target.value)}
            //   onClick={() => fetchsubscription()}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Subscription</option>
              {subscriptions4.map((sub, idx) => {
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
            //   onClick={() => fetchsubscription()}
              className="border p-2 rounded w-full sm:w-1/5"
            >
              <option value="">Select Package Type</option>
              {packages.map((pkg, idx) => {
                return (
                  <option key={idx} value={pkg}>
                    {pkg}
                  </option> );
           })}
                </select>

           
          </div>

          <button
            onClick={handledeletePackage}
            className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 w-full sm:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
      </div>
    );
  };

