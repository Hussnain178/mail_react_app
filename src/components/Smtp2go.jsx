import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import UserNavbar from "./UserNavbar";
import { useNavigate } from "react-router-dom";

const Smtp2go = () => {
  const csrf_token = localStorage.getItem("csrf_token");
  const navigate = useNavigate();
  const hasFetchedaccountinfo = useRef(false);

  const Message = localStorage.getItem("Message");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [saving, setSaving] = useState(false);

  const content = Message === "admin" ? <Navbar /> : <UserNavbar />;

  /* ---------------- Fetch API Key ---------------- */
  const fetchSmtpApiKey = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("http://104.236.100.170/api/fetch_smtp2go_api", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "csrf-token": csrf_token,
        },
      });

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setApiKey(data.api_key || "");
    } catch (err) {
      console.error("Fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Initial Load ---------------- */
  useEffect(() => {
    if (hasFetchedaccountinfo.current) return;
    hasFetchedaccountinfo.current = true;

    const storedUserName = localStorage.getItem("user_name");
    if (!storedUserName) {
      navigate("/login");
      return;
    }

    fetchSmtpApiKey();
  }, [navigate]);

  /* ---------------- Save Handler ---------------- */
  const handleSave = async () => {
    if (!apiKey.trim()) {
      alert("API key cannot be empty");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "http://104.236.100.170/api/update_smtp2go_api",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "csrf-token": csrf_token,
          },
          body: JSON.stringify({ api_key: apiKey }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update API key");
      }

      await response.json();

      setIsEditing(false);
      await fetchSmtpApiKey(); // 🔁 re-fetch updated data
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI States ---------------- */
  if (loading) {
    return (
      <div className="p-6 max-w-md mx-auto bg-black rounded-xl shadow-md mt-25 text-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-md mx-auto bg-black rounded-xl shadow-md mt-25 text-center">
        <p className="text-red-500">Failed to load user data.</p>
      </div>
    );
  }

  /* ---------------- Main UI ---------------- */
  return (
    <div className="bg-blue-50 min-h-screen">
      {content}

      <div className="flex items-center justify-center px-4">
        <div className="bg-white relative p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto mt-20">

          <h1 className="text-center text-black text-[25px] font-bold pb-10">
            Smtp2go
          </h1>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Smtp2go API Key
            </label>
            <input
              type="text"
              value={apiKey}
              disabled={!isEditing}
              onChange={(e) => setApiKey(e.target.value)}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 outline-none ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          <div className="flex justify-center gap-4 mt-6">
            {!isEditing ? (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            ) : (
              <button
                type="button"
                disabled={saving}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md disabled:opacity-50"
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Smtp2go;
