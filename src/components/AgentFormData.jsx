import React, { useEffect, useState } from 'react';
import ServicesPlan from './ServicesPlan';
import UserNavbar from './UserNavbar';

const AgentForm = () => {
    
    const csrf_token = localStorage.getItem("csrf_token");

  const inputStyles =

    'w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500';

  const shortInputStyles =
    'w-full h-10 mt-2 p-2 border border-gray-300 rounded shadow outline-none focus:border-blue-500';

  const textareaStyles =
    'w-full mt-2 p-3 border border-gray-300 rounded shadow outline-none focus:border-blue-500';

  const [date, setDate] = useState('');
  // const [productDict, setProductDict] = useState({});
  // const [companyEmails, setCompanyEmails] = useState([]);

  const [formData, setFormData] = useState({
    company_name: '',
    product_dict:{
      company_name: '',
      type: "",
      subscription: "",
      free_addons: [],
      paid_addons: [],
      price: "",
    },
    mail_type: '',
    customer_type: '',
    sub_customer_type: '',
    business_name: '',
    business_email: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    additional_number: '',
    current_lec: '',
    cell_phone: '',
    passkey: '',
    tax_id_or_ssn: '',
    special_notes: '',
    manager_comments: '',
  });
  

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
   
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Final data being submitted:", formData);
  
    try {
      const response = await fetch('http://104.236.100.170/api/submit_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'csrf-token': csrf_token,
          // "csrf-token": "546a640144f8e2a8506499795efe8815b93c1eba8be9a48d3f74d0efc64e81a2",

        },
        body: JSON.stringify(formData),
      });
  
      const status = response.status;
      const data = await response.json();

      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({
          company_name: '',
          product_dict: {},
          mail_type: '',
          customer_type: '',
          sub_customer_type: '',
          business_name: '',
          business_email: '',
          street_address: '',
          city: '',
          state: '',
          zip_code: '',
          first_name: '',
          last_name: '',
          phone_number: '',
          additional_number: '',
          current_lec: '',
          cell_phone: '',
          passkey: '',
          tax_id_or_ssn: '',
          special_notes: '',
          manager_comments: '',
        });
      } else if (status === 400) {
        alert(data.Message);
      } else {
        setMessage({ type: 'error', text: result.message || "Something went wrong." });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form.');
    }
  };

    return (
      <div className='bg-black min-h-screen'>
        <UserNavbar />
      <div className="w-full h-full m-auto bg-blue-50 flex items-center justify-center min-h-screen bg-black[500]">
        <form className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-7xl mt-10" onSubmit={handleSubmit}>
          <h1 className="text-center h-12 pt-2 font-bold rounded-md text-black text-[25px] mb-6">
            Agent Form
          </h1>
          <div>
  
          <ServicesPlan
  onChange={(updatedProductDict) => {
    // Pick the first selected plan as product_dict object
    const selectedPlan = updatedProductDict[0] || {
      company_name: '',
      type: '',
      subscription: '',
      free_addons: [],
      paid_addons: [],
      price: 0,
    };

    setFormData((prev) => ({
      ...prev,
      company_name: selectedPlan.company_name,
      product_dict: selectedPlan, // <-- this ensures product_dict is an object
    }));
  }}
/>




           
          </div> 
          <div className="grid grid-cols-3 gap-6">

           


            {/* Mail Type */}
            <div>
              <label className="block text-sm font-medium mt-5 pb-1" htmlFor="mail_type">Mail Type</label>
              <select
                className={inputStyles}
                id="mail_type"
                name="mail_type"
                value={formData.mail_type}
                onChange={handleChange}
              >
                <option value="">-- Select Mail Type --</option>
                <option value="confirmation">Confirmation</option>
                <option value="proposal">Proposal</option>
              </select>
            </div>

            {/* Customer Type */}
            <div>
              <label className="block text-sm font-medium mt-4 pb-2" htmlFor="customer_type">
                Customer Type
              </label>
              <select
                className={inputStyles}
                id="customer_type"
                name="customer_type"
                value={formData.customer_type}
                onChange={handleChange}
              >
                <option value="">-- Select Customer Type --</option>
                <option value="ALC">ALC</option>
                <option value="porting">Porting</option>
                <option value="fresh">Fresh</option>
              </select>
            </div>

            {/* Spectrum Customer Type */}
            <div>
              <label className="block text-sm font-medium mt-4 pb-2" htmlFor="sub_customer_type"> Spectrum Customer Type </label>
              <select
                className={inputStyles}
                id="sub_customer_type"
                name="sub_customer_type"
                value={formData.sub_customer_type}
                onChange={handleChange}
              >
                <option value="">-- Customer Type --</option>
                <option value="shared space">Shared Space</option>
                <option value="soho">SOHO</option>
              </select>
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium mt-3 " htmlFor="business_name">Business Name</label>
              <input
                required
                className={shortInputStyles}
                type="text"
                id="business_name"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                placeholder="Enter your Business here"
              />
            </div>

            {/* Business Email */}
            <div>
              <label className="block text-sm font-medium mt-3" htmlFor="business_email">Business Email</label>
              <input
                required
                className={shortInputStyles}
                type="email"
                id="business_email"
                name="business_email"
                value={formData.business_email}
                onChange={handleChange}
                placeholder="business@gmail.com"
              />
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-sm font-medium mt-3" htmlFor="street_address">Street Address</label>
              <input
                required
                className={shortInputStyles}
                type="text"
                id="street_address"
                name="street_address"
                value={formData.street_address}
                onChange={handleChange}
                placeholder="Enter your address here"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium mt-2" htmlFor="city">City</label>
              <input
                required
                className={shortInputStyles}
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city here"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium mt-2" htmlFor="state">State</label>
              <input
                required
                className={shortInputStyles}
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state here"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-sm font-medium mt-2" htmlFor="zip_code">Zip Code</label>
              <input
                required
                className={shortInputStyles}
                type="number"
                id="zip_code"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleChange}
                placeholder="Enter your zip code"
              />
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium mt-2" htmlFor="first_name">First Name</label>
              <input
                required
                className={shortInputStyles}
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter your First Name here"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium mt-2" htmlFor="last_name">Last Name</label>
              <input
                required
                className={shortInputStyles}
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter your Last Name here"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mt-2" htmlFor="phone_number">Phone Number</label>
              <input
                required
                className={shortInputStyles}
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="023456789"
              />
            </div>

            {/* Additional Numbers */}
            <div>
              <label className="block text-sm font-medium mt-2" htmlFor="additional_number">Additional Number</label>
              <input
                required
                className={shortInputStyles}
                type="tel"
                id="additional_number"
                name="additional_number"
                value={formData.additional_number}
                onChange={handleChange}
                placeholder="0130548112"
              />
            </div>

            {/* Current LEC */}
            <div>
              <label className="block text-sm font-medium mt-3 pb-1" htmlFor="option1">Current LEC</label>
              <select
                className={inputStyles}
                id="current_lec"
                name="current_lec"
                value={formData.option1}
                onChange={handleChange}
              >
                <option value="">-- Select LEC --</option>
                <option value="lec_1">LEC 1</option>
                <option value="lec_2">LEC 2</option>
              </select>
            </div>


             {/* Cell Number */}
             <div>
              <label className="block text-sm font-medium mt-2" htmlFor="cell_phone">Cell Phone</label>
              <input
                required
                className={shortInputStyles}
                type="tel"
                id="cell_phone"
                name="cell_phone"
                value={formData.cell_phone}
                onChange={handleChange}
                placeholder="023456789"
              />
            </div>

            {/* Passkey */}
            <div>
              <label className="block text-sm font-medium mt-2" htmlFor="passkey">Passkey</label>
              <input
                required
                className={shortInputStyles}
                type="number"
                id="passkey"
                name="passkey"
                value={formData.passkey}
                onChange={handleChange}
                placeholder="Enter passkey"
              />
            </div>
            {/* tax_id/ ssn */}
            <div>
              <label className="block text-sm font-medium mt-2" htmlFor=" tax_id_or_ssn"> Tax_id_or_SSN</label>
              <input
                required
                className={shortInputStyles}
                type="number"
                id="tax_id_or_ssn"
                name="tax_id_or_ssn"
                value={formData.tax_id_or_ssn}
                onChange={handleChange}
                placeholder="Enter  tax_id_or_ssn"
              />
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-sm font-medium mt-2" htmlFor="special_notes">Special Notes</label>
              <textarea
                required
                className={textareaStyles}
                id="special_notes"
                name="special_notes"
                value={formData.special_notes}
                onChange={handleChange}
                placeholder="Enter any special notes here"
              ></textarea>
            </div>

            {/* Manager Comments */}
            <div>
              <label className="block text-sm font-medium mt-2" htmlFor="manager_comments">Manager Comments</label>
              <textarea
                required
                className={textareaStyles}
                id="manager_comments"
                name="manager_comments"
                value={formData.manager_comments}
                onChange={handleChange}
                placeholder="Manager comments here"
              ></textarea>
            </div>
            <br />

            {/* Centered Submit Button right after Manager Comments */}
<div className="col-span-3 mt-6 flex justify-center">
  <button
    type="submit"
    className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
  >
    Submit Form
  </button>
</div>





          </div>
        </form>
      </div>
      </div>
    );
  }
export default AgentForm;