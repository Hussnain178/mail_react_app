import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SentDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const rowData = location.state; // contains full row
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  const csrf_token = localStorage.getItem("csrf_token");

  useEffect(() => {
    if (rowData) {
      fetchDetailData(rowData); // sending all row keys to API
    } else {
      setLoading(false);
    }
  }, []);

  const fetchDetailData = async (rowPayload) => {
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_sent_info_detail", // 🔁 your real API
        rowPayload, // sending full row as payload
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
      );

      setDetailData(response.data); // result from backend
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

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Sent Info Detail</h2>

      <div className="space-y-3">
        {/* Dynamically show all key-value pairs from detailData */}
        {Object.entries(detailData).map(([key, value]) => (
          <div key={key}>
            <strong>{key.replace(/_/g, " ")}:</strong> {value?.toString()}
          </div>
        ))}
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
  );
};

export default SentDetailPage;
