import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import "../../styles/home.css";


const getDefaultImage = (contactName) => {
  const nameInitial = contactName ? contactName[0].toUpperCase() : "N";
  return `https://ui-avatars.com/api/?name=${nameInitial}&background=random&color=fff`;
}


const ContactEditForm = () => {
  const { store, actions } = useContext(Context);
  const [contactDetails, setContactDetails] = useState(store.selectedContact || {});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  const handleSave = (event) => {
    event.preventDefault();
    actions.createNewContact(contactDetails)    
    navigate("/");
  };

  return (
    <div className="edit-contact-container">
      <h2>Add Contact Information</h2>
      <form className="edit-contact-form" onSubmit={handleSave}>
        <input
          type="text"
          name="name"
          value={contactDetails.name || ""}
          onChange={handleInputChange}
          placeholder="Full Name"
          className="form-input"
        />
        <input
          type="text"
          name="address"
          value={contactDetails.address || ""}
          onChange={handleInputChange}
          placeholder="Address"
          className="form-input"
        />
        <input
          type="text"
          name="phone"
          value={contactDetails.phone || ""}
          onChange={handleInputChange}
          placeholder="Phone Number"
          className="form-input"
        />
        <input
          type="email"
          name="email"
          value={contactDetails.email || ""}
          onChange={handleInputChange}
          placeholder="Email Address"
          className="form-input"
        />
        <input
          type="text"
          name="image"
          value={contactDetails.email || ""}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="form-input"
        />
        <div className="contact-image-container">
          <img 
          src={contactDetails.image || getDefaultImage(contactDetails.name)}
          alt={contactDetails.name || "Contact image"}
          className="contact-image"
          /> 
        </div>

        <div className="edit-contact-buttons">
          <button type="submit" className="btn btn-save" onClick={handleSave}>
            Save Changes
          </button>

          <button
            type="button" className="btn btn-cancel" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactEditForm;
