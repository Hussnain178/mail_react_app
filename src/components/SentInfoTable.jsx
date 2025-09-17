// SentInfoTable.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SentInfoTable = () => {
  // 🔐 Role-based visibility
  const userType = localStorage.getItem("Message"); // You confirmed this key
  const isAdmin = userType === "admin";

  // 🔹 Table Data & State
  const [sentInfo, setSentInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  // 🔹 Date Filters with localStorage persistence
  const [startDate, setStartDate] = useState(() => {
    return localStorage.getItem("sentInfoFilter_startDate") || "";
  });
  const [endDate, setEndDate] = useState(() => {
    return localStorage.getItem("sentInfoFilter_endDate") || "";
  });

  // 🔹 CSRF Token
  const csrf_token = localStorage.getItem("csrf_token");
  const navigate = useNavigate();

  // 🔁 Save filter dates to localStorage when changed
  useEffect(() => {
    if (startDate) {
      localStorage.setItem("sentInfoFilter_startDate", startDate);
    } else {
      localStorage.removeItem("sentInfoFilter_startDate");
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      localStorage.setItem("sentInfoFilter_endDate", endDate);
    } else {
      localStorage.removeItem("sentInfoFilter_endDate");
    }
  }, [endDate]);

  // 🔁 Fetch data on page or filter change
  const fetchSentInfo = async (page, start = null, end = null) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/get_sent_info",
        {
          page_number: page,
          start_date: start || null,
          end_date: end || null,
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
      setHasMoreData(data.length === 20); // assuming 20 per page
    } catch (error) {
      console.error("Error fetching sent info:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const sDate = startDate ? startDate : null;
    const eDate = endDate ? endDate : null;
    fetchSentInfo(pageNumber, sDate, eDate);
  }, [pageNumber, startDate, endDate]);

  // 📥 Handle CSV Download
  const handleDownload = async () => {
    if (!startDate && !endDate) {
      alert("Please select at least one date to download.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://104.236.100.170/api/download_mail_info",
        {
          start_date: startDate || null,
          end_date: endDate || null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
        }
      );

      const { Data } = response.data;

      // Helper: Convert array to CSV
      const convertToCSV = (data, headers) => {
        const headerRow = headers.join(",");
        const rows = data.map((item) =>
          headers.map((h) => `"${item[h] || ""}"`).join(",")
        );
        return [headerRow, ...rows].join("\n");
      };

      const columns = [
        "sender_mail",
        "agent_user_name",
        "business_name",
        "business_email",
        "mail_type",
        "m_sent_at",
      ];

      // Download proposal.csv
      if (Data.proposal && Data.proposal.length > 0) {
        const csv = convertToCSV(Data.proposal, columns);
        downloadFile(csv, "proposal.csv", "text/csv");
      }

      // Download confirmation.csv
      if (Data.confirmation && Data.confirmation.length > 0) {
        const csv = convertToCSV(Data.confirmation, columns);
        downloadFile(csv, "confirmation.csv", "text/csv");
      }

      alert("Files downloaded successfully!");
    } catch (error) {
      console.error("Failed to download data:", error);
      alert("Download failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper: Trigger file download
  const downloadFile = (data, filename, mime) => {
    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Pagination Handlers
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
    <div className="bg-blue-50">
      <div className="p-6 w-full bg-white">
        <h2 className="text-2xl font-bold mb-4">Sent Info Table</h2>

        {/* 🔽 ADMIN ONLY: Filters & Download Button */}
        {isAdmin && (
          <div className="mb-6 flex flex-wrap items-end gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPageNumber(1);
                }}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPageNumber(1);
                }}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Clear Button */}
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setPageNumber(1);
              }}
              className="px-3 mb-1 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={loading}
              className="px-4 py-2 ml-145 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              {loading ? "Downloading..." : "Download CSV"}
            </button>
          </div>
        )}

        {/* 🔽 Table (Visible to All) */}
        {loading ? (
          <div className="flex justify-center py-4 text-lg">Loading...</div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-2 px-4 border-b">Sender Mail</th>
                  <th className="py-2 px-4 border-b">Agent User Name</th>
                  <th className="py-2 px-4 border-b">Business Name</th>
                  <th className="py-2 px-4 border-b">Business Email</th>
                  <th className="py-2 px-4 border-b">Mail Type</th>
                  <th className="py-2 px-4 border-b">Mail Sent At</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {sentInfo.length > 0 ? (
                  sentInfo.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{item.sender_mail}</td>
                      <td className="py-2 px-4 border-b">{item.agent_user_name}</td>
                      <td className="py-2 px-4 border-b">{item.business_name}</td>
                      <td className="py-2 px-4 border-b">{item.business_email}</td>
                      <td className="py-2 px-4 border-b">{item.mail_type}</td>
                      <td className="py-2 px-4 border-b">{item.m_sent_at}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          onClick={() => navigate("/details", { state: item })}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-gray-500">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 🔽 Pagination (Visible to All) */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevPage}
            disabled={pageNumber === 1}
            aria-label="Previous Page"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">Page {pageNumber}</span>
          <button
            onClick={handleNextPage}
            disabled={!hasMoreData}
            aria-label="Next Page"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentInfoTable;