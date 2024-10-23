import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";


const ContactEditForm = () => {
  const { store, actions } = useContext(Context);
  const [contactDetails, setContactDetails] = useState(store.selectedContact || {});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  const handleSave = async () => {
    await actions.modifyContact(contactDetails);
    navigate("/");
  };

  return (
    <div className="edit-contact-container">
      <h2>Edit Contact Information</h2>
      <form className="edit-contact-form">
        <input
          type="text"
          name="name"
          value={contactDetails.name || ""}
          onChange={handleInputChange}
          placeholder="Full Name"
        />
        <input
          type="text"
          name="address"
          value={contactDetails.address || ""}
          onChange={handleInputChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="phone"
          value={contactDetails.phone || ""}
          onChange={handleInputChange}
          placeholder="Phone Number"
        />
        <input
          type="email"
          name="email"
          value={contactDetails.email || ""}
          onChange={handleInputChange}
          placeholder="Email Address"
        />
        <div className="edit-contact-buttons">
          <button type="button" onClick={handleSave}>Save Changes</button>
          <button type="button" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ContactEditForm;
