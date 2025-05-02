import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import axios from "axios";

const UserAdminDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const rowData = location.state; // contains full row
  const [detailData, setDetailData] = useState(null);
  const [detailData1, setDetailData1] = useState([]);
  const [productdict, setproductdict] = useState([]);
  const [loading, setLoading] = useState(true);
   // string array
   


  const csrf_token = localStorage.getItem("csrf_token");

  useEffect(() => {
    if (rowData) {
      const payload = { id: rowData }; // id ko key:value bana kar bhejna
      fetchDetailData(payload);
    } else {
      setLoading(false);
    }
  }, []);



  const fetchDetailData = async (rowPayload) => {
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_mail_info",
        rowPayload,
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
      );
    
  
      setDetailData(response.data.List); // 👈 Only store the List object
      setDetailData1(response.data.List.admin_comments); 
      setproductdict(response.data.List.product_dict);  

    } catch (error) {
      console.error("Detail fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  
  

  if (loading) return <div className="p-6">Loading...</div>;

  if (!detailData) {
    return (
      <div className="p-6 text-center text-red-500">
        No Detail Found
        <div className="mt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

 
  const entries = Object.entries(productdict);
  
  const filteredEntries = Object.entries(productdict).filter(([key]) => key !== "company_name");


  return (
    <div className="bg-gray-100 min-h-screen">
      <UserNavbar />
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className=" relative text-2xl font-bold mb-4 text-center">Sent Info Detail 
      <button
            type="button"
            className="absolute right-1 text-gray-500 hover:text-red-500 text-2xl font-bold"
            onClick={() => navigate("/home")}
          >
            &times;
          </button>
      </h2>

      <div className="space-y-3">
        {/* Dynamically show all key-value pairs from detailData */}
        {Object.entries(detailData)
  .filter(([key]) => key !== "mail_html").filter(([key]) => key !== "admin_comments").filter(([key]) => key !== "_id").filter(([key]) => key !== "product_dict")
  .map(([key, value]) => (
    <div key={key}>
      <strong>{key.replace(/_/g, " ")}:</strong> {value?.toString()}
    </div>
))}

      </div>
      
    <div className="max-w-full overflow-x-auto p-4">
  <h2 className="text-xl font-semibold mb-4 text-gray-700">Product Details</h2>
  {filteredEntries.length === 0 ? (
        <p className="text-gray-500">No data found for company: {selectedCompany}</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Product</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Subscription</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Free Add-ons</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Add-ons</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(productdict).map(([productName, productData]) => (
            <tr key={productName} className="bg-white hover:bg-gray-50">
              <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{productName}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{productData.subscription}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-gray-700">
                {productData.free_addons.length ? productData.free_addons.join(', ') : 'None'}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-gray-700">
                {productData.adds_on.length ? productData.adds_on.join(', ') : 'None'}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-gray-700">${productData.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      )}
</div>

     
<div className="w-full mt-6 p-4 border border-gray-300 rounded-lg">
  <h2 className="text-xl font-semibold mb-4 text-gray-700">Comments</h2>

  <ul className="space-y-2 mb-4">
        {detailData1.map((comment, index) => { return (
          <li key={index} className="p-2 bg-gray-100 rounded">
            {comment}
          </li>)}
        )}
      </ul>
     
     
      
    </div>
    <div className="mt-6 text-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
    </div>

  );
};

export default UserAdminDetailPage;
