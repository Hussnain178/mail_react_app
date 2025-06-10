import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function ServicesPlan({ onChange, resetTrigger }) {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [categoryData, setCategoryData] = useState({});
  const [companies, setCompanies] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedAddons, setSelectedAddons] = useState({});
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const csrf_token = localStorage.getItem("csrf_token");
  const hasFetchedCompanies = useRef(false);

  useEffect(() => {
    if (hasFetchedCompanies.current) return;
    hasFetchedCompanies.current = true;
    axios
      .get("http://104.236.100.170/api/get_companies", {
        headers: { "csrf-token": csrf_token },
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
          { headers: { "csrf-token": csrf_token } }
        )
        .then((res) => {
          if (res.data.Response === "Success") {
            setCategoryData(res.data.info.packages_info);
          }
        });
    }
  }, [selectedCompany]);

  useEffect(() => {
    updateProductDict(selectedOptions, selectedAddons);
  }, [selectedOptions, selectedAddons, selectedQuantities]);

  // New helper: subscription price + paid addons total for category * quantity
  const getCategoryTotal = (category) => {
    const subscription = selectedOptions[category];
    const categoryInfo = categoryData[category] || {};
    const subData = categoryInfo[subscription] || {};
    const addsOnPrices = categoryInfo.adds_on || {};
    const paidAddons = selectedAddons[category]?.paid_addons || [];
    const quantity = selectedQuantities[category] || 1;

    const categoryCount = Object.keys(selectedOptions).length;
    let priceKey = "Single";
    if (categoryCount === 2) priceKey = "Double";
    else if (categoryCount >= 3) priceKey = "Triple";

    const subscriptionPrice = parseFloat(subData[priceKey] || 0);
    const paidAddonsTotal = paidAddons.reduce(
      (sum, addon) => sum + parseFloat(addsOnPrices[addon] || 0),
      0
    );

    return (subscriptionPrice * quantity) + paidAddonsTotal ;
    // return (subscriptionPrice + paidAddonsTotal) * quantity;
  };

  const updateProductDict = (newSelectedOptions, newSelectedAddons) => {
  const selectedCategories = Object.keys(newSelectedOptions);

  const productDict = selectedCategories.map((category) => {
    const selectedSubscription = newSelectedOptions[category];
    const categoryInfo = categoryData[category] || {};
    const subscriptionInfo = categoryInfo[selectedSubscription] || {};

    const freeAddons = newSelectedAddons[category]?.free_addons || [];

    const addsOnPrices = categoryInfo.adds_on || {};
    const paidAddonsRaw = newSelectedAddons[category]?.paid_addons || [];
    const paidAddons = paidAddonsRaw.map((addon) => ({
      name: addon,
      price: parseFloat(addsOnPrices[addon] || 0),
    }));

    const paidAddonTotal = paidAddons.reduce((sum, addon) => {
      return sum + addon.price;
    }, 0);

    const currentCategoryCount = selectedCategories.length;
    let priceKey = "Single";
    if (currentCategoryCount === 2) priceKey = "Double";
    else if (currentCategoryCount >= 3) priceKey = "Triple";

    const basePrice = parseFloat(subscriptionInfo[priceKey] || 0);
    const quantity = selectedQuantities[category] || 1;

    return {
      company_name: selectedCompany,
      type: category,
      subscription: selectedSubscription,
      free_addons: freeAddons,
      adds_on: paidAddons,
      quantity,
      sub_price: basePrice,
      adds_on_price: paidAddonTotal,
      price: (basePrice * quantity) + paidAddonTotal,
    };
  });

  onChange(productDict);
};



  const handleAddonChange = (e, category, addonType) => {
    const { value, checked } = e.target;
    setSelectedAddons((prev) => {
      const updatedCategory = {
        free_addons: [...(prev[category]?.free_addons || [])],
        paid_addons: [...(prev[category]?.paid_addons || [])],
      };

      updatedCategory[addonType] = checked
        ? [...updatedCategory[addonType], value]
        : updatedCategory[addonType].filter((v) => v !== value);

      return {
        ...prev,
        [category]: updatedCategory,
      };
    });
  };

  const handleSubscriptionChange = (category, subscription) => {
    const updatedOptions = { ...selectedOptions };
    const updatedAddons = { ...selectedAddons };

    if (!subscription) {
      delete updatedOptions[category];
      delete updatedAddons[category];
      setSelectedQuantities((prev) => {
        const copy = { ...prev };
        delete copy[category];
        return copy;
      });
    } else {
      updatedOptions[category] = subscription;
      updatedAddons[category] = { free_addons: [], paid_addons: [] };
      setSelectedQuantities((prev) => ({
        ...prev,
        [category]: 1,
      }));
    }

    setSelectedOptions(updatedOptions);
    setSelectedAddons(updatedAddons);
    updateProductDict(updatedOptions, updatedAddons);
  };

  const getFreeAndPaidAddons = (category, selectedSub) => {
    const cat = categoryData[category];
    if (!cat || !selectedSub) return { free: [], paid: [] };
    const allAddons = cat.adds_on || {};
    const freeAddons = cat?.[selectedSub]?.free_adds_on || {};
    const free = Object.keys(freeAddons).filter(
      (k) => freeAddons[k] === "0" && k in allAddons
    );
    const paid = Object.keys(allAddons).filter((k) => !free.includes(k));
    return { free, paid };
  };

  // const getTotalPrice = () => {
  //   return Object.keys(selectedAddons).reduce((total, category) => {
  //     const selected = selectedAddons[category]?.paid_addons || [];
  //     const allPrices = categoryData[category]?.adds_on || {};
  //     const quantity = selectedQuantities[category] || 1;
  //     const categoryTotal =
  //       selected.reduce((sum, addon) => sum + parseFloat(allPrices[addon] || 0), 0) *
  //       quantity;
  //     return total + categoryTotal;
  //   }, 0);
  // };

  // const getSubscriptionCharge = () => {
  //   const selectedCategories = Object.keys(selectedOptions);
  //   const categoryCount = selectedCategories.length;

  //   return selectedCategories.reduce((sum, category) => {
  //     const subscription = selectedOptions[category];
  //     const subData = categoryData[category]?.[subscription];
  //     if (!subData) return sum;

  //     let priceKey = "Single";
  //     if (categoryCount === 2) priceKey = "Double";
  //     else if (categoryCount === 3) priceKey = "Triple";

  //     const quantity = selectedQuantities[category] || 1;
  //     return sum + parseFloat(subData[priceKey] || 0) * quantity;
  //   }, 0);
  // };

  const getTotalPrice = () => {
  return Object.keys(selectedAddons).reduce((total, category) => {
    const selected = selectedAddons[category]?.paid_addons || [];
    const allPrices = categoryData[category]?.adds_on || {};

    // ❌ Quantity hata diya kyun ke addon per multiply nahi karna
    const categoryTotal = selected.reduce(
      (sum, addon) => sum + parseFloat(allPrices[addon] || 0),
      0
    );

    return total + categoryTotal;
  }, 0);
};
const getSubscriptionCharge = () => {
  const selectedCategories = Object.keys(selectedOptions);
  const categoryCount = selectedCategories.length;

  return selectedCategories.reduce((sum, category) => {
    const subscription = selectedOptions[category];
    const subData = categoryData[category]?.[subscription];
    if (!subData) return sum;

    let priceKey = "Single";
    if (categoryCount === 2) priceKey = "Double";
    else if (categoryCount >= 3) priceKey = "Triple";

    const quantity = selectedQuantities[category] || 1;
    return sum + parseFloat(subData[priceKey] || 0) * quantity;
  }, 0);
};


  useEffect(() => {
    setSelectedCompany("");
    setSelectedOptions({});
    setSelectedAddons({});
    setSelectedQuantities({});
  }, [resetTrigger]);

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
            setSelectedQuantities({});
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

      <h1 className="text-center h-12 pt-2 font-bold text-black text-[20px] mb-6">
        Categories & Subscriptions
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(categoryData).map((category) => {
          const subs = Object.entries(categoryData[category])
            .filter(([k, v]) => k !== "adds_on" && typeof v === "object")
            .map(([subscriptionName]) => ({
              subscriptionName,
              label: subscriptionName,
            }));

          return (
            <div
              key={category}
              className="p-4 bg-white rounded-xl shadow border border-gray-200"
            >
              <label className="block mb-2 text-md font-medium text-gray-700">
                {category}
              </label>
              <div className="flex items-center gap-2">
                <select
  className="w-full truncate border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
  value={selectedOptions[category] || ""}
  onChange={(e) =>
    handleSubscriptionChange(category, e.target.value)
  }
>
  <option value="">-- Select Subscription --</option>
  {subs.map(({ subscriptionName, label }) => (
    <option
      key={subscriptionName}
      value={subscriptionName}
      title={label} // Show full label on hover
      className="truncate"
    >
      {label}
    </option>
  ))}
</select>

                {/* <select
                  className="flex-1 border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                  value={selectedOptions[category] || ""}
                  onChange={(e) =>
                    handleSubscriptionChange(category, e.target.value)
                  }
                >
                  <option value="">-- Select Subscription --</option>
                  {subs.map(({ subscriptionName, label }) => (
                    <option key={subscriptionName} value={subscriptionName}>
                      {label}
                    </option>
                  ))}
                </select> */}
                {selectedOptions[category] && (
                  <input
                    type="number"
                    min="1"
                    value={selectedQuantities[category] || 1}
                    onChange={(e) =>
                      setSelectedQuantities((prev) => ({
                        ...prev,
                        [category]: parseInt(e.target.value) || 1,
                      }))
                    }
                    className="w-20 border border-gray-300 p-2 rounded-md"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedCompany && (
        <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-inner">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Additional Add-ons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Free Add-ons */}
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                Free Add-ons
              </h3>
              {Object.keys(selectedOptions).map((category) => {
                if (!categoryData[category]) return null;
                const { free } = getFreeAndPaidAddons(
                  category,
                  selectedOptions[category]
                );
                return (
                  <div key={category} className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {category} - {selectedOptions[category]}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {free.map((name) => (
                        <label
                          key={name}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={name}
                            checked={
                              selectedAddons[category]?.free_addons?.includes(
                                name
                              ) || false
                            }
                            onChange={(e) =>
                              handleAddonChange(e, category, "free_addons")
                            }
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
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Paid Add-ons
              </h3>
              {Object.keys(selectedOptions).map((category) => {
                if (!categoryData[category]) return null;
                const { paid } = getFreeAndPaidAddons(
                  category,
                  selectedOptions[category]
                );
                const allPrices = categoryData[category]?.adds_on || {};
                return (
                  <div key={category} className="mb-6">
                    <p className="text-sm font-medium text-gray-600 mb-1 flex justify-between items-center">
                      <span>
                        {category} - {selectedOptions[category]}
                      </span>
                      <span className="text-blue-700 font-semibold">
                        Total: ${getCategoryTotal(category).toFixed(2)}
                      </span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {paid.map((name) => (
                        <label
                          key={name}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={name}
                            checked={
                              selectedAddons[category]?.paid_addons?.includes(
                                name
                              ) || false
                            }
                            onChange={(e) =>
                              handleAddonChange(e, category, "paid_addons")
                            }
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-800">
                            {name} (${allPrices[name]})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-right font-bold text-lg text-black mt-6 space-y-1">
            <div className="text-blue-900 text-xl font-bold">
              Combine Total: ${(
                getTotalPrice() + getSubscriptionCharge()
              ).toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesPlan;
