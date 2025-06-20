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
  const [resetTrigger, setResetTrigger] = useState(false);

  
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
         

        },
        body: JSON.stringify(formData),
      });
  
      const status = response.status;
      const data = await response.json();

      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({
          company_name: '',
          product_dict: {"company_name": "", "type": "", "subscription": "", "free_addons": [], "paid_addons": [], "price": ""},
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
          current_lec:'',
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

    setResetTrigger(prev => !prev); // Toggle the trigger to re-render child
  }

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
          resetTrigger={resetTrigger}
  // onChange={(updatedProductDictArray) => {
  //   const dict = {};
  
  //   updatedProductDictArray.forEach((item) => {
  //     dict[item.type] = {
  //       subscription: item.subscription,
  //       free_addons: item.free_addons,
  //       adds_on: item.adds_on,
  //       price: item.price,
  //     //       quantity, // ✅ added quantity
  //     // sub_price: item.basePrice, // ✅ added subscription base price
  //     // adds_on_price: item.paidAddonTotal, // ✅ added paid addons total
  //     };
  //   });
  
  //   const companyName = updatedProductDictArray[0]?.company_name || '';
  
  //   setFormData((prev) => ({
  //     ...prev,
  //     company_name: companyName,
  //     product_dict: dict, // 👈 now an object with type-wise keys
  //   }));
  // }}
  onChange={(updatedProductDictArray) => {
  const dict = {};

  updatedProductDictArray.forEach((item) => {
    dict[item.type] = {
      subscription: item.subscription,
      free_addons: item.free_addons,
      adds_on: item.adds_on,
      quantity: item.quantity,         // ✅ NEW
      sub_price: item.sub_price,       // ✅ NEW
      adds_on_price: item.adds_on_price, // ✅ NEW
      price: item.price,
    };
  });

  const companyName = updatedProductDictArray[0]?.company_name || '';

  setFormData((prev) => ({
    ...prev,
    company_name: companyName,
    product_dict: dict,
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
            {/* <div>
              <label className="block text-sm font-medium mt-2" htmlFor="state">State</label>
              <input
                // required
                className={shortInputStyles}
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state here"
              />
            </div> */}

             {/* Customer Type */}
             <div>
              <label className="block text-sm font-medium mt-4 pb-2" htmlFor="State">
                State
              </label>
              <select
                className={inputStyles}
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">-- Select State here --</option>
                <option value="Alabama">AL </option>
                <option value="Alaska">AK </option>
                <option value="Arizona">AZ</option>
                <option value="Arkansas">AR</option>
                <option value="California">CA</option>
                <option value="Colorado">CO</option>
                <option value="Connecticut">CT</option>
                <option value="Delaware">DE</option>
                <option value="District of Columbia">DC</option>
                <option value="Florida">FL</option>
                <option value="Georgia">GA</option>
                <option value="Hawaii">HI</option>
                <option value="Idaho">ID</option>
                <option value="Illinois">IL</option>
                <option value="Indiana">IN</option>
                <option value="Iowa">IA</option>
                <option value="Kansas">KS</option>
                <option value="Kentucky">KY</option>
                <option value="Louisiana">LA</option>
                <option value="Maine">ME</option>
                <option value="Maryland">MD</option>
                <option value="Massachusetts">MA</option>
                <option value="Michigan">MI</option>
                <option value="Minnesota">MN</option>
                <option value="Mississippi">MS</option>
                <option value="Missouri">MO</option>
                <option value="Montana">MT</option>
                <option value="Nebraska">NE</option>
                <option value="Nevada">NV</option>
                <option value="New Hampshire">NH</option>
                <option value="New Jersey">NJ</option>
                <option value="New Mexico">NM</option>
                <option value="New York">NY</option>
                <option value="North Carolina">NC</option>
                <option value="North Dakota">ND</option>
                <option value="Ohio">OH</option>
                <option value="Oklahoma">OK</option>
                <option value="Oregon">OR</option>
                <option value="Pennsylvania">PA</option>
                <option value="Rhode Island">RI</option>
                <option value="South Carolina">SC</option>
                <option value="South Dakota">SD</option>
                <option value="Tennessee">TN</option>
                <option value="Texas">TX</option>
                <option value="Utah">UT</option>
                <option value="Vermont">VT</option>
                <option value="Virginia">VA</option>
                <option value="Washington">WA</option>
                <option value="West Virginia">WV</option>
                <option value="Wisconsin">WI</option>
                <option value="Wyoming">WY</option>
              </select>
            </div>


            {/* Zip Code */}
            <div>
              <label className="block text-sm font-medium mt-2" htmlFor="zip_code">Zip Code</label>
              <input
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
               <input
                required
                className={shortInputStyles}
                type="text"
                 id="current_lec"
                name="current_lec"
                value={formData.current_lec}
                onChange={handleChange}
                placeholder="Enter your current LEC"
              />
              {/* <select
                className={inputStyles}
               
                value={formData.option1}
                onChange={handleChange}
              >
                <option value="">-- Select LEC --</option>
                <option value="lec_1">LEC 1</option>
                <option value="lec_2">LEC 2</option>
              </select> */}
            </div>


             {/* Cell Number */}
             <div>
              <label className="block text-sm font-medium mt-2" htmlFor="cell_phone">Cell Phone</label>
              <input
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
              <label className="block text-sm font-medium mt-2" htmlFor=" tax_id_or_ssn"> Tax id or SSN</label>
              <input
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