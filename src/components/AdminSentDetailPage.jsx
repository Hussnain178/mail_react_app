import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const AdminSentDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const rowData = location.state;
  const [detailData, setDetailData] = useState(null);
  const [detailData1, setDetailData1] = useState([]);
  const [productdict, setproductdict] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  
  const csrf_token = localStorage.getItem("csrf_token");

  useEffect(() => {
    if (rowData) {
      const payload = { id: rowData };
      fetchDetailData(payload);
    } else {
      setLoading(false);
    }
  }, []);

   const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/resend_email",
        {
         mail_id: rowData // 👈 yahan apni actual ID set karein
        },
        {
          headers: {
            'Content-Type': 'application/json',
             "csrf-token": csrf_token, // 👈 yahan apna CSRF token set karein
          },
        }
      );

      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

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

      setDetailData(response.data.List);
      setDetailData1(response.data.List.admin_comments);
      setproductdict(response.data.List.product_dict);
    } catch (error) {
      console.error("Detail fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (newComment.trim() === "") {
      alert("Please add a valid comment!");
      return;
    }

    try {
      const response = await fetch("http://104.236.100.170/api/add_comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "csrf-token": csrf_token,
        },
        body: JSON.stringify({ comment: newComment, id: rowData }),
      });

      if (response.ok) {
        setNewComment("");
        fetchDetailData({ id: rowData });
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
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

  const filteredEntries = Object.entries(productdict).filter(
    ([key]) => key !== "company_name"
  );

  return (
    <div className="bg-blue-50 min-h-screen">
      <Navbar />
      <div className="p-6 m-10 max-w-3xl mx-auto bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-center relative">
          Sent Info Detail{" "}
          <button
            type="button"
            className="absolute right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
            onClick={() => navigate("/home")}
          >
            &times;
          </button>
        </h2>
       <button
      onClick={handleClick}
      className="px-4 py-2 ml-70 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Resend Mail
    </button>
        <div className="space-y-3">
          {Object.entries(detailData)
            .filter(
              ([key]) =>
                key !== "mail_html" &&
                key !== "admin_comments" &&
                key !== "_id" &&
                key !== "product_dict"
            )
            .map(([key, value]) => (
              <div key={key}>
                <strong>{key.replace(/_/g, " ")}:</strong> {value?.toString()}
              </div>
            ))}
        </div>

        <div className="max-w-full overflow-x-auto p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Product Details
          </h2>
          {filteredEntries.length === 0 ? (
            <p className="text-gray-500">
              No data found for company: {detailData.company_name}
            </p>
          ) : (
            <table className="min-w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Product
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Subscription
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Free Add-ons
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Add-ons
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(productdict).map(
                  ([productName, productData]) => (
                    <tr
                      key={productName}
                      className="bg-white hover:bg-gray-50"
                    >
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">
                        {productName}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">
                        {productData.subscription}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">
                        {productData.free_addons.length
                          ? productData.free_addons.join(", ")
                          : "None"}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">
                        {productData.adds_on.length
                          ? productData.adds_on.join(", ")
                          : "None"}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">
                        ${productData.price}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* ✅ Updated Comment Section Here */}
        <div className="w-full mt-6 p-4 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Comments</h2>

          <ul className="space-y-2 mb-4">
            {detailData1.map((commentObj, index) => (
              <li
                key={index}
                className="p-2 bg-gray-50 border border-gray-200 rounded text-gray-800"
              >
                <div><strong>Comment:</strong> <pre>{commentObj.comment} </pre></div>
                <div className="text-sm text-gray-500">
                  <strong>Added at:</strong>{" "}
                  {commentObj.comment_added_at || "N/A"}
                </div>
              </li>
            ))}
          </ul>

          <form onSubmit={handleAddComment} className="flex gap-2">
            <textarea
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-700"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </form>
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

export default AdminSentDetailPage;
