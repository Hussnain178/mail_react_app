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
    axios.get("http://104.236.100.170/api/get_companies", {
      headers: { "csrf-token": csrf_token },
    }).then((res) => {
      setCompanies(res.data.List);
    });
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      axios.post("http://104.236.100.170/api/get_company_info",
        { company_name: selectedCompany },
        { headers: { "csrf-token": csrf_token } }
      ).then((res) => {
        if (res.data.Response === "Success") {
          setCategoryData(res.data.info);
        }
      });
    }
  }, [selectedCompany]);

  const updateProductDict = (newSelectedOptions, newSelectedAddons) => {
    const productDict = Object.entries(newSelectedOptions).map(([type, subscription]) => {
      const addons = newSelectedAddons[type] || { free_addons: [], paid_addons: [] };
      const allPrices = categoryData[type]?.adds_on || {};

      const price = (addons.paid_addons || []).reduce((sum, addon) => {
        return sum + parseFloat(allPrices[addon] || 0);
      }, 0);

      return {
        company_name: selectedCompany,
        type,
        subscription,
        free_addons: addons.free_addons,
        paid_addons: addons.paid_addons,
        price,
      };
    });

    onChange(productDict);
  };

  const handleAddonChange = (e, category, addonType) => {
    const { value, checked } = e.target;
    setSelectedAddons((prev) => {
      const updated = {
        ...prev,
        [category]: {
          ...prev[category],
          [addonType]: checked
            ? [...(prev[category]?.[addonType] || []), value]
            : (prev[category]?.[addonType] || []).filter((v) => v !== value),
        },
      };
      updateProductDict(selectedOptions, updated);
      return updated;
    });
  };

  const handleSubscriptionChange = (category, value) => {
    const newSelection = { ...selectedOptions, [category]: value };
    setSelectedOptions(newSelection);
    updateProductDict(newSelection, selectedAddons);
  };

  const getFreeAndPaidAddons = (category, selectedSub) => {
    const cat = categoryData[category];
    if (!cat || !selectedSub) return { free: [], paid: [] };
    const allAddons = cat.adds_on || {};
    const freeAddons = (cat?.[selectedSub]?.free_adds_on) || {};
    const free = Object.keys(freeAddons).filter((k) => freeAddons[k] === "0" && k in allAddons);
    const paid = Object.keys(allAddons).filter((k) => !free.includes(k));
    return { free, paid };
  };

  const getCategoryPrice = (category) => {
    const selected = selectedAddons[category]?.paid_addons || [];
    const allPrices = categoryData[category]?.adds_on || {};
    return selected.reduce((sum, addon) => sum + parseFloat(allPrices[addon] || 0), 0);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <label className="text-center h-12 pt-2 font-bold rounded-md text-black text-[20px] mt-10">
          Select Company
        </label>
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
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <h1 className="text-center h-12 pt-2 font-bold text-black text-[20px] mb-6">Categories & Subscriptions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(categoryData).map((category) => {
          const subs = Object.entries(categoryData[category])
            .filter(([k, v]) => k !== "adds_on" && typeof v === "object")
            .map(([subscriptionName, subData]) => {
              const label = Object.keys(subData).find(k => k !== "free_adds_on");
              return { subscriptionName, label, value: label };
            });

          return (
            <div key={category} className="p-4 bg-white rounded-xl shadow border border-gray-200">
              <label className="block mb-2 text-md font-medium text-gray-700">{category}</label>
              <select
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                value={selectedOptions[category] || ""}
                onChange={(e) => handleSubscriptionChange(category, e.target.value)}
              >
                <option value="">-- Select Subscription --</option>
                {subs.map(({ subscriptionName, label, value }) => (
                  <option key={subscriptionName} value={subscriptionName}>{`${subscriptionName} - ${value}`}</option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {selectedCompany && (
        <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-inner">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Add-ons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Free Add-ons */}
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-2">Free Add-ons</h3>
              {Object.keys(selectedOptions).map((category) => {
                const { free } = getFreeAndPaidAddons(category, selectedOptions[category]);
                return (
                  <div key={category} className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">{category} - {selectedOptions[category]}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {free.map((name) => (
                        <label key={name} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={name}
                            checked={selectedAddons[category]?.free_addons?.includes(name) || false}
                            onChange={(e) => handleAddonChange(e, category, "free_addons")}
                            className="h-4 w-4 text-green-600 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-800">{name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Paid Add-ons */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Paid Add-ons</h3>
              {Object.keys(selectedOptions).map((category) => {
                const { paid } = getFreeAndPaidAddons(category, selectedOptions[category]);
                const allPrices = categoryData[category]?.adds_on || {};
                const totalPrice = getCategoryPrice(category);
                return (
                  <div key={category} className="mb-6">
                    <p className="text-sm font-medium text-gray-600 mb-1 flex justify-between items-center">
                      <span>{category} - {selectedOptions[category]}</span>
                      <span className="text-blue-700 font-semibold">Total: ${totalPrice.toFixed(2)}</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {paid.map((name) => (
                        <label key={name} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={name}
                            checked={selectedAddons[category]?.paid_addons?.includes(name) || false}
                            onChange={(e) => handleAddonChange(e, category, "paid_addons")}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-800">{name} (${allPrices[name]})</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesPlan;







// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function ServicesPlan({ onChange }) {
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [categoryData, setCategoryData] = useState({});
//   const [companies, setCompanies] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [selectedAddons, setSelectedAddons] = useState({});
//   const csrf_token = localStorage.getItem("csrf_token");

//   useEffect(() => {
//     axios.get("http://104.236.100.170/api/get_companies", {
//       headers: { "csrf-token": csrf_token },
//     }).then((res) => {
//       setCompanies(res.data.List);
//     });
//   }, []);

//   useEffect(() => {
//     if (selectedCompany) {
//       axios.post("http://104.236.100.170/api/get_company_info",
//         { company_name: selectedCompany },
//         { headers: { "csrf-token": csrf_token } }
//       ).then((res) => {
//         if (res.data.Response === "Success") {
//           setCategoryData(res.data.info);
//         }
//       });
//     }
//   }, [selectedCompany]);

//   const updateAddons = (category, type, value, checked) => {
//     setSelectedAddons((prev) => {
//       const prevCategoryAddons = prev[category] || { free_addons: [], paid_addons: [] };
//       return {
//         ...prev,
//         [category]: {
//           ...prevCategoryAddons,
//           [type]: checked
//             ? [...prevCategoryAddons[type], value]
//             : prevCategoryAddons[type].filter((v) => v !== value),
//         },
//       };
//     });
//   };

//   const handleAddonChange = (e, category, type) => {
//     const { value, checked } = e.target;
//     updateAddons(category, type, value, checked);
//   };

//   const handleSubscriptionChange = (category, value) => {
//     const newSelection = { ...selectedOptions, [category]: value };
//     setSelectedOptions(newSelection);
  
//     const totalPrice = calculateTotalPrice();
  
//     const productDict = Object.entries(newSelection).map(([type, subscription]) => {
//       const addons = selectedAddons[type] || { free_addons: [], paid_addons: [] };
//       return {
//         company_name: selectedCompany,
//         type,
//         subscription,
//         free_addons: addons.free_addons,
//         paid_addons: addons.paid_addons,
//         price: totalPrice, // 👈 price yahan add kiya gaya hai
//       };
//     });
  
//     onChange({ productDict, totalPrice });
//   };
  
  

//   const getFreeAndPaidAddons = (category, selectedSub) => {
//     const cat = categoryData[category];
//     if (!cat || !selectedSub) return { free: [], paid: [] };
//     const allAddons = cat.adds_on || {};
//     const freeAddons = (cat?.[selectedSub]?.free_adds_on) || {};
//     const free = Object.keys(freeAddons).filter((k) => freeAddons[k] === "0" && k in allAddons);
//     const paid = Object.keys(allAddons).filter((k) => !free.includes(k));
//     return { free, paid };
//   };

//   const calculateTotalPrice = () => {
//     let total = 0;
//     Object.keys(selectedAddons).forEach((category) => {
//       const paidAddons = selectedAddons[category]?.paid_addons || [];
//       paidAddons.forEach((addon) => {
//         const price = categoryData[category]?.adds_on?.[addon];
//         if (price) total += parseFloat(price);
//       });
//     });
//     return total;
//   };

//   useEffect(() => {
//     const totalPrice = calculateTotalPrice();
//     onChange(totalPrice);  // This sends the total price to the parent component
//   }, [selectedAddons]);

//   return (
//     <div className="p-6 space-y-6 max-w-6xl mx-auto">
//       <div className="mb-6">
//         <label className="text-center h-12 pt-2 font-bold rounded-md text-black text-[20px] mt-10">
//           Select Company
//         </label>
//         <select
//           className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//           value={selectedCompany}
//           onChange={(e) => {
//             setSelectedCompany(e.target.value);
//             setSelectedOptions({});
//             setSelectedAddons({});
//             onChange([]);
//           }}
//         >
//           <option value="">-- Select Company --</option>
//           {companies.map((c, idx) => (
//             <option key={idx} value={c}>{c}</option>
//           ))}
//         </select>
//       </div>

//       <h1 className="text-center h-12 pt-2 font-bold text-black text-[20px] mb-6">Categories & Subscriptions</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {Object.keys(categoryData).map((category) => {
//           const subs = Object.entries(categoryData[category])
//             .filter(([k, v]) => k !== "adds_on" && typeof v === "object")
//             .map(([subscriptionName, subData]) => {
//               const label = Object.keys(subData).find(k => k !== "free_adds_on");
//               return { subscriptionName, label, value: label };
//             });

//           return (
//             <div key={category} className="p-4 bg-white rounded-xl shadow border border-gray-200">
//               <label className="block mb-2 text-md font-medium text-gray-700">{category}</label>
//               <select
//                 className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
//                 value={selectedOptions[category] || ""}
//                 onChange={(e) => handleSubscriptionChange(category, e.target.value)}
//               >
//                 <option value="">-- Select Subscription --</option>
//                 {subs.map(({ subscriptionName, label, value }) => (
//                   <option key={subscriptionName} value={subscriptionName}>{`${subscriptionName} - ${value}`}</option>
//                 ))}
//               </select>
//             </div>
//           );
//         })}
//       </div>

//       {selectedCompany && (
//         <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-inner">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Add-ons</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//             {/* Free Add-ons */}
//             <div>
//               <h3 className="text-lg font-semibold text-green-700 mb-2">Free Add-ons</h3>
//               {Object.keys(selectedOptions).map((category) => {
//                 const { free } = getFreeAndPaidAddons(category, selectedOptions[category]);
//                 return (
//                   <div key={category} className="mb-4">
//                     <p className="text-sm font-medium text-gray-600 mb-1">{category} - {selectedOptions[category]}</p>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                       {free.map((name) => (
//                         <label key={name} className="flex items-center space-x-2">
//                           <input
//                             type="checkbox"
//                             value={name}
//                             checked={selectedAddons[category]?.free_addons?.includes(name) || false}
//                             onChange={(e) => handleAddonChange(e, category, "free_addons")}
//                             className="h-4 w-4 text-green-600 border-gray-300 rounded"
//                           />
//                           <span className="text-sm text-gray-800">{name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Paid Add-ons */}
//             <div>
//               <h3 className="text-lg font-semibold text-blue-700 mb-2">Paid Add-ons</h3>
//               {Object.keys(selectedOptions).map((category) => {
//                 const { paid } = getFreeAndPaidAddons(category, selectedOptions[category]);
//                 const allPrices = categoryData[category]?.adds_on || {};
//                 return (
//                   <div key={category} className="mb-4">
//                     <p className="text-sm font-medium text-gray-600 mb-1">{category} - {selectedOptions[category]}</p>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                       {paid.map((name) => (
//                         <label key={name} className="flex items-center space-x-2">
//                           <input
//                             type="checkbox"
//                             value={name}
//                             checked={selectedAddons[category]?.paid_addons?.includes(name) || false}
//                             onChange={(e) => handleAddonChange(e, category, "paid_addons")}
//                             className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                           />
//                           <span className="text-sm text-gray-800">{name} ({allPrices[name]})</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ServicesPlan; 