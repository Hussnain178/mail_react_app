import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SentDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const rowData = location.state; // contains full row
  const [detailData, setDetailData] = useState(null);
  const [detailData1, setDetailData1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState([]); // string array


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

  const handleAddComment = async (e) => {
    e.preventDefault();
    

    try {
      // Replace this with your actual API call
      const response = await fetch("http://104.236.100.170/api/add_comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "csrf-token": csrf_token,
        },
        body: JSON.stringify({ comment: newComment , id: rowData}),
      });

      if (response.ok) {
        setNewComment("");
        fetchDetailData({ id: rowData }); 
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };



  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Sent Info Detail</h2>

      <div className="space-y-3">
        {/* Dynamically show all key-value pairs from detailData */}
        {Object.entries(detailData)
  .filter(([key]) => key !== "mail_html").filter(([key]) => key !== "admin_comments")
  .map(([key, value]) => (
    <div key={key}>
      <strong>{key.replace(/_/g, " ")}:</strong> {value?.toString()}
    </div>
))}

      </div>

     
          <div className="max-w-md mx-auto mt-6 p-4 border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <ul className="space-y-2 mb-4">
        {detailData1.map((comment, index) => { return (
          <li key={index} className="p-2 bg-gray-100 rounded">
            {comment}
          </li>)}
        )}
      </ul>
      <form onSubmit={handleAddComment} className="flex gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 border rounded px-3 py-2"
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

  );
};

export default SentDetailPage;
