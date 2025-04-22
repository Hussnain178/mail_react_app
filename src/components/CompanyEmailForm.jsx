// React ke useState hook ko import kar rahe hain for state management
import { useState } from "react";

// Functional component banaya hai jiska naam hai CompanyEmailForm
export default function CompanyEmailForm() {
    const csrf_token = localStorage.getItem("csrf_token"); // CSRF token ko localStorage se le rahe hain
  // Initial form state banayi hai jismein 5 fields hain: company_name, mail, etc.
  const [formData, setFormData] = useState({
    company_name: "",
    mail: "",
    mail_password: "",
    smtp_server: "",
    smtp_port: "",
  });

  // Form submit hone ke dauraan loading state handle karne ke liye
  const [loading, setLoading] = useState(false);
  // Server response ya error messages dikhane ke liye
  const [message, setMessage] = useState("");

  // Jab input field mein koi change aaye to ye function update karega formData
  const handleChange = (e) => {
    // Previous formData ko copy kar ke sirf us field ko update kar rahe hain jo change hui hai
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit hone par chalne wala function
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page reload na ho isliye preventDefault
    setLoading(true);   // Submit hone par loading true kar diya
    setMessage("");     // Pehle se koi message ho to usko clear kar diya

    try {
      // Backend API par POST request bhej rahe hain formData ke sath
      const response = await fetch("http://104.236.100.170/api/add_mail", {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // JSON data bhej rahe hain
          "csrf-token" : csrf_token, // CSRF token bhej rahe hain header mein
        },
        body: JSON.stringify(formData), // formData ko JSON string bana kar bhej rahe hain
      });

      // Response ko JSON format mein convert kar rahe hain
      const result = await response.json();

      // Agar request sahi se ho gayi to success message set karo
      if (response.ok) {
        setMessage("Form submitted successfully!");
        // Form ko reset kar rahe hain
        setFormData({
          company_name: "",
          mail: "",
          mail_password: "",
          smtp_server: "",
          smtp_port: "",
        });
      } else {
        // Agar error aaye to server ka message show karo
        setMessage(result.error || "Submission failed.");
      }
    } catch (error) {
      // Agar network error aaye to message show karo
      setMessage("Something went wrong!");
    } finally {
      // Chahe success ho ya error, loading ko false karna hai
      setLoading(false);
    }
  };

  // JSX return ho raha hai - form ka UI
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">Add Company Mail Settings</h2>

      {/* Form start */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name Input */}
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full border rounded-xl p-3"
          required
        />

        {/* Email Input */}
        <input
          type="email"
          name="mail"
          value={formData.mail}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded-xl p-3"
          required
        />

        {/* Email Password Input */}
        <input
          type="password"
          name="mail_password"
          value={formData.mail_password}
          onChange={handleChange}
          placeholder="Email Password"
          className="w-full border rounded-xl p-3"
          required
        />

        {/* SMTP Server Input */}
        <input
          type="text"
          name="smtp_server"
          value={formData.smtp_server}
          onChange={handleChange}
          placeholder="SMTP Server"
          className="w-full border rounded-xl p-3"
          required
        />

        {/* SMTP Port Input */}
        <input
          type="text"
          name="smtp_port"
          value={formData.smtp_port}
          onChange={handleChange}
          placeholder="SMTP Port"
          className="w-full border rounded-xl p-3"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // Agar loading true ho to button disable ho jaye
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit"} {/* Button text loading ke hisab se */}
        </button>

        {/* Server response message ya error */}
        {message && (
          <p className="text-center text-sm text-red-500 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
