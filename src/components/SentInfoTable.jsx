import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Step 3

const SentInfoTable = () => {
  const [sentInfo, setSentInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const csrf_token = localStorage.getItem("csrf_token");
  const navigate = useNavigate(); // ✅ Step 3

  const fetchSentInfo = async (page) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_sent_info",
        {
          page_number: page,
          company_name: "mumzamil_company",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
      );

      const data = response.data.List || [];
      setSentInfo(data);
      setHasMoreData(data.length === 20);

    } catch (error) {
      console.error("Error fetching sent info:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSentInfo(pageNumber);
  }, [pageNumber]);

  const handleNextPage = () => {
    if (hasMoreData) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sent Info Table</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Agent User Name</th>
                <th className="py-2 px-4 border-b">Business Name</th>
                <th className="py-2 px-4 border-b">Business Email</th>
                <th className="py-2 px-4 border-b">Mail Type</th>
                <th className="py-2 px-4 border-b">Mail Sent At</th>
                <th className="py-2 px-4 border-b">Action</th> {/* ✅ Step 5 */}
              </tr>
            </thead>
            <tbody>
              {sentInfo.length > 0 ? (
                sentInfo.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">{item.agent_user_name}</td>
                    <td className="py-2 px-4 border-b">{item.business_name}</td>
                    <td className="py-2 px-4 border-b">{item.business_email}</td>
                    <td className="py-2 px-4 border-b">{item.mail_type}</td>
                    <td className="py-2 px-4 border-b">{item.m_sent_at}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => navigate("/detail", { state: item })} // ✅ Step 3
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={pageNumber === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {pageNumber}</span>
        <button
          onClick={handleNextPage}
          disabled={!hasMoreData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SentInfoTable;
